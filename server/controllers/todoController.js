const todoService = require("../services/TodoService");

class TodoController {
  async page(req, res) {
    if (!req.session.user) return res.redirect("/auth/login");

    const todos = await todoService.getAll(req.session.user._id);

    res.render("index", {
      user: req.session.user,
      todos
    });
  }

  async create(req, res) {
    await todoService.create(req.body.title, req.session.user._id);
    res.redirect("/todos");
  }

  async delete(req, res) {
    await todoService.delete(req.params.id, req.session.user._id);
    res.redirect("/todos");
  }
}

module.exports = new TodoController();