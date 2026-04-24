// import { Request, Response } from "express";

// export const getDashboard = async (req: Request, res: Response) => {
//   try {
//     res.json({
//       success: true,
//       message: "Dashboard data fetched successfully",
//       user: req.user
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error"
//     });
//   }
// };

import { Request, Response } from "express";
import { User } from "../models/userModel";

export const getDashboard = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user._id);

    res.json({
      success: true,
      data: {
        name: user?.name,
        email: user?.email,
        subscriptionStatus: user?.subscriptionStatus,
        subscriptionPlan: user?.subscriptionPlan,
        subscriptionEnd: user?.subscriptionEnd,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};