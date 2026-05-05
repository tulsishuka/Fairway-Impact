import express from "express";
import { protectedMiddleware } from "../middlewares/authMiddleware";
import { addScore, getScores } from "../controllers/scoreController.js";

const router = express.Router();

router.post("/add", protectedMiddleware, addScore);
router.get("/", protectedMiddleware, getScores);

export default router;


