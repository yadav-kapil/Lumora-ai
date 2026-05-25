import { useAuthContext } from "../context/auth/AuthContext";
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from "react";

const ProtectedLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const {
    isAuthenticated,
    isLoading,
  } = useAuthContext();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" replace/>
  );
};

export default ProtectedLayout;