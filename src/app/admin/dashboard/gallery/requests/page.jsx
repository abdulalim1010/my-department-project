"use client";

import { useEffect, useState } from "react";

export default function GalleryRequests() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/admin/gallery?status=pending")
      .then(res => res.json())
      .then(setItems);
  }, []);

  async function approve(id) {
    await fetch("/api/admin/gallery", {
      method: "PATCH",
      body: JSON.stringify({ id }),
    });
    setItems(items.filter(i => i._id !== id));
  }

  async function remove(id) {
    await fetch("/api/admin/gallery", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    setItems(items.filter(i => i._id !== id));
  }

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-3xl font-bold">Gallery Requests</h1>

      {items.map(item => (
        <div key={item._id} className="bg-white p-5 rounded-xl shadow flex gap-6">
          <img src={item.imageUrl} className="w-32 h-24 rounded object-cover" />
          <div className="flex-1">
            <h3 className="font-bold">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.studentName}</p>
          </div>

          <button
            onClick={() => approve(item._id)}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Approve
          </button>

          <button
            onClick={() => remove(item._id)}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
