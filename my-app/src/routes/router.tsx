import React from "react";
import UserLayout from "../layouts/UserLayout";
import Home from "../pages/Home/Home";
import { HomeOutlined } from "@ant-design/icons";
import MovieDetail from "../pages/Detail/MovieDetail";
import AdminLayout from "../layouts/AdminLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import MovieForm from "../pages/Dashboard/MovieForm";
import ProtectedRoute from "./ProtectedRoute";
import ListMovieByCategory from "../pages/List Movie By Category/MovieByCategory";
import ConfirmEmail from "../components/ConfirmEmail";
import ForgotPassword from "../components/ForgoPassword";
import ResetPassword from "../components/ResetPassword";

const routesConfig: Array<RoutesType> = [
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        name: "home",
        path: "/",
        element: <Home />,
        icon: <HomeOutlined />,
      },
      {
        name: "detail",
        path: "detail/:id",
        element: <MovieDetail />,
      },
      {
        name: "list movie by category",
        path: "category/:categoryId",
        element: <ListMovieByCategory />,
      },
      {
        name: "list movie by country",
        path: "country/:countryId",
        element: <h1>List movie by category</h1>,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        name: "list of movies",
        path: "",
        element: <Dashboard />,
      },
      {
        name: "list of user",
        path: "list-user",
        element: <h1>List of user</h1>,
      },
      {
        name: "create movie",
        path: "create-movie",
        element: <MovieForm />,
      },
      {
        name: "update movie",
        path: "update-movie/:id",
        element: <MovieForm />,
      },
      // Add admin routes here
    ],
  },
  {
    path: "login",
    name: "login",
    element: <Login />,
  },
  {
    path: "/confirm-email/:token",
    name: "confirm-email",
    element: <ConfirmEmail />,
  },
  {
    path: "/forgoPassword",
    name: "forgoPassword",
    element: <ForgotPassword />,
  },
  {
    path: "/resetPassword/:token",
    name: "resetPassword",
    element: <ResetPassword />,
  },

  {
    name: "register",
    path: "register",
    element: <Register />,
  },
];

export default routesConfig;
