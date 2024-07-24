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
import { favoriteCount } from "../controllers/favoriteCount";

const movieRouter = Router();

movieRouter.get("/", getMovies);
movieRouter.get("/:id", getMovie);
movieRouter.get("/category/:categoryId", getMovieByCategory);
movieRouter.get("/country/:countryId", getMovieByCountry);
movieRouter.post("/", createMovie);
movieRouter.post("/like/", authentication, favoriteCount);
movieRouter.delete("/:id", deleteMovie);
movieRouter.put("/:id", updateMovie);

export default movieRouter;
