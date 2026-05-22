// /* eslint-disable react-hooks/immutability */

// import { useEffect, useState } from "react";
// import axios from "axios";

// const AdminWinners = () => {
//   const [results, setResults] = useState([]);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchResults();
//   }, []);

//   const fetchResults = async () => {
//     const res = await axios.get(
//       "https://givehope-platform-4.onrender.com/api/admin/results",
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     setResults(res.data.data);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-10">
//       <div className="mb-8">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
//           🏆 Winners Dashboard
//         </h1>
     
//       </div>
//       <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">

//         {results.map((r) => (
//           <div
//             key={r._id}
//             className="bg-white rounded-2xl shadow hover:shadow-lg transition p-5 border"
//           >
//             <h2 className="text-lg font-bold text-gray-800">
//               {r.userId?.name || "Unknown User"}
//             </h2>

//             <div className="mt-3">
//               <p className="text-sm text-gray-500">Matched Numbers</p>
//               <div className="flex flex-wrap gap-2 mt-1">
//                 <span className="bg-black text-white px-3 py-1 rounded-full text-xs">
//                   {r.matchedNumbers}
//                 </span>
//               </div>
//             </div>

//             <div className="mt-4">
//               <p className="text-sm text-gray-500">Winnings</p>
//               <p className="text-2xl font-bold text-green-600">
//                 ₹{r.winnings}
//               </p>
//             </div>

//           </div>
//         ))}

//       </div>

//       <div className="grid gap-4 md:hidden">

//         {results.map((r) => (
//           <div
//             key={r._id}
//             className="bg-white rounded-xl shadow p-4 border"
//           >

//             <div className="flex justify-between items-center">
//               <h2 className="font-bold text-gray-800">
//                 {r.userId?.name || "Unknown"}
//               </h2>

//               <span className="text-green-600 font-bold">
//                 ₹{r.winnings}
//               </span>
//             </div>

//             <p className="text-sm text-gray-500 mt-2">
//               Matched:{" "}
//               <span className="text-black font-medium">
//                 {r.matchedNumbers}
//               </span>
//             </p>

//           </div>
//         ))}

//       </div>
//       {results.length === 0 && (
//         <div className="text-center text-gray-400 mt-20">
//           No winners yet 🏆
//         </div>
//       )}

//     </div>
//   );
// };

// export default AdminWinners;



/* eslint-disable react-hooks/immutability */

import { useEffect, useState } from "react";
import axios from "axios";

const AdminWinners = () => {
  const [results, setResults] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    const res = await axios.get(
      "https://givehope-platform-4.onrender.com/api/admin/results",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setResults(res.data.data);
  };

  return (
    <div className="min-h-screen bg-[#0d110e] text-[#e4e7e5] p-4 sm:p-6 lg:p-8">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-10">

        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            🏆 Winners Dashboard
          </h1>

          <p className="text-sm text-gray-400 mt-2 max-w-2xl">
            Track prize winners, successful draw participants, and platform reward distributions in real time.
          </p>
        </div>

        <div className="bg-[#131915] border border-[#1f2923] px-4 py-2 rounded-xl text-sm text-yellow-400 font-semibold flex items-center gap-2 w-fit">
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
          Live Winner Tracking
        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">

        <div className="bg-[#131915] border border-[#1f2923] rounded-2xl p-6">
          <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
            Total Winners
          </div>

          <h2 className="text-3xl font-black text-white mt-3">
            {results.length}
          </h2>

          <p className="text-xs text-emerald-400 mt-2">
            Rewarded participants
          </p>
        </div>

        <div className="bg-[#131915] border border-[#1f2923] rounded-2xl p-6">
          <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
            Distribution Status
          </div>

          <h2 className="text-3xl font-black text-yellow-400 mt-3">
            Active
          </h2>

          <p className="text-xs text-gray-400 mt-2">
            Prize system operational
          </p>
        </div>

        <div className="bg-[#131915] border border-[#1f2923] rounded-2xl p-6">
          <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
            Reward Engine
          </div>

          <h2 className="text-3xl font-black text-cyan-400 mt-3">
            Online
          </h2>

          <p className="text-xs text-gray-400 mt-2">
            Real-time winner calculations
          </p>
        </div>

      </div>

      {/* WINNERS GRID */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {results.map((r) => (
            <div
              key={r._id}
              className="group bg-[#131915] border border-[#1f2923] rounded-3xl overflow-hidden hover:border-yellow-500/40 transition-all duration-300 hover:-translate-y-1 shadow-xl"
            >

              {/* TOP SECTION */}
              <div className="relative h-36 bg-gradient-to-br from-yellow-500/10 via-[#131915] to-[#0d110e] overflow-hidden">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(250,204,21,0.15),transparent_60%)]" />

                <div className="absolute top-5 right-5 bg-black/40 border border-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-yellow-400">
                  Winner
                </div>

                <div className="absolute bottom-5 left-5 flex items-center gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-2xl font-bold text-yellow-400">
                    🏆
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-white">
                      {r.userId?.name || "Unknown User"}
                    </h2>

                    <p className="text-xs text-gray-400 mt-1">
                      Reward Participant
                    </p>
                  </div>

                </div>

              </div>

              {/* CONTENT */}
              <div className="p-6 space-y-5">

                {/* MATCHED NUMBERS */}
                <div className="bg-[#1b231e] border border-[#25312a] rounded-2xl p-4">

                  <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3">
                    Matched Numbers
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="bg-yellow-500 text-black px-4 py-2 rounded-xl text-sm font-bold shadow-lg">
                      {r.matchedNumbers}
                    </span>
                  </div>

                </div>

                {/* WINNINGS */}
                <div className="flex items-center justify-between bg-[#1b231e] border border-[#25312a] rounded-2xl p-4">

                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                      Prize Amount
                    </p>

                    <h3 className="text-3xl font-black text-emerald-400 mt-2">
                      ₹{r.winnings}
                    </h3>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xl">
                    💰
                  </div>

                </div>

                {/* FOOTER */}
                <div className="pt-4 border-t border-[#1f2923] flex items-center justify-between">

                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                      Reward Status
                    </p>

                    <p className="text-sm font-semibold text-yellow-400 mt-1">
                      Successfully Processed
                    </p>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
                    ✓
                  </div>

                </div>

              </div>

            </div>
          ))}

        </div>
      ) : (
        <div className="bg-[#131915] border border-[#1f2923] rounded-3xl py-24 flex flex-col items-center justify-center text-center">

          <div className="w-20 h-20 rounded-full bg-[#1b231e] border border-[#2b3830] flex items-center justify-center text-4xl mb-5">
            🏆
          </div>

          <h2 className="text-2xl font-bold text-white">
            No Winners Yet
          </h2>

          <p className="text-sm text-gray-500 mt-3 max-w-md">
            Prize draw winners will appear here once the draw process has been completed.
          </p>

        </div>
      )}

    </div>
  );
};

export default AdminWinners;