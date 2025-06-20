const express = require('express')
const router = express.Router();
const { authMiddleware, validateRecipeAI, upload } = require('../../middlewares')
const { addRecipe } = require('../../controllers')

router.post(
    '/',
    authMiddleware,
    upload.single('image'),
    (req, res, next) => {
        console.log('✅ File uploaded:', req.file);
        console.log('✅ Body:', req.body);
        next();
    },
    validateRecipeAI,
    addRecipe
);
module.exports = router;