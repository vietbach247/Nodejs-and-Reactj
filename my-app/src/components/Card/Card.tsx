// src/components/TCard.tsx
import React, { FC } from "react";
import { Movie } from "../../interfaces/Movie";
import { PlayCircleOutlined } from "@ant-design/icons";

type Props = {
  props: Movie;
};

const TCard: FC<Props> = ({ props }) => {
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
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded flex items-center">
            <PlayCircleOutlined className="mr-2" />
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
};

export default TCard;
