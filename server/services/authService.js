const User =
  require("../models/User");

const bcrypt =
  require("bcryptjs");

const jwt =
  require("jsonwebtoken");

exports.register =
  async (body) => {
    const existingUser =
      await User.findOne({
        email: body.email,
      });

    if (existingUser) {
      throw new Error(
        "Email already exists"
      );
    }

    const hash =
      await bcrypt.hash(
        body.password,
        10
      );

    await User.create({
      name: body.name,
      email: body.email,
      password: hash,
    });
  };

exports.login =
  async (body) => {
    const user =
      await User.findOne({
        email: body.email,
      });

    if (!user) {
      throw new Error(
        "User not found"
      );
    }

    const match =
      await bcrypt.compare(
        body.password,
        user.password
      );

    if (!match) {
      throw new Error(
        "Wrong Password"
      );
    }

    const token =
      jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

    return token;
  };