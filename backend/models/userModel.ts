// import mongoose from "mongoose";
// import { IUser } from "../interfaces/user.interface";
// const userSchema = new mongoose.Schema<IUser>(
//   {
//     name: { type: String, required: true },

//     email: { 
//       type: String, 
//       required: true, 
//       unique: true,
//       lowercase: true,
//       trim: true
//     },

//     password: { type: String, required: true },

//     role: {
//       type: String,
//       enum: ["user", "admin"],
//       default: "user"
//     },

//     otp: String,
//     otpExpires: Date,

//     isVerified: { type: Boolean, default: false },

//     resetToken: String,
//     resetTokenExpires: Date
//   },
//   { timestamps: true }

// );

// export const User = mongoose.model<IUser>("User", userSchema);



import mongoose from "mongoose";
import { IUser } from "../interfaces/user.interface";

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },

    email: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true,
      trim: true
    },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },

    otp: String,
    otpExpires: Date,

    isVerified: { type: Boolean, default: false },

    resetToken: String,
    resetTokenExpires: Date,

    // ✅ Subscription fields (must be inside schema)
    subscriptionStatus: {
      type: String,
      enum: ["inactive", "active", "expired"],
      default: "inactive"
    },

    subscriptionPlan: {
      type: String,
      enum: ["monthly", "yearly"],
      default: null
    },

    subscriptionStart: {
      type: Date,
      default: null
    },

    subscriptionEnd: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
