import express from "express";
import cors from "cors";

import authRouter from "./routes/authRouter";
import paymentRoutes from "./routes/paymentRoutes";
import userRoutes from "./routes/user.routes";
import charityRoutes from "./routes/charityRoutes";
import scoreRoutes from "./routes/scoreRoutes";
import drawRoutes from "./routes/drawRoutes";
import resultRoutes from "./routes/resultRoutes";
import adminRoutes from "./routes/adminRoutes";
import path from "path";

const app = express();

app.use(express.json());
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://fairway-impact-five.vercel.app"
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
app.use("/api/admin", adminRoutes);
app.use("/api/results", resultRoutes);


export default app;






