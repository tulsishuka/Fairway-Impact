
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "https://givehope-platform-4.onrender.com/api/admin/analytics",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setStats(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen  px-4 sm:px-6 lg:px-10 py-8 bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          📊 Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          Real-time platform analytics overview
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <Card
          title="Total Users"
          value={stats.totalUsers}
          gradient="from-blue-500 to-blue-700"
          icon="👥"
        />

        <Card
          title="Revenue"
          value={`₹${stats.totalRevenue || 0}`}
          gradient="from-green-500 to-emerald-600"
          icon="💰"
        />

        <Card
          title="Prize Pool"
          value={`₹${stats.prizePool || 0}`}
          gradient="from-purple-500 to-indigo-600"
          icon="🏆"
        />

        <Card
          title="Charity Contribution"
          value={`₹${stats.charityContribution || 0}`}
          gradient="from-pink-500 to-rose-600"
          icon="❤️"
        />

      </div>
    </div>
  );
};

const Card = ({ title, value, gradient, icon }) => (
  <div
    className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-lg transition transform hover:scale-[1.03] bg-gradient-to-r ${gradient}`}
  >
    <div className="text-3xl">{icon}</div>
    <p className="mt-3 text-sm opacity-90">{title}</p>
    <h2 className="text-2xl font-bold mt-1">{value}</h2>
    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
  </div>
);

export default Dashboard;
