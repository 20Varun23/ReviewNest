import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value || "";

  const path = req.nextUrl.pathname;
  const notLogged = path === "/users/login" || path === "/users";

  if (token && notLogged) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
}

export const config = {
  matcher: ["/users", "/users/login"],
};
