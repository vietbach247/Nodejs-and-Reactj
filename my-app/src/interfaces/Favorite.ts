import { Movie } from "./Movie";
import { User } from "./User";

export type Favorite = {
  _id?: string | undefined;
  user?: User | string;
  movies?: Movie[] | string[];
};
