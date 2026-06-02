const todoService = require("../services/todoService");

exports.getTodos = async (req, res) => {
  const todos = await todoService.getTodos(req.user.id);

  res.json(todos);
};

exports.createTodo = async (req, res) => {
  const todo = await todoService.createTodo(req.body.title, req.user.id);

  res.json(todo);
};

exports.deleteTodo = async (req, res) => {
  await todoService.deleteTodo(req.params.id);

  res.json({
    message: "Deleted",
  });
};
