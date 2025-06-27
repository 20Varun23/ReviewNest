import mongoose, { mongo } from "mongoose";

const schema = mongoose.Schema({
  comment: {
    type: String,
    default: "",
  },
  stars: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Review = mongoose.models.Review || mongoose.model("Review", schema);

export default Review;
