import { Request, Response } from "express";
import Score from "../models/Score";


export const addScore = async (req: any, res: Response) => {
  try {
    const { value } = req.body;
    const userId = req.user._id;

    if (!value || value < 1 || value > 45) {
      return res.status(400).json({
        success: false,
        message: "Score must be between 1 and 45",
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const existingScore = await Score.findOne({
      userId,
      date: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    if (existingScore) {
      return res.status(400).json({
        success: false,
        message: "You can only add one score per day",
      });
    }

    const scores = await Score.find({ userId }).sort({ createdAt: 1 });

    if (scores.length >= 5) {
      await Score.findByIdAndDelete(scores[0]._id);
    }

    const newScore = await Score.create({
      userId,
      value,
      date: new Date(),
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







