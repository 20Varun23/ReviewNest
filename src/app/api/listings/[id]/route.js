import { main } from "@/db/index";
import { ListItem, listingSchema } from "@/models/listing";
import { NextRequest, NextResponse } from "next/server";
import { asyncWrap } from "@/app/helpers/asyncWrap";
import { httpCodes } from "@/app/helpers/httpCodes";
//contents : GET,DELETE,POST

main();

//*proper
//gets specific listing
export async function GET(req, { params }) {
  return asyncWrap(async () => {
    const id = await params.id;
    const listing = await ListItem.findById(id).populate("reviews");
    console.log(listing);
    if (!listing) {
      return "no listing";
    }
    return NextResponse.json({ listing }, { status: httpCodes.success });
  });
}
