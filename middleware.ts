import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuthPage = req.nextUrl.pathname === "/";
  
  const isProtectedPage = 
    req.nextUrl.pathname.startsWith("/analyzer") || 
    req.nextUrl.pathname.startsWith("/dashboard");

  if (isProtectedPage && !token) {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/analyzer/:path*", "/dashboard/:path*"],
};