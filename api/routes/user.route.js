import express from "express";
import {
  applyDoctorAccount,
  getUserInfoById,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/get-user-info-by-id", authMiddleware, getUserInfoById);
router.post("/apply-doctor-account", authMiddleware, applyDoctorAccount);

export default router;
