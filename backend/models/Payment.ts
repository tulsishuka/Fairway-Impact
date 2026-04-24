// import mongoose from "mongoose";

// const PaymentSchema = new mongoose.Schema({
//   userId: String,
//   orderId: String,
//   paymentId: String,
//   amount: Number,
//   status: {
//     type: String,
//     default: "created", // created | paid | failed
//   },
//   plan: String,
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export default mongoose.model("Payment", PaymentSchema);

import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  orderId: { type: String, required: true },

  paymentId: String,

  amount: Number,

  status: {
    type: String,
    enum: ["created", "paid", "failed"],
    default: "created",
  },

  plan: {
    type: String,
    enum: ["monthly", "yearly"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Payment", PaymentSchema);