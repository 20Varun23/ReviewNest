import mongoose from "mongoose";

export async function main() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}`);
  } catch {
    console.log("Some error occured there");
  }
}
