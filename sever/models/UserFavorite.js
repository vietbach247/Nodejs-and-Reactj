import mongoose from "mongoose";

const UserFavoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  favorite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Favorite",
    required: true,
  },

  isLiked: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("UserFavorite", UserFavoriteSchema);
