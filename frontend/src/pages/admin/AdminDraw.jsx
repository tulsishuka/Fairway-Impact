// import { useState } from "react";
// import axios from "axios";

// const AdminDraw = () => {
//   const [type, setType] = useState("random");
//   const token = localStorage.getItem("token");

//   const runDraw = async () => {
//     await axios.post(
//       "http://localhost:5000/api/draw/run",
//       { type },
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     alert("🎉 Draw completed!");
//   };

//   return (
//     <div>
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
//     </div>
//   );
// };

// export default AdminDraw;



import { useState } from "react";
import axios from "axios";

const AdminDraw = () => {
  const [type, setType] = useState("random");
  const [draw, setDraw] = useState(null);     // ✅ store draw
  const [results, setResults] = useState([]); // ✅ store winners

  const token = localStorage.getItem("token");

  const runDraw = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/draw/run",
        { type },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("🎉 Draw completed!");

      // ✅ SAVE DATA
      setDraw(res.data.draw);
      setResults(res.data.results);

    } catch (err) {
      console.error(err);
      alert("Draw failed");
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-xl font-bold mb-6">🎲 Draw</h1>

      {/* SELECT TYPE */}
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border p-2"
      >
        <option value="random">Random</option>
        <option value="algorithmic">Algorithmic</option>
      </select>

      {/* RUN BUTTON */}
      <button
        onClick={runDraw}
        className="ml-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Run Draw
      </button>

      {/* ✅ SHOW DRAW NUMBERS */}
      {draw && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">🎯 Draw Numbers</h2>
          <p>{draw.numbers.join(", ")}</p>
        </div>
      )}

    <div className="mt-10 bg-white p-6 rounded-xl shadow">
  <h2 className="text-xl font-bold mb-4">🏆 Winners</h2>

  {results.length === 0 && (
    <p>No results yet</p>
  )}

  {results.map((r) => (
    <div key={r._id} className="border-b py-3">

      <p><b>User:</b> {r.userId?.name || "Unknown"}</p>
      <p><b>Email:</b> {r.userId?.email}</p>

      <p><b>Matched:</b> {r.matchedNumbers}</p>
      <p><b>Reward:</b> {r.rewardType}</p>
      <p><b>Winnings:</b> ₹{r.winnings}</p>

    </div>
  ))}
</div>

    </div>
  );
};

export default AdminDraw;