import { main } from "@/db/index";
import { NextRequest, NextResponse } from "next/server";
import { User, userSchema } from "@/models/user";
import bcrypt from "bcryptjs";
import { asyncWrap } from "@/app/helpers/asyncWrap";
import { httpCodes } from "@/app/helpers/httpCodes";

main();

//*proper
export async function POST(req) {
  return asyncWrap(async () => {
    const reqBody = await req.json();
    const { username, email, password, age } = reqBody;

    const user = await User.findOne({ email: email });

    if (user) {
      console.log("user exists");
      return NextResponse.json(
        { error: "user already exists" },
        { status: httpCodes.badReq }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const res = userSchema.validate({
      user: {
        username,
        email,
        age,
        password: hashedPass,
      },
    });

    if (res.error) {
      throw res.error;
    }

    const newUser = new User({
      username,
      email,
      password: hashedPass,
      age,
    });

    await newUser.save();
    return NextResponse.json(
      { message: "user posted" },
      { status: httpCodes.created }
    );
  });
}
