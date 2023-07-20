const express = require("express");
const profileRoute = express.Router();
const { User } = require("../model/user.model");
// Retrieve user profile
profileRoute.get("/", async (req, res) => {
  try {
    // Find the user profile by ID
    const userProfile = await User.find();
    res.json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update user profile
profileRoute.patch("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateData = req.body;

    // Find the user profile by ID and update its details
    const updatedProfile = await User.findByIdAndUpdate(_id, updateData, {
      new: true,
    });

    if (!updatedProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    res.json({ message: "Profile updated successfully", updatedProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

profileRoute.delete("/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    // Find the user profile by ID and delete it
    const deletedProfile = await User.findByIdAndDelete(_id);

    if (!deletedProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    res.json({ message: "User profile deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = profileRoute;
