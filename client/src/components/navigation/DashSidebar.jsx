import React from "react";
import {
  FiGrid,
  FiBox,
  FiUser,
  FiX,
} from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

const menuList = [
  { label: "Dashboard", icon: <FiGrid />, path: "/dashboard" },
  { label: "Products", icon: <FiBox />, path: "/dashboard/products" },
  { label: "Profile", icon: <FiUser />, path: "/dashboard/profile" },
];

const DashSidebar = ({ open, mobileView, setOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // ⭐ Auto detect active menu from URL
  const activePath = location.pathname;

  const handleNav = (path) => {
    navigate(path);
    if (mobileView) setOpen(false);
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      {mobileView && open && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`h-full bg-white border-r border-gray-100 shadow-lg transition-all duration-300 
        ${mobileView ? (open ? "w-64" : "w-0") : open ? "w-64" : "w-20"}
        ${mobileView ? "fixed z-40 top-0 left-0" : "relative"}
      `}
      >
        <div className={`${mobileView && !open ? "hidden" : ""} h-full`}>
          
          {/* LOGO */}
          <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[rgb(49,82,139)] rounded-xl flex items-center justify-center text-white font-bold">
                P
              </div>
              {open && <h1 className="text-lg font-semibold text-gray-800">ProductSys</h1>}
            </div>

            {mobileView && open && (
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={20} />
              </button>
            )}
          </div>

          {/* MENU ITEMS */}
          <div className="px-3 py-6 overflow-y-auto">
            {open && (
              <p className="text-gray-400 text-xs font-semibold mb-3 px-3">
                MENU
              </p>
            )}

            <ul className="space-y-1">
              {menuList.map((m) => {
                const isActive = activePath === m.path;

                return (
                  <li
                    key={m.label}
                    onClick={() => handleNav(m.path)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all group
                      ${
                        isActive
                          ? "bg-blue-50 text-blue-600 shadow-sm font-semibold"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }
                    `}
                  >
                    <span className="text-xl">{m.icon}</span>

                    {open && (
                      <span className="text-sm font-medium">{m.label}</span>
                    )}

                    {!open && (
                      <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap">
                        {m.label}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashSidebar;
