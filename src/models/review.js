import mongoose, { mongo } from "mongoose";
import Joi from "joi";

const schema = mongoose.Schema({
  comment: {
    type: String,
    default: "",
  },
  stars: {
    type: Number,
    required: true,
    min: [1, "minimum rating 1"],
    max: [5, "maximum rating 5"],
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

const reviewSchema = Joi.object({
  review: Joi.object({
    comment: Joi.string().required(),
    stars: Joi.number().required(),
    createdAt: Joi.date().required(),
    owner: Joi.any().required(),
  }).required(),
});

export { Review, reviewSchema };
