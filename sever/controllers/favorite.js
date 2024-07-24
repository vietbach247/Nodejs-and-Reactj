import Movie from "../models/Movie";
import Favorite from "../models/Favorite";

export const addToFavorite = async (req, res, next) => {
  const { movieId } = req.body;
  const userId = req.user.userId;

  try {
    let favorite = await Favorite.findOne({ user: userId });

    if (favorite) {
      const movieIndex = favorite.movies.findIndex(
        (item) => item.toString() === movieId
      );

      if (movieIndex > -1) {
        return res.status(400).json({ message: "Movie already in favorites" });
      } else {
        favorite.movies.push(movieId);
      }
    } else {
      favorite = new Favorite({
        user: userId,
        movies: [movieId],
      });
    }

    await favorite.save();
    res.status(200).json(favorite);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const removeFromFavorite = async (req, res, next) => {
  const { movieId } = req.body;
  const userId = req.user.userId;

  try {
    let favorite = await Favorite.findOne({ user: userId });

    if (!favorite) {
      return res.status(404).json({ message: "Mục yêu thích không tồn tại" });
    }

    const movieIndex = favorite.movies.findIndex(
      (m) => m.toString() === movieId
    );

    if (movieIndex === -1) {
      return res
        .status(404)
        .json({ message: "Phim không có trong mục yêu thích" });
    }

    favorite.movies.splice(movieIndex, 1);
    await favorite.save();

    await Movie.findByIdAndUpdate(movieId, { $inc: { favoriteCount: -1 } });

    res.status(200).json({ message: "Đã xoá khỏi mục yêu thích" });
  } catch (error) {
    console.error("Error removing from favorite:", error);
    res
      .status(500)
      .json({ message: "Có lỗi xảy ra khi xoá khỏi mục yêu thích" });
  }
};

export const getFavorites = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const favorites = await Favorite.find({ user: userId })
      .populate("user", "name")
      .populate("movies", "name");
    res.status(200).json(favorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
