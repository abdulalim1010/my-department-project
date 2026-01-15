import clientPromise from "@/lib/mongodb";
import Link from "next/link";

export default async function GalleryPage() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const items = await db
    .collection("student_gallery")
    .find({ status: "approved" })
    .sort({ createdAt: -1 })
    .toArray();

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">

      {/* HEADER */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-extrabold text-blue-900">
          Student Gallery
        </h1>
        <p className="text-gray-600 mt-3">
          Memories & contributions from our department students
        </p>

        <Link
          href="/gallery/submit"
          className="inline-block mt-6 px-6 py-3 bg-blue-700 text-white rounded-xl font-semibold hover:bg-blue-800"
        >
          If you are a member of the department
        </Link>
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <div
            key={item._id.toString()}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <img
              src={item.imageUrl}
              className="w-full h-60 object-cover"
            />
            <div className="p-5">
              <h3 className="font-bold text-xl">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.description}</p>
              <p className="text-sm text-gray-400 mt-3">
                — {item.studentName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
