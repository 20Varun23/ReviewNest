import { main } from "@/db/index";
import { NextRequest, NextResponse } from "next/server";
import getTokenData from "@/app/helpers/getTokenData";
import { httpCodes } from "@/app/helpers/httpCodes";
import { asyncWrap } from "@/app/helpers/asyncWrap";

main();

export async function GET(req) {
  return asyncWrap(async () => {
    const user = await getTokenData(req);

    if (!user) {
      return NextResponse.json(
        { logged: false },
        { status: httpCodes.success }
      );
    }

    return NextResponse.json(
      { user: user, logged: true },
      { status: httpCodes.success }
    );
  });
}
