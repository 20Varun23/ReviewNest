import { main } from "@/db/index";
import { ListItem, listingSchema } from "@/models/listing";
import { NextRequest, NextResponse } from "next/server";
import { asyncWrap } from "@/app/helpers/asyncWrap";
import { httpCodes } from "@/app/helpers/httpCodes";
import getTokenData from "@/app/helpers/getTokenData";
//contents : GET,DELETE,POST

main();

export async function PATCH(req, { params }) {
  console.log("inside patch");

  return asyncWrap(async () => {
    const user = getTokenData(req);
    //console.log(user.id);

    if (!user) {
      return NextResponse.json(
        { error: "user not logged in" },
        { status: httpCodes.unauthorized }
      );
    }

    const reqBody = await req.json();
    const temp = {
      title: reqBody.title,
      description: reqBody.description,
      filename: reqBody.filename,
      url: reqBody.url,
      price: reqBody.price,
      location: reqBody.location,
      country: reqBody.country,
    };

    console.log(reqBody);
    const res = listingSchema.validate({
      listing: { ...temp, owner: "", reviews: [] },
    });

    if (res.error) {
      console.log(res.error);
      console.log(temp);
      throw res.error;
    }

    const { id } = await params;

    const updatedListing = await ListItem.findById(id);

    if (!updatedListing) {
      console.log("listing not found");

      return NextResponse.json(
        { error: "listing not present" },
        { status: httpCodes.notFound }
      );
    }

    if (updatedListing.owner != user.id) {
      console.log("unauthorized user");
      return NextResponse.json(
        { error: "Unauthorized user" },
        { status: httpCodes.unauthorized }
      );
    } else {
      console.log(user.id);
    }

    await ListItem.findByIdAndUpdate(id, { ...temp });

    return NextResponse.json(
      { message: "patch listings successful" },
      { status: httpCodes.success }
    );
  });
}

//delete specific listing
export async function DELETE(req, { params }) {
  return asyncWrap(async () => {
    const user = await getTokenData(req);

    if (!user) {
      return NextResponse.json(
        { error: "user not logged in" },
        { status: httpCodes.unauthorized }
      );
    }

    const id = await params.id;
    const deletedItem = await ListItem.findById(id);

    if (!deletedItem) {
      return NextResponse.json(
        { error: "Listing not found" },
        { status: httpCodes.notFound }
      );
    }

    if (user.id != deletedItem.owner) {
      console.log("unauthorized user");
      return NextResponse.json(
        { error: "Unauthorized user" },
        { status: httpCodes.unauthorized }
      );
    }

    await ListItem.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "listing deleted" },
      { status: httpCodes.success }
    );
  });
}
