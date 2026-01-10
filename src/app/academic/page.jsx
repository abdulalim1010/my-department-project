import Link from "next/link";
import { BookOpen, FileText, Calendar, Download, Eye } from "lucide-react";

export default async function AcademicPage() {
  let files = [];
  
  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/academic`, {
      cache: "no-store",
    });
    if (res.ok) {
      files = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch academic files:", error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <BookOpen className="text-white" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Academic Resources
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access course materials, notes, books, routines, and syllabi for all years and semesters
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Link
            href="/academic/class-notes"
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-center group hover:scale-105"
          >
            <FileText className="text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="font-semibold text-gray-800">Class Notes</h3>
          </Link>
          <Link
            href="/academic/books"
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-center group hover:scale-105"
          >
            <BookOpen className="text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="font-semibold text-gray-800">Books</h3>
          </Link>
          <Link
            href="/academic/routine"
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-center group hover:scale-105"
          >
            <Calendar className="text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="font-semibold text-gray-800">Routine</h3>
          </Link>
          <Link
            href="/academic/syllabus"
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-center group hover:scale-105"
          >
            <FileText className="text-orange-600 mx-auto mb-2 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="font-semibold text-gray-800">Syllabus</h3>
          </Link>
        </div>

        {/* Files List */}
        {files.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <FileText className="text-gray-400 mx-auto mb-4" size={48} />
            <p className="text-gray-600 text-lg">No academic files available yet</p>
            <p className="text-gray-500 text-sm mt-2">Check back later for course materials</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {files.map((f) => (
              <div
                key={f._id}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {f.type.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {f.year} Year
                  </span>
                </div>

                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{f.title}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">{f.subject}</span>
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  {f.semester} Semester
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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
