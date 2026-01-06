import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Public pages
  const publicPaths = ["/login", "/register"];
  const isPublicPath = publicPaths.includes(pathname);

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  // 🔐 Logged-in user trying to access login/register
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 🔒 Not logged in & trying to access protected page
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/invoice", "/admin/:path*"],
};
