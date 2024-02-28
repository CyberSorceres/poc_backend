const mongoose = require("mongoose");

const user_projectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "project",
  },
});

const UserProject = mongoose.model("user_project", user_projectSchema);

module.exports = UserProject;
