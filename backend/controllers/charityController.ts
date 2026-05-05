

import { Response } from "express";
import { AuthRequest } from "../interfaces/authRequest.interface";
import { User } from "../models/userModel";
import Charity from "../models/Charity";


export const selectCharity = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const { charityId } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const charity = await Charity.findById(charityId);
    if (!charity) {
      return res.status(404).json({ message: "Charity not found" });
    }

    user.selectedCharity = charity._id;
    user.donationPercentage = charity.percentage;

    await user.save();

    return res.json({
      success: true,
      message: "Charity selected successfully",
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};








