import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

/**
 * PATCH: Update user role (admin only)
 */
export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const { role } = await req.json();

    if (!role) {
      return new Response(
        JSON.stringify({ error: "Role is required" }),
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("departmentDB");

    await db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      { $set: { role } }
    );

    return new Response(
      JSON.stringify({ message: "Role updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to update role" }),
      { status: 500 }
    );
  }
}
