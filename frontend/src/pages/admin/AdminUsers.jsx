
/* eslint-disable react-hooks/set-state-in-effect */

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
    <>
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
   
    </>
  );
};

export default AdminUsers;