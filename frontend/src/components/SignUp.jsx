

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        "http://127.0.0.1:5000/api/v1/auth/register",
        formData
      );

      console.log("SUCCESS:", res.data);

      navigate("/verify", { state: { email: formData.email } });

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };



 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4">

      {/* CARD */}
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white shadow-xl rounded-3xl overflow-hidden">

        {/* LEFT SIDE - BRANDING */}
        <div className="hidden md:flex flex-col justify-center p-10 bg-black text-white">
          <h1 className="text-3xl font-bold leading-tight">
            Join Digital Heroes
          </h1>

          <p className="mt-4 text-slate-300">
            Play. Compete. Give Back. Win monthly rewards while supporting real-world causes.
          </p>

          <div className="mt-8 space-y-3 text-sm text-slate-400">
            <p>✔ Monthly reward draws</p>
            <p>✔ Real charity impact</p>
            <p>✔ Simple score tracking</p>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="p-8 md:p-12">

          {/* HEADER */}
          <h2 className="text-2xl font-semibold text-slate-900">
            Create your account
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            It takes less than a minute to get started.
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">

            {/* NAME */}
            <div>
              <label className="text-sm text-slate-600">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full mt-2 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm text-slate-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full mt-2 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm text-slate-600">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full mt-2 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
              <p className="text-xs text-slate-400 mt-1">
                Must include letters and numbers
              </p>
            </div>

            {/* CTA BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-xl font-medium hover:scale-[1.02] transition disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

            {/* FOOTER TEXT */}
            <p className="text-xs text-center text-slate-500">
              By continuing, you agree to our Terms & Privacy Policy
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;