import React, { useEffect, useState } from "react";
import { Table, Button, message, Typography, Tag, Space } from "antd";
import { Favorite } from "../../interfaces/Favorite";
import { Movie } from "../../interfaces/Movie";
import constants from "../../sever";

const { Text } = Typography;

const FavoritesList = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          message.error("Vui lòng đăng nhập");
          setLoading(false);
          return;
        }

        const response = await constants.get<Favorite[]>("/favorites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        message.error("Lỗi khi lấy danh sách phim yêu thích");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleDelete = async (movieId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Vui lòng đăng nhập");
        return;
      }

      if (
        window.confirm(
          "Bạn có chắc chắn muốn xóa phim này khỏi danh sách yêu thích?"
        )
      ) {
        await constants.delete(`/favorites`, {
          data: { movieId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        message.success("Đã xóa thành công");
      } else {
        message.success("Hủy xóa thành công");
      }
    } catch (error) {
      console.error("Error deleting favorite:", error);
      message.error("Lỗi khi xóa phim yêu thích");
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (text: string, record: Favorite, index: number) => index + 1,
    },
    {
      title: "Ảnh",
      dataIndex: "thumb_url",
      key: "thumb_url",
      render: (text: string, record: Favorite) => (
        <img
          src={
            record.movies && typeof record.movies[0] === "object"
              ? (record.movies[0] as Movie).thumb_url
              : ""
          }
          alt={
            record.movies && typeof record.movies[0] === "object"
              ? (record.movies[0] as Movie).name
              : ""
          }
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Tên Phim",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Favorite) => (
        <div>
          {record.movies?.map((movie, index) => (
            <div key={index}>
              {typeof movie === "object" ? (movie as Movie).name : movie}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (text: string, record: Favorite) => (
        <div>
          {record.movies?.map((movie, index) =>
            typeof movie === "object" ? (
              <Button
                key={index}
                danger
                onClick={() => handleDelete((movie as Movie)._id!)}
              >
                Xóa
              </Button>
            ) : null
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 style={{ textAlign: "center" }}>Các phim yêu thích của bạn</h2>
      <Table
        columns={columns}
        dataSource={favorites}
        rowKey="_id"
        loading={loading}
        locale={{ emptyText: "Không tìm thấy phim yêu thích." }}
        pagination={{ pageSize: 10 }}
        className="bg-white shadow-md rounded-lg overflow-hidden"
      />
    </div>
  );
};

export default FavoritesList;
