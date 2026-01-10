import clientPromise from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import { ObjectId } from "mongodb";

export async function DELETE(req, { params }) {
  try {
    // Next.js 16 compatible: params is a Promise
    const { id } = await params;

    if (!id) {
      return Response.json({ error: "ID missing" }, { status: 400 });
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
        await cloudinary.uploader.destroy(file.publicId, {
          resource_type: "raw",
        });
      } catch (cloudinaryError) {
        console.error("Cloudinary delete error:", cloudinaryError);
        // Continue with MongoDB deletion even if Cloudinary deletion fails
      }
    }

    // Delete from MongoDB
    await db.collection("academic").deleteOne({ _id: new ObjectId(id) });

    return Response.json({ success: true, message: "File deleted successfully" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return Response.json(
      { error: error.message || "Failed to delete file" },
      { status: 500 }
    );
  }
}
