import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Error404 from "../pages/Error404";
import GeneratePage from "../pages/GeneratePage";


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
    },
    {
        path: '/generate',
        element: <GeneratePage />,
        errorElement: <Error404 />
    }
])