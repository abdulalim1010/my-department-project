export const dynamic = "force-dynamic";

import clientPromise from "@/lib/mongodb";

export async function GET(_, { params }) {
  const { slug } = await params;

  const client = await clientPromise;
  const db = client.db("departmentDB");

  const news = await db.collection("news").findOne(
    { slug },
    { projection: { views: 1 } }
  );

  return Response.json({ views: news?.views || 0 });
}
