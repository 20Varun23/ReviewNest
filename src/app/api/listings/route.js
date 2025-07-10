import { main } from "@/db/index";
import { ListItem, listingSchema } from "@/models/listing";
import { NextRequest, NextResponse } from "next/server";
import { asyncWrap } from "@/app/helpers/asyncWrap";
import { httpCodes } from "@/app/helpers/httpCodes";

//connect with database
main();

//* proper
//for getting all the listings
export async function GET() {
  return asyncWrap(async () => {
    const allListings = await ListItem.find({});
    console.log("hello");
    return NextResponse.json({ allListings }, { status: httpCodes.success });
  });
}
