import express from "express";
const router = express.Router();
import { registerUser, loginUser, getUser } from "../controllers/users.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/me", getUser);

export default router;
