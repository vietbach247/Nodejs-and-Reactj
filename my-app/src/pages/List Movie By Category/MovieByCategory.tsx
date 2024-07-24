import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "../../interfaces/Movie";
import constants from "../../sever";
import TCard from "../../components/Card/Card";

const ListMovieByCategory: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");

  useEffect(() => {
    const fetchMoviesByCategory = async () => {
      try {
        const categoryResponse = await constants.get(
          `movie/category/${categoryId}`
        );
        setCategoryName(categoryResponse.data.name);
        const movieResponse = await constants.get(
          `/movie/category/${categoryId}`
        );
        setMovies(movieResponse.data.data);
      } catch (error) {
        console.error("Error fetching movies by category:", error);
      }
    };

    fetchMoviesByCategory();
  }, [categoryId]);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {movies.map((movie, index) => (
          <div key={index} className="p-4">
            {" "}
            <TCard props={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListMovieByCategory;
