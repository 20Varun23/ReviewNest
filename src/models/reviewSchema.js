import Joi from "joi";

export const reviewSchema = Joi.object({
  review: Joi.object({
    comment: Joi.string().required(),
    stars: Joi.number().required(),
    createdAt: Joi.date().required(),
    owner: Joi.any().required(),
  }).required(),
});
