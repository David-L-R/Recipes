import express from "express";
import {
  register,
  login,
  getUser,
  forgotPassword,
} from "../controller/authController.js";
import { validateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/forgot-password", forgotPassword);
router.post("/register", register);
router.post("/login", login);
router.get("/me", validateToken, getUser); // (req = { ..., user: user }, res)=>

export default router;
