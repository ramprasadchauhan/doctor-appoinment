import Doctors from "../models/doctor.model.js";

export const getDoctorInfoByUserId = async (req, res) => {
  try {
    const doctor = await Doctors.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "Doctor info fetched successfully",
      data: doctor,
    });
  } catch (error) {
    console.log("error in getDoctorInfoByUserId controller");
    return res.status(500).json({
      success: false,
      message: "Error getting doctorInfo",
      error,
    });
  }
};

export const updateDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctors.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(200).send({
      success: true,
      message: "Doctor info updated successfully",
      data: doctor,
    });
  } catch (error) {
    console.log("error in updateDoctorProfile controller");
    return res.status(500).json({
      success: false,
      message: "Error getting updateDoctor",
      error,
    });
  }
};
