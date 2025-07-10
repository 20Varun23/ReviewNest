import { asyncWrap } from "@/app/helpers/asyncWrap";
import getTokenData from "@/app/helpers/getTokenData";
import { httpCodes } from "@/app/helpers/httpCodes";
import { main } from "@/db/index";
import { ListItem } from "@/models/listing";
import { Review } from "@/models/review";
import { NextRequest, NextResponse } from "next/server";

//connect to db
main();

export async function DELETE(req, { params }) {
  return asyncWrap(async () => {
    const user = getTokenData(req);

    if (!user) {
      return NextResponse.json(
        { error: "user not logged in" },
        { status: httpCodes.unauthorized }
      );
    }

    const { id, rid } = await params;
    const updatedItem = await Review.findById(rid);

    if (!updatedItem) {
      return NextResponse.json(
        { error: "listing not found" },
        { status: httpCodes.notFound }
      );
    }

    if (updatedItem.owner != user.id) {
      return NextResponse.json(
        { error: "Unauthorized user" },
        { status: httpCodes.unauthorized }
      );
    }

    await ListItem.findByIdAndUpdate(id, {
      $pull: { reviews: rid },
    });

    const deletedReview = await Review.findByIdAndDelete(rid);

    if (!deletedReview) {
      return NextResponse.json(
        { error: "review not found" },
        { status: httpCodes.notFound }
      );
    }

    return NextResponse.json(
      { message: "review deleted" },
      { status: httpCodes.success }
    );
  });
}

//[ ]:add seurity to patch
export async function PATCH(req, { params }) {
  return asyncWrap(async () => {
    const user = getTokenData(req);

    if (!user) {
      console.log("you are not logged in");
      return NextResponse.json(
        { error: "user not logged in" },
        { status: httpCodes.unauthorized }
      );
    }

    const { rid, id } = await params;
    console.log("rid : " + rid);
    const reqBody = await req.json();

    console.log("reqBody");

    console.log(reqBody);

    const temp = {
      comment: reqBody.comment,
      stars: reqBody.stars,
      createdAt: reqBody.createdAt,
      owner: reqBody.owner,
    };

    console.log(temp);
    console.log(rid);

    const tempRev = await Review.findById(rid);
    console.log(user.id);
    //console.log(tempRev);

    if (tempRev.owner != user.id) {
      console.log("You are not authorized for this");
      return NextResponse.json(
        { error: "Unauthorized user" },
        { status: httpCodes.unauthorized }
      );
    }

    await Review.findByIdAndUpdate(rid, { ...temp });
    return NextResponse.json(
      { message: "review patched" },
      { status: httpCodes.success }
    );
  });
}
