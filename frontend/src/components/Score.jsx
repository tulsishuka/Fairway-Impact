import React, { useEffect, useState } from "react";

const Score = () => {
  const [scores, setScores] = useState([]);
  const [scoreValue, setScoreValue] = useState("");
  const token = localStorage.getItem("token");

  // 🔥 FETCH SCORES
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
    }).then(async (res) => {
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      return data;
    });

    setScoreValue("");
    fetchScores();

  } catch (error) {
    alert(error.message || "Something went wrong");
  }
};

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchScores();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-6">

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
  );
};

export default Score;