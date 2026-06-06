import { useLoading } from "../../context/LoadingContext";

export default function GlobalLoading() {
  const { isLoadingGlobal, loadingTitle, loadingMessage } = useLoading();

  if (!isLoadingGlobal) return null;

  return (
    <div className="absolute inset-0 z-35 flex flex-col items-center justify-center bg-white/70 backdrop-blur-md p-6 select-none animate-[fadeIn_0.2s_ease-out]">
      {/* Outer panel card for content alignment */}
      <div className="flex flex-col items-center text-center max-w-md p-8 rounded-3xl bg-white/50 border border-slate-100 shadow-[0_20px_50px_rgba(15,23,42,0.06)] animate-[scaleIn_0.3s_cubic-bezier(0.16,1,0.3,1)]">
        {/* Premium Rotating/Pulsing Spinner */}
        <div className="relative h-16 w-16 mb-5 flex items-center justify-center">
          {/* Outer glowing pulsing circle */}
          <div className="absolute inset-0 rounded-full border-4 border-emerald-500/10 animate-ping" />
          
          {/* Spinning gradient ring */}
          <div className="absolute inset-0 rounded-full border-4 border-t-emerald-500 border-r-emerald-500/20 border-b-transparent border-l-emerald-500/50 animate-spin" />
          
          {/* Inner decorative pulsing dot */}
          <div className="absolute inset-[18px] rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100/50 shadow-inner">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>

        {/* Loading Heading */}
        <h3 className="text-base font-black text-slate-800 tracking-tight leading-none animate-[slideIn_0.25s_ease-out]">
          {loadingTitle || "Loading"}
        </h3>

        {/* Loading Description */}
        <p className="mt-2.5 text-xs font-semibold text-slate-450 leading-relaxed max-w-xs animate-[slideIn_0.3s_ease-out]">
          {loadingMessage || "Please wait while we update your library."}
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.96) translateY(8px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
        @keyframes slideIn {
          from {
            transform: translateY(4px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
