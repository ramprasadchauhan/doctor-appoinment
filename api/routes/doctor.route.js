import express from "express";
import {
  getDoctorInfoByUserId,
  updateDoctorProfile,
} from "../controllers/doctor.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/get-doctor-info-by-user-id",
  authMiddleware,
  getDoctorInfoByUserId
);
router.post("/update-doctor-profile", authMiddleware, updateDoctorProfile);

export default router;
