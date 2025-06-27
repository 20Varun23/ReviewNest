import { main } from "@/db/index";
import ListItem from "@/models/listing";
import Review from "@/models/review";
import { reviewSchema } from "@/models/reviewSchema";
import { NextRequest, NextResponse } from "next/server";

//connect with database
main();

export async function POST(req, { params }) {
  try {
    const { id } = await params;
    const reqBody = await req.json();
    const { comment, stars, createdAt, owner } = reqBody;

    const res = reviewSchema.validate({ review: reqBody });
    const newReview = new Review({
      comment: comment,
      stars: stars,
      createdAt: createdAt,
      owner: owner,
    });

    console.log("owner");
    console.log(owner);

    if (res.error) {
      throw res.error;
    }

    const rId = await newReview.save();

    const listing = await ListItem.findById(id);
    listing.reviews.unshift(rId);
    await ListItem.findByIdAndUpdate(id, listing);

    return NextResponse.json({ message: "review succefully saved" });
  } catch (err) {
    //console.log(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
