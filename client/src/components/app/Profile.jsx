import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/auth/AuthContext";

import {
  RiUser3Line,
  RiCloseLine,
  RiMailLine,
  RiUserLine,
  RiCalendarLine,
  RiVipCrownFill,
  RiCoinLine,
  RiUploadCloud2Line,
} from "react-icons/ri";

export default function Profile({ onClose }) {
  const { user } = useAuthContext();
  const [username, setUsername] = useState(user?.username || "");
  const [email] = useState(user?.email || "");
  const [avatarLetter, setAvatarLetter] = useState(
    user?.username ? user.username.charAt(0).toUpperCase() : "?"
  );

  // Block Background Scrolling
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle || "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-[6px] animate-[fadeIn_0.22s_ease-out]">
      {/* Modal Container with fixed height */}
      <div className="relative flex w-full max-w-lg h-[540px] flex-col rounded-[32px] border border-slate-100 bg-white p-6 md:p-8 shadow-[0_32px_80px_rgba(15,23,42,0.18)] animate-[slideIn_0.32s_cubic-bezier(0.16,1,0.3,1)] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-[0_4px_14px_rgba(16,185,129,0.12)] border border-emerald-100/50">
              <RiUser3Line size={22} />
            </div>
            <div>
              <h2 className="text-[20px] font-black text-slate-900 tracking-tight leading-none">
                My Profile
              </h2>
              <p className="mt-1.5 text-xs font-semibold text-slate-400">
                Manage your personal details and plan
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/app/profile"
              onClick={onClose}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 h-10 text-xs font-bold text-slate-650 hover:border-slate-350 hover:bg-slate-50 shadow-sm transition-all cursor-pointer"
            >
              Open Full Page
            </Link>
            <button
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-50 hover:border-slate-350 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
            >
              <RiCloseLine size={20} />
            </button>
          </div>

        </div>

        {/* Form Body (Scrollable if content overflows, but fits fixed height nicely) */}
        <div className="flex-1 overflow-y-auto py-5 space-y-6 scrollbar-premium pr-1">
          {/* Avatar Upload */}
          <div className="flex items-center gap-5">
            <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-emerald-400 text-2xl font-black text-white shadow-lg shadow-green-100 border-4 border-white">
              <span>{avatarLetter}</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">Profile Picture</h4>
              <p className="text-xs text-slate-400 mt-0.5">PNG or JPG. Max size 2MB</p>
              <div className="flex items-center gap-2 mt-2">
                <button className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-350 cursor-pointer">
                  <RiUploadCloud2Line size={13} />
                  Upload
                </button>
                <button 
                  onClick={() => setAvatarLetter("?")}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-red-500 shadow-sm transition-all hover:bg-red-50 hover:border-red-200 cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">
                Full Name
              </label>
              <div className="h-11 rounded-2xl border border-slate-200 bg-slate-50/30 px-4 flex items-center gap-3 focus-within:border-emerald-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-500/5 transition-all shadow-sm">
                <RiUserLine className="text-slate-400 shrink-0" size={16} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full h-full bg-transparent outline-none text-sm text-slate-700 font-semibold"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">
                Email Address
              </label>
              <div className="h-11 rounded-2xl border border-slate-250 bg-slate-100/50 px-4 flex items-center gap-3 cursor-not-allowed select-none shadow-sm">
                <RiMailLine className="text-slate-400 shrink-0" size={16} />
                <span className="w-full text-sm text-slate-400 font-semibold truncate">
                  {email}
                </span>
              </div>
            </div>
          </div>

          {/* Account Details & Badges */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50/50 border border-slate-100 p-4 rounded-2xl shadow-inner">
            {/* Plan tier */}
            <div className="flex items-start gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-500 border border-amber-100">
                <RiVipCrownFill size={15} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Plan Status</p>
                <p className="text-xs font-black text-slate-800 mt-0.5">Premium Plan</p>
              </div>
            </div>

            {/* Credits left */}
            <div className="flex items-start gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500 border border-emerald-100">
                <RiCoinLine size={15} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Credits</p>
                <p className="text-xs font-black text-slate-800 mt-0.5">{user?.credits ?? 0} remaining</p>
              </div>
            </div>
          </div>

          {/* Joined date info */}
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 pl-1 pb-1">
            <RiCalendarLine size={14} />
            <span>Member since May 2026</span>
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 shrink-0">
          <button
            onClick={onClose}
            className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 h-11 text-sm font-bold text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-350 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 px-6 h-11 text-sm font-black text-white shadow-md shadow-emerald-300/40 hover:-translate-y-px hover:brightness-105 transition-all cursor-pointer"
          >
            Save Changes
          </button>
        </div>

      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from {
            transform: scale(0.96) translateY(16px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
        
        .scrollbar-premium::-webkit-scrollbar {
          width: 5px;
        }
        .scrollbar-premium::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-premium::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 9999px;
        }
      `}</style>
    </div>
  );
}
