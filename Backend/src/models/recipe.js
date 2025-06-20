const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: String,
  extendedIngredients: { type: [String], required: true },
  instructions: { type: [String], required: true },
  readyInMinutes: Number,
  servings: Number,
  pricePerServing: Number,
  spoonacularScore: { type: Number, default: 100 },
  tags: [String],
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  user: {
    email: { type: String, required: true },
    name: { type: String, required: true }
  }
});

module.exports = mongoose.model('Recipe', recipeSchema);
