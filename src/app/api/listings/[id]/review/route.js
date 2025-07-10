import { asyncWrap } from "@/app/helpers/asyncWrap";
import getTokenData from "@/app/helpers/getTokenData";
import { httpCodes } from "@/app/helpers/httpCodes";
import { main } from "@/db/index";
import { ListItem } from "@/models/listing";
import { Review, reviewSchema } from "@/models/review";
import { NextRequest, NextResponse } from "next/server";

//connect with database
main();
console.log("hello review");

export async function POST(req, { params }) {
  return asyncWrap(async () => {
    console.log("hello asyncWrap");
    const { id } = await params;
    const reqBody = await req.json();

    const temp = {
      comment: reqBody.comment,
      stars: reqBody.stars,
      createdAt: reqBody.createdAt,
      owner: reqBody.owner,
    };

    if (!temp.owner) {
      return NextResponse.json(
        { error: "User not logged in" },
        { status: httpCodes.unauthorized }
      );
    }

    const res = reviewSchema.validate({ review: { ...temp } });

    if (res.error) {
      console.log(res.error);
      throw res.error;
    }
    const newReview = new Review({
      comment: temp.comment,
      stars: temp.stars,
      createdAt: temp.createdAt,
      owner: temp.owner,
    });

    const rId = await newReview.save();

    const listing = await ListItem.findById(id);
    listing.reviews.unshift(rId);
    await ListItem.findByIdAndUpdate(id, listing);

    return NextResponse.json(
      { message: "review succefully saved" },
      { status: httpCodes.created }
    );
  });
}
