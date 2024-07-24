import { Category } from "./Category";
import { Country } from "./Country";

export interface Movie {
  _id?: string | undefined;
  name: string;
  slug: string;
  origin_name: string;
  type: string;
  poster_url: string;
  thumb_url: string;
  sub_docquyen: boolean;
  chieurap: boolean;
  time: string;
  episode_current: string;
  quality: string;
  lang: string;
  youtubeId: string;
  trailerId: string;
  year: number;
  price: number;
  category?: Category[] | string[];
  country?: Country[] | string[];
}
