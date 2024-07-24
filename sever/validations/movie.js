import Joi from "joi";

export const movieValidate = Joi.object({
  modified: Joi.object({
    time: Joi.date().iso(),
  }),
  name: Joi.string().required(),
  slug: Joi.string().required(),
  price: Joi.number(),
  origin_name: Joi.string().required(),
  type: Joi.string().required(),
  poster_url: Joi.string().uri().required(),
  thumb_url: Joi.string().uri().required(),
  sub_docquyen: Joi.boolean().required(),
  chieurap: Joi.boolean().required(),
  time: Joi.string().required(),
  episode_current: Joi.string().required(),
  quality: Joi.string().required(),
  lang: Joi.string().required(),
  youtubeId: Joi.string().required(),
  trailerId: Joi.string().required(),

  year: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear())
    .required(),
  category: Joi.array().items(Joi.string()),
  country: Joi.array().items(Joi.string()),
});

export const updateMovieValidate = Joi.object({
  modified: Joi.object({
    time: Joi.date().iso(),
  }),
  name: Joi.string(),
  slug: Joi.string(),
  origin_name: Joi.string(),
  type: Joi.string(),
  poster_url: Joi.string().uri(),
  thumb_url: Joi.string().uri(),
  sub_docquyen: Joi.boolean(),
  chieurap: Joi.boolean(),
  time: Joi.string(),
  episode_current: Joi.string(),
  quality: Joi.string(),
  lang: Joi.string(),
  youtubeId: Joi.string(),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear()),
  category: Joi.array().items(Joi.string()),
  country: Joi.array().items(Joi.string()),
});
