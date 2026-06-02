const authService = require("../services/authService");

exports.register = async (req, res) => {
  try {
    await authService.register(req.body);

    res.status(201).json({
      message: "User Registered",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await authService.login(req.body);

    res.json({ token });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
