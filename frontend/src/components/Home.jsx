import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">

      

      {/* HERO SECTION */}
      <section className="text-center px-6 py-24">
        <h2 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
          Play. Compete. Give Back.
        </h2>

        <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
          Track your performance, enter monthly draws, and support real-world
          causes — all in one modern subscription platform.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <button className="px-6 py-3 bg-black text-white rounded-xl text-sm hover:scale-105 transition">
            Get Started
          </button>

          <button className="px-6 py-3 border border-slate-300 rounded-xl text-sm hover:bg-slate-100 transition">
            Explore Charities
          </button>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="grid md:grid-cols-3 gap-6 px-6 max-w-6xl mx-auto pb-20">

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-slate-800">
            📊 Track Performance
          </h3>
          <p className="text-slate-600 mt-2 text-sm">
            Add your latest 5 golf scores and monitor your progress.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-slate-800">
            🎲 Monthly Draws
          </h3>
          <p className="text-slate-600 mt-2 text-sm">
            Participate in fair, automated reward-based monthly draws.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-slate-800">
            ❤️ Real Impact
          </h3>
          <p className="text-slate-600 mt-2 text-sm">
            A portion of your subscription supports meaningful charities.
          </p>
        </div>

      </section>

      {/* IMPACT SECTION */}
      <section className="bg-black text-white py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Your Game. Their Future.
        </h2>

        <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
          Every subscription contributes to education, health, and environmental causes.
          You don’t just play — you create impact.
        </p>

        <button className="mt-8 px-6 py-3 bg-white text-black rounded-xl hover:scale-105 transition">
          Join Now
        </button>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-10 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Digital Heroes. All rights reserved.
      </footer>

    </div>
  );
};

export default Home;