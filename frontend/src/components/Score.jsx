// import React, { useEffect, useState } from "react";
// const Score = () => {
//   const [scores, setScores] = useState([]);
//   const [scoreValue, setScoreValue] = useState("");
//   const token = localStorage.getItem("token");

//   // FETCH SCORES
//   const fetchScores = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/score", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const result = await res.json();
//       setScores(result.data || []);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // ADD SCORE
//   const addScore = async () => {
//     try {
//       if (!scoreValue || scoreValue < 1 || scoreValue > 45) {
//         alert("Score must be between 1 and 45");
//         return;
//       }

//       await fetch("https://givehope-platform-4.onrender.com/api/score/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           value: Number(scoreValue),
//         }),
//       }).then(async (res) => {
//         const data = await res.json();
//         if (!res.ok) throw new Error(data.message);
//         return data;
//       });

//       setScoreValue("");
//       fetchScores();
//     } catch (error) {
//       alert(error.message || "Something went wrong");
//     }
//   };

//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     fetchScores();
//   }, []);

//   return (
//     <div className="mt-8  backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl text-white">

//       <h2 className="text-xl font-semibold mb-5">
//        Create 5 Scores
//       </h2>
//       <div className="flex flex-col sm:flex-row gap-3 mb-6">

//         <input
//           type="number"
//           value={scoreValue}
//           onChange={(e) => setScoreValue(e.target.value)}
//           placeholder="Enter score (1-45)"
//           className="w-full sm:w-48 px-4 py-3 rounded-xl bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
//         />

//         <button
//           onClick={addScore}
//           className="px-5 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 transition shadow-lg hover:shadow-blue-500/30"
//         >
//           Add Score
//         </button>
//       </div>
//       <div className="space-y-2">

//         {scores.length === 0 ? (
//           <p className="text-gray-300 text-sm">No scores yet</p>
//         ) : (
//           scores.map((s) => (
//             <div
//               key={s._id}
//               className="flex justify-between items-center px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
//             >
//               <span className="text-cyan-300 font-medium">
//                 Score: {s.value}
//               </span>

//               <span className="text-gray-300 text-sm">
//                 {new Date(s.date).toLocaleDateString()}
//               </span>
//             </div>
//           ))
//         )}

//       </div>
//     </div>
//   );
// };

// export default Score;





