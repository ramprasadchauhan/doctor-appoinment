import Doctors from "../models/doctor.model.js";
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

export const applyDoctorAccount = async (req, res) => {
  try {
    const newDoctor = new Doctors({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await User.findOne({ isAdmin: true });
    const unSeenNotification = adminUser.unSeenNotification;
    unSeenNotification.push({
      type: "new-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
      },
      onClickPath: "/admin/doctors",
    });
    await User.findByIdAndUpdate(adminUser._id, { unSeenNotification });
    res.status(200).send({
      success: true,
      message: "Doctor account applied successfully",
      newDoctor,
    });
  } catch (error) {
    console.log("error in applyDoctorAccount controller");
    return res.status(500).json({
      success: false,
      message: "Error getting applying doctor",
      error,
    });
  }
};
