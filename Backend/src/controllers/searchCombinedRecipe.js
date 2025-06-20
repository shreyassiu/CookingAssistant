// controllers/recipeController.js
const {Recipe} = require('../models');
const { ServerConfig } = require('../config');

const apiKey = ServerConfig.SPOONACULAR_API_KEY;

const searchCombinedRecipes = async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ message: "Query parameter is required" });
    }

    try {
        // --- Local DB search ---
        console.log(Recipe);
        const localResults = await Recipe.find({
            title: { $regex: query, $options: 'i' }
        });

        // --- Spoonacular search ---
        const baseUrl = 'https://api.spoonacular.com/recipes/complexSearch';
        const queryParams = new URLSearchParams({
            apiKey,
            query: query,
            number: 10
        });

        const spoonacularResponse = await fetch(`${baseUrl}?${queryParams}`);
        const spoonacularData = await spoonacularResponse.json();
        const apiResults = spoonacularData.results || [];

        const combined = [
            ...localResults.map(item => ({ ...item._doc, source: 'local' })),
            ...apiResults.map(item => ({ ...item, source: 'spoonacular' }))
        ];

        res.status(200).json(combined);
    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({ message: "Error searching recipes", error: error.message });
    }
};

module.exports = {
    searchCombinedRecipes
};
