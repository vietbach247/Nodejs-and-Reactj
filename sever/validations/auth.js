import Joi from "joi";

export const registerValidate = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")),
  name: Joi.string().required(),
  phone: Joi.string().min(10).max(15).required(),
  role: Joi.string().valid("user", "admin"),
  money: Joi.number().default(0),
});

export const loginValidate = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
