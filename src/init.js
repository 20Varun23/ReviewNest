import mongoose from "mongoose";
import ListItem from "./models/listing.js";
import { sampleListings } from "./data.js";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/travelSite");
}

ListItem.insertMany(sampleListings);
