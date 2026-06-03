const router = require("express").Router();
const controller = require("../controllers/TodoController");

function auth(req, res, next) {
  if (!req.session.user) return res.status(401).json({ message: "Unauthorized" });
  next();
}

router.get("/", auth, controller.page);
router.post("/", auth, controller.create);
router.delete("/:id", auth, controller.delete);

module.exports = router;