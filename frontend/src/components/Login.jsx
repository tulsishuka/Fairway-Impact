
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

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
        "https://givehope-platform-4.onrender.com/api/v1/auth/login",
        formData
      );

      const { token, subscriptionStatus, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login successful");

      if (user?.role === "admin") {
        navigate("/admin");
        return;
      }

      if (subscriptionStatus === "active") {
        navigate("/user");
      } else {
        navigate("/Subscription");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
   

     <div className="min-h-screen bg-[#090F0C] text-white relative overflow-hidden flex items-center justify-center px-2 py-6 font-sans">

      <div className="relative z-10 w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
        

          <p className="mt-2 text-sm tracking-[0.25em] uppercase text-[#BDFFDE]">
            Login to Your Account
          </p>
        </div>

        {/* Card */}
        <div className="backdrop-blur-xl bg-black  border border-white/[0.08] rounded-3xl p-8 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-[#C9FCE1]">
              Welcome Back
            </h2>

            <p className="text-gray-400 mt-2 text-sm">
              Sign in to access your dashboard
            </p>
          </div>

          {/* Form */}
          <form  onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                Email Address
              </label>

              <div className="relative group">

                {/* Email Icon */}
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#3EE59D] transition">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L22 8"
                    />
                  </svg>
                </span>

                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0B100E] border border-[#1E2722] rounded-2xl py-4 pl-12 pr-4 text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#3EE59D] focus:ring-4 focus:ring-[#3EE59D]/10 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Password
                </label>

                <Link
                  to="/forgot"
                  className="text-xs text-[#C9FCE1] hover:text-emerald-300 transition"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="relative group">

                {/* Lock Icon */}
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#3EE59D] transition">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0B100E] border border-[#1E2722] rounded-2xl py-4 pl-12 pr-20 text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#3EE59D] focus:ring-4 focus:ring-[#3EE59D]/10 transition-all"
                />

                {/* Show Hide Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#3EE59D] hover:text-emerald-300 transition"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full mt-2 bg-[#3EE59D] hover:bg-[#34d18d] text-gray-700 font-black tracking-[0.2em] uppercase text-xs py-4 rounded-2xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] shadow-[0_10px_30px_rgba(62,229,157,0.25)]"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#1B2420]" />
            </div>

            <div className="relative flex justify-center">
              <span className=" px-4 text-[10px] uppercase tracking-[0.3em] text-gray-500">
                Secure Access
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-400 space-y-3">

            <p>
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-[#3EE59D] hover:text-emerald-300 font-semibold transition"
              >
                Create Account
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;