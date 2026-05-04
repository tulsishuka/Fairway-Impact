


import { Request, Response } from "express";
import { User } from "../models/userModel";
import Payment from "../models/Payment";
import Result from "../models/Result";
import PrizePool from "../models/PrizePool";
import Charity from "../models/Charity"; // ✅ FIXED
import CharityDonation from "../models/CharityDonation";
import Score from "../models/Score";


/**
 * 📊 ANALYTICS DASHBOARD
 */
export const getAnalytics = async (req: Request, res: Response) => {
  try {
    // 👥 Users
    const totalUsers = await User.countDocuments();

    // 💰 Revenue
    const payments = await Payment.find({ status: "paid" });

    const totalRevenue = payments.reduce(
      (acc: number, p: any) => acc + (p.amount || 0),
      0
    );

    // 🏆 Prize Pool
    const prizePool = await PrizePool.findOne().sort({ createdAt: -1 });

    // 🎯 Winnings
    const results = await Result.find();

    const totalWinnings = results.reduce(
      (acc: number, r: any) => acc + (r.winnings || 0),
      0
    );

    // ❤️ REAL CHARITY MONEY
    const donations = await CharityDonation.find();

    const charityContribution = donations.reduce(
      (acc: number, d: any) => acc + (d.amount || 0),
      0
    );

    res.json({
      success: true,
      data: {
        totalUsers,
        totalRevenue,
        prizePool: prizePool?.totalAmount || 0,
        totalWinnings,
        charityContribution,
      },
    });

  } catch (error) {
    console.error("Analytics Error:", error);
    res.status(500).json({ message: "Analytics error" });
  }
};

/**
 * 👥 GET USERS
 */
export const getUsers = async (req: Request, res: Response) => {
 

   const users = await User.find()
    .populate("selectedCharity", "name percentage description")
    .select("-password");

  res.json({
    success: true,
    data: users,
  });
};



/**
 * 🔄 UPDATE SUBSCRIPTION
 */
export const updateUserSubscription = async (req: Request, res: Response) => {
  try {
    const { userId, status } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { subscriptionStatus: status },
      { new: true }
    );

    res.json({
      success: true,
      user,
    });

  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};

/**
 * ❤️ CHARITY MANAGEMENT (FIXED)
 */

// ➕ Add Charity
export const addCharity = async (req: Request, res: Response) => {
  try {
    const { name, description, percentage } = req.body;

    const charity = await Charity.create({
      name,
      description,
      percentage,
    });

    res.json({
      success: true,
      charity,
    });

  } catch (error) {
    res.status(500).json({ message: "Error adding charity" });
  }
};

// 📋 Get Charities
export const getCharities = async (req: Request, res: Response) => {
  try {
    const charities = await Charity.find();

    res.json({
      success: true,
      data: charities,
    });

  } catch (error) {
    res.status(500).json({ message: "Error fetching charities" });
  }
};

// ✏️ Update Charity
export const updateCharity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const charity = await Charity.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      charity,
    });

  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};

// ❌ Delete Charity
export const deleteCharity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await Charity.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Deleted",
    });

  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};

/**
 * 🏆 WINNER MANAGEMENT
 */

// 📋 Get results
export const getResults = async (req: Request, res: Response) => {
  try {
    const results = await Result.find();

    res.json({
      success: true,
      data: results,
    });

  } catch (error) {
    res.status(500).json({ message: "Error fetching results" });
  }
};

// ✅ Approve winner
export const approveWinner = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await Result.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true }
    );

    res.json({
      success: true,
      result,
    });

  } catch (error) {
    res.status(500).json({ message: "Approval failed" });
  }
};

// ❌ Reject winner
export const rejectWinner = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await Result.findByIdAndUpdate(
      id,
      { status: "rejected" },
      { new: true }
    );

    res.json({
      success: true,
      result,
    });

  } catch (error) {
    res.status(500).json({ message: "Reject failed" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};


// 👇 GET ALL USERS WITH SCORES
export const getUsersWithScores = async (req: Request, res: Response) => {
  try {
    const users = await User.find()
      .select("-password")
      .lean();

    const scores = await Score.find().lean();

    // attach scores to users
    const usersWithScores = users.map((u) => {
      const userScores = scores.filter(
        (s) => s.userId.toString() === u._id.toString()
      );

      return {
        ...u,
        scores: userScores,
        totalScores: userScores.length,
        latestScore: userScores[userScores.length - 1]?.value || null,
      };
    });

    res.json({
      success: true,
      data: usersWithScores,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching users with scores",
    });
  }
};






;
















