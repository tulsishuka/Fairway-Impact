
/* eslint-disable react-hooks/set-state-in-effect */

import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "https://givehope-platform-4.onrender.com/api/admin/users",
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
        `https://givehope-platform-4.onrender.com/api/admin/user/${id}`,
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
        "https://givehope-platform-4.onrender.com/api/admin/user/update",
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
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl sm:text-2xl font-bold mb-6">
        👥 Admin Users Panel
      </h1>

      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow">

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
              <tr key={u._id} className="border-b hover:bg-gray-50">

                <td className="p-3 font-semibold">{u.name}</td>
                <td>{u.email}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      u.subscriptionStatus === "active"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {u.subscriptionStatus}
                  </span>
                </td>

                <td>{u.subscriptionPlan || "-"}</td>

                <td>
                  {u.selectedCharity?.name
                    ? u.selectedCharity.name
                    : "Not Selected"}
                </td>

                <td>{u.donationPercentage || 0}%</td>

                <td className="flex gap-2 p-2">

                  <select
                    className="border px-2 py-1 rounded"
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
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>
      <div className="grid gap-4 md:hidden">

        {users.map((u) => (
          <div
            key={u._id}
            className="bg-white p-4 rounded-xl shadow border"
          >

            <div className="flex justify-between items-center">
              <h2 className="font-bold text-lg">{u.name}</h2>

              <span
                className={`px-2 py-1 rounded text-xs text-white ${
                  u.subscriptionStatus === "active"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              >
                {u.subscriptionStatus}
              </span>
            </div>

            <p className="text-gray-500 text-sm">{u.email}</p>

            <div className="mt-2 text-sm space-y-1">
              <p>
                <b>Plan:</b> {u.subscriptionPlan || "-"}
              </p>

              <p>
                <b>Charity:</b>{" "}
                {u.selectedCharity?.name || "Not Selected"}
              </p>

              <p>
                <b>Donation:</b> {u.donationPercentage || 0}%
              </p>
            </div>

            <div className="mt-3 flex gap-2">

              <select
                className="border px-2 py-1 w-full rounded"
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
                className="bg-red-500 text-white px-3 py-1 rounded"
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

export default AdminUsers;