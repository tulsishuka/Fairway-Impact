
// import { Request, Response } from "express";
// import { User } from "../models/userModel";

// export const getDashboard = async (req: any, res: Response) => {
//   try {
//     const user = await User.findById(req.user._id);

//     res.json({
//       success: true,
//       data: {
//         name: user?.name,
//         email: user?.email,
//         subscriptionStatus: user?.subscriptionStatus,
//         subscriptionPlan: user?.subscriptionPlan,
//         subscriptionEnd: user?.subscriptionEnd,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };  


import { Response, Request } from "express";
import { User } from "../models/userModel";

interface AuthRequest extends Request {
  user?: any;
}

export const getDashboard = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      data: {
        subscriptionStatus: user.subscriptionStatus,
        subscriptionPlan: user.subscriptionPlan,
        subscriptionEnd: user.subscriptionEnd,

        charity: "Not selected",
        contribution: 0,
        winnings: 0,
        drawStatus: "Not Participated"
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};