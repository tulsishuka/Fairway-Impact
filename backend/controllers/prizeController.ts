import PrizePool from "../models/PrizePool";
import Result from "../models/Result";

export const distributeRewards = async (req: any, res: any) => {
  try {
    const month = new Date().toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    const pool = await PrizePool.findOne({ month });

    if (!pool) {
      return res.status(400).json({ message: "No prize pool found" });
    }

    const results: any = await Result.find();

    let totalDistributed = 0;

    for (let r of results) {
      let reward = 0;

      if (r.rewardType === "jackpot") {
        reward = pool.totalAmount * 0.5; 
      } else if (r.rewardType === "medium") {
        reward = pool.totalAmount * 0.3; 
      } else if (r.rewardType === "small") {
        reward = pool.totalAmount * 0.2;
      }

      r.winnings = reward;
      await r.save();

      totalDistributed += reward;
    }

    const remaining = pool.totalAmount - totalDistributed;

    pool.rolloverAmount = remaining;
    pool.distributed = true;

    await pool.save();

    res.json({
      success: true,
      message: "Rewards distributed",
      totalDistributed,
      remaining,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};