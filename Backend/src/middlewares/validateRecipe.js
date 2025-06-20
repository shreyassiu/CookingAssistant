const { GoogleGenAI } = require('@google/genai');

const validateRecipeAI = async (req, res, next) => {
    const recipe = req.body;
    console.log("In validate recipe : ",recipe);
   const prompt = `You're a recipe assistant. A user submitted the following recipe:

Title: ${recipe.title || ''}
Description: ${recipe.description || ''}
Ingredients: ${(recipe.ingredients || []).join(', ')}
Instructions: ${(recipe.instructions || []).join(', ')}
Preparation Time: ${recipe.prepTime || ''}
Cooking Time: ${recipe.cookTime || ''}
Servings: ${recipe.servings || ''}
Tags: ${(recipe.tags || []).join(', ')}

Can this be considered a valid recipe, or is it gibberish? If it has even a 20% change of being a recipe say true. I am only doing this as a validation check.If it includes edible items, and anything along the lines of making them you can say true,else false. Just return "true" or "false". No explanation.`;


    try {
        const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        const result = await genAI.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt
        });

        let text = result.text;
        if (typeof text === 'function') {
            text = await text(); // in case it's a promise-returning function
        }

        const trimmed = text.toLowerCase().trim();

        console.log("Gemini response:", trimmed);

        if (!trimmed.includes('true')) {
            return res.status(400).json({ message: 'AI validation failed: recipe looks invalid.' });
        }

        next();
    } catch (err) {
        console.error('Gemini SDK Error:', err.message);
        return res.status(500).json({ message: 'AI validation error.' });
    }
};

module.exports = validateRecipeAI;
