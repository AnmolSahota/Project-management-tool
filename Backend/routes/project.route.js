const express = require("express");
const Project = require("../model/project.model");
const projectRoute = express.Router();
projectRoute.post("/", async (req, res) => {
  try {
    const { managerId, projectName, status, endDate } = req.body;

    // Create a new project instance
    const newProject = new Project({
      managerId,
      projectName,
      status,
    });

    // Save the new project to the database
    await newProject.save();

    res.status(201).json({ message: "Project created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Retrieve a list of projects
projectRoute.get("/", async (req, res) => {
  try {
    // Fetch all projects from the database
    const projects = await Project.find({ managerId: req.body.managerId });

    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

projectRoute.delete("/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    // Find the project by ID and delete it
    await Project.findByIdAndDelete({ _id });

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

projectRoute.patch("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateData = req.body;

    // Find the project by ID and update its details
    const updatedProject = await Project.findByIdAndUpdate(_id, updateData, {
      new: true,
    });

    res.json({ message: "details update" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = projectRoute;
