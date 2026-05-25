import Home from "../pages/public/Home";
import Contact from "../pages/public/Contact";
import Pricing from "../pages/public/Pricing";
import PrivacyPolicy from "../pages/legal/PrivacyPolicy";
import TermsOfService from "../pages/legal/TermsOfService";
import CookiePolicy from "../pages/legal/CookiePolicy";
import RefundPolicy from "../pages/legal/RefundPolicy";
import Disclaimer from "../pages/legal/Disclaimer";

export const publicRoutes = [
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
];
