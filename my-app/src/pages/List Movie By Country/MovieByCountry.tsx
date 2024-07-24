// src/pages/ListMovieByCountry.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "../../interfaces/Movie";
import constants from "../../sever";
import TCard from "../../components/Card/Card";

const ListMovieByCountry: React.FC = () => {
  const { countryId } = useParams<{ countryId: string }>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [countryName, setCountryName] = useState<string>("");

  useEffect(() => {
    const fetchMoviesByCountry = async () => {
      try {
        const countryResponse = await constants.get(`country/${countryId}`);
        console.log("Country Response:", countryResponse.data); // Log country response
        setCountryName(countryResponse.data.name);

        const movieResponse = await constants.get(
          `/movie/country/${countryId}`
        );
        console.log("Movie Response:", movieResponse.data); // Log movie response
        if (Array.isArray(movieResponse.data.data)) {
          setMovies(movieResponse.data.data);
        } else {
          console.error(
            "API returned unexpected movie data format:",
            movieResponse.data.data
          );
        }
      } catch (error) {
        console.error("Error fetching movies by country:", error);
      }
    };

    fetchMoviesByCountry();
  }, [countryId]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Phim từ {countryName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <div key={index} className="p-4">
              <TCard props={movie} />
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">
            Không có phim nào từ quốc gia này.
          </p>
        )}
      </div>
    </div>
  );
};

export default ListMovieByCountry;
