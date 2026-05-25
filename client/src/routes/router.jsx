import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import ProtectedLayout from "../layouts/ProtectedLayout";
import GuestLayout from "../layouts/GuestLayout";

import Home from "../pages/public/Home";
import Error404 from "../pages/errors/Error404";
import GeneratePage from "../pages/app/GeneratePage";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import Contact from "../pages/public/Contact";
import Pricing from "../pages/public/Pricing";
import PrivacyPolicy from "../pages/legal/PrivacyPolicy";
import TermsOfService from "../pages/legal/TermsOfService";
import CookiePolicy from "../pages/legal/CookiePolicy";
import RefundPolicy from "../pages/legal/RefundPolicy";
import Disclaimer from "../pages/legal/Disclaimer";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "pricing",
        element: <Pricing />
      },
      {
        path: "legal",
        children: [
          {
            path: "privacy",
            element: <PrivacyPolicy />
          },
          {
            path: "terms",
            element: <TermsOfService />
          },
          {
            path: "cookies",
            element: <CookiePolicy />
          },
          {
            path: "refund",
            element: <RefundPolicy />
          },
          {
            path: "disclaimer",
            element: <Disclaimer />
          }
        ]
      }
    ],
  },

  {
    path: "/app",
    element: <ProtectedLayout />,
    children: [
      {
        path: "generate",
        element: <GeneratePage />,
      },
    ],
  },

  {
    path: "/auth",
    element: <GuestLayout />,
    children: [
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);
