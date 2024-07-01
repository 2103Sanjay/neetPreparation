import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isRootPath = path === "/";
  const token = request.cookies.get("token")?.value || "";

  if (isRootPath && token) {
    return NextResponse.redirect(new URL("/pages/home", request.nextUrl));
  }

  if (!isRootPath && !token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/pages/:path*"],
};
