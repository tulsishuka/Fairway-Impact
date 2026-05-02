/* eslint-disable no-unused-vars */

import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!otp) return alert("Please enter OTP");

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/verify-otp",
        {
          email,
          otp,
        }
      );

      alert(res.data.message);

      navigate("/Subscription");

    } catch (error) {
      alert("❌ Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 px-4">

      {/* CARD */}
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

        {/* HEADER */}
        <h2 className="text-2xl font-bold text-center text-slate-800">
          Verify Your Account
        </h2>

        <p className="text-center text-sm text-slate-500 mt-2">
          We’ve sent a 6-digit OTP to
        </p>

        <p className="text-center text-sm font-medium text-slate-700 mt-1 break-all">
          {email}
        </p>

        {/* FORM */}
        <form onSubmit={handleVerify} className="mt-6 space-y-4">

          <div>
            <label className="text-sm text-slate-600">Enter OTP</label>
            <input
              type="text"
              maxLength={6}
              placeholder="6-digit code"
              onChange={(e) => setOtp(e.target.value)}
              className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-center tracking-widest text-lg"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-medium transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-slate-800"
            }`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {/* HELP TEXT */}
        <p className="text-xs text-center text-slate-400 mt-5">
          Didn’t receive code? Check spam or try again.
        </p>

      </div>
    </div>
  );
};

export default Verify;