"use client";

import { useEffect, useState } from "react";

export default function AdminGallery() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/admin/gallery")
      .then((res) => res.json())
      .then(setItems);
  }, []);

  async function approve(id) {
    await fetch("/api/admin/gallery", {
      method: "PATCH",
      body: JSON.stringify({ id }),
    });
    setItems(items.filter((i) => i._id !== id));
  }

  async function remove(id) {
    await fetch("/api/admin/gallery", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    setItems(items.filter((i) => i._id !== id));
  }

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-3xl font-bold">Gallery Approval</h1>

      {items.map((item) => (
        <div key={item._id} className="bg-white p-5 rounded-xl shadow flex gap-6">
          <img src={item.imageUrl} className="w-32 h-24 object-cover rounded" />
          <div className="flex-1">
            <h3 className="font-bold">{item.title}</h3>
            <p>{item.studentName}</p>
          </div>
          <button onClick={() => approve(item._id)} className="btn-green">Approve</button>
          <button onClick={() => remove(item._id)} className="btn-red">Delete</button>
        </div>
      ))}
    </div>
  );
}
