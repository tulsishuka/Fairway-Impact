
import { Router } from "express";
import { protectedMiddleware } from "../middlewares/authMiddleware";
import { checkSubscription } from "../middlewares/checkSubscription";
import { getDashboard } from "../controllers/userController";

const router = Router();

router.get(
  "/dashboard",
  protectedMiddleware, // 🔥 MUST
  checkSubscription,
  getDashboard
);

export default router;