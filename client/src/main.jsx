import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { router } from './routes/router';
import { AuthProvider } from "./context/auth/AuthContext";
import { ToastProvider } from "./context/ToastContext";


createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  </AuthProvider>,
)
