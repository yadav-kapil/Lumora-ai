import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { router } from './routes/router';
import { AuthProvider } from "./context/auth/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { LoadingProvider } from "./context/LoadingContext";


createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <LoadingProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </LoadingProvider>
  </AuthProvider>,
)
