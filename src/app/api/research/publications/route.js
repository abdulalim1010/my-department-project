import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

/* GET */
export async function GET() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const data = await db
    .collection("publications")
    .find()
    .sort({ createdAt: -1 })
    .toArray();

  return Response.json(data);
}

/* POST */
export async function POST(req) {
  const { title, authors, year, journal } = await req.json();

  if (!title || !authors) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  await db.collection("publications").insertOne({
    title,
    authors,
    year,
    journal,
    createdAt: new Date(),
  });

  return Response.json({ ok: true });
}

/* DELETE */
export async function DELETE(req) {
  const { id } = await req.json();

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  await db.collection("publications").deleteOne({
    _id: new ObjectId(id),
  });

  return Response.json({ ok: true });
}
