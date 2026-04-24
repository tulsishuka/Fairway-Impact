import axios from "axios";
import React, { useState } from "react";

const Forgot = () => {
  const [formData, setFormData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
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
        "http://127.0.0.1:3000/api/v1/auth/forgot-password",
        formData
      );

      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 shadow rounded">

        <h2 className="text-xl mb-6">Reset Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            className="w-full border-b p-2"
            required
          />

          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            onChange={handleChange}
            className="w-full border-b p-2"
            required
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            onChange={handleChange}
            className="w-full border-b p-2"
            required
          />

          <button className="w-full bg-[#DB4444] text-white py-2">
            Reset Password
          </button>

        </form>

      </div>
    </div>
  );
};

export default Forgot;