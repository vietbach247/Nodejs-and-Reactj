import React, { useState } from "react";
import { Input, Button, Form, Typography, notification } from "antd";
import constants from "../../sever";

const { Title } = Typography;

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: { email: string }) => {
    setLoading(true);
    try {
      await constants.post("/auth/forgotPassword", values);
      notification.success({
        message: "Email đã được gửi",
        description: "Vui lòng kiểm tra email của bạn để đặt lại mật khẩu.",
      });
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
      notification.error({
        message: "Lỗi",
        description: "Có lỗi xảy ra khi gửi email.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <Title level={2}>Quên mật khẩu</Title>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="email"
          rules={[
            { required: true, type: "email", message: "Email không hợp lệ" },
          ]}
        >
          <Input placeholder="Nhập email của bạn" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Gửi yêu cầu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPassword;
