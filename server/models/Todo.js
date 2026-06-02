const { Schema, model } = require("mongoose");

const todoSchema = new Schema({
  title: String,
  userId: String
});

module.exports = model("Todo", todoSchema);