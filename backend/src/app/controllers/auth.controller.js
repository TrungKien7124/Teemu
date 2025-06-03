const AuthService = require("../services/auth.service");

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;

    AuthService.login(email, password)
      .then((data) => res.status(200).json(data))
      .catch((error) => {
        res.status(401).json({
          message: "Login failed",
          error: error.message,
        });
      });
  }

  async register(req, res) {
    const { email, password } = req.body;

    AuthService.register(email, password)
      .then((data) => res.status(201).json(data))
      .catch((error) => {
        res.status(400).json({
          message: "User registration failed",
          error: error.message,
        });
      });
  }
}

module.exports = new AuthController();
