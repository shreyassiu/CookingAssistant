const { GoogleGenAI } = require('@google/genai');

const handleGeminiAssistant = async (req, res, next) => {
    const { recipeData, query,currentStep } = req.body;
    console.log("In query : ", recipeData);
    if (!recipeData || !query) {
        return res.status(400).json({ error: 'recipeData and query are required' });
    }
    const prompt = `You are a cooking assistant. A user has a recipe and asked: "${query}", and currently you are at step : "${currentStep}" 
    Recipe Data: ${JSON.stringify(recipeData, null, 2)} Respond helpfully based on the recipe and query.Don't respond with a very long answer, try to be brief and to the point, if you did not understand the query, then say that. Don't use any characters such as * or /, assume whatever you're sending that is going to be voiced by an voice assistant`;

    try {
        const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        const result = await genAI.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt
        });
        const text = result.text;
        res.json({ response: text });
    } catch (err) {
        console.error('Gemini SDK Error:', err.message);
        return res.status(500).json({ message: 'AI validation error.' });
    }
};

module.exports = handleGeminiAssistant;
