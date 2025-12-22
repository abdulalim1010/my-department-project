import clientPromise from "@/lib/mongodb";

/**
 * POST: Register user in MongoDB
 */
export async function POST(req) {
  try {
    const data = await req.json();

    const { name, email, firebaseUid } = data;

    if (!name || !email || !firebaseUid) {
      return new Response(
        JSON.stringify({ error: "Name, Email and Firebase UID are required" }),
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    // check existing
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: "User already exists" }),
        { status: 200 }
      );
    }

    // 🔐 Admin email list (change as needed)
    const ADMIN_EMAILS = [
      "admin@mydepartment.edu",
      "chairman@mydepartment.edu",
    ];

    const role = ADMIN_EMAILS.includes(email)
      ? "admin"
      : "student";

    const result = await db.collection("users").insertOne({
      name,
      email,
      firebaseUid,
      role,
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({
        insertedId: result.insertedId,
        role,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("User save error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to save user" }),
      { status: 500 }
    );
  }
}

/**
 * GET: Get all users (admin use)
 */
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const users = await db
      .collection("users")
      .find({}, { projection: { password: 0 } })
      .toArray();

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch users" }),
      { status: 500 }
    );
  }
}
