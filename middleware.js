import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  // ❌ not logged in - redirect to auth page
  if (!token) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  try {
    // 🔓 decode JWT payload (basic check without DB call)
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );

    // Basic token validation - role check will be done in the page component
    // Middleware should be lightweight and not do async DB calls
    if (!payload || !payload.email) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    // Allow through - actual admin check happens in useAdmin hook
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/auth", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
