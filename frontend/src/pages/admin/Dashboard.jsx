
// import { useEffect, useState } from "react";
// import axios from "axios";

// const Dashboard = () => {
//   const [stats, setStats] = useState({});
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/immutability
//     fetchStats();
//   }, []);

//   const fetchStats = async () => {
//     try {
//       const res = await axios.get(
//         "https://givehope-platform-4.onrender.com/api/admin/analytics",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setStats(res.data.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="min-h-screen  px-4 sm:px-6 lg:px-10 py-8 bg-gradient-to-br from-gray-100 to-gray-200">
//       <div className="mb-10">
//         <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
//           📊 Admin Dashboard
//         </h1>
//         <p className="text-gray-500 mt-1 text-sm">
//           Real-time platform analytics overview
//         </p>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

//         <Card
//           title="Total Users"
//           value={stats.totalUsers}
//           gradient="from-blue-500 to-blue-700"
//           icon="👥"
//         />

//         <Card
//           title="Revenue"
//           value={`₹${stats.totalRevenue || 0}`}
//           gradient="from-green-500 to-emerald-600"
//           icon="💰"
//         />

//         <Card
//           title="Prize Pool"
//           value={`₹${stats.prizePool || 0}`}
//           gradient="from-purple-500 to-indigo-600"
//           icon="🏆"
//         />

//         <Card
//           title="Charity Contribution"
//           value={`₹${stats.charityContribution || 0}`}
//           gradient="from-pink-500 to-rose-600"
//           icon="❤️"
//         />

//       </div>
//     </div>
//   );
// };

// const Card = ({ title, value, gradient, icon }) => (
//   <div
//     className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-lg transition transform hover:scale-[1.03] bg-gradient-to-r ${gradient}`}
//   >
//     <div className="text-3xl">{icon}</div>
//     <p className="mt-3 text-sm opacity-90">{title}</p>
//     <h2 className="text-2xl font-bold mt-1">{value}</h2>
//     <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
//   </div>
// );

// export default Dashboard;



import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
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
    <div className="bg-[#0d110e] text-[#e4e7e5] flex font-sans antialiased min-h-screen">
      
      <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full overflow-y-auto">

        {/* HEADER */}
        <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-100">
              Admin Analytics
            </h1>

            <p className="text-sm text-gray-400 mt-1">
              Real-time platform monitoring and ecosystem performance
            </p>
          </div>

          {/* LIVE STATUS */}
          <div className="flex items-center gap-3">

            <div className="bg-[#131915] border border-[#212f26] px-4 py-2 rounded-full flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              System Operational
            </div>

            <button className="w-10 h-10 rounded-full bg-[#131915] border border-[#212f26] text-gray-400 hover:text-white transition">
              🔔
            </button>
          </div>
        </header>

        {/* TOP ANALYTICS CARDS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

          <AdminCard
            title="Total Users"
            value={stats.totalUsers || 0}
            icon="👥"
            color="text-cyan-400"
            bg="bg-cyan-500/10"
          />

          <AdminCard
            title="Revenue"
            value={`₹${stats.totalRevenue || 0}`}
            icon="💰"
            color="text-emerald-400"
            bg="bg-emerald-500/10"
          />

          <AdminCard
            title="Prize Pool"
            value={`₹${stats.prizePool || 0}`}
            icon="🏆"
            color="text-orange-400"
            bg="bg-orange-500/10"
          />

          <AdminCard
            title="Charity Contribution"
            value={`₹${stats.charityContribution || 0}`}
            icon="❤️"
            color="text-pink-400"
            bg="bg-pink-500/10"
          />
        </section>

        {/* CHART + SYSTEM PANEL */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">

          {/* PERFORMANCE */}
          <div className="bg-[#131915] border border-[#1f2923] p-6 rounded-2xl xl:col-span-2">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

              <div>
                <h3 className="text-base font-bold text-gray-200">
                  Platform Performance
                </h3>

                <p className="text-xs text-gray-500">
                  Weekly ecosystem growth metrics
                </p>
              </div>

              <select className="bg-[#1c241f] border border-[#2d3a32] text-xs font-medium text-gray-300 rounded-lg px-3 py-2 outline-none">
                <option>Last 30 Days</option>
                <option>Last 6 Months</option>
              </select>
            </div>

            {/* GRAPH */}
            <div className="h-52 flex items-end justify-between gap-2 pt-4">

              {[65, 80, 95, 50, 70, 88, 60].map((height, index) => (
                <div
                  key={index}
                  className="w-full flex flex-col items-center gap-2"
                >
                  <div className="w-full bg-[#1c241f] rounded-t-md h-36 relative overflow-hidden">
                    <div
                      className={`absolute bottom-0 w-full rounded-t-md ${
                        index === 2
                          ? "bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.3)]"
                          : "bg-emerald-700/40"
                      }`}
                      style={{ height: `${height}%` }}
                    ></div>
                  </div>

                  <span className="text-[10px] text-gray-500">
                    WK {index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="bg-[#131915] border border-[#1f2923] p-6 rounded-2xl flex flex-col justify-between">

            <div>

              <div className="flex items-center justify-between">
                <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-md border border-emerald-500/20">
                  LIVE SERVER
                </span>

                <span className="text-emerald-400 text-lg">✔</span>
              </div>

              <h3 className="text-xl font-bold text-gray-100 mt-5">
                Platform Health
              </h3>

              <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                All systems are currently running smoothly. User engagement,
                payment gateways, and charity operations are functioning
                normally.
              </p>

              {/* STATUS */}
              <div className="space-y-4 mt-6">

                <StatusItem
                  title="Server Uptime"
                  value="99.9%"
                />

                <StatusItem
                  title="API Requests"
                  value="1.2M"
                />

                <StatusItem
                  title="Active Sessions"
                  value="8,420"
                />
              </div>
            </div>

            {/* PROGRESS */}
            <div className="mt-8 pt-5 border-t border-[#1f2923]">

              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-gray-400 font-medium">
                  Monthly Growth
                </span>

                <span className="text-emerald-400 font-bold">
                  82%
                </span>
              </div>

              <div className="w-full bg-[#1c241f] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-400 h-full rounded-full"
                  style={{ width: "82%" }}
                ></div>
              </div>

              <button className="w-full mt-5 bg-[#1c241f] hover:bg-[#242f28] border border-[#2d3a32] text-gray-200 text-xs font-semibold py-3 rounded-xl transition">
                Generate Analytics Report
              </button>
            </div>
          </div>
        </section>

       
      </main>
    </div>
  );
};

const AdminCard = ({ title, value, icon, color, bg }) => (
  <div className="bg-[#131915] border border-[#1f2923] p-5 rounded-2xl relative overflow-hidden">

    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${bg}`}>
      {icon}
    </div>

    <div className="mt-5">
      <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">
        {title}
      </div>

      <div className={`text-2xl font-bold mt-2 ${color}`}>
        {value}
      </div>

      <div className="text-[11px] text-gray-500 mt-2">
        Updated just now
      </div>
    </div>
  </div>
);

const StatusItem = ({ title, value }) => (
  <div className="flex items-center justify-between">

    <span className="text-sm text-gray-400">
      {title}
    </span>

    <span className="text-sm font-semibold text-gray-200">
      {value}
    </span>
  </div>
);

const ActivityItem = ({ icon, title, subtitle, status }) => (
  <div className="p-4 flex items-center justify-between gap-4">

    <div className="flex items-center gap-3.5">

      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-lg">
        {icon}
      </div>

      <div>
        <div className="text-sm font-semibold text-gray-200">
          {title}
        </div>

        <div className="text-xs text-gray-500 mt-0.5">
          {subtitle}
        </div>
      </div>
    </div>

    <div className="text-xs font-bold text-emerald-400">
      {status}
    </div>
  </div>
);

export default Dashboard;