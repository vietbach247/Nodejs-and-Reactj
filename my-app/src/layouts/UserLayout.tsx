import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

type Props = {};

const UserLayout: React.FC<Props> = (props: Props) => {
  const [user, setUser] = useState<{ name: string } | null>(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    setUser(null);
  };

  return (
    <div>
      <Header user={user} handleLogout={handleLogout} />
      <div className="m-5 ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;
