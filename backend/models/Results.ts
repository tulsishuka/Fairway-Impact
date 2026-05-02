import mongoose, { Document } from "mongoose";

export interface IResults extends Document {
  userId: string;
  drawId: string;
  matchedNumbers: number;
  rewardType: string;
  winnings: number;
  status: "pending" | "verified" | "rejected"; // ✅ IMPORTANT
}

const resultSchema = new mongoose.Schema<IResults>({
  userId: { type: String },
  drawId: { type: String },
  matchedNumbers: Number,
  rewardType: String,
  winnings: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["pending", "verified", "rejected"],
    default: "pending",
  },
}, { timestamps: true });

export default mongoose.model<IResults>("Results", resultSchema);