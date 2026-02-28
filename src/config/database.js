const mongoose = require("mongoose");
const connectDB = async()=> {
    await mongoose.connect("mongodb+srv://nodejsmongo_db_user:iCfUuAavXuGOpX0a@mongonodejs.p5c4vax.mongodb.net/devTinder");
}

module.exports = connectDB;