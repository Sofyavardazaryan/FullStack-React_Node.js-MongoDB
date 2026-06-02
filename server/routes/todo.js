const router = require("express").Router();
const controller = require("../controllers/TodoController");

function auth(req, res, next) {
  if (!req.session.user) return res.redirect("/auth/login");
  next();
}

router.get("/", auth, controller.page);
router.post("/create", auth, controller.create);
router.get("/delete/:id", auth, controller.delete);

module.exports = router;