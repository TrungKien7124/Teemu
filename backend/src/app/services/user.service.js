const User = require("../models/user.model");

class UserService {
  async getUserById(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error("Error in User Service: " + error.message + "\n");
    }
  }
}

module.exports = new UserService();
