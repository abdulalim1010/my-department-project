import clientPromise from "@/lib/mongodb";
import Link from "next/link";

export default async function NewsPage() {
  const client = await clientPromise;
  const db = client.db("departmentDB");

  const news = await db
    .collection("news")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return (
    <section className="max-w-7xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold mb-12 text-center">
        Department News
      </h1>

      <div className="grid md:grid-cols-3 gap-10">
        {news.map((item) => (
          <div key={item._id} className="border">
            <img src={item.image} className="h-56 w-full object-cover" />

            <div className="p-6">
              <h2 className="font-semibold text-lg">
                {item.title}
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                👁 {item.views || 0} views
              </p>

              <Link
                href={`/news/${item.slug}`}
                className="inline-block mt-5 text-blue-700 font-semibold"
              >
                READ MORE →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
