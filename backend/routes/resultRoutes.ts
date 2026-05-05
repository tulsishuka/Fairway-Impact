import express from "express";
import {
  getAllResults,
  verifyWinner,
  rejectWinner,
} from "../controllers/resultController";

import { protectedMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";

const router = express.Router();

router.get("/", protectedMiddleware, adminMiddleware, getAllResults);
router.put("/verify/:resultId", protectedMiddleware, adminMiddleware, verifyWinner);
router.put("/reject/:resultId", protectedMiddleware, adminMiddleware, rejectWinner);

export default router;