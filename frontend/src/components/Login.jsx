
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
        navigate("/Dashboard");
      } else {
        navigate("/Subscription");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050B3E] via-[#0A1A6A] to-[#0B3D91] px-4">

      {/* Card */}
      <div className="w-full max-w-md backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 text-white">

        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-green-500">
          Login Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 rounded-xl bg-white/10 border border-white/20 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Password</label>

            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-green-300"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 transition-all shadow-lg hover:shadow-green-500/30"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-300 space-y-2">

          <p>
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-green-300 hover:underline font-medium"
            >
              Sign Up
            </Link>
          </p>

          <p>
            <Link
              to="/forgot"
              className="text-green-300 hover:underline font-medium"
            >
              Forgot Password?
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;