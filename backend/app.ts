
// import express from "express";
// import authRouter from "./routes/authRouter";
// import cors from "cors";
// import path from "path";
// import paymentRoutes from "./routes/paymentRoutes";
// const app = express();

// app.use(express.json());

// app.use(cors());
//  app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// app.use("/api/v1/auth", authRouter);
// app.use("/api/payment", paymentRoutes);


// export default app;


import express from "express";
import authRouter from "./routes/authRouter";
import paymentRoutes from "./routes/paymentRoutes";
import userRoutes from "./routes/user.routes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authRouter);
app.use("/api/payment", paymentRoutes);
app.use("/api/user", userRoutes);

export default app;
