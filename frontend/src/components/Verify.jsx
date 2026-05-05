
import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://givehope-platform-4.onrender.com/api/v1/auth/verify-otp",
        { email, otp }
      );

      toast.success(res.data.message || "Verified successfully ❤️");

      setTimeout(() => {
        navigate("/Subscription");
      }, 1000);

    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050B3E]  px-4">

      {/* CARD */}
      <div className="w-full max-w-md  border border-white/20 shadow-2xl rounded-3xl p-8 text-green-500">

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center">
          Verify Your Account
        </h2>

        <p className="text-center text-sm text-blue-100 mt-2">
          Enter OTP sent to
        </p>

        <p className="text-center text-sm font-semibold text-white mt-1 break-all">
          {email}
        </p>
        <form onSubmit={handleVerify} className="mt-8 space-y-5">

          <div>
            <label className="text-sm text-blue-100">OTP Code</label>
            <input
              type="text"
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              onChange={(e) => setOtp(e.target.value)}
              className="w-full mt-2 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-center tracking-widest text-lg outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-300"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold transition-all shadow-lg
              ${
                loading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 hover:scale-[1.02] text-white"
              }`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
        <p className="text-xs text-center text-blue-100 mt-6">
          Didn’t receive OTP? Check spam or try again.
        </p>

      </div>
    </div>
  );
};

export default Verify;