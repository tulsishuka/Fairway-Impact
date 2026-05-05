
import { Response, Request } from "express";
import { User } from "../models/userModel";
import Score from "../models/Score";
import Payment from "../models/Payment";
import Result from "../models/Result";
import Draw from "../models/Draw";

interface AuthRequest extends Request {
  user?: any;
}

interface PopulatedCharity {
  _id: string;
  name: string;
}

interface IUserWithCharity {
  subscriptionStatus?: string;
  subscriptionPlan?: string;
  subscriptionEnd?: Date;
  donationPercentage?: number;

  selectedCharity?: PopulatedCharity;
}

export const getDashboard = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;

    const user = await User.findById(userId)
      .populate("selectedCharity", "name")
      .lean() as IUserWithCharity | null;

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
        subscriptionStatus: user.subscriptionStatus || "inactive",
        subscriptionPlan: user.subscriptionPlan || null,
        subscriptionEnd: user.subscriptionEnd || null,

        charity: user.selectedCharity?.name || "Not Selected",

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

