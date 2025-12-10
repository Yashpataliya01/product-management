import React, { useState } from "react";
import { FiMenu, FiSearch, FiBell, FiMessageSquare } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

const DashNavbar = ({ open, setOpen, mobileView }) => {
  const [searchFocused, setSearchFocused] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    document.cookie = "token=; Max-Age=0; path=/";
    navigate("/login");
  };

  return (
    <div className="h-16 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm flex items-center justify-between px-4 md:px-6 sticky top-0 z-20">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-3 md:gap-4 flex-1">
        {mobileView && (
          <button
            onClick={() => setOpen(!open)}
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded-lg transition-all"
          >
            <FiMenu size={22} />
          </button>
        )}

        {/* SEARCH BAR */}
        <div
          className={`hidden md:flex items-center bg-gray-50 px-4 py-2.5 rounded-xl w-72 transition-all duration-200 ${
            searchFocused ? "ring-2 ring-blue-100 bg-white shadow-sm" : ""
          }`}
        >
          <FiSearch
            className={`transition-colors ${
              searchFocused ? "text-blue-500" : "text-gray-400"
            }`}
            size={18}
          />
          <input
            type="text"
            placeholder="Search anything..."
            className="bg-transparent ml-3 outline-none text-sm w-full text-gray-700"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-2 md:gap-3">

        <button className="md:hidden text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded-lg transition">
          <FiSearch size={20} />
        </button>

        <button className="relative text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded-lg transition">
          <FiBell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <button className="hidden sm:block text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded-lg transition">
          <FiMessageSquare size={20} />
        </button>

        <div className="hidden sm:block w-px h-8 bg-gray-200 mx-1"></div>

        {/* LOGOUT BUTTON */}
        {user ? (
          <button
            onClick={handleLogout}
            className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default DashNavbar;
