// /* eslint-disable react-hooks/immutability */
// import React, { useEffect, useState } from "react";
// import { getDashboardData } from "../services/api";

// const DashBoard = () => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   const fetchDashboard = async () => {
//     try {
//       const res = await getDashboardData();
//       setData(res.data.data);
//     } catch (error) {
//       console.error(error);
//       alert("Failed to load dashboard");
//     }
//   };

//   if (!data) {
//     return <div className="p-10">Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-10">

//       <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

//       <div className="grid grid-cols-2 gap-6">

//         {/* Subscription Status */}
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="font-semibold text-lg">Subscription Status</h2>
//           <p className="text-green-600 mt-2 capitalize">
//             {data.subscriptionStatus}
//           </p>
//         </div>

//         {/* Renewal Date */}
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="font-semibold text-lg">Next Renewal</h2>
//           <p className="mt-2">
//             {data.subscriptionEnd
//               ? new Date(data.subscriptionEnd).toLocaleDateString()
//               : "N/A"}
//           </p>
//         </div>

//         {/* Charity */}
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="font-semibold text-lg">Selected Charity ❤️</h2>
//           <p className="mt-2">{data.charity}</p>
//         </div>

//         {/* Contribution */}
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="font-semibold text-lg">Contribution %</h2>
//           <p className="mt-2">{data.contribution}%</p>
//         </div>

//         {/* Winnings */}
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="font-semibold text-lg">Total Winnings 💰</h2>
//           <p className="mt-2">₹ {data.winnings}</p>
//         </div>

//         {/* Draw Status */}
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="font-semibold text-lg">Draw Participation 🎯</h2>
//           <p className="mt-2">{data.drawStatus}</p>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default DashBoard;


/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getDashboardData } from "../services/api";

const DashBoard = () => {
  const [data, setData] = useState(null);
  const [scores, setScores] = useState([]);
  const [scoreValue, setScoreValue] = useState("");

  const token = localStorage.getItem("token");

  // 🔥 FETCH DASHBOARD
  const fetchDashboard = async () => {
    try {
      const res = await getDashboardData();
      setData(res.data.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load dashboard");
    }
  };

  // 🔥 FETCH SCORES
  const fetchScores = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/score", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      setScores(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔥 ADD SCORE
  const addScore = async () => {
    try {
      if (!scoreValue || scoreValue < 1 || scoreValue > 45) {
        alert("Score must be between 1 and 45");
        return;
      }

      await fetch("http://localhost:3000/api/score/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          value: Number(scoreValue),
        }),
      });

      setScoreValue("");
      fetchScores(); // refresh

    } catch (error) {
      console.error(error);
    }
  };

  // 🔥 LOAD ALL DATA
  useEffect(() => {
    fetchDashboard();
    fetchScores();
  }, []);

  if (!data) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 gap-6">

        {/* Subscription */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold text-lg">Subscription Status</h2>
          <p className="text-green-600 mt-2 capitalize">
            {data.subscriptionStatus}
          </p>
        </div>

        {/* Renewal */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold text-lg">Next Renewal</h2>
          <p className="mt-2">
            {data.subscriptionEnd
              ? new Date(data.subscriptionEnd).toLocaleDateString()
              : "N/A"}
          </p>
        </div>

        {/* Charity */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold text-lg">Selected Charity ❤️</h2>
          <p className="mt-2">{data.charity}</p>
        </div>

        {/* Contribution */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold text-lg">Contribution %</h2>
          <p className="mt-2">{data.contribution}%</p>
        </div>

        {/* Winnings */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold text-lg">Total Winnings 💰</h2>
          <p className="mt-2">₹ {data.winnings}</p>
        </div>

        {/* Draw */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold text-lg">Draw Participation 🎯</h2>
          <p className="mt-2">{data.drawStatus}</p>
        </div>

        {/* 🏌️ SCORE SECTION */}
        <div className="bg-white p-6 rounded-xl shadow col-span-2">

          <h2 className="font-semibold text-lg mb-4">
            🏌️ Last 5 Scores
          </h2>

          {/* INPUT */}
          <div className="flex gap-2 mb-4">
            <input
              type="number"
              value={scoreValue}
              onChange={(e) => setScoreValue(e.target.value)}
              placeholder="Enter score (1-45)"
              className="border p-2 rounded w-40"
            />

            <button
              onClick={addScore}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Add Score
            </button>
          </div>

          {/* LIST */}
          <ul>
            {scores.length === 0 ? (
              <p>No scores yet</p>
            ) : (
              scores.map((s) => (
                <li key={s._id} className="py-1 border-b">
                  Score: {s.value} |{" "}
                  {new Date(s.date).toLocaleDateString()}
                </li>
              ))
            )}
          </ul>

        </div>

      </div>
    </div>
  );
};

export default DashBoard;