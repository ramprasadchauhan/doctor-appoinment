import express from "express";
import {
  changeDoctorStatus,
  getAllDoctors,
  getAllUsers,
} from "../controllers/admin.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/get-all-users", authMiddleware, getAllUsers);
router.get("/get-all-doctors", authMiddleware, getAllDoctors);
router.post("/change-doctor-status", authMiddleware, changeDoctorStatus);

export default router;
