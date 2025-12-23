"use client";

import { useEffect, useState } from "react";

export default function PublicNoticePage() {
  const [notices, setNotices] = useState([]);

  const loadNotices = async () => {
    const res = await fetch("/api/notices", { cache: "no-store" });
    const data = await res.json();
    setNotices(data);
  };

  useEffect(() => {
    loadNotices();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📢 Notices</h1>

      <div className="space-y-6">
        {notices.map((n) => (
          <div key={n._id} className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold text-xl">{n.title}</h2>
            <p className="mt-2">{n.description}</p>
            <p className="text-sm text-gray-500 mt-1">
              📅 {new Date(n.createdAt).toLocaleString("en-GB")}
            </p>

            {n.fileUrl && (
              <div className="mt-2">
                <embed
                  src={n.fileUrl}
                  type="application/pdf"
                  width="100%"
                  height="400px"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
