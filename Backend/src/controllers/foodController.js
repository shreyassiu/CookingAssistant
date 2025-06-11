const { ServerConfig } = require('../config');

const apiKey = ServerConfig.SPOONACULAR_API_KEY;

const popularFoodItems = async (req, res) => {
    try {
        // console.log("request received");
        const baseUrl = 'https://api.spoonacular.com/recipes/random';
        const queryParams = new URLSearchParams({
            apiKey,
            number:3
        })
        const popularFoodItems = await fetch(`${baseUrl}?${queryParams}`);
        const result = await popularFoodItems.json();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch popular food items',
            details: error.message
        });
    }
}

const autocompleteFoodItems = async (req, res) => {
    try {
        // console.log("request received");
        const baseUrl = 'https://api.spoonacular.com/recipes/autocomplete';
        const queryParams = new URLSearchParams({
            apiKey,
            number : 2,
            query: req.query.query || ''
        })
        const autocompleteFoodItems = await fetch(`${baseUrl}?${queryParams}`);
        const result = await autocompleteFoodItems.json();
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch autocomplete of search',
            details: error.message
        });
    }
}

const searchFoodItems = async (req,res)=>{
    try {
        console.log("request received");
        const baseUrl = 'https://api.spoonacular.com/recipes/complexSearch';
        const queryParams = new URLSearchParams({
            apiKey,
            query: req.query.query || '',
            diet : req.query.diet || '',
        })
        const searchFoodItems = await fetch(`${baseUrl}?${queryParams}`);
        const result = await searchFoodItems.json();
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch search query',
            details: error.message
        });
    }
}

const recipe = async(req,res) =>{
    try {
        console.log("request received");
        const baseUrl = `https://api.spoonacular.com/recipes/informationBulk`;
        const queryParams = new URLSearchParams({
            apiKey,
            ids : req.query.ids || '',
        })
        const searchFoodItems = await fetch(`${baseUrl}?${queryParams}`);
        const result = await searchFoodItems.json();
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch recipe query',
            details: error.message
        });
    }
}

const similarFoodItems = async (req, res) => {
    try {
        // console.log("request received");
        const baseUrl = 'https://api.spoonacular.com/recipes/${req.id}/similar}';
        const queryParams = new URLSearchParams({
            apiKey,
            number : 5,
        })
        const similarFoodItems = await fetch(`${baseUrl}?${queryParams}`);
        const result = await similarFoodItems.json();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch similar food items',
            details: error.message
        });
    }
}

module.exports = {
    popularFoodItems,
    autocompleteFoodItems,
    searchFoodItems,
    recipe,
    similarFoodItems
};