import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050B3E] relative overflow-hidden text-white">

      {/* MAIN */}
      <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto px-6 py-24 md:py-32">
        
        {/* LEFT */}
        <section className="flex flex-col items-start gap-6">

          <h2 className="text-lg md:text-xl text-blue-300">
            🎯 Play • Win • Give Back
          </h2>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Win Rewards While Supporting
            <span className="text-green-400"> Real Causes ❤️</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-lg">
            Submit your numbers, join monthly draws, and win exciting prizes — 
            while contributing to meaningful charities.
          </p>

          {/* CTA */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-3 bg-green-500 text-black rounded-xl font-semibold hover:bg-green-400 transition"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 border border-white rounded-xl hover:bg-white hover:text-black transition"
            >
              Login
            </button>
          </div>
        </section>

        {/* RIGHT */}
        <section className="flex justify-center items-center">

          {/* DRAW NUMBERS UI */}
          <div className="flex gap-4 text-xl font-bold">

            {[12, 25, 7, 33, 41].map((num, i) => (
              <div
                key={i}
                className="w-16 h-16 flex items-center justify-center bg-green-500 text-black rounded-full shadow-xl text-2xl animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {num}
              </div>
            ))}

          </div>

        </section>
      </div>

      {/* OPTIONAL GLOW EFFECT */}
      <div className="absolute w-[400px] h-[400px] bg-green-500 opacity-20 blur-3xl rounded-full top-[-100px] right-[-100px]" />
      <div className="absolute w-[300px] h-[300px] bg-blue-500 opacity-20 blur-3xl rounded-full bottom-[-100px] left-[-100px]" />

    </div>
  );
};

export default Home;