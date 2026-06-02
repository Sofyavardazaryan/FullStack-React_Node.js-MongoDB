const router = require("express").Router();
const todoController = require("../controllers/todoController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, todoController.getTodos);
router.post("/", authMiddleware, todoController.createTodo);
router.delete("/:id", authMiddleware, todoController.deleteTodo);

module.exports = router;
