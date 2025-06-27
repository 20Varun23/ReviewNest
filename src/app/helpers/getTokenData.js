import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export default async function getTokenData(req) {
  try {
    const token = req.cookies.get("token")?.value || "";
    if (token === "") {
      return null;
    }
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
