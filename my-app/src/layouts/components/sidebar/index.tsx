import {
  CalendarOutlined,
  FileTextOutlined,
  FolderOpenOutlined,
  HomeOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import SubMenu from "antd/es/menu/SubMenu";
import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const index = (props: Props) => {
  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col w-64">
      <div className="flex items-center justify-center py-4">
        <img src="" alt="Logo" className="h-10 w-10" />
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        className=" text-white flex-grow text-lg"
      >
        <Menu.Item key="1" icon={<HomeOutlined />} className="menu-item">
          <Link to="" className="">
            Dashboard
          </Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<TeamOutlined />} className="menu-item">
          <Link to="list-user" className="">
            User
          </Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<FolderOpenOutlined />} className="menu-item">
          <Link to="/projects" className="text-white">
            Projects
          </Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<CalendarOutlined />} className="menu-item">
          <Link to="/calendar" className="text-white">
            Calendar
          </Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<FileTextOutlined />} className="menu-item">
          <Link to="/documents" className="text-white">
            Documents
          </Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<FileTextOutlined />} className="menu-item">
          <Link to="/reports" className="text-white">
            Reports
          </Link>
        </Menu.Item>
        <SubMenu
          key="sub1"
          title="Your teams"
          className="menu-item"
          icon={<TeamOutlined />}
        >
          <Menu.Item key="7" className="menu-item">
            <span className="inline-block h-6 w-6 rounded-full bg-gray-700 text-center text-white mr-2">
              H
            </span>
            Heroicons
          </Menu.Item>
          <Menu.Item key="8" className="menu-item">
            <span className="inline-block h-6 w-6 rounded-full bg-gray-700 text-center text-white mr-2">
              T
            </span>
            Tailwind Labs
          </Menu.Item>
          <Menu.Item key="9" className="menu-item">
            <span className="inline-block h-6 w-6 rounded-full bg-gray-700 text-center text-white mr-2">
              W
            </span>
            Workcation
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="10" icon={<SettingOutlined />} className="menu-item">
          <Link to="/settings" className="text-white">
            Settings
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default index;
