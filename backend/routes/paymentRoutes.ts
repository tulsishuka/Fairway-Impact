// import express from "express";
// import { createOrder } from "../controllers/paymentController";
// import { protectedMiddleware } from "../middlewares/authMiddleware";

// const router = express.Router();

// router.post("/create-order", protectedMiddleware, createOrder);

// export default router;


import express from "express";
import { createOrder, verifyPayment } from "../controllers/paymentController";
import { protectedMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/create-order", protectedMiddleware, createOrder);
router.post("/verify", protectedMiddleware, verifyPayment);

export default router;