import Favorite from "../models/Favorite";

export const createFavorites = async (req, res, next) => {
  const { movieId } = req.body;
  const userId = req.user.userId;

  try {
    let favorite = await Favorite.findOne({ user: userId });

    if (favorite) {
      if (!favorite.movies.includes(movieId)) {
        favorite.movies.push(movieId);
        favorite = await favorite.save();
        return res.status(201).send(favorite);
      } else {
        return res.status(400).send({ message: "Movie already in favorites" });
      }
    } else {
      const newFavorite = await Favorite.create({
        user: userId,
        movies: [movieId],
      });
      return res.status(201).send(newFavorite);
    }
  } catch (error) {
    next(error);
  }
};

export const getFavorites = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const favorites = await Favorite.find({ user: userId })
      .populate("user", "name")
      .populate("movies", "name thumb_url");
    res.status(200).json(favorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteFavorite = async (req, res, next) => {
  const { movieId } = req.body;
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ message: "Người dùng không xác thực" });
  }

  try {
    let favorite = await Favorite.findOne({ user: userId });

    if (favorite) {
      if (favorite.movies) {
        // Kiểm tra movie có tồn tại trong danh sách yêu thích không
        const movieExists = favorite.movies.some(
          (movie) => movie?.toString() === movieId // Thêm toán tử optional chaining
        );

        if (movieExists) {
          // Xóa movie khỏi danh sách yêu thích
          favorite.movies = favorite.movies.filter(
            (movie) => movie?.toString() !== movieId // Thêm toán tử optional chaining
          );
          favorite = await favorite.save();
          return res.status(200).json({
            message: "Xóa sản phẩm khỏi mục yêu thích thành công",
            favorite, // Trả về đối tượng favorite đã được cập nhật
          });
        } else {
          return res
            .status(404)
            .json({ message: "Movie không tồn tại trong danh sách yêu thích" });
        }
      } else {
        return res
          .status(404)
          .json({ message: "Danh sách yêu thích không tìm thấy" });
      }
    } else {
      return res
        .status(404)
        .json({ message: "Danh sách yêu thích không tìm thấy" });
    }
  } catch (error) {
    next(error);
  }
};
