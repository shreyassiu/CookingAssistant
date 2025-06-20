const {storage,cloudinary} = require("./cloudinary");


module.exports = {
    ServerConfig : require("./server-config"),
    connectDB : require("./db"),
    storage,cloudinary
}