import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const events = await db
      .collection("events")
      .find({})
      .sort({ date: 1 })
      .toArray();

    return new Response(JSON.stringify(events), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to load events" }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const newEvent = {
      ...body,
      createdAt: new Date(),
    };

    const result = await db.collection("events").insertOne(newEvent);

    return new Response(
      JSON.stringify({ insertedId: result.insertedId }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to add event" }),
      { status: 500 }
    );
  }
}
