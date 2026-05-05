
import { Router } from "express";
import { forgot, login, register, verify } from "../controllers/authController";
const router = Router();

router.post("/register", register);
router.post("/verify-otp", verify);
router.post("/login", login);
router.post("/forgot-password", forgot);

export default router;

