
/* eslint-disable react-hooks/set-state-in-effect */

import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "https://fairway-impact.onrender.com/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(res.data.data);
    } catch (err) {
      console.error("Fetch users error:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(
        `https://fairway-impact.onrender.com/api/admin/user/${id}`,
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

  const updateStatus = async (id, status) => {
    try {
      await axios.post(
        "https://fairway-impact.onrender.com/api/admin/user/update",
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
    <div className="bg-[#0d110e] text-[#e4e7e5] min-h-screen font-sans">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-100">
            User Management
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            Manage subscriptions, charity selections, and platform members
          </p>
        </div>

        <div className="bg-[#131915] border border-[#212f26] px-4 py-2 rounded-full flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wide uppercase w-fit">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          {users.length} Active Records
        </div>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        <StatsCard
          title="Total Users"
          value={users.length}
          icon="👥"
          color="text-cyan-400"
          bg="bg-cyan-500/10"
        />

        <StatsCard
          title="Active Users"
          value={
            users.filter(
              (u) => u.subscriptionStatus === "active"
            ).length
          }
          icon="🟢"
          color="text-emerald-400"
          bg="bg-emerald-500/10"
        />

        <StatsCard
          title="Inactive Users"
          value={
            users.filter(
              (u) => u.subscriptionStatus !== "active"
            ).length
          }
          icon="🔴"
          color="text-red-400"
          bg="bg-red-500/10"
        />

        <StatsCard
          title="Charity Members"
          value={
            users.filter((u) => u.selectedCharity).length
          }
          icon="❤️"
          color="text-pink-400"
          bg="bg-pink-500/10"
        />
      </section>

      <div className="hidden xl:block overflow-hidden rounded-3xl border border-[#1f2923] bg-black shadow-xl">

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-[#1f2923] border-b border-[#1f2923] text-gray-300">

              <tr>
                <th className="p-5 text-left">User</th>
                <th className="text-left">Status</th>
                <th className="text-left">Plan</th>
                <th className="text-left">Charity</th>
                <th className="text-left">Donation</th>
                <th className="text-left">Actions</th>
              </tr>

            </thead>

            <tbody>

              {users.map((u) => (
                <tr
                  key={u._id}
                  className="border-b border-[#1f2923] hover:bg-[#161d19] transition"
                >

                  <td className="p-5">
                    <div className="flex items-center gap-4">

                      <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold">
                        {u.name?.charAt(0)}
                      </div>

                      <div>
                        <div className="font-semibold text-gray-100">
                          {u.name}
                        </div>

                        <div className="text-xs text-gray-500 mt-1">
                          {u.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border
                      ${
                        u.subscriptionStatus === "active"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                      }`}
                    >
                      {u.subscriptionStatus}
                    </span>
                  </td>

                  <td className="text-gray-300">
                    {u.subscriptionPlan || "-"}
                  </td>

                  <td className="text-gray-300">
                    {u.selectedCharity?.name || "Not Selected"}
                  </td>

                  <td className="text-emerald-400 font-semibold">
                    {u.donationPercentage || 0}%
                  </td>

                  <td>

                    <div className="flex items-center gap-3">

                      <select
                        className="bg-[#1c241f] border border-[#2d3a32] text-xs text-gray-300 rounded-lg px-3 py-2 outline-none"
                        onChange={(e) =>
                          updateStatus(u._id, e.target.value)
                        }
                      >
                        <option>Change</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>

                      <button
                        onClick={() => deleteUser(u._id)}
                        className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition text-xs font-semibold"
                      >
                        Delete
                      </button>

                    </div>

                  </td>
                </tr>
              ))}

            </tbody>

          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 xl:hidden">

        {users.map((u) => (
          <div
            key={u._id}
            className="bg-[#131915] border border-[#1f2923] rounded-2xl p-5"
          >

            <div className="flex items-start justify-between gap-4">

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold text-lg">
                  {u.name?.charAt(0)}
                </div>

                <div>
                  <h2 className="font-bold text-gray-100">
                    {u.name}
                  </h2>

                  <p className="text-xs text-gray-500 mt-1 break-all">
                    {u.email}
                  </p>
                </div>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-[10px] font-semibold border
                ${
                  u.subscriptionStatus === "active"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : "bg-red-500/10 text-red-400 border-red-500/20"
                }`}
              >
                {u.subscriptionStatus}
              </span>
            </div>

            <div className="mt-5 space-y-3 text-sm">

              <InfoRow
                label="Plan"
                value={u.subscriptionPlan || "-"}
              />

              <InfoRow
                label="Charity"
                value={
                  u.selectedCharity?.name || "Not Selected"
                }
              />

              <InfoRow
                label="Donation"
                value={`${u.donationPercentage || 0}%`}
                valueClass="text-emerald-400"
              />
            </div>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">

              <select
                className="flex-1 bg-[#1c241f] border border-[#2d3a32] text-sm text-gray-300 rounded-xl px-4 py-3 outline-none"
                onChange={(e) =>
                  updateStatus(u._id, e.target.value)
                }
              >
                <option>Change Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <button
                onClick={() => deleteUser(u._id)}
                className="px-5 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition font-semibold"
              >
                Delete
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatsCard = ({ title, value, icon, color, bg }) => (
  <div className="bg-black border border-[#1f2923] p-5 rounded-2xl">

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
    </div>
  </div>
);

const InfoRow = ({ label, value, valueClass = "text-gray-300" }) => (
  <div className="flex items-center justify-between border-b border-[#1f2923] pb-2">

    <span className="text-gray-500 text-xs uppercase tracking-wide">
      {label}
    </span>

    <span className={`font-medium text-sm ${valueClass}`}>
      {value}
    </span>
  </div>
);

export default AdminUsers;