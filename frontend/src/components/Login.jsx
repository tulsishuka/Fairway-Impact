// import axios from "axios";
// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:3000/api/v1/auth/login",
//         formData
//       );

//       const { token, subscriptionStatus } = res.data;

//       // 🔐 Save token
//       localStorage.setItem("token", token);

//       alert("Login successful");

//       // 🚀 REDIRECT LOGIC
//       if (subscriptionStatus === "active") {
//         navigate("/Dashboard");
//       } else {
//         navigate("/Subscription");
//       }

//     } catch (error) {
//       alert(error.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white">
//       <div className="w-full max-w-md p-8 shadow-md rounded">

//         <h2 className="text-2xl font-semibold mb-6 text-center">
//           Login
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-6">

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full border-b p-2 outline-none"
//             required
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full border-b p-2 outline-none"
//             required
//           />

//           <button
//             type="submit"
//             className="w-full bg-[#DB4444] text-white py-3 rounded"
//           >
//             Login
//           </button>

//         </form>

//         <p className="text-center mt-6 text-sm">
//           Don’t have an account?{" "}
//           <Link to="/SignUp" className="text-[#DB4444] font-medium hover:underline">
//             Sign Up
//           </Link>
//         </p>

//         <p className="text-center mt-6 text-sm">
//           <Link to="/forgot" className="text-[#DB4444] font-medium hover:underline">
//             Forgot Password
//           </Link>
//         </p>

//       </div>
//     </div>
//   );
// };

// export default Login;

import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://127.0.0.1:3000/api/v1/auth/login",
        formData
      );

      console.log("LOGIN RESPONSE:", res.data); // 🔥 DEBUG

      const { token, subscriptionStatus } = res.data;

      // ✅ Save token
      localStorage.setItem("token", token);

      alert("Login successful");

      // ✅ Correct redirect
      if (subscriptionStatus === "active") {
        navigate("/dashboard"); // ✅ lowercase
      } else {
        navigate("/subscription"); // ✅ lowercase
      }

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 shadow-md rounded">

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border-b p-2 outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border-b p-2 outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#DB4444] text-white py-3 rounded"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-6 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[#DB4444] font-medium hover:underline">
            Sign Up
          </Link>
        </p>

        <p className="text-center mt-6 text-sm">
          <Link to="/forgot" className="text-[#DB4444] font-medium hover:underline">
            Forgot Password
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;