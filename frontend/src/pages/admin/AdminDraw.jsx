
// import { useState } from "react";
// import axios from "axios";

// const AdminDraw = () => {
//   const [type, setType] = useState("random");
//   const [draw, setDraw] = useState(null);    
//   const [results, setResults] = useState([]); 

//   const token = localStorage.getItem("token");

//   const runDraw = async () => {
//     try {
//       const res = await axios.post(
//         "https://givehope-platform-4.onrender.com/api/draw/run",
//         { type },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       alert("🎉 Draw completed!");

//       setDraw(res.data.draw);
//       setResults(res.data.results);

//     } catch (err) {
//       console.error(err);
//       alert("Draw failed");
//     }
//   };

//   return (
//     <div className="p-6">

//       <h1 className="text-xl font-bold mb-6">🎲 Draw</h1>

//       <select
//         value={type}
//         onChange={(e) => setType(e.target.value)}
//         className="border p-2"
//       >
//         <option value="random">Random</option>
//         <option value="algorithmic">Algorithmic</option>
//       </select>
//       <button
//         onClick={runDraw}
//         className="ml-4 bg-green-600 text-white px-4 py-2 rounded"
//       >
//         Run Draw
//       </button>

//       {draw && (
//         <div className="mt-6 bg-white p-4 rounded shadow">
//           <h2 className="font-bold mb-2">Draw Numbers</h2>
//           <p>{draw.numbers.join(", ")}</p>
//         </div>
//       )}

//     <div className="mt-10 bg-white p-6 rounded-xl shadow">
//   <h2 className="text-xl font-bold mb-4">🏆 Winners</h2>

//   {results.length === 0 && (
//     <p>No results yet</p>
//   )}

//   {results.map((r) => (
//     <div key={r._id} className="border-b py-3">

//       <p><b>User:</b> {r.userId?.name || "Unknown"}</p>
//       <p><b>Email:</b> {r.userId?.email}</p>

//       <p><b>Matched:</b> {r.matchedNumbers}</p>
//       <p><b>Reward:</b> {r.rewardType}</p>
//       <p><b>Winnings:</b> ₹{r.winnings}</p>

//     </div>
//   ))}
// </div>

//     </div>
//   );
// };

// export default AdminDraw;



import { useState } from "react";
import axios from "axios";

const AdminDraw = () => {
  const [type, setType] = useState("random");
  const [draw, setDraw] = useState(null);
  const [results, setResults] = useState([]);

  const token = localStorage.getItem("token");

  const runDraw = async () => {
    try {
      const res = await axios.post(
        "https://givehope-platform-4.onrender.com/api/draw/run",
        { type },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("🎉 Draw completed!");

      setDraw(res.data.draw);
      setResults(res.data.results);
    } catch (err) {
      console.error(err);
      alert("Draw failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0d110e] text-[#e4e7e5] p-4 sm:p-6 lg:p-8">
      
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            🎲 Draw Management
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            Execute prize draws and manage winners
          </p>
        </div>

        <div className="bg-[#131915] border border-[#1f2923] px-4 py-2 rounded-xl text-sm text-emerald-400 font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Live Draw Engine
        </div>

      </div>

      {/* CONTROL PANEL */}
      <div className="bg-[#131915] border border-[#1f2923] rounded-3xl p-6 mb-8 shadow-xl">
        
        <div className="flex flex-col md:flex-row gap-4 md:items-end">

          <div className="flex-1">
            <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
              Draw Type
            </label>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full mt-2 bg-[#1b231e] border border-[#2b3830] text-white px-4 py-3 rounded-xl outline-none focus:border-emerald-500 transition"
            >
              <option value="random">Random Draw</option>
              <option value="algorithmic">Algorithmic Draw</option>
            </select>
          </div>

          <button
            onClick={runDraw}
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20 hover:scale-[1.02]"
          >
            Run Draw
          </button>

        </div>

      </div>

      {/* DRAW NUMBERS */}
      {draw && (
        <div className="bg-[#131915] border border-[#1f2923] rounded-3xl p-6 mb-8 shadow-xl">
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">
                🎯 Winning Numbers
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Generated draw combination
              </p>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              Completed
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {draw.numbers.map((num, index) => (
              <div
                key={index}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-xl font-black text-black shadow-lg"
              >
                {num}
              </div>
            ))}
          </div>

        </div>
      )}

      {/* WINNERS SECTION */}
      <div className="bg-[#131915] border border-[#1f2923] rounded-3xl p-6 shadow-xl">
        
        <div className="flex items-center justify-between mb-8">
          
          <div>
            <h2 className="text-2xl font-bold text-white">
              🏆 Winners
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Latest prize draw results
            </p>
          </div>

          <div className="bg-[#1b231e] border border-[#2b3830] px-4 py-2 rounded-xl text-sm text-gray-300">
            {results.length} Winners
          </div>

        </div>

        {results.length === 0 ? (
          <div className="text-center py-16">
            
            <div className="w-20 h-20 mx-auto rounded-full bg-[#1b231e] border border-[#2b3830] flex items-center justify-center text-3xl mb-4">
              🎲
            </div>

            <h3 className="text-lg font-semibold text-gray-300">
              No Draw Results Yet
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Run a draw to generate winners
            </p>

          </div>
        ) : (
          <div className="space-y-5">

            {results.map((r) => (
              <div
                key={r._id}
                className="bg-[#1b231e] border border-[#2b3830] rounded-2xl p-5 hover:border-emerald-500/40 transition-all"
              >
                
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  
                  {/* USER INFO */}
                  <div className="space-y-3">
                    
                    <div className="flex items-center gap-3">
                      
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-lg">
                        {r.userId?.name?.charAt(0) || "U"}
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {r.userId?.name || "Unknown"}
                        </h3>

                        <p className="text-sm text-gray-400">
                          {r.userId?.email}
                        </p>
                      </div>

                    </div>

                    <div className="flex flex-wrap gap-3">
                      
                      <div className="bg-[#131915] border border-[#25312a] px-3 py-1 rounded-lg text-xs text-gray-300">
                        🎯 Matched:{" "}
                        <span className="text-emerald-400 font-bold">
                          {r.matchedNumbers}
                        </span>
                      </div>

                      <div className="bg-[#131915] border border-[#25312a] px-3 py-1 rounded-lg text-xs text-gray-300">
                        🏆 Reward:{" "}
                        <span className="text-yellow-400 font-bold">
                          {r.rewardType}
                        </span>
                      </div>

                    </div>

                  </div>

                  {/* WINNING */}
                  <div className="text-left lg:text-right">
                    
                    <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                      Winnings
                    </p>

                    <h2 className="text-3xl font-black text-emerald-400 mt-1">
                      ₹{r.winnings}
                    </h2>

                    <p className="text-xs text-gray-500 mt-1">
                      Prize Distributed Successfully
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default AdminDraw;