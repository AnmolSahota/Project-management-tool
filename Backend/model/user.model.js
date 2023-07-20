const mongoose = require("mongoose");
const moment = require("moment");

let userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
  bio: {
    type: String,
  },
  startDate: {
    type: String,
    default: moment().format("DD-MM-YY"),
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  image: {
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfgJ0SYGF5qAueA_nbIYvUB58DCZ2KG-DkYA&usqp=CAU",
    type: String,
  },
});

let User = mongoose.model("user", userSchema);
module.exports = { User };
