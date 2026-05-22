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
import adminRoutes from "./routes/adminRoutes";

const app = express();

app.use(express.json());
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://givehope-platform-5.onrender.com"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use("/api/v1/auth", authRouter);
app.use("/api/payment", paymentRoutes);
app.use("/api/user", userRoutes);
app.use("/api/charity", charityRoutes);
app.use("/api/score", scoreRoutes);
app.use("/api/draw", drawRoutes);
app.use("/api/prize", prizeRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/admin", adminRoutes);

export default app;













