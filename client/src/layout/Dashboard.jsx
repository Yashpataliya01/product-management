import React, { useState, useEffect } from "react";
import DashSidebar from "../components/navigation/DashSidebar";
import DashNavbar from "../components/navigation/DashNavbar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setMobileView(true);
        setOpen(false);
      } else if (window.innerWidth < 1024) {
        setMobileView(false);
        setOpen(false);
      } else {
        setMobileView(false);
        setOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full h-screen flex bg-[#F5F7FA] overflow-hidden relative">
      
      {/* Sidebar */}
      <DashSidebar open={open} setOpen={setOpen} mobileView={mobileView} />

      {/* Main */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashNavbar open={open} setOpen={setOpen} mobileView={mobileView} />

        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
