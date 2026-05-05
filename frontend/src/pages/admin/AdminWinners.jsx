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
      "http://localhost:5000/api/admin/results",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setResults(res.data.data);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          🏆 Winners Dashboard
        </h1>
     
      </div>
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">

        {results.map((r) => (
          <div
            key={r._id}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition p-5 border"
          >
            <h2 className="text-lg font-bold text-gray-800">
              {r.userId?.name || "Unknown User"}
            </h2>

            <div className="mt-3">
              <p className="text-sm text-gray-500">Matched Numbers</p>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="bg-black text-white px-3 py-1 rounded-full text-xs">
                  {r.matchedNumbers}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-500">Winnings</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{r.winnings}
              </p>
            </div>

          </div>
        ))}

      </div>

      <div className="grid gap-4 md:hidden">

        {results.map((r) => (
          <div
            key={r._id}
            className="bg-white rounded-xl shadow p-4 border"
          >

            <div className="flex justify-between items-center">
              <h2 className="font-bold text-gray-800">
                {r.userId?.name || "Unknown"}
              </h2>

              <span className="text-green-600 font-bold">
                ₹{r.winnings}
              </span>
            </div>

            <p className="text-sm text-gray-500 mt-2">
              Matched:{" "}
              <span className="text-black font-medium">
                {r.matchedNumbers}
              </span>
            </p>

          </div>
        ))}

      </div>
      {results.length === 0 && (
        <div className="text-center text-gray-400 mt-20">
          No winners yet 🏆
        </div>
      )}

    </div>
  );
};

export default AdminWinners;