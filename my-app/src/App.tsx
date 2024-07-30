import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import Home from "./pages/Home/Home";
import MovieDetail from "./pages/Detail/MovieDetail";
import ListMovieByCategory from "./pages/List Movie By Category/MovieByCategory";
import ListMovieByCountry from "./pages/List Movie By Country/MovieByCountry";
import FavoritesList from "./components/Favorites";
import LoginPage from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ResetPassword from "./components/ResetPassword";
import ConfirmEmail from "./components/ConfirmEmail";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import MovieForm from "./pages/Dashboard/MovieForm";
import NotFound from "./pages/NotFound/NotFound";
import ProFile from "./pages/ProFile/profile";
import ForgotPassword from "./components/ForgoPassword";
import ProfilePage from "./pages/UpdateProfilePage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <div>
      <Routes>
        {/* Routes cho người dùng */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="detail/:id" element={<MovieDetail />} />
          <Route
            path="category/:categoryId"
            element={<ListMovieByCategory />}
          />
          <Route path="country/:countryId" element={<ListMovieByCountry />} />
          <Route
            path="favorite"
            element={<PrivateRoute component={FavoritesList} />}
          />
          <Route
            path="profile"
            element={<PrivateRoute component={ProFile} />}
          />
          <Route
            path="updateProfile"
            element={<PrivateRoute component={ProfilePage} />}
          />
        </Route>

        {/* Routes cho các trang khác */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/confirm-email/:token" element={<ConfirmEmail />} />
        <Route path="/forgoPassword" element={<ForgotPassword />} />

        {/* Routes cho admin */}
        <Route path="/admin" element={<PrivateRoute component={AdminLayout} />}>
          <Route index element={<Dashboard />} />
          <Route path="create-movie" element={<MovieForm />} />
          <Route path="update-movie/:id" element={<MovieForm />} />
        </Route>

        {/* Trang 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
