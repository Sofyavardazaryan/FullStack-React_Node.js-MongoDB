const authService = require("../services/AuthService");

class AuthController {
  async register(req, res) {
    try {
      await authService.register(
        req.body.name,
        req.body.email,
        req.body.password,
      );

      res.status(201).json({ message: "User registered" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async login(req, res) {
    try {
      const user = await authService.login(req.body.email, req.body.password);

      req.session.user = user;
      res.json({
        message: "Login successful",
        user,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  logout(req, res) {
    req.session.destroy(() => {
      res.json({ message: "Logged out" });
    });
  }
}

module.exports = new AuthController();
