const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password, firstName, lastName, birthDate } = req.body;

    if (!email || !password || !firstName || !lastName || !birthDate) {
      return res.status(400).json({ error: "All fields are required" });
    }


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      birthDate,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully", userId: newUser._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

 
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

 
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

  
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;