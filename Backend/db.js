const mongoose = require("mongoose");

const Connection = mongoose.connect(
  "mongodb+srv://anmol:sahota@cluster0.fdwxgxj.mongodb.net/projectManagement?retryWrites=true&w=majority"
);

module.exports = { Connection };
