"use client";

import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  // 🔹 Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to load users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔹 Update role
  const updateRole = async (id, role) => {
    try {
      setUpdatingId(id);

      const res = await fetch(`/api/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      });

      if (!res.ok) {
        throw new Error("Failed to update role");
      }

      await fetchUsers(); // refresh list
    } catch (error) {
      console.error(error);
      alert("Role update failed");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return <p className="p-6 text-gray-600">Loading users...</p>;
  }

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">All Users</h1>

      {/* 🔹 Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border text-left">Name</th>
              <th className="p-3 border text-left">Email</th>
              <th className="p-3 border text-left">Role</th>
              <th className="p-3 border text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="p-3 border">{user.name}</td>
                <td className="p-3 border">{user.email}</td>
                <td className="p-3 border font-semibold capitalize">
                  {user.role}
                </td>
                <td className="p-3 border space-x-2">
                  {user.role === "user" && (
                    <button
                      disabled={updatingId === user._id}
                      onClick={() => updateRole(user._id, "student")}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                    >
                      Make Student
                    </button>
                  )}

                  {user.role === "student" && (
                    <button
                      disabled={updatingId === user._id}
                      onClick={() => updateRole(user._id, "user")}
                      className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50"
                    >
                      Remove Student
                    </button>
                  )}

                  {user.role === "admin" && (
                    <span className="text-gray-400 font-medium">
                      Admin
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔹 Mobile Cards */}
      <div className="md:hidden space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="border rounded-lg p-4 shadow-sm"
          >
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="mt-1">
              Role:{" "}
              <span className="font-medium capitalize">
                {user.role}
              </span>
            </p>

            <div className="mt-3">
              {user.role === "user" && (
                <button
                  disabled={updatingId === user._id}
                  onClick={() => updateRole(user._id, "student")}
                  className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                >
                  Make Student
                </button>
              )}

              {user.role === "student" && (
                <button
                  disabled={updatingId === user._id}
                  onClick={() => updateRole(user._id, "user")}
                  className="w-full py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50"
                >
                  Remove Student
                </button>
              )}

              {user.role === "admin" && (
                <p className="text-gray-400 text-sm mt-2">
                  Admin account
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
