
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getDashboardData } from "../../services/api";
import { Link } from "react-router-dom";
import axios from "axios";


const UserDashboard = () => {
  const [data, setData] = useState(null);
  const [results, setResults] = useState([]);



const fetchResults = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "https://fairway-impact.onrender.com/api/results/my-results",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setResults(res.data.results);

  } catch (error) {
    console.log(error);
  }
};


  const fetchDashboard = async () => {
    try {
      const res = await getDashboardData();
      const dashboard = res?.data?.data || res?.data;
      setData(dashboard);
    } catch (error) {
      console.error("Dashboard error:", error);
    }
  };


  useEffect(() => {
    fetchDashboard();
  }, []);

useEffect(() => {
  fetchDashboard();
  fetchResults();
}, []);
  


  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d110e] text-[#e4e7e5]">
        <div className="animate-pulse text-emerald-400 font-medium">
          Loading Dashboard...
        </div>
      </div>
    );
  }


  const scores = data.scores || [];




  return (
    <div className="min-h-screen bg-[#0d110e] text-[#e4e7e5]">
      <main className="max-w-7xl mx-auto p-6 md:p-10">

        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#39E596] to-[#2B82F6] bg-clip-text text-transparent">
              Welcome Back
            </h1>

            <p className="text-sm text-gray-400 mt-2">
              Manage your subscription, scores and participation activity.
            </p>
          </div>

          <div
            className={`px-4 py-2 rounded-xl border text-xs font-bold uppercase tracking-wider
            ${
              data.subscriptionStatus === "active"
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}
          >
            {data.subscriptionStatus}
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          {/* Subscription */}
          <div className="bg-black border border-[#1f2923] rounded-2xl p-5">
            <div className="text-xs uppercase tracking-wider text-gray-500">
              Subscription
            </div>

            <div className="mt-3 text-xl font-bold text-emerald-400">
              {data.subscriptionStatus}
            </div>

            <div className="mt-2 text-xs text-gray-400">
              Renewal Date
            </div>

            <div className="text-sm text-gray-200 mt-1">
              {data.subscriptionEnd
                ? new Date(data.subscriptionEnd).toLocaleDateString()
                : "N/A"}
            </div>
          </div>

          {/* Charity */}
          <div className="bg-black border border-[#1f2923] rounded-2xl p-5">
            <div className="text-xs uppercase text-gray-500">
              Charity Contribution
            </div>

            

            <div className="text-xl font-semibold text-[#BDFFDE] mt-2">
              {data.charity || "Greener Fairways"}
            </div>
          </div>

          {/* Draws Entered */}
          <div className="bg-black border border-[#1f2923] rounded-2xl p-5">
            <div className="text-xs uppercase tracking-wider text-gray-500">
              Draws Entered
            </div>

            <div className="text-3xl font-bold text-cyan-400 mt-4">
              {scores.length}
            </div>

            <div className="text-xs text-gray-500 mt-2">
              Total participated draws
            </div>
          </div>

          {/* Total Impact Points */}
          <div className="bg-black border border-[#1f2923] p-6 rounded-2xl">
            <h3 className="text-lg font-bold mb-4">
              Recent Activity
            </h3>

            {scores.length === 0 ? (
              <p className="text-gray-500">No scores yet</p>
            ) : (
              scores.slice(0, 5).map((s) => (
                <div
                  key={s._id}
                  className="flex justify-between border-b border-gray-800 py-2"
                >
                  <span className="text-emerald-400">
                    {s.value}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {new Date(s.date).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Performance Chart Simulation Container */}
          <div className="bg-black border border-[#1f2923] p-6 rounded-2xl lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-gray-200">Performance Analysis</h3>
                <p className="text-xs text-gray-500">Recent Stableford Scores (Last 10 Rounds)</p>
              </div>
              <select className="bg-[#1c241f] border border-[#2d3a32] text-xs font-medium text-gray-300 rounded-lg px-2.5 py-1.5 outline-none">
                <option>Last 30 Days</option>
                <option>Last 6 Months</option>
              </select>
            </div>

            {/* Simulated Clean Bar Graph CSS Layout */}
            <div className="h-44 flex items-end justify-between gap-2 pt-4 px-2">
              <div className="w-full flex flex-col items-center gap-2">
                <div className="w-full bg-[#1c241f] rounded-t-md h-24 relative"><div className="absolute bottom-0 w-full bg-emerald-700/40 rounded-t-md h-3/4"></div></div>
                <span className="text-[10px] text-gray-500">RD 01</span>
              </div>
              <div className="w-full flex flex-col items-center gap-2">
                <div className="w-full bg-[#1c241f] rounded-t-md h-24 relative"><div className="absolute bottom-0 w-full bg-emerald-700/40 rounded-t-md h-5/6"></div></div>
                <span className="text-[10px] text-gray-500">RD 02</span>
              </div>
              <div className="w-full flex flex-col items-center gap-2">
                <div className="w-full bg-[#1c241f] rounded-t-md h-24 relative"><div className="absolute bottom-0 w-full bg-emerald-400 rounded-t-md h-[95%] shadow-[0_0_12px_rgba(52,211,153,0.3)]"></div></div>
                <span className="text-[10px] text-gray-500">RD 03</span>
              </div>
              <div className="w-full flex flex-col items-center gap-2">
                <div className="w-full bg-[#1c241f] rounded-t-md h-24 relative"><div className="absolute bottom-0 w-full bg-emerald-700/40 rounded-t-md h-1/2"></div></div>
                <span className="text-[10px] text-gray-500">RD 04</span>
              </div>
              <div className="w-full flex flex-col items-center gap-2">
                <div className="w-full bg-[#1c241f] rounded-t-md h-24 relative"><div className="absolute bottom-0 w-full bg-emerald-700/40 rounded-t-md h-2/3"></div></div>
                <span className="text-[10px] text-gray-500">RD 05</span>
              </div>
              <div className="w-full flex flex-col items-center gap-2">
                <div className="w-full bg-[#1c241f] rounded-t-md h-24 relative"><div className="absolute bottom-0 w-full bg-emerald-700/40 rounded-t-md h-[90%]"></div></div>
                <span className="text-[10px] text-gray-500">RD 06</span>
              </div>
              <div className="w-full flex flex-col items-center gap-2">
                <div className="w-full bg-[#1c241f] rounded-t-md h-24 relative"><div className="absolute bottom-0 w-full bg-emerald-700/40 rounded-t-md h-3/5"></div></div>
                <span className="text-[10px] text-gray-500">RD 07</span>
              </div>
            </div>
          </div>

          <div className="bg-black border border-[#1f2923] p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="bg-[#22c55e]/10 text-emerald-400 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md border border-emerald-500/20">
                  {data.subscriptionStatus || "Pro Level"}
                </span>
                <span className="text-emerald-400 text-sm">✔</span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-100 mt-4">
                Member Since 2023
              </h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                Your contributions provided clean water for over 500 families this year. Renewing on{" "}
                <span className="text-gray-300 font-medium">
                  {data.subscriptionEnd ? new Date(data.subscriptionEnd).toLocaleDateString() : "N/A"}
                </span>.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1f2923]/60">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="text-gray-400 font-medium">Impact Goal</span>
                <span className="text-emerald-400 font-bold">85%</span>
              </div>
              <div className="w-full bg-[#1c241f] h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: "85%" }}></div>
              </div>
              <Link to="/Subscription"><button className="w-full mt-5 bg-[#1c241f] hover:bg-[#242f28] border border-[#2d3a32] text-gray-200 text-xs font-semibold py-2.5 rounded-xl transition  ">
                Manage Subscription
              </button></Link>
            </div>
          </div>

        </section>

<section className="mb-8 w-full">

  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

    <h3 className="text-2xl md:text-3xl font-bold text-white">
      My Results
    </h3>

    <span className="text-sm text-gray-500">
      {results.length} Results
    </span>

  </div>

  {results.length === 0 ? (

    <div className="bg-black border border-[#1f2923] rounded-2xl p-6 text-center text-gray-500">
      No results available
    </div>

  ) : (

    <div className="flex flex-col gap-6 w-full">

      {results.map((r) => (

        <div
          key={r._id}
          className="bg-black border border-[#1f2923] rounded-3xl p-4 sm:p-6 w-full overflow-hidden"
        >

          <div className="flex flex-col xl:flex-row justify-between gap-6 w-full">

            {/* LEFT CONTENT */}
            <div className="flex-1 min-w-0">

              <h2 className="text-xl sm:text-2xl font-bold text-emerald-400 break-words">
                {r.rewardType?.toUpperCase()}
              </h2>

              <p className="text-gray-400 mt-3 text-sm sm:text-base">
                Matched Numbers:
                <span className="text-white ml-2">
                  {r.matchedNumbers}
                </span>
              </p>

              <p className="text-yellow-400 font-bold text-lg sm:text-2xl mt-3 break-words">
                ₹{r.winnings}
              </p>

              <p className="mt-4 text-sm flex flex-wrap items-center gap-2">

                <span className="text-gray-400">
                  Verification:
                </span>

                <span
                  className={`font-semibold
                  ${
                    r.verificationStatus === "approved"
                      ? "text-emerald-400"
                      : r.verificationStatus === "rejected"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }`}
                >
                  {r.verificationStatus}
                </span>

              </p>

              <p className="text-xs text-gray-500 mt-3">
                {new Date(r.createdAt).toLocaleDateString()}
              </p>

            </div>

            {/* IMAGE */}
            {r.proofImage && (

              <div className="w-full xl:w-auto flex justify-center">

                <div className="bg-[#111] rounded-2xl p-3 border border-gray-800 w-full sm:w-auto">

                  <img
                    src={`https://givehope-platform-4.onrender.com/uploads/${r.proofImage}`}
                    alt="proof"
                    className="
                      w-full
                      sm:w-[320px]
                      md:w-[400px]
                      lg:w-[500px]
                      max-h-[420px]
                      rounded-2xl
                      object-contain
                    "
                  />

                </div>

              </div>

            )}

          </div>

        </div>

      ))}

    </div>

  )}

</section>
      </main>
    </div>
  );
};


export default UserDashboard;