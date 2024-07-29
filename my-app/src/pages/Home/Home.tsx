import React, { useEffect, useState } from "react";
import { Movie } from "../../interfaces/Movie";
import TCard from "../../components/Card/Card";
import { Input, Space, AutoComplete, Pagination, Select } from "antd";
import constants from "../../sever";

const { Search } = Input;
const { Option } = Select;

const Home: React.FC = (): JSX.Element => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalMovies, setTotalMovies] = useState<number>(0);
  const [limit] = useState<number>(8);
  const [sortOrder, setSortOrder] = useState<string>("asc");

  useEffect(() => {
    const fetchMovies = async (
      search: string = "",
      page: number = 1,
      limit: number = 8,
      sort: string = "asc"
    ) => {
      try {
        const query = `?search=${encodeURIComponent(
          search
        )}&page=${page}&limit=${limit}&sort=${sort}`;
        const response = await constants.get(`/movie${query}`);
        const movieData = response.data.data;
        const pagination = response.data.pagination;

        if (Array.isArray(movieData)) {
          setMovies(movieData);
          setTotalMovies(pagination.totalMovies || 0);
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

    fetchMovies(searchTerm, currentPage, limit, sortOrder);
  }, [searchTerm, currentPage, limit, sortOrder]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortChange = (value: string) => {
    setSortOrder(value);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-4 flex justify-between items-center">
        <Space direction="vertical" size="large" style={{ width: "80%" }}>
          <AutoComplete
            style={{ width: 300 }}
            placeholder="Tìm kiếm phim..."
            size="large"
            onSearch={handleSearch}
            allowClear
            options={options}
          />
        </Space>
        <Select
          defaultValue="asc"
          style={{ width: 120 }}
          onChange={handleSortChange}
        >
          <Option value="asc">Tăng dần</Option>
          <Option value="desc">Giảm dần</Option>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {movies.map((movie, index) => (
          <div key={index} className="p-4">
            <TCard props={movie} />
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={limit}
          total={totalMovies}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default Home;
