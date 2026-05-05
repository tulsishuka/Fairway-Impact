import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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
        "https://givehope-platform-4.onrender.com/api/v1/auth/register",
        formData
      );
      toast.success("Account created successfully ❤️");

      console.log("SUCCESS:", res.data);

      setTimeout(() => {
        navigate("/verify", { state: { email: formData.email } });
      }, 1000);

      setFormData({
        name: "",
        email: "",
        password: "",
      });

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050B3E] via-[#0A1A6A] to-[#0B3D91] px-4">

      <div className="w-full max-w-md backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 text-white">

        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-green-300 to-cyan-300 bg-clip-text text-transparent">
          Create Account 
        </h2>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20"
            required
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-green-500 to-emerald-400"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default SignUp;