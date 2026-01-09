import clientPromise from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import { ObjectId } from "mongodb";

export async function DELETE(req, context) {
  try {
    // ✅ FIX: params await করতে হবে
    const { id } = await context.params;

    if (!id) {
      return new Response(
        JSON.stringify({ error: "ID missing" }),
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const file = await db
      .collection("academic")
      .findOne({ _id: new ObjectId(id) });

    if (!file) {
      return new Response(
        JSON.stringify({ error: "File not found" }),
        { status: 404 }
      );
    }

    // ☁️ Cloudinary delete
    if (file.publicId) {
      await cloudinary.uploader.destroy(file.publicId, {
        resource_type: "raw",
      });
    }

    // 🗑️ MongoDB delete
    await db
      .collection("academic")
      .deleteOne({ _id: new ObjectId(id) });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE ERROR:", error);

    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
