/* eslint-disable react-hooks/set-state-in-effect */
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminDashboard = () => {
//   const [stats, setStats] = useState({});
//   const [users, setUsers] = useState([]);
//   const [draw, setDraw] = useState(null);
//   const [results, setResults] = useState([]);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/immutability
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const config = {
//         headers: { Authorization: `Bearer ${token}` },
//       };

//       const [analytics, usersRes, drawRes, resultRes] = await Promise.all([
//         axios.get("http://localhost:5000/api/admin/analytics", config),
//         axios.get("http://localhost:5000/api/admin/users", config),
//         axios.get("http://localhost:5000/api/draw/latest", config),
//         axios.get("http://localhost:5000/api/results", config),
//       ]);

//       setStats(analytics.data);
//       setUsers(usersRes.data);
//       setDraw(drawRes.data);
//       setResults(resultRes.data);

//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const runDraw = async () => {
//     await axios.post(
//       "http://localhost:5000/api/draw/run",
//       {},
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     fetchData();
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">

//       {/* 🔵 SIDEBAR */}
//       <div className="w-64 bg-black text-white p-6">
//         <h1 className="text-xl font-bold mb-10">Admin Panel</h1>

//         <ul className="space-y-4">
//           <li>Dashboard</li>
//           <li>Users</li>
//           <li>Draw</li>
//           <li>Charities</li>
//           <li>Winners</li>
//           <li>Analytics</li>
//         </ul>
//       </div>

//       {/* 🔶 MAIN */}
//       <div className="flex-1 p-8">

//         <h1 className="text-2xl font-bold mb-6">
//           🚀 Admin Dashboard
//         </h1>

//         {/* 📊 STATS */}
//         <div className="grid grid-cols-4 gap-6 mb-10">

//           <Card title="Users">{stats.totalUsers}</Card>
//           <Card title="Revenue">₹ {stats.totalRevenue}</Card>
//           <Card title="Prize Pool">₹ {stats.prizePool}</Card>
//           <Card title="Winnings">₹ {stats.totalWinnings}</Card>

//         </div>

//         {/* 🎲 DRAW SYSTEM */}
//         <div className="bg-white p-6 rounded-xl shadow mb-10">
//           <h2 className="font-semibold text-lg mb-4">🎲 Draw System</h2>

//           <button
//             onClick={runDraw}
//             className="bg-black text-white px-4 py-2 rounded mb-4"
//           >
//             Run Draw
//           </button>

//           {draw && (
//             <p>
//               Latest Draw: {draw.numbers?.join(", ")}
//             </p>
//           )}
//         </div>

//         {/* 👥 USERS */}
//         <div className="bg-white p-6 rounded-xl shadow mb-10">
//           <h2 className="font-semibold text-lg mb-4">👥 Users</h2>

//           <table className="w-full">
//             <thead>
//               <tr className="text-left border-b">
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Status</th>
//               </tr>
//             </thead>

//             <tbody>
//               {users.map((u) => (
//                 <tr key={u._id} className="border-b">
//                   <td>{u.name}</td>
//                   <td>{u.email}</td>
//                   <td>{u.subscriptionStatus}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* 🏆 WINNERS */}
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="font-semibold text-lg mb-4">🏆 Winners</h2>

//           {results.map((r) => (
//             <div key={r._id} className="border-b py-2 flex justify-between">
//               <span>
//                 Match: {r.matchedNumbers} | {r.rewardType}
//               </span>

//               <span>₹ {r.winnings}</span>
//             </div>
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// };

// // 🔹 CARD
// const Card = ({ title, children }) => (
//   <div className="bg-white p-6 rounded-xl shadow">
//     <h2 className="text-sm text-gray-500">{title}</h2>
//     <p className="text-xl font-bold mt-2">{children}</p>
//   </div>
// );

// export default AdminDashboard;










import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  // 📦 FETCH USERS
  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ⚠️ IMPORTANT FIX
      setUsers(res.data.data);
    } catch (err) {
      console.error("Fetch users error:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🗑 DELETE USER
  const deleteUser = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("User deleted");
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // ✏️ UPDATE USER STATUS
  const updateStatus = async (id, status) => {
    try {
      await axios.post(
        "http://localhost:5000/api/admin/user/update",
        { userId: id, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Updated");
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">
        👥 Admin Users Panel
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">

        <table className="w-full text-sm">

          <thead className="bg-black text-white">
            <tr>
              <th className="p-3">Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Plan</th>
              <th>Charity</th>
              <th>Donation %</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {users.map((u) => (
              <tr key={u._id} className="border-b">

                {/* NAME */}
                <td className="p-3 font-semibold">
                  {u.name}
                </td>

                {/* EMAIL */}
                <td>{u.email}</td>

                {/* STATUS */}
                <td>
                  <span className={`px-2 py-1 rounded text-white text-xs ${
                    u.subscriptionStatus === "active"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}>
                    {u.subscriptionStatus}
                  </span>
                </td>

                {/* PLAN */}
                <td>{u.subscriptionPlan || "-"}</td>

                {/* CHARITY */}
                <td>
                  {u.selectedCharity?.name
                    ? u.selectedCharity.name
                    : "Not Selected"}
                </td>

                {/* DONATION */}
                <td>{u.donationPercentage || 0}%</td>

                {/* ACTIONS */}
                <td className="flex gap-2 p-2">

                  {/* CHANGE STATUS */}
                  <select
                    className="border px-2 py-1"
                    onChange={(e) =>
                      updateStatus(u._id, e.target.value)
                    }
                  >
                    <option>Change</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>

                  {/* DELETE */}
                  <button
                    onClick={() => deleteUser(u._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>
      </div>
    </div>
  );
};

export default AdminUsers;