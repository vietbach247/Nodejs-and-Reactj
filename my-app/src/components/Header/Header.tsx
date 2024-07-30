import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { Category } from "../../interfaces/Category";
import constants from "../../sever";
import { MdCategory, MdFeaturedPlayList } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import {
  SiCoinmarketcap,
  SiTheboringcompany,
  SiUnitednations,
} from "react-icons/si";
import "./Header.scss"; // Import SCSS file
import { Country } from "../../interfaces/Country";

type Props = {
  user: { name: string } | null;
  handleLogout: () => void;
};

const Header: React.FC<Props> = ({ user, handleLogout }) => {
  const [category, getCategory] = useState<Category[]>([]);
  const [country, getCountry] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const dataCategory = await constants.get("/category");
        const dataCountry = await constants.get("/country");
        getCountry(dataCountry.data.country);
        getCategory(dataCategory.data.movie);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCategories();
  }, []);

  const token = localStorage.getItem("token");

  return (
    <div className="flex justify-between items-center p-4 shadow-md bg-white">
      <Link to="">
        <img
          src="https://png.pngtree.com/png-clipart/20200826/original/pngtree-movie-logo-movie-letter-v-png-image_5469427.jpg"
          alt="Logo"
          className="h-11 w-auto"
        />
      </Link>

      <div className="flex-grow flex justify-center">
        <Menu
          mode="horizontal"
          className="border-none text-lg w-full"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Menu.SubMenu
            key="category"
            title={
              <div className="flex items-center text-lg ">
                <span className="mr-2">
                  Thể loại <MdCategory />
                </span>
                <FaChevronDown style={{ fontSize: "12px" }} />
              </div>
            }
          >
            {category.map((item) => (
              <Link to={`category/${item._id}`}>
                {" "}
                <Menu.Item key={item._id}>{item.name}</Menu.Item>
              </Link>
            ))}
          </Menu.SubMenu>
          <Menu.SubMenu
            key="country"
            title={
              <div className="flex items-center ">
                <span className="mr-2">
                  Quốc gia <SiUnitednations />
                </span>
                <FaChevronDown style={{ fontSize: "12px" }} />
              </div>
            }
          >
            {country.map((item) => (
              <Menu.Item key={item._id}>{item.name}</Menu.Item>
            ))}
          </Menu.SubMenu>
          <Menu.Item key="features">
            Features <MdFeaturedPlayList />
          </Menu.Item>
          <Menu.Item key="marketplace">
            Marketplace <SiCoinmarketcap />
          </Menu.Item>
          <Menu.Item key="company">
            Company <SiTheboringcompany />
          </Menu.Item>
          <Link to={"favorite"}>
            <Menu.Item key="favorites">
              Yêu thích <FaHeart />
            </Menu.Item>
          </Link>
        </Menu>
      </div>
      <div className="flex items-center">
        {token ? (
          <>
            <span className="mr-4 text-black">
              <Link to="/profile">Chào mừng </Link>
            </span>
            <button
              onClick={handleLogout}
              className="text-black hover:text-blue-500 text-lg btn btn-link"
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="mr-4 text-black hover:text-blue-500 text-lg"
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              className="text-black hover:text-blue-500 text-lg"
            >
              Đăng ký
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
