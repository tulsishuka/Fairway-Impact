// /* eslint-disable react-hooks/immutability */
// import { useEffect, useState } from "react";
// import axios from "axios";

// const AdminScores = () => {
//   const [users, setUsers] = useState([]);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchScores();
//   }, []);

//   const fetchScores = async () => {
//     const res = await axios.get(
//       "https://givehope-platform-4.onrender.com/api/admin/users-with-scores",
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     setUsers(res.data.data);
//   };

//   return (
//     <div>
//       <h1 className="text-xl font-bold mb-6 bg-[#090F0C]">🎯 Scores</h1>

//       {users.map((u) => (
//         <div key={u._id} className="bg-white p-4 mb-4 rounded shadow">
//           <h2 className="font-bold">{u.name}</h2>

//           <div className="flex gap-2 mt-2">
//             {u.scores.map((s) => (
//               <span key={s._id} className="bg-black text-white px-3 py-1 rounded">
//                 {s.value}
//               </span>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>


      
//   );
// };

// export default AdminScores;






/* eslint-disable react-hooks/immutability */

import { useEffect, useState } from "react";
import axios from "axios";

const AdminScores = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    try {
      const res = await axios.get(
        "https://givehope-platform-4.onrender.com/api/admin/users-with-scores",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUsers(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-[#0d110e] text-[#e4e7e5] min-h-screen font-sans">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-100">
            Score Analytics
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            Track player performance and submitted round scores
          </p>
        </div>

        <div className="bg-[#131915] border border-[#212f26] px-4 py-2 rounded-full flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wide uppercase w-fit">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          {users.length} Player Records
        </div>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        <StatsCard
          title="Total Players"
          value={users.length}
          icon="👥"
          color="text-cyan-400"
          bg="bg-cyan-500/10"
        />

        <StatsCard
          title="Scores Submitted"
          value={users.reduce(
            (acc, user) => acc + user.scores.length,
            0
          )}
          icon="🎯"
          color="text-emerald-400"
          bg="bg-emerald-500/10"
        />

        <StatsCard
          title="Highest Score"
          value={
            Math.max(
              ...users.flatMap((u) =>
                u.scores.map((s) => s.value)
              ),
              0
            ) || 0
          }
          icon="🏆"
          color="text-orange-400"
          bg="bg-orange-500/10"
        />

        <StatsCard
          title="Active Golfers"
          value={
            users.filter((u) => u.scores.length > 0).length
          }
          icon="⛳"
          color="text-pink-400"
          bg="bg-pink-500/10"
        />
      </section>

      {/* DESKTOP TABLE */}
      <div className="hidden xl:block overflow-hidden rounded-3xl border border-[#1f2923] bg-[#131915] shadow-xl mb-8">

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-[#161d19] border-b border-[#1f2923] text-gray-300">

              <tr>
                <th className="p-5 text-left">Player</th>
                <th className="text-left">Total Scores</th>
                <th className="text-left">Performance</th>
                <th className="text-left">Score List</th>
              </tr>

            </thead>

            <tbody>

              {users.map((u) => (
                <tr
                  key={u._id}
                  className="border-b border-[#1f2923] hover:bg-[#161d19] transition"
                >

                  {/* USER */}
                  <td className="p-5">
                    <div className="flex items-center gap-4">

                      <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold">
                        {u.name?.charAt(0)}
                      </div>

                      <div>
                        <div className="font-semibold text-gray-100">
                          {u.name}
                        </div>

                        <div className="text-xs text-gray-500 mt-1">
                          {u.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* TOTAL SCORES */}
                  <td>
                    <span className="text-cyan-400 font-semibold">
                      {u.scores.length} Scores
                    </span>
                  </td>

                  {/* PERFORMANCE */}
                  <td>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Active Player
                    </span>
                  </td>

                  {/* SCORES */}
                  <td>

                    <div className="flex flex-wrap gap-2 max-w-md">

                      {u.scores.length > 0 ? (
                        u.scores.map((s) => (
                          <span
                            key={s._id}
                            className="bg-[#1c241f] border border-[#2d3a32] text-emerald-400 px-3 py-1 rounded-lg text-xs font-semibold"
                          >
                            {s.value}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500 text-xs">
                          No Scores Submitted
                        </span>
                      )}
                    </div>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>
        </div>
      </div>

      {/* MOBILE CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 xl:hidden">

        {users.map((u) => (
          <div
            key={u._id}
            className="bg-[#131915] border border-[#1f2923] rounded-2xl p-5"
          >

            {/* TOP */}
            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold text-lg">
                {u.name?.charAt(0)}
              </div>

              <div>
                <h2 className="font-bold text-gray-100">
                  {u.name}
                </h2>

                <p className="text-xs text-gray-500 mt-1 break-all">
                  {u.email}
                </p>
              </div>
            </div>

            {/* DETAILS */}
            <div className="mt-5 space-y-3">

              <InfoRow
                label="Scores Submitted"
                value={`${u.scores.length}`}
                valueClass="text-cyan-400"
              />

              <InfoRow
                label="Status"
                value="Active Player"
                valueClass="text-emerald-400"
              />
            </div>

            {/* SCORES */}
            <div className="mt-5">

              <p className="text-xs uppercase tracking-wide text-gray-500 mb-3">
                Submitted Scores
              </p>

              <div className="flex flex-wrap gap-2">

                {u.scores.length > 0 ? (
                  u.scores.map((s) => (
                    <span
                      key={s._id}
                      className="bg-[#1c241f] border border-[#2d3a32] text-emerald-400 px-3 py-1.5 rounded-lg text-xs font-semibold"
                    >
                      {s.value}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 text-xs">
                    No Scores Submitted
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatsCard = ({ title, value, icon, color, bg }) => (
  <div className="bg-[#131915] border border-[#1f2923] p-5 rounded-2xl">

    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${bg}`}>
      {icon}
    </div>

    <div className="mt-5">
      <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">
        {title}
      </div>

      <div className={`text-2xl font-bold mt-2 ${color}`}>
        {value}
      </div>
    </div>
  </div>
);

const InfoRow = ({ label, value, valueClass = "text-gray-300" }) => (
  <div className="flex items-center justify-between border-b border-[#1f2923] pb-2">

    <span className="text-gray-500 text-xs uppercase tracking-wide">
      {label}
    </span>

    <span className={`font-medium text-sm ${valueClass}`}>
      {value}
    </span>
  </div>
);

export default AdminScores;
