import express from "express";
import authRouter from "./routes/authRouter";
import paymentRoutes from "./routes/paymentRoutes";
import userRoutes from "./routes/user.routes";
import charityRoutes from "./routes/charityRoutes";
import scoreRoutes from "./routes/scoreRoutes";
import drawRoutes from "./routes/drawRoutes";

import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authRouter);
app.use("/api/payment", paymentRoutes);
app.use("/api/user", userRoutes);
app.use("/api/charity", charityRoutes);
app.use("/api/score", scoreRoutes);
app.use("/api/draw", drawRoutes);

export default app;
