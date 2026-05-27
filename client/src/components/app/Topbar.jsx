import { useState } from "react";
import {
  RiSparklingFill,
  RiArrowDownSLine,
  RiSettings3Line,
  RiLogoutBoxRLine,
  RiUser3Line,
  RiCoinLine,
  RiNotification2Fill,
} from "react-icons/ri";
import { useAuthContext } from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function TopBar({ onProfileClick, onSettingsClick }) {
  const [credits] = useState(100);
  const [avatarLetter] = useState("K");
  const [showMenu, setShowMenu] = useState(false);

  const { dispatch } = useAuthContext();
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
    <header className="fixed top-0 z-50 w-full h-[62px] border-b border-slate-100 bg-white/90 backdrop-blur-xl px-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <div className="flex h-full items-center justify-between max-w-screen-2xl mx-auto">
        {/* LEFT — Logo */}
        <div className="flex cursor-pointer items-center gap-2.5">
          <div className="group relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-green-600 to-emerald-400 shadow-md shadow-green-200/60 transition-all duration-200 hover:scale-105">
            <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            <RiSparklingFill size={17} className="relative z-10 text-white" />
          </div>
          <h1
            className="text-[21px] font-bold tracking-tight text-slate-900"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Lumora<span className="text-green-600">.ai</span>
          </h1>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          {/* Credits */}
          <button className="group hidden md:flex cursor-pointer items-center gap-2 rounded-lg border border-green-100 bg-green-50 px-3 py-1.5 transition-all duration-200 hover:border-green-200 hover:bg-green-100">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white/80 shadow-sm transition-all duration-200 group-hover:bg-green-500">
              <RiCoinLine
                size={13}
                className="text-green-600 transition-colors duration-200 group-hover:text-white"
              />
            </div>
            <span className="text-xs font-semibold text-green-700">
              Credits: {credits}
            </span>
          </button>

          {/* Bell */}
          <button className="group relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white transition-all duration-200 hover:border-green-200 hover:bg-green-50">
            <RiNotification2Fill
              size={16}
              className="text-slate-400 transition-colors duration-200 group-hover:text-green-600"
            />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-green-500 ring-1 ring-white" />
          </button>

          {/* Divider */}
          <div className="mx-1 h-5 w-px bg-slate-200" />

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="group flex cursor-pointer items-center gap-2 rounded-xl border border-transparent px-2 py-1 transition-all duration-200 hover:border-slate-200 hover:bg-slate-50"
            >
              <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-green-600 to-emerald-400 text-xs font-bold text-white shadow shadow-green-200 transition-all duration-200 group-hover:scale-105">
                <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                <span className="relative z-10">{avatarLetter}</span>
              </div>
              <p className="hidden md:block text-sm font-semibold text-slate-700">
                Kapil
              </p>
              <RiArrowDownSLine
                size={15}
                className={`text-slate-400 transition-transform duration-200 ${showMenu ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown */}
            {
              <div
                className={`absolute right-0 top-15 z-50 w-55 sm:w-56 rounded-2xl border border-slate-100 bg-white/95 p-1.5 shadow-[0_8px_40px_rgba(15,23,42,0.10)] backdrop-blur-xl transition-all duration-300 ease-out ${
                  showMenu
                    ? "visible translate-y-0 scale-100 opacity-100 pointer-events-auto"
                    : "invisible -translate-y-3 scale-95 opacity-0 pointer-events-none"
                }`}
              >
                {/* User info */}
                <div className="mb-1 flex items-center gap-2.5 rounded-xl bg-slate-50 p-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-emerald-400 text-sm font-bold text-white">
                    {avatarLetter}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      Kapil Yadav
                    </p>
                    <p className="truncate text-xs text-slate-400">
                      kapil@example.com
                    </p>
                  </div>
                </div>

                {/* Mobile credits */}
                <div className="mb-1 flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 px-3 py-2 md:hidden">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/80">
                    <RiCoinLine size={14} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 leading-none">
                      Credits
                    </p>
                    <p className="text-sm font-bold text-green-700">
                      {credits}
                    </p>
                  </div>
                </div>

                {/* Menu items */}
                <div className="space-y-0.5">
                  {[
                    { icon: <RiUser3Line size={15} />, label: "Profile", onClick: onProfileClick },
                    { icon: <RiSettings3Line size={15} />, label: "Settings", onClick: onSettingsClick },
                  ].map(({ icon, label, onClick }) => (
                    <button
                      key={label}
                      onClick={() => {
                        onClick?.();
                        setShowMenu(false);
                      }}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition-colors duration-150 hover:bg-green-50 hover:text-green-700 cursor-pointer"
                    >
                      {icon}
                      <span>{label}</span>
                    </button>
                  ))}
                  <div className="my-1 h-px bg-slate-100" />
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-red-400 transition-colors duration-150 hover:bg-red-50 hover:text-red-500"
                  >
                    <RiLogoutBoxRLine size={15} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </header>
  );
}
