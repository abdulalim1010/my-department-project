import Link from "next/link";
import clientPromise from "@/lib/mongodb";

export default async function TeachersPage() {
  const client = await clientPromise;
  const db = client.db("departmentDB");

  const teachers = await db.collection("teachers").find({}).toArray();

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* ===== PAGE HEADER ===== */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-4">
          Meet Our Faculty
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Dedicated, experienced and highly qualified faculty members of the
          Electrical & Electronic Engineering Department.
        </p>
      </div>

      {/* ===== TEACHERS GRID ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {teachers.map((teacher) => (
          <Link
            key={teacher._id.toString()}
            href={`/teachers/${teacher._id.toString()}`}
            className="group"
          >
            <div
              className="relative bg-white rounded-3xl shadow-xl overflow-hidden
                         hover:-translate-y-3 hover:shadow-2xl transition-all duration-500"
            >
              {/* ===== TOP GRADIENT STRIP ===== */}
              <div className="h-28 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600" />

              {/* ===== CIRCLE IMAGE ===== */}
              <div className="absolute top-14 left-1/2 -translate-x-1/2">
                <div
                  className="w-32 h-32 rounded-full bg-white p-2 shadow-xl
                             group-hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>

              {/* ===== CARD CONTENT ===== */}
              <div className="pt-24 pb-8 px-6 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  {teacher.name}
                </h2>

                {/* DESIGNATION BADGE */}
                <span
                  className="inline-block mt-2 px-4 py-1 rounded-full
                             bg-blue-100 text-blue-700 text-sm font-semibold"
                >
                  {teacher.designation}
                </span>

                <p className="text-gray-500 mt-3 mb-6">
                  {teacher.department}
                </p>

                {/* BUTTON */}
                <button
                  className="px-7 py-2.5 rounded-full
                             bg-gradient-to-r from-blue-600 to-indigo-600
                             text-white font-semibold
                             hover:from-blue-700 hover:to-indigo-700
                             transition-all duration-300 shadow-md
                             group-hover:scale-105"
                >
                  View Profile
                </button>
              </div>

              {/* ===== GLOW EFFECT ===== */}
              <div
                className="absolute inset-0 rounded-3xl
                           opacity-0 group-hover:opacity-100
                           transition duration-500
                           bg-gradient-to-tr from-blue-500/10 to-indigo-500/10"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
