import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [draw, setDraw] = useState(null);
  const [results, setResults] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const [analytics, usersRes, drawRes, resultRes] = await Promise.all([
        axios.get("http://localhost:5000/api/admin/analytics", config),
        axios.get("http://localhost:5000/api/admin/users", config),
        axios.get("http://localhost:5000/api/draw/latest", config),
        axios.get("http://localhost:5000/api/results", config),
      ]);

      setStats(analytics.data);
      setUsers(usersRes.data);
      setDraw(drawRes.data);
      setResults(resultRes.data);

    } catch (err) {
      console.error(err);
    }
  };

  const runDraw = async () => {
    await axios.post(
      "http://localhost:5000/api/draw/run",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchData();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* 🔵 SIDEBAR */}
      <div className="w-64 bg-black text-white p-6">
        <h1 className="text-xl font-bold mb-10">Admin Panel</h1>

        <ul className="space-y-4">
          <li>Dashboard</li>
          <li>Users</li>
          <li>Draw</li>
          <li>Charities</li>
          <li>Winners</li>
          <li>Analytics</li>
        </ul>
      </div>

      {/* 🔶 MAIN */}
      <div className="flex-1 p-8">

        <h1 className="text-2xl font-bold mb-6">
          🚀 Admin Dashboard
        </h1>

        {/* 📊 STATS */}
        <div className="grid grid-cols-4 gap-6 mb-10">

          <Card title="Users">{stats.totalUsers}</Card>
          <Card title="Revenue">₹ {stats.totalRevenue}</Card>
          <Card title="Prize Pool">₹ {stats.prizePool}</Card>
          <Card title="Winnings">₹ {stats.totalWinnings}</Card>

        </div>

        {/* 🎲 DRAW SYSTEM */}
        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <h2 className="font-semibold text-lg mb-4">🎲 Draw System</h2>

          <button
            onClick={runDraw}
            className="bg-black text-white px-4 py-2 rounded mb-4"
          >
            Run Draw
          </button>

          {draw && (
            <p>
              Latest Draw: {draw.numbers?.join(", ")}
            </p>
          )}
        </div>

        {/* 👥 USERS */}
        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <h2 className="font-semibold text-lg mb-4">👥 Users</h2>

          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b">
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.subscriptionStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 🏆 WINNERS */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold text-lg mb-4">🏆 Winners</h2>

          {results.map((r) => (
            <div key={r._id} className="border-b py-2 flex justify-between">
              <span>
                Match: {r.matchedNumbers} | {r.rewardType}
              </span>

              <span>₹ {r.winnings}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

// 🔹 CARD
const Card = ({ title, children }) => (
  <div className="bg-white p-6 rounded-xl shadow">
    <h2 className="text-sm text-gray-500">{title}</h2>
    <p className="text-xl font-bold mt-2">{children}</p>
  </div>
);

export default AdminDashboard;