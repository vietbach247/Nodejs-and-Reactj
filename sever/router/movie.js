import { Router } from "express";
import {
  createMovie,
  deleteMovie,
  getMovie,
  getMovieByCategory,
  getMovieByCountry,
  getMovies,
  updateMovie,
} from "../controllers/movie";
import { authentication } from "../middleware/authentication";

const movieRouter = Router();

movieRouter.get("/", getMovies);
movieRouter.get("/:id", authentication, getMovie);
movieRouter.get("/category/:categoryId", getMovieByCategory);
movieRouter.get("/country/:countryId", getMovieByCountry);
movieRouter.post("/", createMovie);
movieRouter.delete("/:id", deleteMovie);
movieRouter.put("/:id", updateMovie);

export default movieRouter;
