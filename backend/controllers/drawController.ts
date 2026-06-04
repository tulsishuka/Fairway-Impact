import { Request, Response } from "express";
import Draw from "../models/Draw";
import Result from "../models/Result";
import Score from "../models/Score";



const generateNumbers = (): number[] => {
  const nums = new Set<number>();

  while (nums.size < 5) {
    nums.add(Math.floor(Math.random() * 45) + 1);
  }

  return Array.from(nums);
};

export const createDraw = async (req: Request, res: Response) => {
  try {
    const { numbers } = req.body;

    if (!numbers || numbers.length !== 5) {
      return res.status(400).json({
        success: false,
        message: "Provide exactly 5 numbers",
      });
    }

    const draw = await Draw.create({
      numbers,
      isPublished: false,
    });

    res.json({ success: true, draw });

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};




export const runDraw = async (req: Request, res: Response) => {
  try {
    const numbers = generateNumbers();
    // const numbers = [10, 20, 30, 40, 45];

    const draw = await Draw.create({
      numbers,
      isPublished: true,
    });

    const allScores = await Score.find();

    const userMap: any = {};
    const results: any[] = []; 


    allScores.forEach((s: any) => {
      if (!userMap[s.userId]) {
        userMap[s.userId] = [];
      }
      userMap[s.userId].push(s.value);
    });

    for (let userId in userMap) {
      const userNumbers = userMap[userId];

      const matches = userNumbers.filter((num: number) =>
        numbers.includes(num)
      ).length;

      let rewardType = "none";
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

      const result = await Result.create({
        userId,
        drawId: draw._id,
        matchedNumbers: matches,
        rewardType,
        winnings,
      });

      results.push(result);
    }

    const populatedResults = await Result.find({ drawId: draw._id })
      .populate("userId", "name email");

    return res.json({
      success: true,
      message: "Draw executed successfully",
      draw,
      results: populatedResults, 
    });

  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
