import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";
import GuestLayout from "../layouts/GuestLayout";

import Error404 from "../pages/errors/Error404";

// Route modules imports
import { publicRoutes } from "./publicRoutes";
import { appRoutes } from "./appRoutes";
import { authRoutes } from "./authRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: publicRoutes,
  },

  {
    path: "/app",
    element: <ProtectedLayout />,
    children: appRoutes,
  },

  {
    path: "/auth",
    element: <GuestLayout />,
    children: authRoutes,
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);
export default router;
