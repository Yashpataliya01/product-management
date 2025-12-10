import React, { lazy } from "react";
import Dashboard from "../layout/Dashboard";
import { Navigate, Outlet } from "react-router-dom";


// import the private componetn
const Dashboardhome = lazy(()=> import("../pages/client/Dashboard"));
const ProductsPage = lazy(()=> import("../pages/client/Products"));
const Profile = lazy(()=> import("../pages/client/Profile"));

import IsAuthenticated from "../utils/IsAuthenticated";

const dashboardRoute = () => [
  {
    element: <IsAuthenticated />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          { index: true, element: < Dashboardhome /> },
          {path: "products", element: <ProductsPage />},
          {path: "profile", element: <Profile />},
        ],
      },
    ],
  },
];

export default dashboardRoute;
