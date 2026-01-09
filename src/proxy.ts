import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/admin/login"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth_token")?.value;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  if (pathname === "/admin/login" && token) {
    return NextResponse.redirect(new URL("/admin/content", request.url));
  }

  if (
    pathname.startsWith("/admin") &&
    !PUBLIC_PATHS.includes(pathname) &&
    !token
  ) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: "/admin/:path*",
};
