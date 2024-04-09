import User from "../models/user.model.js";
import Doctors from "../models/doctor.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).json({
      success: true,
      message: "Users fetch successfully",
      data: users,
    });
  } catch (error) {
    console.log("error in getAllUsers controller");
    return res.status(500).json({
      success: false,
      message: "Error getting getAllUsers",
      error,
    });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctors.find({});

    res.status(200).json({
      success: true,
      message: "Doctors fetch successfully",
      data: doctors,
    });
  } catch (error) {
    console.log("error in getAllDoctors controller");
    return res.status(500).json({
      success: false,
      message: "Error getting getAllDoctors",
      error,
    });
  }
};

export const changeDoctorStatus = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await Doctors.findByIdAndUpdate(doctorId, { status });
    const user = await User.findOne({ _id: doctor.userId });
    const unSeenNotification = user.unSeenNotification;
    unSeenNotification.push({
      type: "new-doctor-request-changed",
      message: `Your doctor account has been ${status} `,
      onClickPath: "/notifications",
    });
    user.isDoctor = status === "approved" ? true : false;
    await user.save();
    res.status(200).json({
      message: "Doctor status update successfully",
      success: true,
      data: doctor,
    });
  } catch (error) {
    console.log("error in changeDoctorStatus controller");
    return res.status(500).json({
      success: false,
      message: "Error getting changeDoctorStatus",
      error,
    });
  }
};
