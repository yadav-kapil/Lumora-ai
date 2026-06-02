import { useState, useRef, useEffect } from "react";
import {
  RiVipCrownFill,
  RiArrowDownSLine,
  RiCheckLine,
} from "react-icons/ri";
import { useAuthContext } from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dropdown({ selected, options, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const isFreePlan = !user || user.plan === "free";
  
  const isGrouped = options[0] && Array.isArray(options[0].models);
  const getFlatOptions = () => {
    if (isGrouped) {
      return options.reduce((acc, group) => [...acc, ...group.models], []);
    }
    return options;
  };
  
  const flatOptions = getFlatOptions();
  const current = flatOptions.find((o) => o.id === selected);

  useEffect(() => {
    const close = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-emerald-300 hover:bg-emerald-50/40 hover:shadow-md cursor-pointer"
      >
        <div className="flex items-center gap-2 overflow-hidden">
          {current?.crown && isFreePlan && (
            <RiVipCrownFill size={12} className="shrink-0 text-amber-400" />
          )}
          <span className="truncate">{current?.label}</span>
          {current?.desc && (
            <span className="truncate text-xs font-normal text-slate-400">
              — {current.desc}
            </span>
          )}
        </div>

        <RiArrowDownSLine
          size={16}
          className={`shrink-0 text-slate-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 bottom-[calc(100%+8px)] z-30 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.12)] backdrop-blur-xl max-h-60 overflow-y-auto">
          {isGrouped ? (
            options.map((group) => (
              <div key={group.provider} className="flex flex-col">
                <div className="bg-slate-50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                  {group.label || group.provider}
                </div>
                {group.models.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      if (opt.crown && isFreePlan) {
                        navigate("/app/billing");
                        setOpen(false);
                        return;
                      }
                      onChange(opt.id);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-4 py-3 text-sm transition-all cursor-pointer ${
                      selected === opt.id
                        ? "bg-emerald-50 font-semibold text-emerald-700"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      {opt.crown && isFreePlan && (
                        <RiVipCrownFill size={12} className="text-amber-400" />
                      )}
                      <span>{opt.label}</span>
                      {opt.desc && (
                        <span className="truncate text-xs text-slate-400">
                          — {opt.desc}
                        </span>
                      )}
                    </div>

                    {selected === opt.id && (
                      <RiCheckLine size={14} className="text-emerald-600" />
                    )}
                  </button>
                ))}
              </div>
            ))
          ) : (
            options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  if (opt.crown && isFreePlan) {
                    navigate("/app/billing");
                    setOpen(false);
                    return;
                  }
                  onChange(opt.id);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-4 py-3 text-sm transition-all cursor-pointer ${
                  selected === opt.id
                    ? "bg-emerald-50 font-semibold text-emerald-700"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  {opt.crown && isFreePlan && (
                    <RiVipCrownFill size={12} className="text-amber-400" />
                  )}
                  <span>{opt.label}</span>
                  {opt.desc && (
                    <span className="truncate text-xs text-slate-400">
                      — {opt.desc}
                    </span>
                  )}
                </div>

                {selected === opt.id && (
                  <RiCheckLine size={14} className="text-emerald-600" />
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
