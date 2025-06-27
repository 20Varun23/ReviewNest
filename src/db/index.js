import mongoose from "mongoose";

export async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/travelSite");
  } catch {
    console.log("Some error occured there");
  }
}
