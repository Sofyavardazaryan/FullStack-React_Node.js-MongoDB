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

      res.cookie("userId", user._id, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      });

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
      res.clearCookie("userId");
      res.json({ message: "Logged out" });
    });
  }
}

module.exports = new AuthController();
