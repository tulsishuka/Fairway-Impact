import { Request, Response } from "express";
import crypto from "crypto";
import razorpay from "../utils/razorpay";
import Payment from "../models/Payment";
import { User } from "../models/userModel";
import PrizePool from "../models/PrizePool";

// ✅ CREATE ORDER
// export const createOrder = async (req: any, res: Response) => {
//   try {
//     const { amount, plan } = req.body;

//     const userId = req.user._id; // 🔥 FROM TOKEN

//     const order = await razorpay.orders.create({
//       amount: amount * 100,
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     });

//     await Payment.create({
//       userId,
//       orderId: order.id,
//       amount,
//       plan,
//       status: "created",
//     });

//     res.json({
//       success: true,
//       order,
//       key: process.env.RAZORPAY_KEY_ID,
//     });

//   } catch (error: any) {
//     console.log("❌ CREATE ORDER ERROR:", error.message);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

export const createOrder = async (req: any, res: Response) => {
  try {
    const { amount, plan } = req.body;
    const userId = req.user._id;

    // 🔥 CHECK ACTIVE SUBSCRIPTION
    const user = await User.findById(userId);

    if (
      user?.subscriptionStatus === "active" &&
      user.subscriptionEnd &&
      new Date(user.subscriptionEnd) > new Date()
    ) {
      return res.status(400).json({
        success: false,
        message: "You already have an active subscription",
      });
    }

    // 🔥 CREATE ORDER
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    await Payment.create({
      userId,
      orderId: order.id,
      amount,
      plan,
      status: "created",
    });

    res.json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
    });

  } catch (error: any) {
    console.log("❌ CREATE ORDER ERROR:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ VERIFY PAYMENT + ACTIVATE
export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid Signature",
      });
    }

    const payment = await Payment.findOneAndUpdate(
      { orderId: razorpay_order_id },
      {
        paymentId: razorpay_payment_id,
        status: "paid",
      },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // ============================
    // 🏆 ADD THIS BLOCK HERE
    // ============================

    const month = new Date().toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    let pool = await PrizePool.findOne({ month });

    if (!pool) {
      pool = await PrizePool.create({
        month,
        totalAmount: 0,
      });
    }

    // Example: 80% goes to prize pool
    const prizeContribution = payment.amount * 0.8;
  
    pool.totalAmount += prizeContribution;

    await pool.save();

    console.log("💰 Prize Pool Updated:", pool.totalAmount);

    // ============================
    // 🔥 ACTIVATE SUBSCRIPTION
    // ============================

    await User.findByIdAndUpdate(payment.userId, {
      subscriptionStatus: "active",
      subscriptionPlan: payment.plan,
      subscriptionStart: new Date(),
      subscriptionEnd: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ),
    });

    return res.json({
      success: true,
      message: "Payment Verified, Subscription Activated & Prize Pool Updated",
    });

  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};