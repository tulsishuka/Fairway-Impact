import { Request, Response } from "express";
import crypto from "crypto";
import razorpay from "../utils/razorpay";
import Payment from "../models/Payment.js";
import { User } from "../models/userModel.js";
import PrizePool from "../models/PrizePool.js";
import CharityDonation from "../models/CharityDonation.js";


export const createOrder = async (req: any, res: any) => {
  try {
    const { amount, plan } = req.body;
    const userId = req.user._id;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
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

  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};






export const verifyPayment = async (req: any, res: any) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    const payment = await Payment.findOne({
      orderId: razorpay_order_id,
      status: "created",
    });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    payment.status = "paid";
    payment.paymentId = razorpay_payment_id;
    await payment.save();

    const user = await User.findById(payment.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const charityPercent = user.donationPercentage || 0;

    const charityAmount = (payment.amount * charityPercent) / 100;
    const prizeAmount = payment.amount * 0.8;
    const systemAmount = payment.amount - charityAmount - prizeAmount;

    const month = new Date().toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    await PrizePool.findOneAndUpdate(
      { month },
      { $inc: { totalAmount: prizeAmount } },
      { upsert: true }
    );

    if (charityAmount > 0 && user.selectedCharity) {
      await CharityDonation.create({
        userId: user._id,
        charityId: user.selectedCharity,
        paymentId: razorpay_payment_id,
        amount: charityAmount,
      });
    }

    await User.findByIdAndUpdate(user._id, {
      subscriptionStatus: "active",
      subscriptionPlan: payment.plan,
      subscriptionStart: new Date(),
      subscriptionEnd: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ),
    });

    return res.json({
      success: true,
      message: "Payment successful",
      breakdown: {
        charityAmount,
        prizeAmount,
        systemAmount,
      },
    });

  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};














