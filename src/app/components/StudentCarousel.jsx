"use client";

import { useState, useEffect } from "react";

export default function StudentCarousel() {
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    fetch("/api/batches")
      .then((res) => res.json())
      .then((data) => setBatches(data))
      .catch((err) => console.error(err));
  }, []);

  if (!batches || batches.length === 0) {
    return <p className="text-center text-gray-500 mt-10">No batches available</p>;
  }

  return (
    <div className="max-w-7xl mx-auto mt-12 px-4">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        Batch Carousel
      </h2>

      <div className="flex overflow-x-auto gap-6 py-4 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100">
        {batches.map((batch) => (
          <div
            key={batch._id}
            className="flex-none w-48 text-center flex flex-col items-center"
          >
            {/* Session Label */}
            <p className="mb-2 font-semibold text-blue-700">{batch.session}</p>

            {/* Circular Image */}
            <div className="w-40 h-40 rounded-full overflow-hidden shadow-lg border-2 border-blue-200">
              <img
                src={batch.image || "/placeholder.png"}
                alt={batch.session}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
