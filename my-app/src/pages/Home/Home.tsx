// src/pages/Home.tsx
import React, { useEffect, useState } from "react";
import constants from "../../sever";
import { Movie } from "../../interfaces/Movie";
import TCard from "../../components/Card/Card";
import { Col, Row } from "antd";

const Home: React.FC = (): JSX.Element => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieResponse = await constants.get("/movie");
        const movieData = movieResponse.data.data;
        if (Array.isArray(movieData)) {
          setMovies(movieData);
        } else {
          console.error(
            "API returned unexpected movie data format:",
            movieData
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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

export default Home;
