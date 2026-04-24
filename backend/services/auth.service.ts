import bcrypt from "bcryptjs";
import crypto from "crypto";
import { AppError } from "../utils/AppError";
import { User } from "../models/userModel";

// Register user
export const registerUser = async (data: any) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new AppError("User already exists", 400);

  const hashedPassword = await bcrypt.hash(data.password, 12);

  // Generate strong 6-digit OTP
  const otp = crypto.randomInt(100000, 1000000).toString();

  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    otp,
    otpExpires: new Date(Date.now() + 10 * 60 * 1000), // 10 min
    isVerified: false,
  });

  return user;
};

// Verify OTP
export const verifyOtp = async (email: string, otp: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new AppError("User not found", 404);

  if (user.otp !== otp) throw new AppError("Invalid OTP", 400);
  if (user.otpExpires! < new Date()) throw new AppError("OTP expired", 400);

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;

  await user.save();
};

// Login
export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user || !user.isVerified) throw new AppError("Invalid credentials", 401);

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new AppError("Invalid credentials", 401);

  return user;
};

// Reset password using old password (no OTP)
export const resetPasswordWithOld = async (email: string, oldPassword: string, newPassword: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new AppError("User not found", 404);

  const match = await bcrypt.compare(oldPassword, user.password);
  if (!match) throw new AppError("Old password is incorrect", 400);

  user.password = await bcrypt.hash(newPassword, 12);
  await user.save();
};