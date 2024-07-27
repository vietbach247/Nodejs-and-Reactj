import React, { useEffect, useState } from "react";
import constants from "../../sever";
import { Movie } from "../../interfaces/Movie";
import TCard from "../../components/Card/Card";
import { Input, Space, AutoComplete } from "antd";

const { Search } = Input;

const Home: React.FC = (): JSX.Element => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchMovies = async (query: string = "") => {
      try {
        const movieResponse = await constants.get(`/movie${query}`);
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

    const query = searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : "";
    fetchMovies(query);
  }, [searchTerm]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (!value) {
      setOptions([]);
      return;
    }

    // Optional: Update `options` based on search value if needed
    const filteredOptions = movies
      .filter((movie) => movie.name.toLowerCase().includes(value.toLowerCase()))
      .map((movie) => ({ value: movie.name }));
    setOptions(filteredOptions);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-4">
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <AutoComplete
            style={{ width: 300 }}
            placeholder="Tìm kiếm phim..."
            size="large"
            onSearch={handleSearch}
            allowClear
            options={options}
          />
        </Space>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {movies.map((movie, index) => (
          <div key={index} className="p-4">
            <TCard props={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
