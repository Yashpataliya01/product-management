import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";

const ClientNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  // Handle Signout
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white/80 backdrop-blur-lg shadow-md border-b border-gray-200 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-4">

        {/* Website Name */}
        <Link to="/" className="text-2xl font-semibold text-[rgb(49,82,139)]">
          Product System
        </Link>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-3">

          {!user ? (
            // SIGN IN BUTTON
            <Link
              to="/login"
              className="px-4 py-2 bg-[rgb(49,82,139)] text-white rounded-lg hover:bg-opacity-90 transition"
            >
              Sign In
            </Link>
          ) : (
            // SIGN OUT BUTTON
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Sign Out
            </button>
          )}

        </div>
      </div>
    </nav>
  );
};

export default ClientNavbar;
