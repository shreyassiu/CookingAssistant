const multer = require('multer');
const { storage } = require('../config');

console.log("image uploaded")
const upload = multer({ storage });

module.exports = upload;
