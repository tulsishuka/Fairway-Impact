import express from "express";
import {
  getAnalytics,
  getUsers,
  updateUserSubscription,
  addCharity,
  getCharities,
  updateCharity,
  deleteCharity,
  getResults,
  approveWinner,
  rejectWinner,
  deleteUser,
  getUsersWithScores,
} from "../controllers/adminController";

import { protectedMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";

const router = express.Router();

router.get("/analytics", protectedMiddleware, adminMiddleware, getAnalytics);
router.get("/users", protectedMiddleware, adminMiddleware, getUsers);
router.post("/user/update", protectedMiddleware, adminMiddleware, updateUserSubscription);
router.post("/charity", protectedMiddleware, adminMiddleware, addCharity);
router.get("/charity", protectedMiddleware, adminMiddleware, getCharities);
router.put("/charity/:id", protectedMiddleware, adminMiddleware, updateCharity);
router.delete("/charity/:id", protectedMiddleware, adminMiddleware, deleteCharity);
router.get("/results", protectedMiddleware, adminMiddleware, getResults);
router.post("/approve/:id", protectedMiddleware, adminMiddleware, approveWinner);
router.post("/reject/:id", protectedMiddleware, adminMiddleware, rejectWinner);
router.delete(
  "/user/:id",
  protectedMiddleware,
  adminMiddleware,
  deleteUser
);
router.get(
  "/users-scores",
  protectedMiddleware,
  adminMiddleware,
);
router.get(
  "/users-with-scores",
  protectedMiddleware,
  adminMiddleware,
  getUsersWithScores
);
export default router;