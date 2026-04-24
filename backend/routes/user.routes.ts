// import { Router } from "express";
// // import { authMiddleware } from "../middlewares/authMiddleware";
// import { checkSubscription } from "../middlewares/checkSubscription";
// import { getDashboard } from "../controllers/userController";

// const router = Router();

// // 🔐 Protected Dashboard Route
// router.get(
//   "/dashboard",
//   // authMiddleware,
//   checkSubscription,
//   getDashboard
// );

// export default router;

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