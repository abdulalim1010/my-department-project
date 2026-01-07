import clientPromise from "@/lib/mongodb";
import Link from "next/link";
import Image from "next/image";

export default async function NewsPage() {
  const client = await clientPromise;
  const db = client.db("departmentDB");

  const news = await db
    .collection("news")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return (
    <section className="bg-[#f8fafc] py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900">
            Department News & Events
          </h1>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Latest academic updates, seminars, research activities and events
            from the Department of Electrical & Electronic Engineering.
          </p>
        </div>

        {/* NEWS GRID */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <article
              key={item._id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              {/* IMAGE */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* CATEGORY */}
                {item.category && (
                  <span className="absolute top-4 left-4 bg-blue-700 text-white text-xs px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-6 flex flex-col h-full">
                <h2 className="text-lg font-semibold text-gray-900 leading-snug line-clamp-2">
                  {item.title}
                </h2>

                {/* META */}
                <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                  <span>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>

                  <span className="flex items-center gap-1">
                    👁 <span>{item.views || 0}</span>
                  </span>
                </div>

                {/* BUTTON */}
                <Link
                  href={`/news/${item.slug}`}
                  className="mt-6 inline-flex items-center justify-center rounded-lg border border-blue-700 
                  px-4 py-2 text-sm font-semibold text-blue-700 
                  hover:bg-blue-700 hover:text-white transition-all duration-300"
                >
                  Read Full News
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
