import React, { useEffect, useState } from "react";
import { getDashboardData } from "../services/api";
import Score from "../components/Score";

const DashBoard = () => {
  const [data, setData] = useState(null);

  // FETCH DASHBOARD
  const fetchDashboard = async () => {
    try {
      const res = await getDashboardData();
      setData(res.data.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load dashboard");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDashboard();
  }, []);

  if (!data) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 gap-6">

        {/* Subscription */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold text-lg">Subscription Status</h2>
          <p className="text-green-600 mt-2 capitalize">
            {data.subscriptionStatus}
          </p>
        </div>

        {/* Renewal */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold text-lg">Next Renewal</h2>
          <p className="mt-2">
            {data.subscriptionEnd
              ? new Date(data.subscriptionEnd).toLocaleDateString()
              : "N/A"}
          </p>
        </div>

        {/* Charity */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold text-lg">Selected Charity ❤️</h2>
          <p className="mt-2">{data.charity}</p>
        </div>

        {/* Contribution */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold text-lg">Contribution %</h2>
          <p className="mt-2">{data.contribution}%</p>
        </div>

        {/* Winnings */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold text-lg">Total Winnings 💰</h2>
          <p className="mt-2">₹ {data.winnings}</p>
        </div>

        {/* Draw */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold text-lg">Draw Participation 🎯</h2>
          <p className="mt-2">{data.drawStatus}</p>
        </div>

      </div>

      <Score />
    </div>
  );
};

export default DashBoard;
