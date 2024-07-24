import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

type Props = {};

const UserLayout = (props: Props) => {
  const [user, setUser] = useState<{ name: string } | null>(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("login");
    setUser(null);
  };

  return (
    <div>
      <Header user={user} handleLogout={handleLogout} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default UserLayout;
