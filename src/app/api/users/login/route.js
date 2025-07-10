import { main } from "@/db/index";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { asyncWrap } from "@/app/helpers/asyncWrap";
import { httpCodes } from "@/app/helpers/httpCodes";

main();

export async function POST(req) {
  return asyncWrap(async () => {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    console.log(email);

    const user = await User.findOne({ email: email });

    if (!user) {
      return NextResponse.json(
        { error: "could not find user" },
        { status: httpCodes.notFound }
      );
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      console.log("wrong password");
      return NextResponse.json(
        { error: "Invalid password" },
        { status: httpCodes.badReq }
      );
    }

    const tokenData = {
      username: user.username,
      email: user.email,
      age: user.age,
      id: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });

    const res = NextResponse.json(
      {
        message: "user logged in successfully",
        success: true,
      },
      {
        status: httpCodes.success,
      }
    );

    res.cookies.set("token", token, { httpOnly: true });

    return res;
  });
}
