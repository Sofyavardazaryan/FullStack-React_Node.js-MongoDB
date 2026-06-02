const Todo = require("../models/Todo");

class TodoService {
  getAll(userId) {
    return Todo.find({ userId });
  }

  create(title, userId) {
    return Todo.create({ title, userId });
  }

  delete(id, userId) {
    return Todo.findOneAndDelete({ _id: id, userId });
  }
}

module.exports = new TodoService();