import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";

export const authRoutes = [
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "login",
    element: <Login />,
  }
];
