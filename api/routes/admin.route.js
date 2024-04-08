import express from "express";
import { getAllDoctors, getAllUsers } from "../controllers/admin.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/get-all-users", authMiddleware, getAllUsers);
router.get("/get-all-doctors", authMiddleware, getAllDoctors);

export default router;
