import { useState, useEffect } from "react";
import { useAuthContext } from "../context/auth/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/app/Sidebar";
import Topbar from "../components/app/Topbar";
import Profile from "../components/app/Profile";
import Setting from "../components/app/Setting";

const ProtectedLayout = () => {
  const { pathname } = useLocation();
  
  // Initialize collapsed (hidden) on mobile, expanded on desktop
  const [sidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth < 768);
 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


  const { isAuthenticated} = useAuthContext();

  return isAuthenticated ? (
    <div className="flex min-h-screen bg-slate-50/70">
      {/* Mobile Backdrop Overlay */}
      {!sidebarCollapsed && (
        <div
          onClick={() => setSidebarCollapsed(true)}
          className="fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-xs md:hidden transition-opacity duration-300 cursor-pointer"
        />
      )}

      {/* Sidebar on left */}
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      {/* Main Content Area on right */}
      <div
        className={`flex flex-1 flex-col transition-all duration-300 min-w-0 ${
          sidebarCollapsed ? "pl-0 md:pl-[80px]" : "pl-0 md:pl-[260px]"
        }`}
      >
        {/* Topbar */}
        <Topbar
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />

        {/* Dynamic page content */}
        <main className="flex-1 pt-[72px]">
          <Outlet />
        </main>
      </div>
    </div>
  ) : (
    <Navigate to="/auth/login" replace />
  );
};

export default ProtectedLayout;