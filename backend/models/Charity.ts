
// import mongoose from "mongoose";

// const charitySchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Charity", charitySchema);





import mongoose from "mongoose";

const charitySchema = new mongoose.Schema({
  name: String,
  description: String,

  // ❤️ ADD THIS
  percentage: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Charity", charitySchema);