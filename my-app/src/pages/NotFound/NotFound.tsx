import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-9xl font-extrabold text-[#1677FF]">404</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Oops! Không tìm thấy trang
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Xin lỗi, nhưng trang bạn đang tìm kiếm không được tìm thấy. Làm ơn,
          hãy chắc chắn bạn đã gõ URL hiện tại.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/admin"
            className="rounded-md bg-[#1677FF] px-5 py-3 text-lg font-semibold text-white shadow-sm hover:bg-[#3b79cf] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
