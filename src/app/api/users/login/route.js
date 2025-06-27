import { main } from "@/db/index";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

main();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    console.log(email);

    const user = await User.findOne({ email: email });

    if (!user) {
      console.log("could not find user");
      return NextResponse.json(
        { error: "could not find user" },
        { status: 500 } //[ ]: find proper status code
      );
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      console.log("wrong password");
      return NextResponse.json({ error: "Invalid password" }, { status: 500 });
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

    const res = NextResponse.json({
      message: "user loged in successfully",
      success: true,
    });

    res.cookies.set("token", token, { httpOnly: true });

    return res;
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "could not login" }, { status: 500 });
  }
}
