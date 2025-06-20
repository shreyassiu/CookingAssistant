const { signup,login } = require("./authController");
const handleGeminiAssistant = require("./handleGeminiAssistant");
const { addRecipe } = require("./recipeController");
const { searchCombinedRecipes } = require("./searchCombinedRecipe");

module.exports = {
    FoodController: require("./foodController"),
    signup,login,addRecipe,
    searchCombinedRecipes,handleGeminiAssistant
}