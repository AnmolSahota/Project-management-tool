const express = require("express");
const Task = require("../model/task.model");
const tasktRoute = express.Router();

// Create a new task within a project
tasktRoute.post("/:id", async (req, res) => {
  try {
    const projectId = req.params.id;
    const { taskName, status } = req.body;

    // Create a new task instance
    const newTask = new Task({
      projectId,
      taskName,
      status,
    });

    // Save the new task to the database
    await newTask.save();

    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a task within a project
tasktRoute.delete("/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;

    // Find the task by ID and delete it
    await Task.findOneAndDelete({ _id: taskId });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update task details within a project
tasktRoute.patch("/:taskId", async (req, res) => {
  const taskId = req.params.taskId;
  const updateData = req.body;
  try {
    // Find the task by ID and project ID, and update its details
    const updatedTask = await Task.findByIdAndUpdate(
      { _id: taskId },
      updateData
    );
    res.json({ message: "Task update successfully" });
  } catch (error) {
    console.error(error);
    // res.status(500).json({ message: "Internal server error" });
  }
});

// Retrieve a list of projects
tasktRoute.get("/:id", async (req, res) => {
  const projectId = req.params.id;
  try {
    // Fetch all projects from the database
    const projectsTask = await Task.find({ projectId: projectId });
    res.json(projectsTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = tasktRoute;
