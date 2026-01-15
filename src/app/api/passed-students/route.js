import clientPromise from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const status = url.searchParams.get("status"); // pending / approved

    const client = await clientPromise;
    const db = client.db("departmentDB"); // ✅ database name

    const query = status ? { status } : {};
    const students = await db
      .collection("passed_students")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return new Response(JSON.stringify(students), { status: 200 });
  } catch (err) {
    console.error("GET /api/passed-students error:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch students" }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const photo = formData.get("photo");

    if (!photo) {
      return new Response(JSON.stringify({ error: "Photo is required" }), { status: 400 });
    }

    const buffer = Buffer.from(await photo.arrayBuffer());

    const upload = await cloudinary.uploader.upload(
      `data:${photo.type};base64,${buffer.toString("base64")}`,
      { folder: "passed-students" }
    );

    const client = await clientPromise;
    const db = client.db("departmentDB");

    const student = {
      name: formData.get("name") || "Unknown",
      batch: formData.get("batch") || "N/A",
      designation: formData.get("designation") || "N/A",
      company: formData.get("company") || "N/A",
      photoUrl: upload.secure_url,
      status: "pending",
      createdAt: new Date(),
    };

    const result = await db.collection("passed_students").insertOne(student);

    return new Response(JSON.stringify({ ok: true, studentId: result.insertedId }), { status: 201 });
  } catch (err) {
    console.error("POST /api/passed-students error:", err);
    return new Response(JSON.stringify({ error: "Failed to add student" }), { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return new Response(JSON.stringify({ error: "Missing id or status" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("departmentDB");

    const result = await db
      .collection("passed_students")
      .updateOne({ _id: new ObjectId(id) }, { $set: { status } });

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ error: "Student not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error("PATCH /api/passed-students error:", err);
    return new Response(JSON.stringify({ error: "Failed to update student" }), { status: 500 });
  }
}
