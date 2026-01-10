"use client";

import { useEffect, useState, useCallback } from "react";

export default function AcademicAdminPage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const [subject, setSubject] = useState("");
  const [type, setType] = useState("note");
  const [year, setYear] = useState("1st");
  const [semester, setSemester] = useState("1st");
  const [file, setFile] = useState(null);

  // Fetch all files from API
  const fetchFiles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/academic", { cache: "no-store" });
      const data = await res.json();
      setFiles(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const autoTitle = `${type.toUpperCase()} – ${year} Year ${semester} Semester`;

  // Handle file upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!subject || !file) return alert("সব ফিল্ড পূরণ করো");

    setLoading(true);
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const res = await fetch("/api/academic", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: autoTitle,
            subject,
            type: type.toLowerCase(),
            year: year.toLowerCase(),
            semester: semester.toLowerCase(),
            fileBase64: reader.result,
            fileName: file.name,
          }),
        });

        const result = await res.json();
        if (!res.ok) throw new Error(result.error || "Upload failed");

        setSubject("");
        setFile(null);
        fetchFiles();
      } catch (err) {
        console.error("Upload error:", err);
        alert(err.message || "Upload failed!");
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  // Handle file delete
  const handleDelete = async (id) => {
    if (!confirm("Delete this file?")) return;

    try {
      const res = await fetch("/api/academic", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Delete failed");

      fetchFiles();
    } catch (err) {
      console.error("Delete error:", err);
      alert(err.message || "Delete failed!");
    }
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto py-10">
      <h1 className="text-2xl font-bold">Academic Management (Admin)</h1>

      {/* UPLOAD FORM */}
      <form
        onSubmit={handleUpload}
        className="bg-white p-6 rounded-xl shadow space-y-3 max-w-xl"
      >
        <p className="text-sm text-gray-500">
          Auto Title: <b>{autoTitle}</b>
        </p>

        <input
          placeholder="Subject"
          className="w-full border p-2 rounded"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-2">
          <select
            className="border p-2"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="note">Note</option>
            <option value="book">Book</option>
            <option value="routine">Routine</option>
            <option value="syllabus">Syllabus</option>
          </select>

          <select
            className="border p-2"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
            <option value="4th">4th</option>
          </select>
        </div>

        <select
          className="border p-2 w-full"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        >
          <option value="1st">1st Semester</option>
          <option value="2nd">2nd Semester</option>
        </select>

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {/* FILE LIST */}
      {loading && files.length === 0 ? (
        <p className="text-gray-500">Loading files...</p>
      ) : files.length === 0 ? (
        <p className="text-gray-500">No files found</p>
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

              <div className="flex justify-between pt-3 text-sm">
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

                <button
                  onClick={() => handleDelete(f._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
