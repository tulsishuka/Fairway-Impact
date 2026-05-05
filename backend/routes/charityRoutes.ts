import express from "express";
import {  selectCharity } from "../controllers/charityController.js";
import { protectedMiddleware } from "../middlewares/authMiddleware";
import { getCharities } from "../controllers/adminController.js";

const router = express.Router();

router.get("/", getCharities);

router.post(
  "/select",
  protectedMiddleware,
  selectCharity
);



export default router;