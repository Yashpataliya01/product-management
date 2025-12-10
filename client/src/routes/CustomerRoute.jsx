import React, { lazy } from "react";
import Customer from '../layout/Customer';

// import the private componetn
const CustomerHome = lazy(()=> import("../pages/customer/Customer"));

const customerRoute = () => [
  {
    path: "/",
    element: <Customer />,
    children: [
      { index: true, element: <CustomerHome /> },
    ],
  },
];


export default customerRoute;