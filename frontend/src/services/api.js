
import axios from "axios";

const API = axios.create({
  baseURL: "https://givehope-platform-4.onrender.com",
});
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export const getDashboardData = () =>
  API.get("/api/user/dashboard");
export const createOrder = (data) =>
  API.post("/api/payment/create-order", data);

export const verifyPayment = (data) =>
  API.post("/api/payment/verify", data);
export const getScores = () =>
  API.get("/api/score");



export const selectCharity = (data) =>
  API.post("/api/charity/select", data);


export const updateCharityPercentage = (donationPercentage) =>
  API.put("/api/charity/update-percentage", { donationPercentage });