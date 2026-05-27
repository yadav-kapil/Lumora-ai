import { useState, useEffect } from "react";
import {
  RiSettings3Line,
  RiCloseLine,
  RiCheckLine,
  RiSparklingLine,
  RiComputerLine,
  RiErrorWarningLine,
} from "react-icons/ri";

export default function Setting({ onClose }) {
  const [defaultModel, setDefaultModel] = useState("pro");
  const [enhanceByDefault, setEnhanceByDefault] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [soundsEnabled, setSoundsEnabled] = useState(false);

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
      <div className="relative flex w-full max-w-lg h-[560px] flex-col rounded-[32px] border border-slate-100 bg-white p-6 md:p-8 shadow-[0_32px_80px_rgba(15,23,42,0.18)] animate-[slideIn_0.32s_cubic-bezier(0.16,1,0.3,1)] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-[0_4px_14px_rgba(16,185,129,0.12)] border border-emerald-100/50">
              <RiSettings3Line size={22} className="animate-[spin_20s_linear_infinite]" />
            </div>
            <div>
              <h2 className="text-[20px] font-black text-slate-900 tracking-tight leading-none">
                Settings
              </h2>
              <p className="mt-1.5 text-xs font-semibold text-slate-400">
                Customize app preferences and generation defaults
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-50 hover:border-slate-350 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
          >
            <RiCloseLine size={20} />
          </button>
        </div>

        {/* Scrollable Settings Panel */}
        <div className="flex-1 overflow-y-auto py-5 space-y-6 scrollbar-premium pr-1">
          
          {/* Section: Generation Defaults */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 pl-0.5">
              <RiSparklingLine size={13} className="text-emerald-500" />
              Generation Defaults
            </h4>

            {/* Default Model */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-800">Default Model</p>
                <p className="text-xs text-slate-400 mt-0.5">The default model used for prompt runs</p>
              </div>
              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/50">
                {["basic", "pro", "premium"].map((m) => (
                  <button
                    key={m}
                    onClick={() => setDefaultModel(m)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg uppercase tracking-wide transition-all cursor-pointer ${
                      defaultModel === m
                        ? "bg-white text-emerald-600 shadow-sm border border-slate-250/10"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Auto Prompt Enhance Toggle */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <p className="text-sm font-bold text-slate-800">Auto-Enhance Prompt</p>
                <p className="text-xs text-slate-400 mt-0.5">Automatically refine description syntax</p>
              </div>
              <button
                onClick={() => setEnhanceByDefault(!enhanceByDefault)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-in-out outline-none ${
                  enhanceByDefault ? "bg-emerald-500" : "bg-slate-200"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-250 ease-in-out ${
                    enhanceByDefault ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="h-px bg-slate-100" />

          {/* Section: Interface preferences */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 pl-0.5">
              <RiComputerLine size={13} className="text-emerald-500" />
              Interface Preferences
            </h4>

            {/* Dark Mode */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-800">Dark Interface theme</p>
                <p className="text-xs text-slate-400 mt-0.5">Switch UI shell between light and dark modes</p>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-in-out outline-none ${
                  darkMode ? "bg-emerald-500" : "bg-slate-200"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-250 ease-in-out ${
                    darkMode ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Sound FX */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <p className="text-sm font-bold text-slate-800">Play Audio Feedback</p>
                <p className="text-xs text-slate-400 mt-0.5">Play dynamic sound effects upon completion</p>
              </div>
              <button
                onClick={() => setSoundsEnabled(!soundsEnabled)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-in-out outline-none ${
                  soundsEnabled ? "bg-emerald-500" : "bg-slate-200"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-250 ease-in-out ${
                    soundsEnabled ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="h-px bg-slate-100" />

          {/* Section: Danger Zone */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5 pl-0.5">
              <RiErrorWarningLine size={14} className="text-red-500" />
              Danger Zone
            </h4>

            <div className="flex items-center justify-between bg-red-50/50 border border-red-100 p-4 rounded-2xl shadow-[0_2px_10px_rgba(239,68,68,0.03)]">
              <div>
                <p className="text-sm font-bold text-red-800">Delete Account</p>
                <p className="text-xs text-red-500 mt-0.5">Permanently remove profile details and art portfolios</p>
              </div>
              <button className="rounded-xl border border-red-200 bg-white px-3.5 py-2 text-xs font-black text-red-500 shadow-sm transition-all hover:bg-red-50 hover:border-red-300 cursor-pointer active:scale-95">
                Delete Account
              </button>
            </div>
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
            Save Settings
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
