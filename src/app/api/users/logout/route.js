import { main } from "@/db/index";
import { NextRequest, NextResponse } from "next/server";
import { asyncWrap } from "@/app/helpers/asyncWrap";
import { httpCodes } from "@/app/helpers/httpCodes";

main();

export async function GET(req) {
  return asyncWrap(() => {
    const res = NextResponse.json(
      { message: "logged out" },
      { status: httpCodes.success }
    );
    res.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return res;
  });
}
