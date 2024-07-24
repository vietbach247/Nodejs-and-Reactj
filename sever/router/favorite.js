import { Router } from "express";
import {
  addToFavorite,
  getFavorites,
  removeFromFavorite,
} from "../controllers/favorite";
import { authentication } from "../middleware/authentication";

const favoriteRouter = Router();

favoriteRouter.post("/", authentication, addToFavorite);
favoriteRouter.delete("/", authentication, removeFromFavorite);
favoriteRouter.get("/", authentication, getFavorites);

export default favoriteRouter;
