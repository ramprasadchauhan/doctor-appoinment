import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
export const register = async (req, res, next) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exist!", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User created successfully!",
      newUser,
    });
  } catch (error) {
    console.log("Error in register controller");
    res.status(500).json({
      message: "Error creating User",
      success: false,
      error,
    });
  }
};
