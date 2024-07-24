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
  notification,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import constants from "../../sever";
import { User } from "../../interfaces/User";

const { Title } = Typography;
const { Content } = Layout;

const schema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Tên không được để trống",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Email không hợp lệ",
      "string.empty": "Email không được để trống",
    }),
  username: Joi.string().required().messages({
    "string.empty": "Tên người dùng không được để trống",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Mật khẩu phải có ít nhất 6 ký tự",
    "string.empty": "Mật khẩu không được để trống",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Mật khẩu xác nhận không khớp",
    "string.empty": "Mật khẩu xác nhận không được để trống",
  }),
  phone: Joi.string().optional(),
  remember: Joi.boolean(),
});

const Register: React.FC = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      phone: "",
      remember: true,
    },
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const onSubmit = async (data: User) => {
    setLoading(true);
    setFormError(null);
    try {
      const response = await constants.post("/auth/register", data);
      notification.success({
        message: "Đăng ký thành công ! Vui lòng kiểm tra email",
      });
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
                Đăng ký
              </Title>
              <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                <Form.Item
                  label="Tên"
                  validateStatus={errors.name ? "error" : ""}
                  help={errors.name?.message}
                >
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input placeholder="Tên" {...field} />
                    )}
                  />
                </Form.Item>
                <Form.Item
                  label="Email"
                  validateStatus={errors.email ? "error" : ""}
                  help={errors.email?.message}
                >
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input placeholder="Email" {...field} />
                    )}
                  />
                </Form.Item>
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
                <Form.Item
                  label="Xác nhận mật khẩu"
                  validateStatus={errors.confirmPassword ? "error" : ""}
                  help={errors.confirmPassword?.message}
                >
                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                      <Input.Password
                        placeholder="Xác nhận mật khẩu"
                        {...field}
                      />
                    )}
                  />
                </Form.Item>
                <Form.Item
                  label="Số điện thoại (tùy chọn)"
                  validateStatus={errors.phone ? "error" : ""}
                  help={errors.phone?.message}
                >
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <Input placeholder="Số điện thoại" {...field} />
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
                    Đăng ký
                  </Button>
                </Form.Item>
              </Form>
              <div style={{ textAlign: "center" }}>
                Bạn đã có tài khản?{" "}
                <a
                  href="#"
                  style={{ color: "#1890ff" }}
                  onClick={() => navigate("/login")}
                >
                  Đăng nhập tại đây
                </a>
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

export default Register;
