"use client";

import { useEffect, useState } from "react";

export default function AcademicAdminPage() {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("note");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH FILES ================= */
  const fetchFiles = async () => {
    try {
      const res = await fetch("/api/academic", {
        cache: "no-store",
      });

      if (!res.ok) {
        console.error("Fetch failed:", res.status);
        return;
      }

      const data = await res.json();
      setFiles(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  /* ================= FILE → BASE64 ================= */
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          subject,
          type,
          fileBase64: base64,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Upload failed");
      }

      setTitle("");
      setSubject("");
      setType("note");
      setFile(null);

      await fetchFiles();
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;

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
    <div className="space-y-12">
      <h1 className="text-2xl font-bold">Academic Files Management</h1>

      {/* ================= UPLOAD FORM ================= */}
      <form
        onSubmit={handleUpload}
        className="bg-white p-6 rounded-xl shadow space-y-4 max-w-xl"
      >
        <input
          type="text"
          placeholder="File Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />

        <input
          type="text"
          placeholder="Subject (EEE)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border px-4 py-2 rounded"
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
          className="w-full"
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload File"}
        </button>
      </form>

      {/* ================= FILE LIST ================= */}
      <div className="grid md:grid-cols-2 gap-6">
        {files.length === 0 && (
          <p className="text-gray-500">No academic files uploaded yet.</p>
        )}

        {files.map((f) => (
          <div
            key={f._id}
            className="bg-white p-5 rounded-xl shadow flex justify-between items-start"
          >
            <div>
              <span
                className={`inline-block text-xs px-2 py-1 rounded-full mb-2
                  ${f.type === "note" ? "bg-blue-100 text-blue-700" : ""}
                  ${f.type === "book" ? "bg-green-100 text-green-700" : ""}
                  ${f.type === "routine" ? "bg-orange-100 text-orange-700" : ""}
                  ${f.type === "syllabus" ? "bg-purple-100 text-purple-700" : ""}
                `}
              >
                {f.type.toUpperCase()}
              </span>

              <h3 className="font-semibold">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.subject}</p>

              <a
                href={f.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm underline"
              >
                View / Download
              </a>
            </div>

            <button
              onClick={() => handleDelete(f._id)}
              className="text-red-600 hover:underline text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
