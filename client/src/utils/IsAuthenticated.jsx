import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function IsAuthenticated() {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "customer") {
    return <Navigate to="/" replace />;
  }

  if (user.role === "client") {
    return <Outlet />;
  }

  return <Navigate to="/login" replace />;
}


export default IsAuthenticated;