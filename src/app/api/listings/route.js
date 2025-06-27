import { main } from "@/db/index";
import ListItem from "@/models/listing";
import { NextRequest, NextResponse } from "next/server";
import { ErrorClass } from "@/app/helpers/Error";
import { listingSchema } from "@/models/listingSchema";
import Review from "@/models/review";

//connect with database
main();

export async function GET() {
  try {
    const allListings = await ListItem.find({});
    console.log("hello");
    return NextResponse.json({ allListings });
  } catch (err) {
    return new ErrorClass(500, "could not get listings");
  }
}

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const {
      title,
      description,
      filename,
      url,
      price,
      location,
      country,
      owner,
    } = reqBody;
    const res = listingSchema.validate({
      listing: {
        title,
        description,
        filename,
        url,
        price,
        location,
        country,
        reviews: [],
        owner,
      },
    });

    if (res.error) {
      throw res.error;
    }
    const newListing = new ListItem({
      title: title,
      description: description,
      "image.filename": filename,
      "image.url": url,
      price: price,
      location: location,
      country: country,
      reviews: [],
      owner: owner,
    });
    console.log(res);

    await newListing.save();

    return NextResponse.json(
      { message: "post listings done" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "could not add lstings" },
      { status: 500 }
    );
  }
}
