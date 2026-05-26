/* eslint-disable react-hooks/set-state-in-effect */

import React, { useEffect, useState } from "react";
import {
  Trophy,
  Plus,
  Activity,
  Target,
  CalendarDays,
} from "lucide-react";

const UserScore = () => {
  const [scores, setScores] = useState([]);
  const [scoreValue, setScoreValue] = useState("");

  const token = localStorage.getItem("token");

  

const fetchScores = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/score", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();

    setScores(result.data || []);
  } catch (error) {
    console.error(error);
  }
};


  // ADD SCORE
  const addScore = async () => {
    try {
      if (!scoreValue || scoreValue < 1 || scoreValue > 45) {
        alert("Score must be between 1 and 45");
        return;
      }

      await fetch(
        "https://givehope-platform-4.onrender.com/api/score/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            value: Number(scoreValue),
          }),
        }
      ).then(async (res) => {
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        return data;
      });

      setScoreValue("");

      fetchScores();

    } catch (error) {
      alert(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchScores();
  }, []);

  return (
    <div className="min-h-screen bg-[#070B09] text-white px-4 md:px-8 py-8 overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="fixed top-[-120px] right-[-100px] w-[350px] h-[350px] bg-[#20E49B]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto">

        {/* HERO */}
        <div className="relative mb-10 overflow-hidden rounded-[32px] border border-[#1B241F] bg-black p-8 md:p-12">


          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

            <div className="max-w-2xl">

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17201B] border border-[#223029] text-[#20E49B] text-xs uppercase tracking-[0.2em] font-bold">
                <div className="w-2 h-2 rounded-full bg-[#20E49B]" />
                Golf Performance
              </div>

              <h1 className="mt-6 text-5xl md:text-6xl font-black leading-none tracking-tight">
                Track Your
                <span className="block  italic font-medium mt-2 bg-gradient-to-r from-[#39E596] to-[#2B82F6] bg-clip-text text-transparent">
                  Stableford Scores
                </span>
              </h1>

              <p className="mt-5 text-[#A0D1B8] max-w-xl leading-relaxed">
                Submit your golf scores and transform your
                performance into real-world impact through
                charitable contribution programs.
              </p>

            </div>

            {/* TOTAL CARD */}
            <div className="bg-[#0F1512] border border-[#1E2923] rounded-3xl p-6 min-w-[280px] shadow-2xl">

              <div className="flex items-center justify-between mb-5">

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">
                    Total Entries
                  </p>

                  <h2 className="text-5xl font-black mt-2 text-[#20E49B]">
                    {scores.length}
                  </h2>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-[#18211C] flex items-center justify-center text-[#20E49B]">
                  <Trophy size={26} />
                </div>

              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Activity size={16} />
                Active score tracking enabled
              </div>

            </div>

          </div>

        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-8">

          {/* LEFT PANEL */}
          <div className="bg-black border border-[#1A231E] rounded-[30px] p-6 h-fit sticky top-6">

            <div className="flex items-center justify-between mb-8">

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">
                  New Entry
                </p>

                <h2 className="text-2xl font-bold mt-2">
                  Add Score
                </h2>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-[#16211B] flex items-center justify-center text-[#20E49B]">
                <Target size={22} />
              </div>

            </div>

            {/* INPUT */}
            <div className="space-y-5">

              <div>
                <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold block mb-3">
                  Stableford Value
                </label>

                <input
                  type="number"
                  value={scoreValue}
                  onChange={(e) =>
                    setScoreValue(e.target.value)
                  }
                  placeholder="Enter score 1 - 45"
                  className="w-full bg-[#131B17] border border-[#1E2923] rounded-2xl px-5 py-4 text-white outline-none focus:border-[#20E49B] transition-all placeholder:text-gray-500"
                />
              </div>

              <button
                onClick={addScore}
                className="w-full bg-[#1BD58F]  text-gray-600 font-black py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl shadow-[#20E49B]/10"
              >
                <Plus size={18} />
                Submit Score
              </button>

            </div>

            {/* SMALL STATS */}
            <div className="mt-10 pt-8 border-t border-[#1D2621] space-y-5">

              <div className="flex items-center justify-between">
                <span className="text-gray-400">
                  Highest Score
                </span>

                <span className="font-bold text-xl">
                  {scores.length > 0
                    ? Math.max(...scores.map((s) => s.value))
                    : 0}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400">
                  Average
                </span>

                <span className="font-bold text-xl">
                  {scores.length > 0
                    ? (
                        scores.reduce(
                          (acc, item) => acc + item.value,
                          0
                        ) / scores.length
                      ).toFixed(1)
                    : 0}
                </span>
              </div>

            </div>

          </div>

          {/* RIGHT PANEL */}
          <div className="bg-black border border-[#1A231E] rounded-[30px] p-6 md:p-8">

            <div className="flex items-center justify-between mb-8">

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">
                  Performance History
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  Recent Scores
                </h2>
              </div>

              <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-[#141C18] border border-[#1F2B24] text-[#20E49B] text-sm font-semibold">
                <Activity size={16} />
                Live Updates
              </div>

            </div>

            {/* SCORE LIST */}
            <div className="space-y-4">

              {scores.length === 0 ? (

                <div className="py-20 text-center border border-dashed border-[#1F2B24] rounded-3xl bg-black">

                  <div className="w-16 h-16 mx-auto rounded-2xl bg-black flex items-center justify-center text-[#20E49B] mb-5">
                    <Trophy size={28} />
                  </div>

                  <h3 className="text-xl font-bold">
                    No Scores Yet
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Your submitted scores will appear here.
                  </p>

                </div>

              ) : (

                scores.map((s, index) => (
                  <div
                    key={s._id}
                    className="group relative overflow-hidden hover:bg-[#18211C] border border-[#1E2923] rounded-3xl p-5 transition-all duration-300"
                  >

                    <div className="absolute top-0 left-0 h-full w-1 bg-[#20E49B]" />

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                      {/* LEFT */}
                      <div className="flex items-center gap-4">

                        <div className="w-14 h-14 rounded-2xl bg-[#1A241E] flex items-center justify-center text-[#20E49B] font-black text-lg">
                          #{index + 1}
                        </div>

                        <div>

                          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold mb-1">
                            Stableford Score
                          </p>

                          <h3 className="text-3xl font-black text-white">
                            {s.value}
                          </h3>

                        </div>

                      </div>

                      {/* RIGHT */}
                      <div className="flex items-center gap-3 text-gray-400 text-sm">

                        <CalendarDays size={16} />

                        {new Date(s.date).toLocaleDateString()}

                      </div>

                    </div>

                  </div>
                ))

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default UserScore;