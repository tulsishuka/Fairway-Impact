import axios from "axios";
import React, { useState } from "react";

const Forgot = () => {
  const [formData, setFormData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://givehope-platform-4.onrender.com/api/v1/auth/forgot-password",
        formData
      );

      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050B3E] via-[#0A1A6A] to-[#0B3D91] px-4">
      <div className="w-full max-w-md backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 text-white">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-green-300 to-cyan-300 bg-clip-text text-transparent">
          Reset Password 
        </h2>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 rounded-xl bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              required
            />
          </div>
          <div>
            <label className="text-sm text-gray-300">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              placeholder="Enter old password"
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 rounded-xl bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              required
            />
          </div>
          <div>
            <label className="text-sm text-gray-300">New Password</label>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 rounded-xl bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 transition-all shadow-lg hover:shadow-green-500/30 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Forgot;