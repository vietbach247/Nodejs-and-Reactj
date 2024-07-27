import { Router } from "express";
import {
  createFavorites,
  deleteFavorite,
  getFavorites,
} from "../controllers/favorite";
import { authentication } from "../middleware/authentication";

const favoriteRouter = Router();

favoriteRouter.post("/", authentication, createFavorites);
favoriteRouter.get("/", authentication, getFavorites);
favoriteRouter.delete("/", authentication, deleteFavorite);

export default favoriteRouter;
