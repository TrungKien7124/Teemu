const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

class AuthService {
  async register(email, password) {
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("User already exists");
      }
      const newUser = new User({
        email,
        password: await bcrypt.hash(password, 10),
      });

      await newUser.save();

      const token = jwt.sign(
        { id: newUser._id, email: newUser.email },
        process.env.SECRET,
        { expiresIn: "24h" }
      );

      return {
        token: token,
        id: newUser._id,
        email: newUser.email,
      };
    } catch (error) {
      throw new Error("Error in Register Service: " + error.message + "\n");
    }
  }

  async login(email, password) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Invalid email");
      }
      const isValidPassword = await bcrypt.compare(
        password,
        user.password.toString()
      );
      if (!isValidPassword) {
        throw new Error("Password is incorrect");
      }
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.SECRET,
        { expiresIn: "24h" }
      );
      return {
        token: token,
        id: user._id,
        email: user.email,
      };
    } catch (error) {
      throw new Error("Error in Login Service: " + error.message + "\n");
    }
  }
}

module.exports = new AuthService();
