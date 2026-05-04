/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/admin/analytics",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setStats(res.data.data);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">📊 Dashboard</h1>

      <div className="grid grid-cols-4 gap-6">
        <Card title="Users">{stats.totalUsers}</Card>
        <Card title="Revenue">₹{stats.totalRevenue}</Card>
        <Card title="Prize Pool">₹{stats.prizePool}</Card>
        <Card title="Charity">₹{stats.charityContribution}</Card>
      </div>
    </div>
  );
};

const Card = ({ title, children }) => (
  <div className="bg-white p-6 rounded-xl shadow">
    <p className="text-gray-500">{title}</p>
    <h2 className="text-xl font-bold">{children}</h2>
  </div>
);

export default Dashboard;