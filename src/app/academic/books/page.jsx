"use client";

import { useEffect, useState, useCallback } from "react";

const YEARS = ["1st", "2nd", "3rd", "4th"];
const SEMESTERS = ["1st", "2nd"];

export default function BookPage() {
  const [files, setFiles] = useState([]);
  const [year, setYear] = useState(""); // default empty = show all
  const [semester, setSemester] = useState(""); // default empty = show all
  const [loading, setLoading] = useState(false);

  const fetchBooks = useCallback(async () => {
    setLoading(true);

    try {
      let url = "/api/academic?type=book";
      if (year) url += `&year=${year.toLowerCase()}`;
      if (semester) url += `&semester=${semester.toLowerCase()}`;

      const res = await fetch(url, { cache: "no-store" });
      const data = await res.json();

      // Ensure only books are included
      const books = Array.isArray(data)
        ? data.filter((f) => f.type.toLowerCase() === "book")
        : [];

      setFiles(books);
    } catch (err) {
      console.error("Fetch books error:", err);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  }, [year, semester]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <div className="max-w-6xl mx-auto py-12 space-y-8">
      <h1 className="text-3xl font-bold">Academic Books</h1>

      {/* Filters */}
      <div className="flex gap-4">
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Years</option>
          {YEARS.map((y) => (
            <option key={y} value={y}>
              {y} Year
            </option>
          ))}
        </select>

        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Semesters</option>
          {SEMESTERS.map((s) => (
            <option key={s} value={s}>
              {s} Semester
            </option>
          ))}
        </select>
      </div>

      {/* Loading / Empty States */}
      {loading ? (
        <p className="text-gray-500">Loading books…</p>
      ) : files.length === 0 ? (
        <p className="text-gray-500">No books found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {files.map((f) => (
            <div key={f._id} className="bg-white p-4 rounded-xl shadow">
              <span className="text-xs font-semibold text-blue-600">
                {f.type.toUpperCase()}
              </span>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="text-sm text-gray-500">
                {f.subject} • {f.year} Year • {f.semester} Sem
              </p>

              <div className="flex gap-4 text-sm pt-2">
                <a
                  href={f.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View
                </a>
                <a
                  href={f.downloadUrl}
                  download
                  className="text-green-600 underline"
                >
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
