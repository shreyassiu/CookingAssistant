const express = require('express');
const { FoodController } = require('../../controllers');

const router = express.Router();


router.get('/popular', FoodController.popularFoodItems);
router.get('/autocomplete',FoodController.autocompleteFoodItems)
router.get('/search',FoodController.searchFoodItems);
router.get('/recipe',FoodController.recipe);
router.get('/similar',FoodController.similarFoodItems);

module.exports = router;