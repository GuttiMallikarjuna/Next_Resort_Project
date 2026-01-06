import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  // Public routes (guest allowed)
  const publicPaths = ["/", "/login", "/register"];

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // 🚫 Guest trying to access protected routes
  if (!token && (path.startsWith("/invoice") || path.startsWith("/admin"))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🚫 Logged-in user accessing auth pages
  if (token && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/invoice/:path*", "/admin/:path*"],
};
