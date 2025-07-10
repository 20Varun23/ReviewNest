import { main } from "@/db/index";
import { ListItem, listingSchema } from "@/models/listing";
import { NextRequest, NextResponse } from "next/server";
import { asyncWrap } from "@/app/helpers/asyncWrap";
import { httpCodes } from "@/app/helpers/httpCodes";

//connect with database
main();

export async function POST(req) {
  return asyncWrap(async () => {
    const reqBody = await req.json();
    const temp = {
      title: reqBody.title,
      description: reqBody.description,
      filename: reqBody.filename,
      url: reqBody.url,
      price: reqBody.price,
      location: reqBody.location,
      country: reqBody.country,
      owner: reqBody.owner,
      reviews: [],
    };

    if (!temp.owner) {
      return NextResponse.json(
        { error: "User not logged in" },
        { status: httpCodes.unauthorized }
      );
    }

    //validate schema
    const res = listingSchema.validate({
      listing: { ...temp },
    });

    if (res.error) {
      throw res.error;
    }

    const newListing = new ListItem({
      title: temp.title,
      description: temp.description,
      "image.filename": temp.filename,
      "image.url": temp.url,
      price: temp.price,
      location: temp.location,
      country: temp.country,
      reviews: temp.reviews,
      owner: temp.owner,
    });
    console.log(res);

    await newListing.save();

    return NextResponse.json(
      { message: "Listings posted" },
      { status: httpCodes.created }
    );
  });
}
