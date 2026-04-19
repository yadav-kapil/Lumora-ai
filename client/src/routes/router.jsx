import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Error404 from "../pages/Error404";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <Error404 />,
        children: [
            {
                index: true,
                element: <Home />
            }
        ]
    }
])