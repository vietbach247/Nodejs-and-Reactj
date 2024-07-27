import React, { FC, useState } from "react";
import { Movie } from "../../interfaces/Movie";
import { PlayCircleOutlined } from "@ant-design/icons";
import { message } from "antd";
import constants from "../../sever";

type Props = {
  props: Movie;
};

const TCard: FC<Props> = ({ props }) => {
  const [loading, setLoading] = useState(false);

  const addToFavorites = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Vui lòng đăng nhập");
        setLoading(false);
        return;
      }

      const response = await constants.post(
        "/favorites",
        { movieId: props._id }, // Gửi movieId cùng với yêu cầu
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        message.success("Đã thêm vào danh sách yêu thích");
      } else {
        message.error(
          response.data.message || "Lỗi khi thêm vào danh sách yêu thích"
        );
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      message.error("Lỗi khi thêm vào danh sách yêu thích");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full">
      <img
        className="w-full h-48 object-cover"
        src={props.thumb_url}
        alt={props.name}
      />
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-bold mb-2">{props.name}</h2>
        <p className="text-gray-600 mb-2">{props.origin_name}</p>
        <p className="text-gray-800">
          <strong>Thời gian:</strong> {props.time}
        </p>
        <p className="text-gray-800">
          <strong>Năm:</strong> {props.year}
        </p>
        <p className="text-gray-800">
          <strong>Giá:</strong> ${props.price}
        </p>
        <div className="mt-auto">
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded flex items-center"
            onClick={addToFavorites}
            disabled={loading}
          >
            <PlayCircleOutlined className="mr-2" />
            Thêm vào yêu thích
          </button>
        </div>
      </div>
    </div>
  );
};

export default TCard;
