const { NextResponse } = require("next/server");
const { httpsCodes } = require("./httpCodes");

async function asyncWrap(fn) {
  try {
    fn();
  } catch (err) {
    console.log();
    return NextResponse.json(
      { error: err },
      { status: httpsCodes.serverError }
    );
  }
}

export { asyncWrap };
