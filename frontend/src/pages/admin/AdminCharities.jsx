


// import { useEffect, useState } from "react";
// import axios from "axios";

// const AdminCharities = () => {
//   const [charities, setCharities] = useState([]);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/immutability
//     fetchCharities();
//   }, []);

//   const fetchCharities = async () => {
//     try {
//       const res = await axios.get(
//         "https://givehope-platform-4.onrender.com/api/admin/charity",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setCharities(res.data.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-10 py-8">

//       {/* HEADER */}
//       <div className="mb-8">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
//            Charities Dashboard
//         </h1>
      
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

//         {charities.length > 0 ? (
//           charities.map((c) => (
//             <div
//               key={c._id}
//               className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 p-5 flex flex-col gap-3"
//             >
//               <h2 className="text-lg font-semibold text-gray-800 truncate">
//                 {c.name}
//               </h2>
//               <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
//                 <div
//                   className="h-full bg-green-500 rounded-full"
//                   style={{ width: `${c.percentage}%` }}
//                 ></div>
//               </div>
//               <p className="text-sm text-gray-600">
//                 Contribution:{" "}
//                 <span className="font-semibold text-green-600">
//                   {c.percentage}%
//                 </span>
//               </p>
//               <div className="mt-2">
//                 <span className="inline-block px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
//                   Active Charity
//                 </span>
//               </div>

//             </div>
//           ))
//         ) : (
//           <div className="col-span-full text-center py-20 text-gray-400">
//             No charities found
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default AdminCharities;





import { useEffect, useState } from "react";
import axios from "axios";

const AdminCharities = () => {
  const [charities, setCharities] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCharities();
  }, []);

  const fetchCharities = async () => {
    try {
      const res = await axios.get(
        "https://givehope-platform-4.onrender.com/api/admin/charity",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCharities(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d110e] text-[#e4e7e5] p-4 sm:p-6 lg:p-8">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-10">

        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
             Charities Dashboard
          </h1>

          <p className="text-sm text-gray-400 mt-2 max-w-2xl">
            Manage active humanitarian organizations and monitor contribution allocations across the Fairway Impact ecosystem.
          </p>
        </div>

        <div className="bg-[#131915] border border-[#1f2923] px-4 py-2 rounded-xl text-sm text-emerald-400 font-semibold flex items-center gap-2 w-fit">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Active Charity Network
        </div>

      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">

        <div className="bg-[#131915] border border-[#1f2923] rounded-2xl p-6">
          <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
            Total Organizations
          </div>

          <h2 className="text-3xl font-black text-white mt-3">
            {charities.length}
          </h2>

          <p className="text-xs text-emerald-400 mt-2">
            Verified charity partners
          </p>
        </div>

        <div className="bg-[#131915] border border-[#1f2923] rounded-2xl p-6">
          <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
            Contribution Model
          </div>

          <h2 className="text-3xl font-black text-emerald-400 mt-3">
            Dynamic
          </h2>

          <p className="text-xs text-gray-400 mt-2">
            Smart percentage allocation
          </p>
        </div>

        <div className="bg-[#131915] border border-[#1f2923] rounded-2xl p-6">
          <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
            Platform Status
          </div>

          <h2 className="text-3xl font-black text-cyan-400 mt-3">
            Live
          </h2>

          <p className="text-xs text-gray-400 mt-2">
            Real-time impact distribution
          </p>
        </div>

      </div>

      {/* CHARITIES GRID */}
      {charities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {charities.map((c) => (
            <div
              key={c._id}
              className="group bg-[#131915] border border-[#1f2923] rounded-3xl overflow-hidden hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1 shadow-xl"
            >

              {/* TOP BANNER */}
              <div className="relative h-40 bg-gradient-to-br from-emerald-500/10 via-[#131915] to-[#0d110e] overflow-hidden">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.15),transparent_60%)]" />

                <div className="absolute top-5 right-5 bg-black/40 border border-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-emerald-400">
                  Active
                </div>

                <div className="absolute bottom-5 left-5">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-2xl">
                    🌱
                  </div>
                </div>

              </div>

              {/* CONTENT */}
              <div className="p-6 space-y-5">

                <div>
                  <h2 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {c.name}
                  </h2>

                  <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                    This organization receives impact contributions from player participation and ecosystem activities.
                  </p>
                </div>

                {/* PROGRESS */}
                <div className="space-y-3">

                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                      Contribution Allocation
                    </span>

                    <span className="text-sm font-bold text-emerald-400">
                      {c.percentage}%
                    </span>
                  </div>

                  <div className="w-full h-3 bg-[#1c241f] rounded-full overflow-hidden border border-[#25312a]">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-700"
                      style={{ width: `${c.percentage}%` }}
                    />
                  </div>

                </div>

                {/* FOOTER */}
                <div className="pt-4 border-t border-[#1f2923] flex items-center justify-between">

                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                      Status
                    </p>

                    <p className="text-sm font-semibold text-emerald-400 mt-1">
                      Accepting Contributions
                    </p>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
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
            🌱
          </div>

          <h2 className="text-2xl font-bold text-white">
            No Charities Found
          </h2>

          <p className="text-sm text-gray-500 mt-3 max-w-md">
            No active charity organizations are currently available in the ecosystem.
          </p>

        </div>
      )}

    </div>
  );
};

export default AdminCharities;