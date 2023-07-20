const mongoose = require("mongoose");

// Define the task schema
const taskSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  taskName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Completed"],
    default: "To Do",
  },
});

// Define the task model
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
