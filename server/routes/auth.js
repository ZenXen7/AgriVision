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

module.exports = router;
