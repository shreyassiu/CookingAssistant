const {Recipe} = require('../models');

const addRecipe = async (req, res) => {
    try {
        const recipeData = req.body;
        const imageUrl = req.file?req.file.path:null;

        const newRecipe = new Recipe({
            ...recipeData,
            image : imageUrl,
            user: {
                email: req.user.email,
                name: req.user.name
            }
        });


        await newRecipe.save();

        return res.status(200).json({ message: 'Recipe submitted and saved successfully!' });
    } catch (error) {
        console.error('Add recipe error:', error);
        return res.status(500).json({ message: 'Failed to save recipe.' });
    }
};

module.exports = { addRecipe };
