import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  RiSparklingFill,
  RiImage2Line,
  RiAspectRatioLine,
  RiEraserLine,
  RiHistoryLine,
  RiHeartLine,
  RiFolderLine,
  RiUser3Line,
  RiSettings3Line,
  RiBankCardLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiCloseLine,
  RiVipCrownFill,
} from "react-icons/ri";

export default function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation();

  
  const [activeTab, setActiveTab] = useState("text-to-image");

  useEffect(() => {
    const path = location.pathname;

    menuGroups.forEach((group) => {
      group.items.forEach((item) => {
        if (path === item.path) {
          setActiveTab(item.id);
        }
      });
    });
  }, [location.pathname]);

  const menuGroups = [
    {
      
      title: null,
      items: [
        {
          id: "text-to-image",
          label: "Text to Image",
          icon: (
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500 text-white shrink-0 shadow-sm shadow-emerald-200">
              <RiSparklingFill size={14} />
            </div>
          ),
          path: "/app/text-to-image",
        },
        {
          id: "image-to-image",
          label: "Image to Image",
          icon: (
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500 text-white shrink-0 shadow-sm shadow-blue-200">
              <RiImage2Line size={14} />
            </div>
          ),
          path: "/app/image-to-image",
        },
        {
          id: "image-upscaler",
          label: "Image Upscaler",
          icon: (
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f97316] text-white shrink-0 shadow-sm shadow-orange-200">
              <RiAspectRatioLine size={14} />
            </div>
          ),
          path: "/app/image-upscaler",
        },
        {
          id: "remove-bg",
          label: "Remove BG",
          icon: (
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500 text-white shrink-0 shadow-sm shadow-indigo-200">
              <RiEraserLine size={14} />
            </div>
          ),
          path: "/app/remove-bg",
        },
      ],
    },
    {
      
      title: "LIBRARY",
      items: [
        {
          id: "history",
          label: "History",
          icon: <RiHistoryLine size={18} />,
          path: "/app/history",
        },
        {
          id: "favorites",
          label: "Favorites",
          icon: <RiHeartLine size={18} />,
          path: "/app/favorites",
        },
        {
          id: "collections",
          label: "Collections",
          icon: <RiFolderLine size={18} />,
          path: "/app/collections",
        },
      ],
    },
    {
      
      title: "ACCOUNT",
      items: [
        {
          id: "profile",
          label: "Profile",
          icon: <RiUser3Line size={18} />,
          path: "/app/profile",
        },
        {
          id: "settings",
          label: "Settings",
          icon: <RiSettings3Line size={18} />,
          path: "/app/settings",
        },
        {
          id: "billing",
          label: "Billing",
          icon: <RiBankCardLine size={18} />,
          path: "/app/billing",
        },
      ],
    },
  ];

  return (
    <div
      className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col border-r border-slate-200/80 bg-white shadow-sm transition-all duration-300 ${
        collapsed
          ? "translate-x-[-100%] md:translate-x-0 md:w-[80px]"
          : "translate-x-0 md:w-[260px]"
      }`}
    >
      {/* Top Logo Area */}
      <div className="flex h-[72px] items-center justify-between px-5">
        <div className="flex items-center gap-3 overflow-hidden">
                  {!collapsed && (
                      <>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-md shadow-emerald-200/50">
            <RiSparklingFill size={18} />
          </div>
          
            <span
              className="text-lg font-bold tracking-tight text-slate-900"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Lumora<span className="text-emerald-500">.ai</span>
                          </span>
                          </>
          )}
        </div>

        {/* Mobile Close Button (X) / Desktop Collapse Button */}
        <button
          onClick={() => setCollapsed(true)}
          className="flex md:hidden h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 hover:border-slate-350 hover:text-slate-650 cursor-pointer shadow-sm active:scale-95"
        >
          <RiCloseLine size={16} />
        </button>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 hover:border-slate-300 hover:text-slate-600 hover:shadow-sm cursor-pointer"
        >
          {collapsed ? (
            <RiArrowRightSLine size={16} />
          ) : (
            <RiArrowLeftSLine size={16} />
          )}
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {menuGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-1.5">
            {/* Header category label */}
            {group.title && !collapsed && (
              <p className="px-3.5 mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400/80">
                {group.title}
              </p>
            )}

            {group.items.map((item) => {
              const isActive = activeTab === item.id;

              const itemContent = (
                <div
                  className={`relative flex items-center gap-3.5 rounded-xl py-2.5 transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-50/70 text-slate-800 border-l-[3px] border-emerald-500 pl-3 pr-4 font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:translate-x-1 pl-3.5 pr-4 font-medium"
                  } ${collapsed ? "justify-center !pl-0 !pr-0 border-l-0" : ""}`}
                >
                  <span
                    className={`shrink-0 flex items-center justify-center transition-colors ${
                      isActive &&
                      !item.id.includes("image") &&
                      !item.id.includes("remove-bg")
                        ? "text-emerald-500"
                        : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  >
                    {item.icon}
                  </span>
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </div>
              );

              return (
                <Link
                  key={item.id}
                  to={item.path || "#"}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      setCollapsed(true);
                    }
                  }}
                  className="block cursor-pointer focus:outline-none group"
                >
                  {itemContent}
                </Link>
              );
            })}
          </div>
        ))}

        {/* Bottom Upgrade Card */}
        <div className="pt-4 border-t border-slate-100 mt-4">
          {collapsed ? (
            <Link to='/pricing' className="justify-center hidden md:flex">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-500 border border-amber-200 cursor-pointer hover:bg-amber-100 transition-colors">
                <RiVipCrownFill size={18} />
              </div>
            </Link>
          ) : (
            <div className="rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50/30 to-emerald-50/80 p-4 relative overflow-hidden">
              {/* Glow effect */}
              <div className="absolute -right-4 -top-4 h-12 w-12 rounded-full bg-emerald-300/10 blur-xl" />

              <div className="flex items-center gap-2 mb-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500 text-white">
                  <RiVipCrownFill size={12} />
                </div>
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  Upgrade to Pro <span className="text-amber-500">⚡</span>
                </span>
              </div>

              <p className="text-[11px] leading-relaxed text-slate-550 mb-3.5">
                Unlock unlimited generations, faster speed & more.
              </p>

              <Link to='/pricing' className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-200/50 hover:brightness-110 hover:-translate-y-px transition-all duration-200 cursor-pointer">
                Upgrade Now
                <span>→</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
