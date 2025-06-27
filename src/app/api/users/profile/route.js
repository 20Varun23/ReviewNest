import { main } from "@/db/index";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getTokenData from "@/app/helpers/getTokenData";

main();

export async function GET(req) {
  try {
    const user = await getTokenData(req);

    return NextResponse.json({ user: user });
  } catch (err) {
    return NextResponse.json(
      { error: "error while showing profile" },
      { status: 500 }
    );
  }
}
