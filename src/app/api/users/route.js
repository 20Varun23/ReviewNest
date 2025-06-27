import { main } from "@/db/index";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { userSchema } from "@/models/userSchema";

//[ ]: Add server side verification

main();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { username, email, password, age } = reqBody;

    const user = await User.findOne({ email: email });

    if (user) {
      console.log("user exists");
      return NextResponse.json(
        { error: "user already exists" },
        { status: 501 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const validate = userSchema.validate({
      user: {
        username,
        email,
        age,
        password: hashedPass,
      },
    });

    if (res.error) {
      throw new Error("error while validating");
      console.log(err);
    }

    const newUser = new User({
      username,
      email,
      password: hashedPass,
      age,
    });

    await newUser.save();
    return NextResponse.json(
      { message: "new user got added" },
      { status: 500 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Could not add user" }, { status: 500 });
  }
}
