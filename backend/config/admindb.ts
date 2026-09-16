import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "../models/userModel";

 const MONGO_URI= "mongodb+srv://tulsishuklag:mongodbfirst@cluster0.vdfztqx.mongodb.net/digital?appName=Cluster0";
const createAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    const existingAdmin = await User.findOne({ email: "admin@gmail.com" });

    if (existingAdmin) {
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

    process.exit();

  } catch (error) {
    console.log("❌ ERROR:", error);
    process.exit(1);
  }
};

createAdmin();