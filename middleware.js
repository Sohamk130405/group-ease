// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("next-auth")?.value;

  // Define routes that require authentication
  const protectedRoutes = ["/conversations", "/profile"];
  // Define routes for redirection
  const publicRoutes = ["/login", "/register"];
  if (
    publicRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    // If the user is logged in, redirect to /conversations
    if (token) {
      return NextResponse.redirect(new URL("/conversations", request.url));
    }
  }
  if (
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow the request to continue
  return NextResponse.next();
}

// Configure paths where middleware applies
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*"],
};
