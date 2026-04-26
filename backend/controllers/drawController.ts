import { Request, Response } from "express";
import Draw from "../models/Draw";
import Result from "../models/Result";
import Score from "../models/Score";

/**
 * 🎲 Utility: Generate 5 unique random numbers (1–45)
 */
const generateNumbers = (): number[] => {
  const nums = new Set<number>();

  while (nums.size < 5) {
    nums.add(Math.floor(Math.random() * 45) + 1);
  }

  return Array.from(nums);
};

/**
 * 🧑‍💼 ADMIN: Create Draw manually
 */
export const createDraw = async (req: Request, res: Response) => {
  try {
    const { numbers } = req.body;

    // ✅ Validation
    if (!numbers || numbers.length !== 5) {
      return res.status(400).json({
        success: false,
        message: "Exactly 5 numbers are required",
      });
    }

    const draw = await Draw.create({
      numbers,
      isPublished: false, // will publish later
    });

    res.json({
      success: true,
      message: "Draw created successfully",
      draw,
    });

  } catch (error: any) {
    console.error("CREATE DRAW ERROR:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/**
 * 🏆 ADMIN: Run Draw + Calculate Results
 */
export const runDraw = async (req: Request, res: Response) => {
  try {
    // 🎯 STEP 1: Generate draw numbers
    const numbers = generateNumbers();

    const draw = await Draw.create({
      numbers,
      isPublished: true,
    });

    console.log("🎲 DRAW NUMBERS:", numbers);

    // 🎯 STEP 2: Get all user scores
    const usersScores: any = await Score.find();

    // 🎯 STEP 3: Loop users
    for (let score of usersScores) {
      if (!score.scores || score.scores.length === 0) continue;

      const userNumbers = score.scores.map((s: any) => s.value);

      // 🎯 STEP 4: Match logic
      const matches = userNumbers.filter((num: number) =>
        numbers.includes(num)
      ).length;

      let rewardType: "jackpot" | "medium" | "small" | "none" = "none";
      let winnings = 0;

      if (matches === 5) {
        rewardType = "jackpot";
        winnings = 10000;
      } else if (matches === 4) {
        rewardType = "medium";
        winnings = 2000;
      } else if (matches === 3) {
        rewardType = "small";
        winnings = 500;
      }

      // 🎯 STEP 5: Save result
      await Result.create({
        userId: score.userId,
        drawId: draw._id,
        matchedNumbers: matches,
        rewardType,
        winnings,
      });

      console.log(
        `👤 User: ${score.userId} | Matches: ${matches} | Reward: ${rewardType}`
      );
    }

    res.json({
      success: true,
      message: "Draw executed successfully",
      draw,
    });

  } catch (error: any) {
    console.error("RUN DRAW ERROR:", error.message);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};