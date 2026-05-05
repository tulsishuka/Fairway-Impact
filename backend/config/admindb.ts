import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "../models/userModel.js";

const MONGO_URI = "mongodb://127.0.0.1:27017/eccomerce"; 

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ DB Connected");

    const existingAdmin = await User.findOne({ email: "admin@gmail.com" });

    if (existingAdmin) {
      console.log("⚠️ Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
      isVerified: true,
      subscriptionStatus: "active",
    });

    console.log("✅ Admin created successfully");
    process.exit();

  } catch (error) {
    console.log("❌ ERROR:", error);
    process.exit(1);
  }
};

createAdmin();