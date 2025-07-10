import mongoose from "mongoose";
import Joi from "joi";
import { ListItem } from "./listing";
import { Review } from "./review";

const schema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: [18, "minimum age to register is 18"],
    required: true,
  },
});

schema.post("findOneAndDelete", async (user) => {
  await ListItem.deleteMany({ owner: user._id });
  await Review.deleteMany({ owner: user._id });
});

const User = mongoose.models.User || mongoose.model("User", schema);

const userSchema = Joi.object({
  user: Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    age: Joi.number().required(),
  }),
});

export { User, userSchema };
