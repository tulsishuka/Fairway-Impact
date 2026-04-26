import mongoose from "mongoose";

const drawSchema = new mongoose.Schema({
  month: String, // "2026-04"
  numbers: [Number], // 5 numbers

  type: {
    type: String,
    enum: ["random", "algorithmic"],
    default: "random",
  },

  isPublished: {
    type: Boolean,
    default: false,
  },

  jackpot: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Draw", drawSchema);