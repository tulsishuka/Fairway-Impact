import { Response, Request } from "express";
import { User } from "../models/userModel";
import Score from "../models/Score";
import Payment from "../models/Payment";
import Result from "../models/Result";
import Draw from "../models/Draw";

interface AuthRequest extends Request {
  user?: any;
}

export const getDashboard = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;

    // 🔥 ALWAYS GET FRESH USER
    const user = await User.findById(userId).lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const [scores, payments, results, latestDraw] = await Promise.all([
      Score.find({ userId }).sort({ createdAt: -1 }).limit(5),
      Payment.find({ userId }).sort({ createdAt: -1 }),
      Result.find({ userId }).sort({ createdAt: -1 }),
      Draw.findOne({ isPublished: true }).sort({ createdAt: -1 }),
    ]);

    const totalWinnings = results.reduce(
      (sum, r) => sum + (r.winnings || 0),
      0
    );

    return res.json({
      success: true,
      data: {
        // 🔥 SUBSCRIPTION (SOURCE OF TRUTH = USER TABLE)
        subscriptionStatus: user.subscriptionStatus || "inactive",
        subscriptionPlan: user.subscriptionPlan || null,
        subscriptionEnd: user.subscriptionEnd || null,

        // ⚠️ temporary static value (later move to DB)
        charity: user.selectedCharity || "Not Selected",

        contribution: user.donationPercentage || 0,

        winnings: totalWinnings,

        drawStatus:
          results.length > 0 ? "Participated" : "Not Participated",

        scores,
        payments,
        results,
        latestDraw,
      },
    });

  } catch (error) {
    console.error("Dashboard Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const getMe = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      user,
    });

  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};





