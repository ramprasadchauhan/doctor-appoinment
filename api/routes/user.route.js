import express from "express";
import {
  applyDoctorAccount,
  deleteAllNotification,
  getUserInfoById,
  markAllNotificationAsSeen,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/get-user-info-by-id", authMiddleware, getUserInfoById);
router.post("/apply-doctor-account", authMiddleware, applyDoctorAccount);
router.post(
  "/mark-all-notifications-as-seen",
  authMiddleware,
  markAllNotificationAsSeen
);
router.post("/delete-all-notification", authMiddleware, deleteAllNotification);

export default router;
