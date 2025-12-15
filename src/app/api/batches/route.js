import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const batches = await db.collection("batches").find({}).toArray();
    return new Response(JSON.stringify(batches), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch batches" }), { status: 500 });
  }
}
