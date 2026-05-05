import { Request, Response } from "express";
import Results from "../models/Results";
import Result from "../models/Result";


export const getAllResults = async (req: Request, res: Response) => {


  try {
    const results = await Result.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: results,
    });

  } catch (error) {
    res.status(500).json({ message: "Error fetching results" });
  }
};



export const verifyWinner = async (req: Request, res: Response) => {
  try {
    const { resultId } = req.params;

    const result = await Results.findById(resultId);

    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    result.status = "verified";
    await result.save();

    res.json({
      success: true,
      message: "Winner verified successfully",
      data: result,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const rejectWinner = async (req: Request, res: Response) => {
  try {
    const { resultId } = req.params;

    const result = await Results.findById(resultId);

    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    result.status = "rejected";
    await result.save();

    res.json({
      success: true,
      message: "Winner rejected",
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};