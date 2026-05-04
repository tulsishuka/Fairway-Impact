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
    const res = await axios.get(
      "http://localhost:5000/api/admin/users-with-scores",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setUsers(res.data.data);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-6">🎯 Scores</h1>

      {users.map((u) => (
        <div key={u._id} className="bg-white p-4 mb-4 rounded shadow">
          <h2 className="font-bold">{u.name}</h2>

          <div className="flex gap-2 mt-2">
            {u.scores.map((s) => (
              <span key={s._id} className="bg-black text-white px-3 py-1 rounded">
                {s.value}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminScores;