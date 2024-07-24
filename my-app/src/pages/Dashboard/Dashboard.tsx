import React, { useEffect, useState } from "react";
import { Movie } from "../../interfaces/Movie";
import { Link, useNavigate } from "react-router-dom";
import constants from "../../sever";
import { Button, Space, Table, Tag, notification } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Category } from "../../interfaces/Category";
import { Country } from "../../interfaces/Country";

type Props = {};

const Dashboard = (props: Props) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  // Effect to fetch movies data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieResponse = await constants.get("/movie", {});
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

  // Function to handle movie removal
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

  // Table columns configuration
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
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1>Danh sách phim</h1>
      <Space direction="vertical" style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => navigate("create-movie")}>
          Thêm phim
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={movies}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        className="bg-white shadow-md rounded-lg overflow-hidden"
      />
    </div>
  );
};

export default Dashboard;
