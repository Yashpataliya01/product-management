import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function IsAuthenticated() {
  const token = document.cookie;
  const { user } = useSelector((state) => state.auth);

  // Not logged in → go to login
  if (!token) return <Navigate to="/login" replace />;

  // If user exists but is CUSTOMER → redirect to "/"
  if (user?.role === "customer") {
    return <Navigate to="/" replace />;
  }

  // If user is CLIENT → allow dashboard
  if (user?.role === "client") {
    return <Outlet />;
  }

  // Default fallback
  return <Navigate to="/login" replace />;
}

export default IsAuthenticated;