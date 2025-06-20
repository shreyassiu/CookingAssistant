const express = require('express');

const router = express.Router();

router.use('/food', require('./foodRoutes'));
router.use('/auth',require('./auth'))
router.use('/addRecipe',require('./addRecipe'))
router.use('/assistant',require('./assistant'))

module.exports = router;