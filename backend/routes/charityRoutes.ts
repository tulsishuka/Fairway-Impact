import express from "express";
import {  getCharities, selectCharity } from "../controllers/charityController";
import { checkSubscription } from "../middlewares/checkSubscription";
import { protectedMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

// Public route
router.get("/", getCharities);

// Protected route (only subscribed users)
router.post(
  "/select",
  protectedMiddleware,
  checkSubscription,
  selectCharity
);

export default router;