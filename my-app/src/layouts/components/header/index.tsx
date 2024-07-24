import React from "react";
import { Avatar, Input } from "antd";
import type { GetProps } from "antd";
import { LuUser2 } from "react-icons/lu";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;
const Header: React.FC = () => {
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  const notifications = 10;
  return (
    <header className="bg-white shadow p-4 flex items-center justify-between">
      <Search
        placeholder="Tìm kiếm"
        onSearch={onSearch}
        style={{ width: 350 }}
        size="large"
        enterButton
      />
      <div className="flex items-center">
        <div className="flex items-center rounded-[10px] p-[8px] hover:bg-gray-300 ">
          <div className=" hover:cursor-pointer">
            <Avatar
              size={38}
              icon={<LuUser2 size={25} color="white" />}
              alt="Tom Cook"
              src=""
            />
            <span className="text-black ml-3 mr-2 ">Admin</span>
          </div>
          <RiArrowDropDownLine
            size={30}
            className="text-black hover:cursor-pointer"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
