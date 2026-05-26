
// import express from "express";
// import { protectedMiddleware } from "../middlewares/authMiddleware";
// import { selectCharity, updateDonationPercentage } from "../controllers/charityController";

// const router = express.Router();
// router.post("/select", protectedMiddleware, selectCharity);

// router.put(
//   "/update-percentage",
//   protectedMiddleware,
//   updateDonationPercentage
// );

// export default router;
import express from "express";
import { protectedMiddleware } from "../middlewares/authMiddleware";
import {
  selectCharity,
  updateDonationPercentage,
  getCharities, // 👈 ADD THIS
} from "../controllers/charityController";

const router = express.Router();

// ✅ ADD THIS ROUTE
router.get("/", getCharities);

// existing routes
router.post("/select", protectedMiddleware, selectCharity);

router.put("/update-percentage", protectedMiddleware, updateDonationPercentage);

export default router;