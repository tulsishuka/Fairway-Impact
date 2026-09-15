import axios from "axios";

const API = axios.create({
  baseURL: "https://fairway-impact.onrender.com/api/v1",
   // baseURL: "http://localhost:5000/api/v1",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
