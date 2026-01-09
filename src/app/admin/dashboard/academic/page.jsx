"use client";

import { useEffect, useState } from "react";

const TYPES = ["all", "note", "book", "routine", "syllabus"];

export default function AcademicAdminPage() {
  const [files, setFiles] = useState([]);
  const [filter, setFilter] = useState("all");

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("note");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH FILES ================= */
  const fetchFiles = async () => {
    try {
      const res = await fetch("/api/academic", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      setFiles(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  /* ================= FILTER ================= */
  const filteredFiles =
    filter === "all" ? files : files.filter((f) => f.type === filter);

  /* ================= FILE → BASE64 ================= */
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  /* ================= UPLOAD ================= */
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title || !subject || !type || !file) {
      alert("সব ফিল্ড পূরণ করো");
      return;
    }

    setLoading(true);

    try {
      const base64 = await toBase64(file);

      const res = await fetch("/api/academic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          subject,
          type,
          fileBase64: base64,
        }),
      });

      if (!res.ok) throw new Error("Upload failed");

      setTitle("");
      setSubject("");
      setType("note");
      setFile(null);
      fetchFiles();
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this file?")) return;

    try {
      const res = await fetch(`/api/academic/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      fetchFiles();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete failed");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-bold">Academic Management</h1>

      {/* ===== FILTER TABS ===== */}
      <div className="flex gap-3 flex-wrap">
        {TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-4 py-1 rounded-full text-sm
              ${
                filter === t
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ===== UPLOAD FORM ===== */}
      <form
        onSubmit={handleUpload}
        className="bg-white p-6 rounded-xl shadow space-y-4 max-w-xl"
      >
        <input
          placeholder="File title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Subject (EEE)"
          className="w-full border p-2 rounded"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="note">Class Note</option>
          <option value="book">Book</option>
          <option value="routine">Routine</option>
          <option value="syllabus">Syllabus</option>
        </select>

        <input
          type="file"
          accept=".pdf,.doc,.docx,.ppt,.pptx"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload File"}
        </button>
      </form>

      {/* ===== FILE LIST ===== */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredFiles.length === 0 && (
          <p className="text-gray-500">No files found.</p>
        )}

        {filteredFiles.map((f) => (
          <div
            key={f._id}
            className="bg-white p-4 rounded shadow flex justify-between"
          >
            <div>
              <span className="text-xs font-semibold text-blue-600">
                {f.type.toUpperCase()}
              </span>

              <h3 className="font-semibold">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.subject}</p>

              <a
                href={f.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 underline"
              >
                View / Download
              </a>
            </div>

            {/* 🔴 DELETE BUTTON */}
            <button
              onClick={() => handleDelete(f._id)}
              className="text-red-600 text-sm hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
