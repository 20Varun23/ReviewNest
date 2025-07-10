import { NextResponse } from "next/server";
import { httpCodes } from "./httpCodes";

async function asyncWrap(fn) {
  try {
    const ret = await fn();
    return ret;
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: err.message || "Internal Server error" },
      { status: httpCodes.serverError }
    );
  }
}

export { asyncWrap };
