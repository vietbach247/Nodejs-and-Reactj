import { notification } from "antd";
import React, { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const token = localStorage.getItem("token");

  if (!token) {
    notification.error({
      message: "Cần đăng nhập",
    });
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
