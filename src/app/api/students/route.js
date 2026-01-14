import clientPromise from "@/lib/mongodb";

/* ================= GET ALL STUDENTS ================= */
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const students = await db
      .collection("students")
      .find({})
      .sort({ createdAt: -1 }) // newest first
      .toArray();

    return new Response(JSON.stringify(students), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch students" }),
      { status: 500 }
    );
  }
}

/* ================= ADD STUDENT ================= */
export async function POST(req) {
  try {
    const data = await req.json();

    /* 🔒 Basic Validation */
    if (
      !data.name ||
      !data.studentId ||
      !data.session ||
      !data.year ||
      !data.email ||
      !data.district
    ) {
      return new Response(
        JSON.stringify({ error: "All required fields are missing" }),
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const result = await db.collection("students").insertOne({
      ...data,
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({ insertedId: result.insertedId }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to save student" }),
      { status: 500 }
    );
  }
}
