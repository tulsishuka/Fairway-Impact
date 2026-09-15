
import dotenv from "dotenv";
dotenv.config(); 

import { connectDB } from "./config/database.config";
import app from "./app";


const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Server failed:", error);
    process.exit(1);
  }
};

startServer();
