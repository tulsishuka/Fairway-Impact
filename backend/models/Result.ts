import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  drawId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Draw",
  },

  matchedNumbers: Number,

  rewardType: {
    type: String,
    enum: ["jackpot", "medium", "small", "none"],
  },

  winnings: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Result", resultSchema);