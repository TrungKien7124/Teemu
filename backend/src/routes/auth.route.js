// /api/auth

const { Router } = require("express");

const router = Router();

const authController = require("../app/controllers/auth.controller");
const verifyToken = require("../app/middleware/verifyToken");

router.post("/login", authController.login);

router.post("/register", authController.register);

const UserService = require("../app/services/user.service");
router.get("/me", verifyToken, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await UserService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
