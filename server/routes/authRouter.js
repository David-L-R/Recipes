import express from "express";
import { register, login, getUserInfo } from "../controller/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", getUserInfo); //MAYBE GET

export default router;
