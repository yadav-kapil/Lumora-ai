import { useState } from "react";
import { RiUser3Line, RiMailLine, RiUserLine, RiCalendarLine, RiVipCrownFill, RiCoinLine, RiUploadCloud2Line } from "react-icons/ri";

export default function ProfilePage() {
  const [username, setUsername] = useState("Kapil Yadav");
  const [email] = useState("kapil@example.com");
  const [avatarLetter, setAvatarLetter] = useState("K");
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="flex flex-col rounded-[28px] border border-slate-200/70 bg-white/95 p-6 md:p-8 shadow-[0_10px_40px_rgba(15,23,42,0.03)] backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100/50">
              <RiUser3Line size={22} />
            </div>
            <div>
              <h2 className="text-[20px] font-black text-slate-900 tracking-tight leading-none">
                My Profile
              </h2>
              <p className="mt-1.5 text-xs font-semibold text-slate-400">
                Manage your personal details, avatar, and system plan
              </p>
            </div>
          </div>
        </div>

        {saved && (
          <div className="mb-6 p-3 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl border border-emerald-200 animate-[fadeIn_0.2s_ease-out]">
            Profile saved successfully!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Avatar Upload */}
          <div className="flex items-center gap-5 pb-2">
            <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-emerald-400 text-2xl font-black text-white shadow-lg border-4 border-white">
              <span>{avatarLetter}</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">Profile Picture</h4>
              <p className="text-xs text-slate-400 mt-0.5">PNG or JPG. Max size 2MB</p>
              <div className="flex items-center gap-2 mt-2.5">
                <button type="button" className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm hover:bg-slate-50 cursor-pointer">
                  <RiUploadCloud2Line size={13} />
                  Upload
                </button>
                <button
                  type="button"
                  onClick={() => setAvatarLetter("?")}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-red-500 shadow-sm hover:bg-red-50 cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
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

          {/* Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/50 border border-slate-100 p-4 rounded-2xl shadow-inner">
            <div className="flex items-start gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-500 border border-amber-100">
                <RiVipCrownFill size={15} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Plan Status</p>
                <p className="text-xs font-black text-slate-800 mt-0.5">Premium Plan</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500 border border-emerald-100">
                <RiCoinLine size={15} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Credits</p>
                <p className="text-xs font-black text-slate-800 mt-0.5">100 remaining</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 pl-1">
            <RiCalendarLine size={14} />
            <span>Member since May 2026</span>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="flex items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 px-8 h-11 text-sm font-black text-white shadow-md hover:-translate-y-px hover:brightness-105 transition-all cursor-pointer"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
