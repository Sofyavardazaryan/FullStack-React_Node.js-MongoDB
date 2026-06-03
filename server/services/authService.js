const User = require("../models/User");
const bcrypt = require("bcrypt");

class AuthService {
  async register(name, email, password) {
    const hash = await bcrypt.hash(password, 10);
    return User.create({ name, email, password: hash });
  }

  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid");

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new Error("Invalid");

    return { _id: user._id, name: user.name };
  }
}

module.exports = new AuthService();
