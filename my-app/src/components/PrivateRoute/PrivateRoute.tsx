import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { notification } from "antd";

interface PrivateRouteProps {
  component: React.ComponentType;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
}) => {
  const token = localStorage.getItem("token");

  if (!token) {
    notification.error({
      message: "Vui lòng đăng nhập",
    });
    return <Navigate to="/login" />;
  }

  return <Component />;
};

export default PrivateRoute;
