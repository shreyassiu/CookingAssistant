const express = require('express');

const router = express.Router();

router.use('/food', require('./foodRoutes'));

module.exports = router;