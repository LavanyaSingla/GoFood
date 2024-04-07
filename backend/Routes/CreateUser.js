const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

router.post("/createuser", [
    body('email', 'Invalid email').isEmail(),
    body('name', 'Name should be a alphabetic string').isAlpha(),
    body('password', 'Password min length should be 4').isLength({ min: 4 })
],
    async (req, res) => {
        const errors = validationResult(req);
        if (errors) {
            return res.status(400).json({ success: false, error: errors.array(), errrorr: errors });
        }
        try {
            const newUser = await User.create({
                name: req.body.name,
                email: req.body.email,
                location: req.body.location,
                password: req.body.password
            });
            res.json({ success: true, user: newUser });
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({ success: false, error: "Failed to create user" });
        }
    });

router.post("/loginuser", [
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password min length should be 4').isLength({ min: 4 })
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, error: errors.array() });
        }
        const email = req.body.email;
        try {
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ success: false, error: "This user does not exist" });
            if (user.password !== req.body.password) return res.status(400).json({ success: false, error: "Invalid password" });

            res.json({ success: true });
        } catch (error) {
            console.error("Error finding user:", error);
            res.status(500).json({ success: false, error: "Failed to find user" });
        }
    });

module.exports = router;
