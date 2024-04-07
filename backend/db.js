const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://Lavanya:GoFood@cluster0.8gazpxy.mongodb.net/GoFood?retryWrites=true&w=majority&appName=Cluster0";


const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB Atlas");

        // Fetch all documents from the "food_items" collection
        var foodItems = mongoose.connection.db.collection("food_items");
        foodItems = await foodItems.find({}).toArray();
        // console.log("Fetched data:", foodItems);
        console.log("data has fetched");
    } catch (error) {
        console.error("Error connecting to MongoDB Atlas:", error);
    }
};

module.exports = mongoDB;
