
import dotenv from "dotenv";
dotenv.config(); 

import { connectDB } from "./config/database.config.js";
import app from "./app";

const startServer = async () => {
  await connectDB();

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
};

startServer();

