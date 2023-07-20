const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../model/user.model");
const userRoute = express.Router();
const jwt = require("jsonwebtoken");
userRoute.post("/register", async (req, res) => {
  const { name, bio, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    bcrypt.hash(password, 5, async (err, hash) => {
      const newUser = new User({
        name,
        bio,
        email,
        password: hash,
      });
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

userRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    var token = jwt.sign({ user, id: user._id }, "native");
    res.send({ message: "Login successful", Token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = { userRoute };
