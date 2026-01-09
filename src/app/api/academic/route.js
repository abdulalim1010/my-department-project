import clientPromise from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";

/* ================= GET ================= */
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const files = await db
      .collection("academic")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return new Response(JSON.stringify(files), { status: 200 });
  } catch (error) {
    console.error("ACADEMIC GET ERROR:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch files" }),
      { status: 500 }
    );
  }
}

/* ================= POST ================= */
export async function POST(req) {
  try {
    const { title, subject, type, fileBase64 } = await req.json();

    if (!title || !subject || !type || !fileBase64) {
      return new Response(
        JSON.stringify({ error: "Missing fields" }),
        { status: 400 }
      );
    }

    // Upload to Cloudinary
    const upload = await cloudinary.uploader.upload(fileBase64, {
      folder: "academic-files",
      resource_type: "raw",
    });

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    await db.collection("academic").insertOne({
      title,
      subject,
      type,
      fileUrl: upload.secure_url,
      publicId: upload.public_id,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ ok: true }), { status: 201 });
  } catch (error) {
    console.error("ACADEMIC POST ERROR:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
