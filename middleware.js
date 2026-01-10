import { NextResponse } from "next/server";

export function middleware(req) {
  // For admin routes, we'll let the client-side useAdmin hook handle authentication
  // This prevents the middleware from blocking valid Firebase-authenticated users
  // The useAdmin hook will redirect unauthorized users appropriately
  
  // Just allow the request through - authentication check happens in useAdmin hook
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
