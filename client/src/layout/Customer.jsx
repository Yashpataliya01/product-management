import React from "react";
import { Outlet } from "react-router-dom";
import ClientNavbar from "../components/navigation/Navbar";

const Customer = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ClientNavbar />
      <Outlet />
    </div>
  );
};

export default Customer;
