import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value || "";
  let tokenData = null;
  const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);

  if (token != "") {
    const { payload } = await jwtVerify(token, secret);
    tokenData = payload;
  }

  const path = req.nextUrl.pathname;

  const protectedListingsPaths = ["/listings/authReq"];

  const publicPatterns = [
    /^\/listings$/,
    /^\/listings\/[a-zA-Z0-9]+$/,
    /^\/users\/login$/,
    /^\/users\/signUp$/,
    /^\/users$/,
    /^\/$/,
  ];

  const isPublicPath =
    publicPatterns.some((regex) => regex.test(path)) &&
    !protectedListingsPaths.includes(path);

  const notLoggedPatterns = [/^\/users\/login$/, /^\/users\/signUp$/];
  const isNotLoggedPath = notLoggedPatterns.some((regex) => regex.test(path));

  console.log(`isPublicPath : ${isPublicPath}`);
  console.log(`isNotLoggedPath : ${isNotLoggedPath}`);
  console.log(`tokenData : ${tokenData}`);

  if (!tokenData && !isPublicPath) {
    console.log("cant acess this also bro");
    return NextResponse.redirect(new URL("/users/login", req.url));
  }

  if (tokenData && isNotLoggedPath) {
    console.log("can't access this path");
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
};

// private : review
