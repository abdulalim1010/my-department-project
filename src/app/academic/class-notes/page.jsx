"use client";
import { useEffect, useState } from "react";

export default function ClassNotePage() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch("/api/academic")
      .then((res) => res.json())
      .then((data) =>
        setFiles(data.filter((f) => f.type === "note"))
      );
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Class Notes</h1>

      {files.map((f) => (
        <div key={f._id} className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">{f.title}</h3>
          <p className="text-sm">{f.subject}</p>
          <a
            href={f.fileUrl}
            target="_blank"
            className="text-blue-600 underline text-sm"
          >
            Download
          </a>
        </div>
      ))}
    </div>
  );
}
