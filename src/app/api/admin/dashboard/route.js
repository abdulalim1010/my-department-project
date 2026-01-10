import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    // req.url theke search params ber koro
    const url = new URL(req.url); // Next.js automatically passes full URL
    const email = url.searchParams.get("email");

    if (!email) {
      return new Response(JSON.stringify({ role: null, error: "Email missing" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ role: null, error: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ role: user.role || null }), { status: 200 });
  } catch (err) {
    console.error("API /admin/check error:", err);
    return new Response(JSON.stringify({ role: null, error: "Server error" }), { status: 500 });
  }
}
