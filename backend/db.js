const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://Lavanya:GoFood@cluster0.8gazpxy.mongodb.net/GoFood?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB Atlas");

        // Fetch all documents from the "food_items" collection
        const foodItemsCollection = mongoose.connection.db.collection("food_items");
        const foodItems = await foodItemsCollection.find({}).toArray();
        // console.log("Fetched data:", foodItems);
        console.log("data has fetched");
        global.food_items = foodItems;

        // Fetch data from "food_category" collection
        const foodCategoryCollection = mongoose.connection.db.collection("food_category");
        const foodCategory = await foodCategoryCollection.find({}).toArray();
        console.log("FoodCategory data is", foodCategory);
        global.food_category = foodCategory;
        

    } catch (error) {
        console.error("Error connecting to MongoDB Atlas:", error);
    }
};

module.exports = mongoDB;

// const mongoose = require("mongoose");

// const mongoURI = "mongodb+srv://Lavanya:GoFood@cluster0.8gazpxy.mongodb.net/GoFood?retryWrites=true&w=majority&appName=Cluster0";

// const mongoDB = async () => {
//     try {
//         await mongoose.connect(mongoURI);
//         console.log("Connected to MongoDB Atlas");

//         const foodItemsCollection = mongoose.connection.db.collection("food_items");
//         await foodItemsCollection.find({}).toArray(async(err, foodItems) => {
//             if (err) {
//                 console.error("Error fetching food items:", err);
//                 return;
//             }
//             console.log("Fetched data:", foodItems);
//             global.food_items = foodItems;

//             const foodCategoryCollection = mongoose.connection.db.collection("food_category");
//             await foodCategoryCollection.find({}).toArray((err, foodCategory) => {
//                 if (err) {
//                     console.error("Error fetching food category:", err);
//                     return;
//                 }
//                 console.log("FoodCategory data is", foodCategory);
//             });
//         });
//     } catch (error) {
//         console.error("Error connecting to MongoDB Atlas:", error);
//     }
// };

// module.exports = mongoDB;
