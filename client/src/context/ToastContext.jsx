import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { RiCheckLine, RiCloseLine, RiErrorWarningLine } from "react-icons/ri";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success", title = "") => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type, title }]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Lock body scroll when there's an active toast popup
  useEffect(() => {
    if (toasts.length > 0) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle || "auto";
      };
    }
  }, [toasts.length]);

  // Only render the latest toast to avoid stacking multiple overlays
  const activeToast = toasts[toasts.length - 1];

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {activeToast && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-[6px] animate-[fadeIn_0.2s_ease-out]">
          <div
            className={`relative flex w-full max-w-sm flex-col rounded-[28px] bg-white p-6 shadow-[0_32px_80px_rgba(15,23,42,0.18)] animate-[scaleIn_0.25s_cubic-bezier(0.16,1,0.3,1)] border ${
              activeToast.type === "success"
                ? "border-emerald-100"
                : activeToast.type === "alert"
                ? "border-amber-200"
                : "border-red-100"
            }`}
          >
            {/* Close Button */}
            <button
              onClick={() => removeToast(activeToast.id)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-slate-100 bg-white text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
            >
              <RiCloseLine size={16} />
            </button>

            {/* Content */}
            <div className="flex flex-col items-center text-center pt-3">
              {/* Icon wrapper */}
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl border mb-4 ${
                  activeToast.type === "success"
                    ? "bg-emerald-50 text-emerald-555 border-emerald-100/50 shadow-[0_4px_14px_rgba(16,185,129,0.12)]"
                    : activeToast.type === "alert"
                    ? "bg-amber-50 text-amber-600 border-amber-200/50 shadow-[0_4px_14px_rgba(245,158,11,0.12)]"
                    : "bg-rose-50 text-rose-500 border-rose-100/50 shadow-[0_4px_14px_rgba(244,63,94,0.12)]"
                }`}
              >
                {activeToast.type === "success" ? (
                  <RiCheckLine size={32} />
                ) : activeToast.type === "alert" ? (
                  <RiErrorWarningLine size={32} />
                ) : (
                  <RiCloseLine size={32} />
                )}
              </div>

              {/* Title / Heading */}
              <h3 className="text-base font-black text-slate-800 tracking-tight">
                {activeToast.title ||
                  (activeToast.type === "success"
                    ? "Success"
                    : activeToast.type === "alert"
                    ? "Alert"
                    : "Error")}
              </h3>

              {/* Message */}
              <p className="mt-2 text-xs font-semibold text-slate-450 px-2 leading-relaxed">
                {activeToast.message}
              </p>

              {/* Dismiss Button with countdown animation */}
              <button
                onClick={() => removeToast(activeToast.id)}
                className={`relative overflow-hidden mt-6 w-full flex items-center justify-center rounded-2xl px-6 h-11 text-xs font-black text-white shadow-md transition-all cursor-pointer hover:-translate-y-px hover:brightness-105 active:scale-[0.99] ${
                  activeToast.type === "success"
                    ? "bg-gradient-to-r from-emerald-600 to-green-500 shadow-emerald-200/40"
                    : activeToast.type === "alert"
                    ? "bg-gradient-to-r from-amber-500 to-yellow-500 shadow-amber-200/40"
                    : "bg-gradient-to-r from-rose-600 to-red-500 shadow-rose-200/40"
                }`}
              >
                {/* 5-second countdown sweep overlay */}
                <span
                  className="absolute left-0 top-0 bottom-0 bg-white/20 pointer-events-none w-full origin-left animate-[progressSweep_5s_linear_forwards]"
                />
                <span className="relative z-10">Dismiss</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.95) translateY(12px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
        @keyframes progressSweep {
          from {
            transform: scaleX(1);
          }
          to {
            transform: scaleX(0);
          }
        }
      `}</style>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used inside a ToastProvider");
  }
  return context;
};
