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
      toast.error(error.response?.data?.message || "Your account already exists");
    } finally {
      setLoading(false);
    }
    
  };

  return (
<div className="min-h-screen bg-[#090F0C] text-white flex items-center justify-center relative overflow-hidden font-sans">

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.08),transparent_40%)] pointer-events-none" />

  <div className="absolute top-[-200px] right-[-100px] w-[500px] h-[500px] bg-sky-500/10 blur-[140px] rounded-full pointer-events-none" />

  <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-16 items-center px-6 md:px-10 py-16">


    <section className="lg:col-span-6 flex flex-col justify-center max-w-xl gap-8">

  {/* TOP CONTENT */}
  <div className="space-y-4">
    
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141A17] border border-[#1F2823] text-[11px] tracking-[0.2em] uppercase text-[#3EE59D] font-bold w-fit">
      <span className="w-2 h-2 rounded-full bg-[#3EE59D]" />
      Premium Golf Impact
    </div>

    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.02]">
      Fairway{" "}
      <span className="bg-gradient-to-r from-[#39E596] to-[#2B82F6] bg-clip-text text-transparent">
        Impact
      </span>
    </h1>

    <p className="text-[#85B69D] text-sm md:text-base leading-relaxed max-w-lg">
      Join the exclusive circle of golfers turning every birdie into a catalyst
      for global change. Professional metrics, cinematic rewards, and transparent
      philanthropy.
    </p>
  </div>

  {/* FEATURE CARDS */}
  <div className="space-y-4">

    <div className="flex items-start gap-4 p-4 rounded-2xl border border-[#1C2420] bg-black backdrop-blur-sm">
      
      <div className="w-11 h-11 rounded-2xl bg-[#1B2430] border border-[#2B3545] flex items-center justify-center shrink-0 text-sky-400">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      </div>

      <div className="space-y-1">
        <h4 className="font-semibold text-sm text-white tracking-wide">
          Precision Metrics
        </h4>

        <p className="text-xs text-gray-500 leading-relaxed">
          Real-time stroke tracking, verified handicaps, and elite performance analytics.
        </p>
      </div>
    </div>

    <div className="flex items-start gap-4 p-4 rounded-2xl border border-[#1C2420] bg-black backdrop-blur-sm">
      
      <div className="w-11 h-11 rounded-2xl bg-[#14291D] border border-[#224A34] flex items-center justify-center shrink-0 text-[#3EE59D]">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <div className="space-y-1">
        <h4 className="font-semibold text-sm text-white tracking-wide">
          Charitable Velocity
        </h4>

        <p className="text-xs text-gray-500 leading-relaxed">
          Transform rewards into measurable humanitarian impact through verified initiatives.
        </p>
      </div>
    </div>

  </div>
</section>

    <section className="lg:col-span-6 flex justify-center lg:justify-end w-full ">

      <div className="relative w-full max-w-[500px] ">

        {/* Glow */}
        <div className="absolute inset-0  blur-[80px] rounded-[40px]" />

        {/* Card */}
        <div className="relative bg-black  border border-[#1F2723] rounded-[32px] p-8 md:p-10 shadow-[0_0_60px_rgba(0,0,0,0.4)] backdrop-blur-2xl">

          {/* Top */}
          <div className="flex items-center justify-between mb-10">

            <div className="flex items-center gap-2">
              <span className="h-1.5 w-8 rounded-full bg-[#3EE59D]" />
              <span className="h-1.5 w-4 rounded-full bg-[#2A322D]" />
              <span className="h-1.5 w-4 rounded-full bg-[#2A322D]" />
            </div>

            <span className="text-[10px] md:text-xs font-bold tracking-wide text-gray-500 uppercase">
              Already Registered?
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-[#3EE59D] hover:text-white transition-colors ml-2"
              >
                Login
              </button>
            </span>
          </div>

          {/* Title */}
          <div className="space-y-2 mb-8">

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              Create Account
            </h2>

            <p className="text-sm text-[#85B69D] leading-relaxed">
              Enter the ecosystem where every shot contributes to global transformation.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name"
                className="w-full px-5 py-4 rounded-2xl bg-black border border-[#28302C] text-sm text-white placeholder-gray-600 focus:outline-none focus:border-sky-400/40 focus:bg-[#1C2320] transition-all"
                required
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full px-5 py-4 rounded-2xl bg-black border border-[#28302C] text-sm text-white placeholder-gray-600 focus:outline-none focus:border-sky-400/40 focus:bg-[#1C2320] transition-all"
                required
              />
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-5 py-4 rounded-2xl bg-black border border-[#28302C] text-sm text-white placeholder-gray-600 focus:outline-none focus:border-sky-400/40 focus:bg-[#1C2320] transition-all"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-4 bg-gradient-to-r from-[#3EE59D] to-[#5FFFD0] text-[#04110A] rounded-2xl font-bold tracking-wide hover:opacity-90 disabled:opacity-50 transition-all text-xs md:text-sm uppercase shadow-[0_10px_30px_rgba(62,229,157,0.2)]"
            >
              {loading
                ? "Processing ..."
                : "Create Your Account"}
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</div>
  );
};

export default SignUp;