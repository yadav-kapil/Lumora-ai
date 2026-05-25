import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect, useState } from "react";

import loadingAnime from "../assets/json_anime/loading.json";

const LoadingScreen = () => {
  const [progress, setProgress] =
    useState(0);

  useEffect(() => {
    let current = 0;

    const interval = setInterval(() => {
      current += 1;

      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7fff9] px-4">
      {/* Background glow */}
      <div className="absolute left-[-120px] top-[-120px] h-[300px] w-[300px] rounded-full bg-green-400/10 blur-3xl sm:h-[420px] sm:w-[420px]" />

      <div className="absolute bottom-[-120px] right-[-120px] h-[260px] w-[260px] rounded-full bg-emerald-300/10 blur-3xl sm:h-[360px] sm:w-[360px]" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:34px_34px] sm:bg-[size:42px_42px]" />

      {/* Main card */}
      <div className="relative z-10 flex w-full max-w-[95%] flex-col items-center rounded-[28px] border border-white/70 bg-white/70 px-5 py-7 shadow-[0_20px_80px_rgba(16,24,40,0.08)] backdrop-blur-2xl sm:max-w-lg sm:rounded-[34px] sm:px-8 sm:py-10">
        {/* subtle shine */}
        <div className="absolute inset-0 rounded-[28px] bg-[linear-gradient(120deg,rgba(255,255,255,0.65),rgba(255,255,255,0.15))] sm:rounded-[34px]" />

        {/* Badge */}
        <div className="relative mb-4 flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-3 py-1.5 text-[10px] font-semibold tracking-[0.18em] text-green-700 shadow-sm sm:mb-5 sm:px-4 sm:text-xs">
          <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>

            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500 sm:h-2.5 sm:w-2.5"></span>
          </span>

          AI ENGINE INITIALIZING
        </div>

        {/* Animation */}
        <div className="relative -mb-2 -mt-2 flex w-full items-center justify-center">
          {/* glow */}
          <div className="absolute h-[140px] w-[140px] rounded-full bg-green-400/10 blur-3xl sm:h-[180px] sm:w-[180px]" />

          <DotLottieReact
            data={loadingAnime}
            loop
            autoplay
            className="relative z-10 w-[220px] scale-[1.18] sm:w-[320px] sm:scale-[1.35]"
          />
        </div>

        {/* Brand */}
        <div className="relative text-center">
          <h1 className="text-[32px] font-black tracking-[-0.04em] text-slate-900 sm:text-[42px]">
            Lumora
            <span className="bg-gradient-to-r from-green-600 to-emerald-400 bg-clip-text text-transparent">
              .ai
            </span>
          </h1>

          <p className="mt-2 text-xs font-medium text-slate-500 sm:text-sm">
            Preparing your intelligent workspace...
          </p>
        </div>

        {/* Progress section */}
        <div className="relative mt-7 w-full sm:mt-9">
          {/* top labels */}
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:text-xs">
              Loading Modules
            </p>

            <p className="text-[10px] font-bold text-green-600 sm:text-xs">
              {progress}%
            </p>
          </div>

          {/* Progress bar */}
          <div className="relative h-2.5 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200/70 sm:h-3">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-green-500 via-emerald-400 to-green-500 transition-all duration-75"
              style={{
                width: `${progress}%`,
                boxShadow:
                  "0 0 24px rgba(34,197,94,0.35)",
              }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 animate-[shimmer_1.8s_linear_infinite] bg-[linear-gradient(110deg,transparent_20%,rgba(255,255,255,0.55)_50%,transparent_80%)]" />
            </div>
          </div>

          {/* Bottom status */}
          <div className="mt-4 flex items-center justify-between text-[10px] text-slate-400 sm:text-xs">
            <span>
              Connecting AI Services
            </span>

            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-green-500 [animation-delay:-0.3s]" />

              <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-green-500 [animation-delay:-0.15s]" />

              <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-green-500" />
            </div>
          </div>
        </div>
      </div>

      {/* shimmer animation */}
      <style>
        {`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }

            100% {
              transform: translateX(200%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingScreen;