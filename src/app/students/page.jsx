"use client";

import { useState, useMemo, useEffect } from "react";
import StudentForm from "../components/StudentForm";

export default function StudentsPage() {
  const [savedData, setSavedData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterSession, setFilterSession] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterDistrict, setFilterDistrict] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  /* ================= LOAD DATA ================= */
  const loadStudents = async () => {
    const res = await fetch("/api/students");
    const data = await res.json();
    setSavedData(data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  /* ================= SAVE DATA ================= */
  const handleFormSubmit = async (data) => {
    await fetch("/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, createdAt: new Date() }),
    });

    loadStudents();
  };

  /* ================= FILTER ================= */
  const filteredData = useMemo(() => {
    return savedData.filter((item) => {
      return (
        (item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.studentId.toLowerCase().includes(search.toLowerCase()) ||
          item.email.toLowerCase().includes(search.toLowerCase())) &&
        (filterSession ? item.session === filterSession : true) &&
        (filterYear ? item.year === filterYear : true) &&
        (filterDistrict ? item.district === filterDistrict : true)
      );
    });
  }, [search, filterSession, filterYear, filterDistrict, savedData]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto mt-20 px-4">
      {/* ================= TITLE ================= */}
      <h1 className="text-5xl font-bold text-center mb-10 text-blue-800">
        Give Your Data Correctly
      </h1>

      {/* ================= FORM ================= */}
      <StudentForm onSubmit={handleFormSubmit} />

      {/* ================= SEARCH & FILTER ================= */}
      {savedData.length > 0 && (
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-lg border border-blue-100">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">
            Search & Filter
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Search by name, ID, email"
              className="border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* Session */}
            <select
              value={filterSession}
              onChange={(e) => setFilterSession(e.target.value)}
              className="border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
            >
              <option value="">All Sessions</option>
              {Array.from({ length: 20 }).map((_, i) => {
                const y = 2010 + i;
                const s = `${y}-${y + 1}`;
                return (
                  <option key={s} value={s}>
                    {s}
                  </option>
                );
              })}
            </select>

            {/* Year */}
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
            >
              <option value="">All Years</option>
              {["1st Year", "2nd Year", "3rd Year", "4th Year"].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>

            {/* District */}
            <select
              value={filterDistrict}
              onChange={(e) => setFilterDistrict(e.target.value)}
              className="border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
            >
              <option value="">All Districts</option>
              {[
                "Dhaka",
                "Chittagong",
                "Khulna",
                "Rajshahi",
                "Barisal",
                "Sylhet",
                "Rangpur",
                "Mymensingh",
                // add all 64 districts here
              ].map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* ================= STUDENT CARDS ================= */}
      {paginatedData.length > 0 && (
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-800">All Students</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedData.map((item) => (
              <div
                key={item._id}
                className="p-6 bg-gradient-to-r from-white to-blue-50 border-l-4 border-blue-500 rounded-xl shadow-lg hover:shadow-2xl transition"
              >
                {/* Name highlight */}
                <h3 className="text-2xl font-semibold text-blue-700 mb-3">
                  {item.name}
                </h3>

                {/* Dynamic fields */}
                <div className="space-y-1 text-gray-800">
                  {Object.entries(item).map(([key, value]) => {
                    if (["_id", "name", "createdAt"].includes(key)) return null;
                    return (
                      <p key={key}>
                        <strong className="capitalize">
                          {key.replace(/([A-Z])/g, " $1")}:
                        </strong>{" "}
                        {String(value)}
                      </p>
                    );
                  })}
                </div>

                {/* Created Date */}
                {item.createdAt && (
                  <p className="mt-3 text-sm text-gray-500">
                    Added on: {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* ================= PAGINATION ================= */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-5 py-2 bg-blue-100 text-blue-700 rounded-lg"
            >
              Previous
            </button>

            <span className="font-semibold text-blue-700">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              className="px-5 py-2 bg-blue-100 text-blue-700 rounded-lg"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
