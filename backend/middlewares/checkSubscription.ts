import { Request, Response, NextFunction } from "express";
import { User } from "../models/userModel.js";

export const checkSubscription = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {

    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (
      user.subscriptionStatus !== "active" ||
      (user.subscriptionEnd && user.subscriptionEnd < new Date())
    ) {

      return res.status(403).json({
        success: false,
        message: "Subscription expired or required",
      });
    }

    next();

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};