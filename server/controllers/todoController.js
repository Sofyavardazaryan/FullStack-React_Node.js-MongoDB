const todoService = require("../services/TodoService");

class TodoController {
  async page(req, res) {
    if (!req.session.user)
      return res.status(401).json({ message: "Unauthorized" });

    const todos = await todoService.getAll(req.session.user._id);

    res.json({
      user: req.session.user,
      todos,
    });
  }

  async create(req, res) {
    await todoService.create(req.body.title, req.session.user._id);
    res.json({ success: true });
  }

  async delete(req, res) {
    await todoService.delete(req.params.id, req.session.user._id);
    res.json({ success: true });
  }
}

module.exports = new TodoController();
