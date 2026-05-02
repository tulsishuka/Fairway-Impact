import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

// 🔐 TOKEN AUTO ATTACH
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// 📊 Dashboard
export const getDashboardData = () =>
  API.get("/api/user/dashboard");

// 💳 Payments
export const createOrder = (data) =>
  API.post("/api/payment/create-order", data);

export const verifyPayment = (data) =>
  API.post("/api/payment/verify", data);

// 🏌️ Scores
export const getScores = () =>
  API.get("/api/score");
