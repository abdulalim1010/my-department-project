"use client";
import { useEffect, useState } from "react";

export default function BookPage() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch("/api/academic", { cache: "no-store" });
      const data = await res.json();
      setFiles(Array.isArray(data) ? data.filter(f => f.type === "book") : []);
    };

    fetchBooks();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-bold">Academic Books</h1>

      {files.length === 0 && (
        <p className="text-gray-500">No books uploaded yet.</p>
      )}

      {files.map((f) => (
        <div key={f._id} className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-semibold">{f.title}</h3>
          <p className="text-sm text-gray-500">{f.subject}</p>

          <a
            href={f.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-sm"
          >
            Download Book
          </a>
        </div>
      ))}
    </div>
  );
}
