


import { Request, Response } from "express";
import crypto from "crypto";
import Payment from "../models/Payment";
import { User } from "../models/userModel";

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

    console.log("👉 PAYMENT:", payment);

    if (payment && payment.userId) {
      await User.findByIdAndUpdate(payment.userId, {
        subscriptionStatus: "active",
        subscriptionPlan: payment.plan,
        subscriptionStart: new Date(),
        subscriptionEnd: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000
        ),
      });

      console.log("✅ USER UPDATED");
    }

    return res.json({
      success: true,
      message: "Payment Verified & Subscription Activated",
    });

  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};