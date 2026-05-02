
// import mongoose from "mongoose";

// const charitySchema = new mongoose.Schema({
//   name: String,
//   description: String,

//   // ❤️ ADD THIS
//   percentage: {
//     type: Number,
//     default: 0
//   },

//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export default mongoose.model("Charity", charitySchema);



import mongoose from "mongoose";

const CharityDonationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    charityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Charity",
      required: true,
    },

    paymentId: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ FIXED NAME HERE
export default mongoose.model("CharityDonation", CharityDonationSchema);