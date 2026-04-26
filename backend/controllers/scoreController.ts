import { Request, Response } from "express";
import Score from "../models/Score";

// ✅ ADD SCORE
export const addScore = async (req: any, res: Response) => {
  try {
    const { value } = req.body;
    const userId = req.user._id;

    // 🔥 Validation
    if (!value || value < 1 || value > 45) {
      return res.status(400).json({
        success: false,
        message: "Score must be between 1 and 45",
      });
    }

    // 🔥 Get all scores (oldest first)
    const scores = await Score.find({ userId }).sort({ createdAt: 1 });

    // 🚨 If already 5 → delete oldest
    if (scores.length >= 5) {
      await Score.findByIdAndDelete(scores[0]._id);
    }

    // ✅ Add new score
    const newScore = await Score.create({
      userId,
      value,
    });

    res.json({
      success: true,
      data: newScore,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding score",
    });
  }
};

// ✅ GET LAST 5 SCORES (latest first)
export const getScores = async (req: any, res: Response) => {
  try {
    const scores = await Score.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: scores,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching scores",
    });
  }
};