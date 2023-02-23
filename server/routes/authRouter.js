import express from "express";
import { register, login, getUserInfo } from "../controller/authController.js";
import { validateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", validateToken, getUserInfo); // (req = { ..., user: user }, res)=>

export default router;
