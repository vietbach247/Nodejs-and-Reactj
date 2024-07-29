import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    origin_name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    poster_url: {
      type: String,
      required: true,
    },
    thumb_url: {
      type: String,
      required: true,
    },
    sub_docquyen: {
      type: Boolean,
      required: true,
    },
    chieurap: {
      type: Boolean,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    time: {
      type: String,
      required: true,
    },
    episode_current: {
      type: String,
      required: true,
    },
    quality: {
      type: String,
      required: true,
    },
    lang: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    youtubeId: {
      type: String,
      required: true,
    },
    trailerId: {
      type: String,
      required: true,
    },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: false,
      },
    ],
    country: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Country",
        required: false,
      },
    ],
    favoriteCount: {
      type: Number,
      default: 0,
    },
    usersLiked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);
movieSchema.plugin(mongoosePaginate);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
