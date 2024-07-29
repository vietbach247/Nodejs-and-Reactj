import React, { useEffect, useState } from "react";
import { Movie } from "../../interfaces/Movie";
import { Link, useNavigate } from "react-router-dom";
import {
  AutoComplete,
  Button,
  Space,
  Table,
  Tag,
  notification,
  Pagination,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Category } from "../../interfaces/Category";
import { Country } from "../../interfaces/Country";
import constants from "../../sever";

const Dashboard: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalMovies, setTotalMovies] = useState<number>(0);
  const [limit] = useState<number>(8);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async (
      search: string = "",
      page: number = 1,
      limit: number = 8
    ) => {
      try {
        const query = `?search=${encodeURIComponent(
          search
        )}&page=${page}&limit=${limit}`;
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

    fetchMovies(searchTerm, currentPage, limit);
  }, [searchTerm, currentPage, limit]);

  const handleRemove = async (id: string | undefined) => {
    try {
      if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
        await constants.delete(`/movie/${id}`);
        setMovies(movies.filter((movie) => movie._id !== id));
        notification.success({
          message: "Xóa thành công",
        });
      }
    } catch (error: any) {
      console.error("Error removing movie:", error);
      let errorMessage = "Xóa thất bại";
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      }

      notification.error({
        message: "Xóa thất bại",
        description: errorMessage,
      });
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      title: "Tên phim",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tên gốc",
      dataIndex: "origin_name",
      key: "origin_name",
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      render: (type: string) => (
        <Tag color="blue" key={type}>
          {type.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Năm",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      render: (categories: Category[] | string[]) => (
        <>
          {Array.isArray(categories) &&
            categories.map((category, index) => (
              <Tag color="green" key={index}>
                {typeof category === "string" ? category : category.name}
              </Tag>
            ))}
        </>
      ),
    },
    {
      title: "Quốc gia",
      dataIndex: "country",
      key: "country",
      render: (countries: Country[] | string[]) => (
        <>
          {Array.isArray(countries) &&
            countries.map((country, index) => (
              <Tag color="geekblue" key={index}>
                {typeof country === "string" ? country : country.name}
              </Tag>
            ))}
        </>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (text: any, record: Movie) => (
        <Space size="middle">
          <Link to={`update-movie/${record._id}`}>
            <Button type="primary" icon={<EditOutlined />} />
          </Link>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleRemove(record._id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4 bg-gray-80 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Danh sách phim</h1>
      <div className="mb-4 flex flex-col sm:flex-row items-center">
        <Button
          type="primary"
          className="mt-4 sm:mt-0 sm:ml-4"
          onClick={() => navigate("create-movie")}
        >
          Thêm phim
        </Button>
      </div>
      <div className="mb-4 flex flex-col sm:flex-row items-center">
        <AutoComplete
          style={{ width: 400 }}
          placeholder="Tìm kiếm phim..."
          size="large"
          onSearch={handleSearch}
          allowClear
          options={options}
        />
      </div>

      <Table
        columns={columns}
        dataSource={movies}
        rowKey="_id"
        pagination={false} // Disable internal pagination of the table
        className="bg-white shadow-md rounded-lg overflow-hidden"
      />
      <div className="mt-6 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={limit}
          total={totalMovies}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Dashboard;
