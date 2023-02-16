import express from "express";
const router = express.Router();
import { registerUser, loginUser, getUser } from "../controllers/users.js";
import { protect } from "../middleware/auth.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/me", protect, getUser);

export default router;
