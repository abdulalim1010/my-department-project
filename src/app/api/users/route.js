import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const data = await req.json();

    // Validate minimal fields
    if (!data.email || !data.name) {
      return new Response(JSON.stringify({ error: "Name and Email are required" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email: data.email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 409 });
    }

    // Insert user
    const result = await db.collection("users").insertOne({
      name: data.name,
      email: data.email,
      createdAt: new Date(),
      // তুমি চাইলে Firebase uid বা extra info এখানে add করতে পারো
    });

    return new Response(JSON.stringify({ insertedId: result.insertedId }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to save user" }), { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const users = await db.collection("users").find({}).toArray();

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), { status: 500 });
  }
}
