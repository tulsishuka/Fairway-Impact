
// import { Response, Request } from "express";
// import { User } from "../models/userModel";

// interface AuthRequest extends Request {
//   user?: any;
// }

// export const getDashboard = async (req: AuthRequest, res: Response) => {
//   try {
//     const user = await User.findById(req.user?._id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json({
//       success: true,
//       data: {
//         subscriptionStatus: user.subscriptionStatus,
//         subscriptionPlan: user.subscriptionPlan,
//         subscriptionEnd: user.subscriptionEnd,

//         charity: "Not selected",
//         contribution: 0,
//         winnings: 0,
//         drawStatus: "Not Participated"
//       }
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error"
//     });
//   }
// };


// import { Response, Request } from "express";
// import { User } from "../models/userModel";
// import Score from "../models/Score";
// import Result from "../models/Result";
// import Payment from "../models/Payment";
// import Charity from "../models/Charity";

// interface AuthRequest extends Request {
//   user?: any;
// }

// export const getDashboard = async (req: AuthRequest, res: Response) => {
//   try {
//     const userId = req.user?._id;

//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // ✅ GET LAST 5 SCORES
//     const scores = await Score.find({ userId })
//       .sort({ createdAt: -1 })
//       .limit(5);

//     // ✅ DRAW RESULTS
//     const results = await Result.find({ userId }).sort({
//       createdAt: -1,
//     });

//     // ✅ PAYMENTS
//     const payments = await Payment.find({ userId }).sort({
//       createdAt: -1,
//     });

//     // ✅ TOTAL WINNINGS
//     const totalWinnings = results.reduce(
//       (sum, r: any) => sum + (r.winnings || 0),
//       0
//     );

//     // ✅ CHARITY (temporary: first one)
//     const charityData = await Charity.findOne();

//     res.json({
//       success: true,
//       data: {
//         subscriptionStatus: user.subscriptionStatus,
//         subscriptionPlan: user.subscriptionPlan,
//         subscriptionEnd: user.subscriptionEnd,

//         charity: charityData?.name || "Not selected",
//         contribution: charityData?.percentage || 0,

//         winnings: totalWinnings,

//         drawStatus:
//           results.length > 0 ? "Participated" : "Not Participated",

//         scores,     // 🔥 FIXED
//         results,    // 🔥 FIXED
//         payments,   // 🔥 FIXED
//       },
//     });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };












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

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🏌️ Scores
    const scores = await Score.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);

    // 💳 Payments
    const payments = await Payment.find({ userId })
      .sort({ createdAt: -1 });

    // 🎯 Results
    const results = await Result.find({ userId })
      .sort({ createdAt: -1 });

    // 🎲 Latest Draw
    const latestDraw = await Draw.findOne({ isPublished: true })
      .sort({ createdAt: -1 });

    // 💰 Total winnings
    const totalWinnings = results.reduce(
      (sum, r) => sum + (r.winnings || 0),
      0
    );

    res.json({
      success: true,
      data: {
        subscriptionStatus: user.subscriptionStatus,
        subscriptionPlan: user.subscriptionPlan,
        subscriptionEnd: user.subscriptionEnd,

        charity: "Education For All",
        contribution: 10,

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
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};