const Todo =
  require("../models/Todo");

exports.getTodos =
  async (userId) => {
    return await Todo.find({
      userId,
    });
  };

exports.createTodo =
  async (
    title,
    userId
  ) => {
    return await Todo.create({
      title,
      userId,
    });
  };

exports.deleteTodo =
  async (id) => {
    return await Todo.findByIdAndDelete(
      id
    );
  };