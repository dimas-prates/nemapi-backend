const mongoose = require("../../database/index");
const bcrypt = require("bcryptjs");
const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    require: true,
  },
  assingedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  completed: {
    type: Boolean,
    require: true,
    default: false,
  },
});
const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
