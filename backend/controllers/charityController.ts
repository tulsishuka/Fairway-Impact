
import { Response } from "express";
import { AuthRequest } from "../interfaces/authRequest.interface";
import { User } from "../models/userModel";
import Charity from "../models/Charity";
import { Document, DefaultSchemaOptions, Types } from "mongoose";

// ✅ Select Charity (already exists but cleaned)
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
      data: {
        selectedCharity: charity.name,
        donationPercentage: user.donationPercentage,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateDonationPercentage = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?._id;
    const { donationPercentage } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (
      donationPercentage < 0 ||
      donationPercentage > 100 ||
      donationPercentage === undefined
    ) {
      return res.status(400).json({ message: "Invalid percentage" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        donationPercentage,
      },
      { new: true }
    ).select("-password");

    return res.json({
      success: true,
      message: "Donation percentage updated",
      data: user?.donationPercentage,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
export const getCharities = async (req: AuthRequest, res: Response) => {
  try {
    const charities = await Charity.find();
    return res.json({
      success: true,
      data: charities,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};