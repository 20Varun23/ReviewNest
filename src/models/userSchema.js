import Joi from "joi";

export const userSchema = Joi.object({
  user: Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    age: Joi.number().required(),
  }),
});
