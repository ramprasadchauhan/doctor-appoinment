import User from "../models/user.model.js";
export const getUserInfoById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    const { password, ...rest } = user._doc;
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not exist",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User successfully fetch",
        data: rest,
      });
    }
  } catch (error) {
    console.log("error in getUserInfoById controller");
    return res.status(500).json({
      success: false,
      message: "Error getting userInfo",
      error,
    });
  }
};
