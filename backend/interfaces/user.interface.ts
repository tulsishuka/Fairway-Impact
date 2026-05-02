
import { Types } from "mongoose";

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

  subscriptionStatus?: "inactive" | "active" | "expired";
  subscriptionPlan?: "monthly" | "yearly" | null;
  subscriptionStart?: Date | null;
  subscriptionEnd?: Date | null;

  // ❤️ FIXED TYPE
  selectedCharity?: Types.ObjectId | null;

  // 📊 ADD THIS ALSO
  donationPercentage?: number;
}