import {
  FacebookOutlined,
  GithubOutlined,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="bg-gray-900 text-white py-8">
      <div className="container mx-auto flex justify-between">
        <div>
          <img
            src="https://png.pngtree.com/png-clipart/20200826/original/pngtree-movie-logo-movie-letter-v-png-image_5469427.jpg"
            alt="Logo"
            className="h-8 w-auto mb-4"
          />
          <p className="mb-4">
            Mang đến thế giới những bộ phim hay và ý nghĩa.
          </p>
          <div className="flex space-x-4">
            <FacebookOutlined className="text-xl" />
            <InstagramOutlined className="text-xl" />
            <TwitterOutlined className="text-xl" />
            <GithubOutlined className="text-xl" />
            <YoutubeOutlined className="text-xl" />
          </div>
        </div>
        <div className="flex space-x-16">
          <div>
            <h4 className="font-bold mb-2">Thể loại</h4>
            <ul>
              <li>Hành động</li>
              <li>Hài</li>
              <li>Tình cảm</li>
              <li>Kinh dị</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Hỗ trợ</h4>
            <ul>
              <li>Giá vé</li>
              <li>Tài liệu</li>
              <li>Hướng dẫn</li>
              <li>Trạng thái API</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Công ty</h4>
            <ul>
              <li>Về chúng tôi</li>
              <li>Blog</li>
              <li>Tuyển dụng</li>
              <li>Báo chí</li>
              <li>Đối tác</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Pháp lý</h4>
            <ul>
              <li>Yêu cầu</li>
              <li>Chính sách bảo mật</li>
              <li>Điều khoản</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8 border-t border-gray-700 pt-4 text-center text-gray-400">
        © 2024 Công ty của bạn. Tất cả các quyền được bảo lưu.
      </div>
    </div>
  );
};

export default Footer;
