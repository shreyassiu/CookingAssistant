const express = require('express');
const router = express.Router();
const {handleGeminiAssistant} = require('../../controllers')

router.post('/',handleGeminiAssistant);

module.exports = router;
