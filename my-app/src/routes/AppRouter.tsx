import React from "react";
import {
  createBrowserRouter,
  Outlet,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import routesConfig from "./router";
import NotFound from "../pages/NotFound/NotFound";

const getRoute = (routes: Array<RoutesType>): Array<RouteObject> => {
  return routes.map((route) => {
    let element: React.ReactNode = route.element;

    if (route.path.startsWith("/admin")) {
      element = <ProtectedRoute>{route.element}</ProtectedRoute>;
    }

    return {
      path: route.path,
      element: element,
      children: route.children && getRoute(route.children),
    };
  });
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: getRoute(routesConfig),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
