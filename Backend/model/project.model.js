const mongoose = require("mongoose");
const moment = require("moment");
const projectSchema = new mongoose.Schema({
  managerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Planned", "In Progress", "Completed"],
    default: "Planned",
  },
  startDate: {
    type: String,
    default: moment().format("DD-MM-YY"),
  },
  endDate: {
    type: String,
    default: moment().format("DD-MM-YY"),
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
