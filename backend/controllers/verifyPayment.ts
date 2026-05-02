// import crypto from "crypto";
// import Payment from "../models/Payment";
// import { User } from "../models/userModel";
// import PrizePool from "../models/PrizePool";
// import CharityDonation from "../models/CharityDonation";

// export const verifyPayment = async (req: any, res: any) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//     } = req.body;

//     // 🔐 VERIFY SIGNATURE
//     const body = `${razorpay_order_id}|${razorpay_payment_id}`;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
//       .update(body)
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid Signature",
//       });
//     }

//     // 💳 UPDATE PAYMENT
//     const payment = await Payment.findOneAndUpdate(
//       { orderId: razorpay_order_id },
//       {
//         paymentId: razorpay_payment_id,
//         status: "paid",
//       },
//       { new: true }
//     );

//     if (!payment) {
//       return res.status(404).json({
//         success: false,
//         message: "Payment not found",
//       });
//     }

//     // 👤 GET USER
//     const user = await User.findById(payment.userId);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // 💰 SPLIT MONEY
//     const charityPercent = user.donationPercentage || 0;

//     const charityAmount = payment.amount * (charityPercent / 100);
//     const prizeAmount = payment.amount * 0.8;
//     const systemAmount = payment.amount - charityAmount - prizeAmount;

//     // 🏆 UPDATE PRIZE POOL
//     const month = new Date().toLocaleString("default", {
//       month: "long",
//       year: "numeric",
//     });

//     let pool = await PrizePool.findOne({ month });

//     if (!pool) {
//       pool = await PrizePool.create({
//         month,
//         totalAmount: 0,
//       });
//     }

//     pool.totalAmount += prizeAmount;
//     await pool.save();

//     // ❤️ SAVE CHARITY DONATION
//     if (charityAmount > 0 && user.selectedCharity) {
//       await CharityDonation.create({
//         userId: user._id,
//         charityId: user.selectedCharity,
//         paymentId: payment.paymentId,
//         amount: charityAmount,
//       });
//     }

//     // 💳 ACTIVATE SUBSCRIPTION
//     await User.findByIdAndUpdate(user._id, {
//       subscriptionStatus: "active",
//       subscriptionPlan: payment.plan,
//       subscriptionStart: new Date(),
//       subscriptionEnd: new Date(
//         Date.now() + 30 * 24 * 60 * 60 * 1000
//       ),
//     });

//     return res.json({
//       success: true,
//       message: "Payment Verified & Money Distributed Successfully",
//       breakdown: {
//         charityAmount,
//         prizeAmount,
//         systemAmount,
//       },
//     });

//   } catch (err: any) {
//     return res.status(500).json({
//       success: false,
//       error: err.message,
//     });
//   }
// };









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

    // 🔐 VERIFY SIGNATURE
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

    // 💳 UPDATE PAYMENT (idempotent safe)
    const payment = await Payment.findOneAndUpdate(
      { orderId: razorpay_order_id, status: "created" },
      {
        paymentId: razorpay_payment_id,
        status: "paid",
      },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found or already processed",
      });
    }

    // 👤 GET USER
    const user = await User.findById(payment.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 💰 SPLIT LOGIC
    const charityPercent = user.donationPercentage || 0;

    const charityAmount = Number(
      (payment.amount * charityPercent / 100).toFixed(2)
    );

    const prizeAmount = Number(
      (payment.amount * 0.8).toFixed(2)
    );

    const systemAmount = Number(
      (payment.amount - charityAmount - prizeAmount).toFixed(2)
    );

    // 🏆 PRIZE POOL (SAFE UPDATE)
    const month = new Date().toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    await PrizePool.findOneAndUpdate(
      { month },
      {
        $inc: { totalAmount: prizeAmount },
      },
      { upsert: true, new: true }
    );

    // ❤️ CHARITY DONATION (NO DUPLICATES)
    if (charityAmount > 0 && user.selectedCharity) {
      const exists = await CharityDonation.findOne({
        paymentId: payment.paymentId,
      });

      if (!exists) {
        await CharityDonation.create({
          userId: user._id,
          charityId: user.selectedCharity,
          paymentId: payment.paymentId,
          amount: charityAmount,
        });
      }
    }

    // 💳 ACTIVATE SUBSCRIPTION
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
      message: "Payment Verified & Distributed Successfully",
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