import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const DB_NAME = "departmentDB";

export async function GET() {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  const notices = await db
    .collection("notices")
    .find()
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(notices);
}

export async function POST(req) {
  const body = await req.json();
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  await db.collection("notices").insertOne({
    title: body.title,
    description: body.description,
    fileUrl: body.fileUrl || null,
    createdAt: new Date(),
  });

  return NextResponse.json({ success: true });
}

export async function PUT(req) {
  const body = await req.json();
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  await db.collection("notices").updateOne(
    { _id: new ObjectId(body.id) },
    {
      $set: {
        title: body.title,
        description: body.description,
        fileUrl: body.fileUrl || null,
      },
    }
  );

  return NextResponse.json({ success: true });
}

export async function DELETE(req) {
  const { id } = await req.json();
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  await db.collection("notices").deleteOne({
    _id: new ObjectId(id),
  });

  return NextResponse.json({ success: true });
}
