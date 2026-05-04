/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import axios from "axios";

const AdminCharities = () => {
  const [charities, setCharities] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCharities();
  }, []);

  const fetchCharities = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/admin/charity",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setCharities(res.data.data);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-6">❤️ Charities</h1>

      {charities.map((c) => (
        <div key={c._id} className="bg-white p-4 mb-3 rounded shadow">
          <p>{c.name}</p>
          <p>{c.percentage}%</p>
        </div>
      ))}
    </div>
  );
};

export default AdminCharities;