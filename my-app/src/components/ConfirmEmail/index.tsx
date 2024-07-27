import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography, Spin, Button, Tooltip } from "antd";
import { MdOutlineError } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import constants from "../../sever"; // Kiểm tra đường dẫn và cách sử dụng constants

const { Title } = Typography;

const ConfirmEmail: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await constants.get(`auth/confirm-email/${token}`);
        console.log("Response:", response.data);
        setMessage(response.data.message);
        setSuccess(true);
      } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
          setMessage(error.response.data.message || "Có lỗi xảy ra");
        } else {
          setMessage("Có lỗi xảy ra");
        }
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div style={{ textAlign: "center", marginTop: "20%" }}>
      {loading ? (
        <Spin size="large" />
      ) : (
        <div>
          {!success ? (
            <div>
              <div className="flex items-center justify-center p-4">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500">
                  <AiOutlineCheck
                    style={{ fontSize: "24px", color: "white" }}
                  />
                </div>
              </div>
              <Title level={2}>
                Chúc mừng bạn đã xác thực tài khoản thành công!
              </Title>
              <Button type="primary" onClick={() => navigate("/login")}>
                Đăng nhập
              </Button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-center p-4 relative">
                <div className="absolute w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-16 border-b-blue-500"></div>
                <Tooltip title="Error" placement="bottom">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 relative z-10">
                    <MdOutlineError
                      style={{ fontSize: "24px", color: "white" }}
                    />
                  </div>
                </Tooltip>
              </div>
              <Title level={2}>
                Rất tiếc tài khoản của bạn không được xác thực. Vui lòng kiểm
                tra lại email hoặc đăng ký!
              </Title>
              <Button type="primary" onClick={() => navigate("/login")}>
                Đăng nhập
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConfirmEmail;
