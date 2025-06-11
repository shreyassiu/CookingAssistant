const dotenv = require('dotenv');

dotenv.config();
module.exports = {
    PORT : process.env.PORT,
    SPOONACULAR_API_KEY : process.env.SPOONACULAR_API_KEY
}