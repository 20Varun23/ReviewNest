import { main } from "@/db/index";
import ListItem from "@/models/listing";
import { NextRequest, NextResponse } from "next/server";
import { ErrorClass } from "@/app/helpers/Error";
import { listingSchema } from "@/models/listingSchema";

main();

export async function GET(req, { params }) {
  try {
    const id = await params.id;
    const listing = await ListItem.findById(id).populate("reviews");
    console.log(listing);
    if (!listing) {
      throw "listing not found";
    }
    return NextResponse.json({ listing });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: 500 }, { error: "Hello" });
  }
}

export async function PATCH(req, { params }) {
  const reqBody = await req.json();
  const {
    title,
    description,
    filename,
    url,
    price,
    location,
    country,
    reviews,
  } = reqBody;

  console.log(reqBody);

  const { id } = await params;

  const listing = new ListItem({
    title: title,
    description: description,
    "image.filename": filename,
    "image.url": url,
    price: price,
    location: location,
    country: country,
    reviews: reviews,
  });

  try {
    const res = listingSchema.validate({ listing }, { stripUnknown: true });
    //console.log(res);

    if (res.error) {
      throw res.error;
    }

    await ListItem.findByIdAndUpdate(id, {
      title: title,
      description: description,
      "image.filename": filename,
      "image.url": url,
      price: price,
      location: location,
      country: country,
      reviews: reviews,
    });

    return NextResponse.json(
      { message: "patch listings successful" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    console.log("hello");
    const id = await params.id;
    await ListItem.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "delete listings successful" },
      { status: 200 }
    );
  } catch (err) {
    return new ErrorClass(500, "could not delete listing");
  }
}
