import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Input, Button, Form, Typography, notification } from "antd";
import constants from "../../sever";

const { Title } = Typography;

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    setLoading(true);
    try {
      await constants.post(`/auth/resetPassword/${token}`, values);
      notification.success({
        message: "Thành công",
        description: "Mật khẩu đã được đặt lại thành công.",
      });
      navigate("/login"); // Chuyển hướng đến trang đăng nhập
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Có lỗi xảy ra khi đặt lại mật khẩu.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <Title level={2}>Đặt lại mật khẩu</Title>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="newPassword"
          rules={[{ required: true, message: "Mật khẩu mới là bắt buộc" }]}
        >
          <Input.Password placeholder="Nhập mật khẩu mới" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[{ required: true, message: "Xác nhận mật khẩu là bắt buộc" }]}
        >
          <Input.Password placeholder="Xác nhận mật khẩu mới" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Đặt lại mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;
