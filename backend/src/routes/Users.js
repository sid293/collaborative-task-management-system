// import express from 'express';
const express = require('express');
const User = require("../models/models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


let router = express.Router();

router.post("/register", async (req,res)=>{
    console.log("/register hit");
    // Check if details are correct (username, email and password)
    const { id, username, email, password } = req.body;
    if (!id || !username || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }
    if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters" });
    }
    // Check if username or email already present in db
    try {
        const existingUser = await User.findOne({ 
            $or: [
                { username: username },
                { email: email }
            ]
        });

        if (existingUser) {
            return res.status(400).json({ error: "Username or email already exists" });
        }

        // Use bcrypt to hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Add entry to db and send response back (jwt token generated with username)
        const newUser = new User({
            id,
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: "Registration successful" });

    } catch (error) {
        console.log("error: ",error);
        res.status(500).json({ error: "Server error" });
    }

});


router.post("/login", async (req,res)=>{
    console.log("/login hit");
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid username or password" });
        }
        const token = jwt.sign(
            { username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        res.status(200).json({ token });
    } catch (error) {
        console.log("error: ",error);
        res.status(500).json({ error: "Server error" });
    }
    // res.send("ok");
});


// export default router;
module.exports = router;

