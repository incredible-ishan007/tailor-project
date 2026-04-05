const mongoose = require("mongoose");

function connectToMongoDB() {
    const url = process.env.MONGO_URI;  

    mongoose.connect(url)
        .then(() => {
            console.log("Connected to MongoDB");
            console.log("DB Name:", mongoose.connection.name);
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports = { connectToMongoDB };