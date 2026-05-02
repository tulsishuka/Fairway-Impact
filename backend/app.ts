import express from "express";
import cors from "cors";

import authRouter from "./routes/authRouter";
import paymentRoutes from "./routes/paymentRoutes";
import userRoutes from "./routes/user.routes";
import charityRoutes from "./routes/charityRoutes";
import scoreRoutes from "./routes/scoreRoutes";
import drawRoutes from "./routes/drawRoutes";
import prizeRoutes from "./routes/prizeRoutes";
import resultRoutes from "./routes/resultRoutes";

// ✅ ADD THIS
import adminRoutes from "./routes/adminRoutes";

const app = express();

app.use(express.json());
app.use(cors());

// 🔐 AUTH
app.use("/api/v1/auth", authRouter);

// 💳 PAYMENT
app.use("/api/payment", paymentRoutes);

// 👤 USER
app.use("/api/user", userRoutes);

// ❤️ CHARITY
app.use("/api/charity", charityRoutes);

// 🏌️ SCORE
app.use("/api/score", scoreRoutes);

// 🎲 DRAW
app.use("/api/draw", drawRoutes);

// 💰 PRIZE
app.use("/api/prize", prizeRoutes);

// 🏆 RESULT
app.use("/api/results", resultRoutes);

// 🔥 ADMIN (IMPORTANT)
app.use("/api/admin", adminRoutes);

export default app;
















