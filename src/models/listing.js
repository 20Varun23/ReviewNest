import mongoose from "mongoose";
import { Review } from "./review";
import Joi from "joi";

const default_image =
  "https://images.unsplash.com/photo-1749137598868-94bde1951944?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8";

const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: {
      filename: String,
      url: {
        type: String,
        default: default_image,
        set: (v) => (v === "" ? default_image : v),
      },
    },
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

schema.post("findOneAndDelete", async (listing) => {
  if (listing.reviews) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const ListItem = mongoose.models.ListItem || mongoose.model("ListItem", schema);

const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    filename: Joi.string(),
    url: Joi.string().uri(),
    price: Joi.number().required().min(1000),
    location: Joi.string().required(),
    country: Joi.string().required(),
    reviews: Joi.array(),
    owner: Joi.any().required(),
  }).required(),
});

export { ListItem, listingSchema };
