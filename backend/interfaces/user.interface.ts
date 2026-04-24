// import { Document } from "mongoose";

// export interface IUser extends Document {
//   name: string;
//   email: string;
//   password: string;

//   role: "user" | "admin";   // ✅ better than boolean

//   otp?: string;
//   otpExpires?: Date;
//   isVerified: boolean;

//   resetToken?: string;
//   resetTokenExpires?: Date;
// }


export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";

  otp?: string;
  otpExpires?: Date;

  isVerified: boolean;

  resetToken?: string;
  resetTokenExpires?: Date;

  // 🔥 ADD THESE (IMPORTANT)
  subscriptionStatus?: "inactive" | "active" | "expired";
  subscriptionPlan?: "monthly" | "yearly" | null;
  subscriptionStart?: Date | null;
  subscriptionEnd?: Date | null;
}