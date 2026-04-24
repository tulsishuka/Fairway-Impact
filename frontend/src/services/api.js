// import axios from "axios";

// export const createOrder = (data) =>
//   axios.post("http://localhost:3000/api/payment/create-order", data);

// export const verifyPayment = (data) =>
//   axios.post("http://localhost:3000/api/payment/verify", data);

import axios from "axios";

export const createOrder = async (payload) => {
  const token = localStorage.getItem("token");

  return axios.post(
    "http://localhost:3000/api/payment/create-order",
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`, // 🔥 THIS WAS MISSING
      },
    }
  );
};