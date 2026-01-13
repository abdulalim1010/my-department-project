"use client";
import { useEffect, useState } from "react";

export default function ResearchAreasPage() {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    fetch("/api/research/areas")
      .then((res) => res.json())
      .then(setAreas);
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Research Areas</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {areas.map((a) => (
          <div key={a._id} className="p-5 bg-white shadow rounded-xl">
            <h3 className="font-semibold text-lg">{a.title}</h3>
            <p className="text-gray-600 mt-2">{a.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
