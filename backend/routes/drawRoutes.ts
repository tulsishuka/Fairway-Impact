import express from "express";
import { runDraw, createDraw } from "../controllers/drawController";
import { protectedMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";

const router = express.Router();

router.post("/create", protectedMiddleware, adminMiddleware, createDraw);
router.post("/run", protectedMiddleware, adminMiddleware, runDraw);

export default router;