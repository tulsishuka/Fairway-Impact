import mongoose from "mongoose";

const drawParticipationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  drawId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Draw",
    required: true,
  },

  entryNumbers: [Number], // user's selected numbers

  status: {
    type: String,
    enum: ["registered", "won", "lost"],
    default: "registered",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("DrawParticipation", drawParticipationSchema);