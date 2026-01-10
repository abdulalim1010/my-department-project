"use client";

import { useEffect, useState, useCallback } from "react";
import { Upload, FileText, Download, Eye, Trash2, X, CheckCircle, AlertCircle } from "lucide-react";

export default function AcademicAdminPage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const [subject, setSubject] = useState("");
  const [type, setType] = useState("note");
  const [year, setYear] = useState("1st");
  const [semester, setSemester] = useState("1st");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

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

  // Validate file type and size
  const validateFile = (file) => {
    const maxSize = 50 * 1024 * 1024; // 50MB
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/plain",
      "image/jpeg",
      "image/png",
    ];

    if (!allowedTypes.includes(file.type)) {
      return "Invalid file type. Please upload PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, TXT, JPG, or PNG files.";
    }

    if (file.size > maxSize) {
      return "File size exceeds 50MB limit.";
    }

    return null;
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const validationError = validateFile(selectedFile);
    if (validationError) {
      setUploadError(validationError);
      setFile(null);
      setFileName("");
      return;
    }

    setFile(selectedFile);
    setFileName(selectedFile.name);
    setUploadError("");
  };

  // Handle file upload
  const handleUpload = async (e) => {
    e.preventDefault();
    setUploadError("");
    setUploadSuccess(false);

    if (!subject || !file) {
      setUploadError("Please fill all fields and select a file");
      return;
    }

    setLoading(true);
    setUploadProgress(0);

    const reader = new FileReader();

    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        const percentLoaded = Math.round((e.loaded / e.total) * 100);
        setUploadProgress(percentLoaded);
      }
    };

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
        setFileName("");
        setUploadProgress(0);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
        fetchFiles();
      } catch (err) {
        console.error("Upload error:", err);
        setUploadError(err.message || "Upload failed!");
      } finally {
        setLoading(false);
        setUploadProgress(0);
      }
    };

    reader.onerror = () => {
      setUploadError("Failed to read file");
      setLoading(false);
      setUploadProgress(0);
    };

    reader.readAsDataURL(file);
  };

  // Handle file delete
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this file?")) return;

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

  const getFileIcon = (fileName) => {
    const ext = fileName?.split(".").pop()?.toLowerCase();
    return <FileText className="text-blue-600" size={20} />;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Academic File Management</h1>
        <p className="text-gray-600 mt-2">Upload and manage academic materials</p>
      </div>

      {/* UPLOAD FORM */}
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Upload New File</h2>
        
        <form onSubmit={handleUpload} className="space-y-6">
          {/* Success Message */}
          {uploadSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2">
              <CheckCircle size={20} />
              <span>File uploaded successfully!</span>
            </div>
          )}

          {/* Error Message */}
          {uploadError && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2">
              <AlertCircle size={20} />
              <span>{uploadError}</span>
            </div>
          )}

          {/* Auto Title Preview */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Auto-generated Title:</p>
            <p className="text-lg font-semibold text-blue-700">{autoTitle}</p>
          </div>

          {/* Subject Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Subject Name *
            </label>
            <input
              type="text"
              placeholder="e.g., Data Structures, Mathematics"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          {/* Type and Year */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                File Type *
              </label>
              <select
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="note">Class Note</option>
                <option value="book">Book</option>
                <option value="routine">Routine</option>
                <option value="syllabus">Syllabus</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Year *
              </label>
              <select
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="1st">1st Year</option>
                <option value="2nd">2nd Year</option>
                <option value="3rd">3rd Year</option>
                <option value="4th">4th Year</option>
              </select>
            </div>
          </div>

          {/* Semester */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Semester *
            </label>
            <select
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            >
              <option value="1st">1st Semester</option>
              <option value="2nd">2nd Semester</option>
            </select>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select File * (PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, TXT, JPG, PNG - Max 50MB)
            </label>
            <div className="mt-2">
              {fileName ? (
                <div className="flex items-center justify-between bg-gray-50 border border-gray-300 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    {getFileIcon(fileName)}
                    <span className="text-gray-700 font-medium">{fileName}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFile(null);
                      setFileName("");
                    }}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, TXT, JPG, PNG (MAX. 50MB)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.jpg,.jpeg,.png"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Upload Progress */}
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload size={20} />
                <span>Upload File</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* FILE LIST */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Uploaded Files</h2>
        
        {loading && files.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : files.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
            <FileText className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600 text-lg">No files uploaded yet</p>
            <p className="text-gray-500 text-sm mt-2">Upload your first academic file using the form above</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {files.map((f) => (
              <div
                key={f._id}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {getFileIcon(f.fileName)}
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {f.type.toUpperCase()}
                    </span>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{f.title}</h3>

                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">{f.subject}</span>
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  {f.year} Year • {f.semester} Semester
                </p>

                <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                  <a
                    href={f.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition text-sm font-medium"
                  >
                    <Eye size={16} />
                    View
                  </a>

                  <a
                    href={f.fileUrl}
                    download={f.fileName}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition text-sm font-medium"
                  >
                    <Download size={16} />
                    Download
                  </a>

                  <button
                    onClick={() => handleDelete(f._id)}
                    className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
