import React, { useEffect, useState } from "react";
import { Avatar, Typography, Spin, Alert, Button, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import constants from "../../sever";

const { Title, Text } = Typography;

const ProfilePage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await constants.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("User data:", response.data);
        setUser(response.data);
      } catch (err) {
        setError("Có lỗi xảy ra khi tải thông tin người dùng.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Alert message={error} type="error" showIcon />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-lg">
      <div className="flex flex-col items-center mb-6">
        <Avatar
          size={128}
          src={user.avatar ? user.avatar : undefined}
          icon={!user.avatar ? <UserOutlined /> : undefined}
          className="bg-gray-300 mb-4"
        />
        <Title level={2} className="text-center text-3xl mb-4">
          {user.name}
        </Title>
        <div className="w-full">
          <div className="flex justify-between mb-2">
            <Text className="text-lg text-gray-700 font-semibold">Email:</Text>
            <Text className="text-lg text-gray-700">{user.email}</Text>
          </div>
          <div className="flex justify-between mb-2">
            <Text className="text-lg text-gray-700 font-semibold">
              Số Điện thoại:
            </Text>
            <Text className="text-lg text-gray-700">{user.phone}</Text>
          </div>
          <div className="flex justify-between mb-4">
            <Text className="text-lg text-gray-700 font-semibold">
              Số tiền:
            </Text>
            <Text className="text-lg text-gray-700">${user.money}</Text>
          </div>
        </div>
      </div>
      <Divider />
      <div className="flex justify-center">
        <Link to="/updateProfile">
          <Button
            type="primary"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
          >
            Cập nhật hồ sơ
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;
