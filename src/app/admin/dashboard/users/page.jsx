"use client";

import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (id, role) => {
    await fetch(`/api/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });

    fetchUsers(); // refresh list
  };

  if (loading) return <p className="p-6">Loading users...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Users</h1>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Role</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="p-3 border">{user.name}</td>
                <td className="p-3 border">{user.email}</td>
                <td className="p-3 border font-semibold">
                  {user.role}
                </td>
                <td className="p-3 border space-x-2">
                  {user.role === "user" && (
                    <button
                      onClick={() => updateRole(user._id, "student")}
                      className="px-3 py-1 bg-green-600 text-white rounded"
                    >
                      Make Student
                    </button>
                  )}

                  {user.role === "student" && (
                    <button
                      onClick={() => updateRole(user._id, "user")}
                      className="px-3 py-1 bg-yellow-600 text-white rounded"
                    >
                      Remove Student
                    </button>
                  )}

                  {user.role === "admin" && (
                    <span className="text-gray-400">Admin</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
