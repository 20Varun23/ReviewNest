import { main } from "@/db/index";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import jwt from "jsonwebtoken";
import getTokenData from "@/app/helpers/getTokenData";

main();

export async function GET(req) {
  try {
    const user = await getTokenData(req);
    if (!user) {
      return NextResponse.json({ userLogged: false });
    }

    console.log(user);
    return NextResponse.json({ userId: user.id });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Could not verify owener" },
      { status: 500 }
    );
  }
}
