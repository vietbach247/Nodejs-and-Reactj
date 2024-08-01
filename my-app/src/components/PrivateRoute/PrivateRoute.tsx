import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { notification } from "antd";

const PrivateRoute = ({
  children,
  admin = false,
}: {
  children: JSX.Element;
  admin?: boolean;
}) => {
  const { user } = useAuth();

  if (!user) {
    notification.error({
      message: "Vui lòng đăng nhập",
    });
    return <Navigate to="/login" />;
  }

  if (admin && user.role !== "admin") {
    notification.error({
      message: "Bạn không có quyền vào trang này",
    });
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
