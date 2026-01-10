"use client";

import { useEffect, useState } from "react";
import useAdmin from "@/hooks/useAdmin";

export default function AdminDashboardPage() {
  const { isAdmin, loading } = useAdmin();
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    if (!isAdmin) return;

    const fetchTotalUsers = async () => {
      try {
        const res = await fetch("/api/admin/dashboard"); // MongoDB API
        const data = await res.json();
        setTotalUsers(data.users); // only total users
      } catch (err) {
        console.error("Failed to fetch total users:", err);
      }
    };

    fetchTotalUsers();
  }, [isAdmin]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!isAdmin) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Users - dynamic */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold">Total Users</h2>
        <p className="text-3xl mt-2 font-bold text-blue-600">{totalUsers}</p>
      </div>

      {/* Articles - static */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold">Articles</h2>
        <p className="text-3xl mt-2 font-bold text-green-600">45</p>
      </div>

      {/* Pending - static */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold">Pending</h2>
        <p className="text-3xl mt-2 font-bold text-red-600">6</p>
      </div>
    </div>
  );
}
