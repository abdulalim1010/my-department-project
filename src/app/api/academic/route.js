import clientPromise from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import { ObjectId } from "mongodb";

/* =========================
        GET (with filters)
========================= */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const query = {};

    if (searchParams.get("type"))
      query.type = searchParams.get("type").toLowerCase();

    if (searchParams.get("year"))
      query.year = searchParams.get("year").toLowerCase();

    if (searchParams.get("semester"))
      query.semester = searchParams.get("semester").toLowerCase();

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "departmentDB");

    const files = await db
      .collection("academic")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return Response.json(files);
  } catch (error) {
    console.error("ACADEMIC GET ERROR:", error);
    return Response.json({ error: "Failed to fetch files" }, { status: 500 });
  }
}

/* =========================
        POST (UPLOAD)
========================= */
export async function POST(req) {
  try {
    const { title, subject, type, year, semester, fileBase64, fileName } =
      await req.json();

    if (!title || !subject || !type || !year || !semester || !fileBase64) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    // Upload to Cloudinary (raw for PDF/DOC/PPT)
    const upload = await cloudinary.uploader.upload(fileBase64, {
      folder: "academic-files",
      resource_type: "raw",
      use_filename: true,
      unique_filename: true,
    });

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "departmentDB");

    const rawViewUrl = upload.secure_url; // view in browser
    const downloadUrl = rawViewUrl + "?dl=1"; // force download

    await db.collection("academic").insertOne({
      title,
      subject,
      type: type.toLowerCase(),
      year: year.toLowerCase(),
      semester: semester.toLowerCase(),
      fileUrl: rawViewUrl,
      downloadUrl,
      publicId: upload.public_id,
      fileName: fileName || upload.original_filename,
      format: upload.format,
      createdAt: new Date(),
    });

    return Response.json({ ok: true, message: "File uploaded successfully" }, { status: 201 });
  } catch (error) {
    console.error("ACADEMIC POST ERROR:", error);
    return Response.json(
      { error: error.message || "Failed to upload file. Please try again." },
      { status: 500 }
    );
  }
}

/* =========================
        DELETE
========================= */
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return Response.json({ error: "ID required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "departmentDB");

    const file = await db
      .collection("academic")
      .findOne({ _id: new ObjectId(id) });

    if (!file) {
      return Response.json({ error: "File not found" }, { status: 404 });
    }

    // Delete from Cloudinary if publicId exists
    if (file.publicId) {
      try {
        await cloudinary.uploader.destroy(file.publicId, { resource_type: "raw" });
      } catch (cloudinaryError) {
        console.error("Cloudinary delete error:", cloudinaryError);
        // Continue with MongoDB deletion even if Cloudinary deletion fails
      }
    }

    // Delete from MongoDB
    await db.collection("academic").deleteOne({ _id: new ObjectId(id) });

    return Response.json({ ok: true, message: "File deleted successfully" });
  } catch (error) {
    console.error("ACADEMIC DELETE ERROR:", error);
    return Response.json(
      { error: error.message || "Failed to delete file" },
      { status: 500 }
    );
  }
}
