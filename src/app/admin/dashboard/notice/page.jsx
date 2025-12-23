"use client";

import { useEffect, useState } from "react";

export default function AdminNoticePage() {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [editId, setEditId] = useState(null);
  const [loadingUpload, setLoadingUpload] = useState(false);

  const loadNotices = async () => {
    const res = await fetch("/api/notices");
    const data = await res.json();
    setNotices(data);
  };

  useEffect(() => {
    loadNotices();
  }, []);

  const uploadFileToCloudinary = async () => {
    if (!file) return fileUrl || null;
    setLoadingUpload(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "notices_upload");
      formData.append("cloud_name", "dxbkaeshc");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dxbkaeshc/auto/upload",
        { method: "POST", body: formData }
      );

      const data = await res.json();
      setLoadingUpload(false);

      if (!res.ok) {
        console.error("Cloudinary Error:", data);
        alert("File upload failed. Check console.");
        return null;
      }

      return data.secure_url;
    } catch (err) {
      console.error("Upload Error:", err);
      alert("File upload failed. Check console.");
      setLoadingUpload(false);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadedUrl = await uploadFileToCloudinary();

    const method = editId ? "PUT" : "POST";
    await fetch("/api/notices", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editId,
        title,
        description,
        fileUrl: uploadedUrl,
        createdAt: new Date().toISOString(), // Auto date
      }),
    });

    setTitle("");
    setDescription("");
    setFile(null);
    setFileUrl("");
    setEditId(null);
    loadNotices();
  };

  const handleEdit = (notice) => {
    setEditId(notice._id);
    setTitle(notice.title);
    setDescription(notice.description);
    setFileUrl(notice.fileUrl || "");
  };

  const handleDelete = async (id) => {
    await fetch("/api/notices", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadNotices();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📢 Manage Notices</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow mb-8 space-y-3 max-w-xl"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Notice Title"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border px-3 py-2 rounded"
        />
        {loadingUpload && (
          <p className="text-sm text-gray-500">Uploading...</p>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          {editId ? "Update Notice" : "Add Notice"}
        </button>
      </form>

      <div className="space-y-4">
        {notices.map((n) => (
          <div key={n._id} className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold">{n.title}</h2>
            <p>{n.description}</p>
            <p className="text-sm text-gray-500">
              📅 {new Date(n.createdAt).toLocaleString("en-GB")}
            </p>

            {n.fileUrl && (
              <div className="mt-2">
                <embed
                  src={n.fileUrl}
                  type="application/pdf"
                  width="100%"
                  height="400px"
                />
              </div>
            )}

            <div className="mt-3 flex gap-3">
              <button
                onClick={() => handleEdit(n)}
                className="px-3 py-1 bg-yellow-400 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(n._id)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
