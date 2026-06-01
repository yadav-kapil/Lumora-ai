import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/auth/AuthContext";
import { useEffect } from "react";

const GuestLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const {
    isAuthenticated,
    isLoading,
  } = useAuthContext();


  return isAuthenticated ? (
    <Navigate to="/app/text-to-image" replace/>
  ) : (
    <Outlet />
  );
};

export default GuestLayout;