import { Request, Response } from "express";
import Charity from "../models/Charity";
import { AuthRequest } from "../interfaces/authRequest.interface";
import { User } from "../models/userModel";



export const getCharities = async (req: Request, res: Response) => {
  try {
    const charities = await Charity.find();

    res.json({
      success: true,
      data: charities,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching charities",
    });
  }
};

export const selectCharity = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const { charityId, percentage } = req.body; // ✅ ADD HERE

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.subscriptionStatus !== "active") {
      return res.status(403).json({
        message: "Subscribe first to select charity",
      });
    }

    // 🔥 SAVE CHARITY
    user.selectedCharity = charityId;

    // 🔥 SAVE PERCENTAGE (NEW FIELD)
    user.donationPercentage = percentage;

    await user.save();

    res.json({
      success: true,
      message: "Charity selected successfully",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};