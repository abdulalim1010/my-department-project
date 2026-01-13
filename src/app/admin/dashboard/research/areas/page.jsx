"use client";
import { useEffect, useState } from "react";

export default function AdminResearchAreas() {
  const [areas, setAreas] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchAreas = async () => {
    const res = await fetch("/api/research/areas");
    setAreas(await res.json());
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  const addArea = async () => {
    await fetch("/api/research/areas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    setTitle("");
    setDescription("");
    fetchAreas();
  };

  const deleteArea = async (id) => {
    if (!confirm("Delete this area?")) return;
    await fetch("/api/research/areas", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchAreas();
  };

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-bold">Manage Research Areas</h1>

      <div className="bg-white p-4 rounded shadow space-y-3">
        <input
          className="border p-2 w-full"
          placeholder="Area Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addArea} className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Area
        </button>
      </div>

      {areas.map((a) => (
        <div key={a._id} className="flex justify-between bg-white p-4 rounded shadow">
          <div>
            <b>{a.title}</b>
            <p className="text-sm text-gray-500">{a.description}</p>
          </div>
          <button
            onClick={() => deleteArea(a._id)}
            className="text-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
