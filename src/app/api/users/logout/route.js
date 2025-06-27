import { main } from "@/db/index";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcryptjs";

main();

export async function GET(req) {
  try {
    const res = NextResponse.json({ message: "logged out" });
    res.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return res;
  } catch (err) {
    return NextResponse.json({ error: "couldn't logout" });
  }
}
