
import crypto from "crypto";
import Payment from "../models/Payment";
import { User } from "../models/userModel";
import PrizePool from "../models/PrizePool";
import CharityDonation from "../models/CharityDonation";

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
      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }

    const payment = await Payment.findOne({ orderId: razorpay_order_id });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    if (payment.status === "paid") {
      return res.json({
        success: true,
        message: "Already processed",
      });
    }

    payment.status = "paid";
    payment.paymentId = razorpay_payment_id;
    await payment.save();

    const user = await User.findById(payment.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
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
      { upsert: true, new: true }
    );

    if (user.selectedCharity && charityAmount > 0) {
      await CharityDonation.create({
        userId: user._id,
        charityId: user.selectedCharity,
        paymentId: razorpay_payment_id, 
        amount: charityAmount,
      });
    }

    user.subscriptionStatus = "active";
    user.subscriptionPlan = payment.plan;
    user.subscriptionStart = new Date();
    user.subscriptionEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await user.save();

    return res.json({
      success: true,
      message: "Payment verified successfully",
      breakdown: {
        charityAmount,
        prizeAmount,
        systemAmount,
      },
    });

  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};