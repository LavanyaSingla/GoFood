const express = require("express");
const router = express.Router();

router.post("/displayData", (req, res) => {
    try {
        res.send([global.food_items, global.food_category]);
    }
    catch (error) {
        console.log("Error in display data is", error.message);
    }
});

module.exports = router;