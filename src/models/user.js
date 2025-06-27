import { required } from "joi";
import mongoose from "mongoose";

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

const User = mongoose.models.User || mongoose.model("User", schema);

import Joi from "joi";

const userSchema = Joi.object({
  user: Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    age: Joi.number().required(),
  }),
});

export { User, userSchema };
