import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

/**
 * PATCH → Update user role
 */
export async function PATCH(req, context) {
  try {
    // ✅ Next.js 16 FIX
    const params = await context.params;
    const id = params.id;

    const { role } = await req.json();

    if (!id || !role) {
      return new Response(
        JSON.stringify({ error: "ID and role are required" }),
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("departmentDB");

    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      { $set: { role } }
    );

    if (result.matchedCount === 0) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Role updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update role" }),
      { status: 500 }
    );
  }
}

/**
 * DELETE → Remove user
 */
export async function DELETE(req, context) {
  try {
    // ✅ Next.js 16 FIX
    const params = await context.params;
    const id = params.id;

    const client = await clientPromise;
    const db = client.db("departmentDB");

    const result = await db.collection("users").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "User deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete user" }),
      { status: 500 }
    );
  }
}
