import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";


export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  // ❌ not logged in
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // 🔓 decode JWT payload (basic check)
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );

    const email = payload.email;

    return handleRoleCheck(req, email);
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

async function handleRoleCheck(req, email) {
  const client = await clientPromise;
  const db = client.db("departmentDB");

  const user = await db.collection("users").findOne({ email });

  if (!user || user.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
