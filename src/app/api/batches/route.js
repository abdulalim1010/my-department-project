import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("departmentDB"); // ✅ FIXED

    const batches = await db
      .collection("batches")
      .find({})
      .toArray();

    return Response.json(batches);
  } catch (error) {
    console.error("API /batches error:", error);

    return Response.json(
      { error: "Failed to fetch batches" },
      { status: 500 }
    );
  }
}
