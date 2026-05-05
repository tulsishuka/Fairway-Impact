import express from "express";
import { distributeRewards } from "../controllers/prizeController.js";
import { protectedMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";

const router = express.Router();

router.post(
  "/distribute",
  protectedMiddleware,
  adminMiddleware,
  distributeRewards
);

export default router;