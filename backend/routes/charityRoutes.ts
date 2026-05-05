import express from "express";
import {  selectCharity } from "../controllers/charityController";
import { protectedMiddleware } from "../middlewares/authMiddleware";
import { getCharities } from "../controllers/adminController";

const router = express.Router();

router.get("/", getCharities);

router.post(
  "/select",
  protectedMiddleware,
  selectCharity
);



export default router;