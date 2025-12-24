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
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">📢 Notices</h1>

      <div className="space-y-6">
        {notices.map((n) => (
          <div key={n._id} className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold text-lg sm:text-xl">{n.title}</h2>

            <p className="mt-2 text-sm sm:text-base">{n.description}</p>

            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              📅 {new Date(n.createdAt).toLocaleString("en-GB")}
            </p>

            {n.fileUrl && (
              <div className="mt-3">
                {/* Desktop only */}
                <div className="hidden md:block">
                  <iframe
                    src={n.fileUrl}
                    width="100%"
                    height="450"
                    className="border rounded"
                  />
                </div>

                {/* Mobile only */}
                <div className="md:hidden">
                  <a
                    href={n.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded text-sm"
                  >
                    📄 View PDF
                  </a>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
