import { useState } from "react";
import {
  RiArrowDownSLine,
  RiSettings3Line,
  RiLogoutBoxRLine,
  RiUser3Line,
  RiCoinLine,
  RiFolderLine,
  RiMenuLine,
  RiNotification3Line,
} from "react-icons/ri";
import { useAuthContext } from "../../context/auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function TopBar({ sidebarCollapsed, setSidebarCollapsed }) {
  const { user, dispatch } = useAuthContext();
  const credits = user?.credits ?? 0;
  const avatarLetter = user?.username ? user.username.charAt(0).toUpperCase() : "?";
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch(`/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Logout failed");
      }

      navigate("/", { replace: true, flushSync: true });
      dispatch({
        type: "LOGOUT",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header
      className={`fixed top-0 right-0 z-40 h-[72px] border-b border-slate-100 bg-white/90 backdrop-blur-xl px-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all duration-300 ${
        sidebarCollapsed ? "left-0 md:left-[80px]" : "left-0 md:left-[260px]"
      }`}
    >
      <div className="flex h-full items-center justify-between max-w-screen-2xl mx-auto">
        {/* LEFT — Mobile Menu Icon Button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="flex md:hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-50 shadow-sm cursor-pointer transition-all active:scale-95"
        >
          <RiMenuLine size={18} />
        </button>

        {/* Desktop Spacer */}
        <div className="hidden md:block" />

        {/* RIGHT — Actions */}
        <div className="flex items-center gap-3">
          {/* Credits */}
          <button
            onClick={() => navigate("/app/billing")}
            className="group flex cursor-pointer items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-3.5 py-2 transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-100/60"
          >
            <RiCoinLine size={15} className="text-emerald-600" />
            <span className="text-xs font-semibold text-emerald-700">
              Credits: {credits}
            </span>
          </button>

          {/* Notifications */}
          <button className="group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-slate-200/80 bg-white transition-all duration-200 hover:border-slate-300 hover:bg-slate-50">
            <RiNotification3Line
              size={18}
              className="text-slate-600 group-hover:text-slate-800"
            />

            {/* Notification Dot */}
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500"></span>
          </button>

          {/* Divider */}
          <div className="mx-1 h-5 w-px bg-slate-200" />

          {/* Profile / Account */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="group flex cursor-pointer items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white px-3 py-1.5 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50"
            >
              <div className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-emerald-500 text-xs font-bold text-white shadow shadow-emerald-200">
                <span>{avatarLetter}</span>
              </div>
              <RiArrowDownSLine
                size={14}
                className={`text-slate-400 transition-transform duration-200 ${showMenu ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute right-0 top-13 z-50 w-56 rounded-2xl border border-slate-100 bg-white/95 p-1.5 shadow-[0_8px_40px_rgba(15,23,42,0.10)] backdrop-blur-xl transition-all duration-300 ease-out ${
                showMenu
                  ? "visible translate-y-0 scale-100 opacity-100 pointer-events-auto"
                  : "invisible -translate-y-3 scale-95 opacity-0 pointer-events-none"
              }`}
            >
              {/* User info */}
              <div className="mb-1 flex items-center gap-2.5 rounded-xl bg-slate-50 p-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                  {avatarLetter}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-slate-800">
                    {user?.username || "Guest"}
                  </p>
                  <p className="truncate text-[10px] text-slate-400">
                    {user?.email || "guest@example.com"}
                  </p>
                </div>
              </div>

              {/* Menu items */}
              <div className="space-y-0.5">
                {[
                  {
                    icon: <RiUser3Line size={14} />,
                    label: "Profile",
                    path: "/app/profile",
                  },
                  {
                    icon: <RiSettings3Line size={14} />,
                    label: "Settings",
                    path: "/app/settings",
                  },
                ].map(({ icon, label, path }) => (
                  <Link
                    key={label}
                    to={path}
                    onClick={() => setShowMenu(false)}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-600 transition-colors duration-150 hover:bg-emerald-50 hover:text-emerald-700 cursor-pointer"
                  >
                    {icon}
                    <span>{label}</span>
                  </Link>
                ))}
                <div className="my-1 h-px bg-slate-100" />
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-red-500 transition-colors duration-150 hover:bg-red-50 cursor-pointer"
                >
                  <RiLogoutBoxRLine size={14} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
