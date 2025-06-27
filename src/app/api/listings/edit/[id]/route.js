import { main } from "@/db/index";
import ListItem from "@/models/listing";
import { NextRequest, NextResponse } from "next/server";
import { ErrorClass } from "@/app/helpers/Error";

main();

export async function GET(req, { params }) {
  try {
    params = await params;
    const listing = await ListItem.findById(params.id);
    return NextResponse.json({ listing });
  } catch (err) {
    return new ErrorClass(500, "could not edit listing");
  }
}
