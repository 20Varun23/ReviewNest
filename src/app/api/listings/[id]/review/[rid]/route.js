import { main } from "@/db/index";
import ListItem from "@/models/listing";
import Review from "@/models/review";
import { reviewSchema } from "@/models/reviewSchema";
import { NextRequest, NextResponse } from "next/server";

//connect to db
main();

export async function DELETE(req, { params }) {
  try {
    const { id, rid } = await params;
    await ListItem.findByIdAndUpdate(id, { $pull: { reviews: rid } });
    await Review.findByIdAndDelete(rid);
    return NextResponse.json({ message: "review deleted" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
