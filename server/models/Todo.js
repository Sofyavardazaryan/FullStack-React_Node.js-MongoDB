const { Schema, model } = require("mongoose");
const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("Todo", todoSchema);
