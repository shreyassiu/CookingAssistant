const express = require('express');
const router = express.Router();
const { signup, login } = require('../../controllers');
const { validateSignup, validateLogin } = require('../../middlewares');

router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);

module.exports = router;
