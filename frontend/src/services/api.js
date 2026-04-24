
// import axios from "axios";

// export const createOrder = async (payload) => {
//   const token = localStorage.getItem("token");

//   return axios.post(
//     "http://localhost:3000/api/payment/create-order",
//     payload,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`, // 🔥 THIS WAS MISSING
//       },
//     }
//   );
// };

import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

// 🔐 Helper to get token
const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};


// ✅ CREATE ORDER (PAYMENT)
export const createOrder = async (payload) => {
  return axios.post(
    `${BASE_URL}/payment/create-order`,
    payload,
    getAuthHeader()
  );
};


// ✅ VERIFY PAYMENT
export const verifyPayment = async (payload) => {
  return axios.post(
    `${BASE_URL}/payment/verify`,
    payload,
    getAuthHeader()
  );
};


// ✅ DASHBOARD DATA
export const getDashboardData = async () => {
  return axios.get(
    `${BASE_URL}/user/dashboard`,
    getAuthHeader()
  );
};