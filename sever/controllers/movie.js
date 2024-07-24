import { movieValidate, updateMovieValidate } from "../validations/movie";

import Movie from "../models/Movie";

export const createMovie = async (req, res, next) => {
  const { error } = movieValidate.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    const data = await Movie.create(req.body);
    return res
      .status(201)
      .json({ message: "Movie created successfully", data });
  } catch (error) {
    next(error);
  }
};

export const getMovies = async (req, res, next) => {
  try {
    const data = await Movie.find().populate("category").populate("country");
    return res.status(200).json({ message: "Get movie successfully", data });
  } catch (error) {
    next(error);
  }
};

export const getMovieByCategory = async (req, res, next) => {
  const { categoryId } = req.params;

  try {
    const data = await Movie.find({ category: categoryId })
      .populate("category")
      .populate("country");

    if (!data) {
      return res
        .status(404)
        .json({ message: "No movies found for this category" });
    }

    return res.status(200).json({ message: "Get movies successfully", data });
  } catch (error) {
    next(error);
  }
};

export const getMovieByCountry = async (req, res, next) => {
  const { countryId } = req.params;

  try {
    const data = await Movie.find({ country: countryId })
      .populate("category")
      .populate("country");

    if (!data || data.length === 0) {
      return res
        .status(404)
        .json({ message: "No movies found for this country" });
    }

    return res.status(200).json({ message: "Get movies successfully", data });
  } catch (error) {
    next(error);
  }
};

export const getMovie = async (req, res, next) => {
  try {
    const data = await Movie.findById(req.params.id);
    return res.status(200).json({ message: "Get movie successfully", data });
  } catch (error) {
    next(error);
  }
};

export const updateMovie = async (req, res, next) => {
  const { error } = updateMovieValidate.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    const data = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json({ message: "Update movie successfully", data });
  } catch (error) {
    next(error);
  }
};

export const deleteMovie = async (req, res, next) => {
  try {
    const data = await Movie.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Delete movie successfully", data });
  } catch (error) {
    next(error);
  }
};
