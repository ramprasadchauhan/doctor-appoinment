import express from "express";
import { getUserInfoById } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/get-user-info-by-id", authMiddleware, getUserInfoById);

export default router;
