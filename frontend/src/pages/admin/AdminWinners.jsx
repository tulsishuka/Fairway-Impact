import { useEffect, useState } from "react";
import axios from "axios";

const AdminWinners = () => {
  const [results, setResults] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
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
    <div>
      <h1 className="text-xl font-bold mb-6">🏆 Winners</h1>

      {results.map((r) => (
        <div key={r._id} className="bg-white p-4 mb-3 rounded shadow">
          <p>{r.userId?.name}</p>
          <p>Match: {r.matchedNumbers}</p>
          <p>₹{r.winnings}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminWinners;