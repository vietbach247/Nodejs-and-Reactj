import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  Avatar,
  Layout,
  Row,
  Col,
  Alert,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import constants from "../../sever";

const { Title } = Typography;
const { Content } = Layout;

const schema = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "Tên người dùng không được để trống",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Mật khẩu không được để trống",
  }),
  remember: Joi.boolean(),
});

const LoginPage: React.FC = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      username: "",
      password: "",
      remember: true,
    },
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const onSubmit = async (data: { username: string; password: string }) => {
    setLoading(true);
    setFormError(null);
    try {
      const response = await constants.post("/auth/login", data);
      localStorage.setItem("token", response.data.token);

      navigate("/");
      window.location.reload();
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        error.response.data.errors.forEach((err: any) => {
          setError(err.param, { type: "server", message: err.msg });
        });
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setFormError(error.response.data.message);
      } else {
        setFormError("Có lỗi xảy ra, vui lòng thử lại");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content>
        <Row
          justify="center"
          align="middle"
          style={{ minHeight: "100vh", background: "#f0f2f5" }}
        >
          <Col xs={22} sm={16} md={12} lg={8}>
            <div style={{ padding: 24, background: "#fff", borderRadius: 8 }}>
              <Avatar
                style={{ backgroundColor: "#87d068", marginBottom: 16 }}
                icon={<UserOutlined />}
              />
              <Title level={2} style={{ textAlign: "center" }}>
                Đăng nhập
              </Title>
              <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                <Form.Item
                  label="Tên người dùng"
                  validateStatus={errors.username ? "error" : ""}
                  help={errors.username?.message}
                >
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <Input placeholder="Tên người dùng" {...field} />
                    )}
                  />
                </Form.Item>
                <Form.Item
                  label="Mật khẩu"
                  validateStatus={errors.password ? "error" : ""}
                  help={errors.password?.message}
                >
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <Input.Password placeholder="Mật khẩu" {...field} />
                    )}
                  />
                </Form.Item>
                <Form.Item>
                  <Controller
                    name="remember"
                    control={control}
                    render={({ field }) => (
                      <Checkbox {...field} checked={field.value}>
                        Ghi nhớ tôi
                      </Checkbox>
                    )}
                  />
                </Form.Item>
                {formError && (
                  <Form.Item>
                    <Alert message={formError} type="error" showIcon />
                  </Form.Item>
                )}
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={loading}
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>
              </Form>
              <div style={{ textAlign: "center" }}>
                Bạn chưa có tài khản?{" "}
                <a
                  href="#"
                  style={{ color: "#1890ff" }}
                  onClick={() => navigate("/register")}
                >
                  Đăng ký tại đây
                </a>
                <br />
                <a
                  href="#"
                  style={{ color: "#1890ff" }}
                  onClick={() => navigate("/forgoPassword")}
                >
                  Quên mật khẩu
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default LoginPage;
