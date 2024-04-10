import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/authContext";

export const ProtectedAdminRoute = () => {
  const { isAuthenticated, loading, user } = useAuth();
  if (loading) return <h1>Loading...</h1>;
  if (user) {
    if (!user.role.adminPermission) return <Navigate to="/login" replace />;
  }
  if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export const ProtectedRoute = () => {
  const { isAuthenticated, loading, user } = useAuth();
  if (loading) return <h1>Loading...</h1>;
  if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;
  return <Outlet />;
};
