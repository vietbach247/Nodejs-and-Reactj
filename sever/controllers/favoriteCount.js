import Movie from "../models/Movie.js";
import UserFavorite from "../models/UserFavorite.js";

export const favoriteCount = async (req, res, next) => {
  try {
    const { movieId } = req.body;
    const userId = req.user.userId;

    if (!movieId) {
      return res.status(400).send("Movie ID is required");
    }

    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).send("Movie not found");
    }

    let userFavorite = await UserFavorite.findOne({
      user: userId,
      favorite: movieId,
    });

    if (!userFavorite) {
      userFavorite = new UserFavorite({
        user: userId,
        favorite: movieId,
        isLiked: true,
      });
      movie.favoriteCount += 1;
    } else {
      userFavorite.isLiked = !userFavorite.isLiked;
      if (userFavorite.isLiked) {
        movie.favoriteCount += 1;
      } else {
        movie.favoriteCount -= 1;
      }
    }
    console.log(userFavorite);
    console.log(movie.favoriteCount);

    await userFavorite.save();
    await movie.save();

    res.status(200).json({ isLiked: userFavorite.isLiked });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
