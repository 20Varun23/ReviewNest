import Joi from "joi";

export const listingSchema = Joi.object({
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
