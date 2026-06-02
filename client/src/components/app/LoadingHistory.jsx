import React from "react";

export default function LoadingHistory() {
  return (
    <div className="loading-history grid grid-cols-1 gap-5 bg-slate-50/70 p-3 sm:p-5 lg:grid-cols-2 lg:gap-6 lg:p-6 animate-pulse">
      {/* LEFT SKELETON */}
      <div className="flex flex-col gap-7 rounded-[28px] border border-slate-200/70 bg-white/95 p-7 shadow-[0_10px_40px_rgba(15,23,42,0.04)] backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-slate-200" />
          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 rounded bg-slate-200" />
            <div className="h-3 w-48 rounded bg-slate-200" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="h-3 w-16 rounded bg-slate-200" />
          <div className="h-24 w-full rounded-2xl bg-slate-200" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="h-3 w-12 rounded bg-slate-200" />
          <div className="h-16 w-full rounded-2xl bg-slate-200" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="h-3 w-10 rounded bg-slate-200" />
          <div className="h-12 w-full rounded-2xl bg-slate-200" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-3">
            <div className="h-3 w-24 rounded bg-slate-200" />
            <div className="h-12 w-full rounded-2xl bg-slate-200" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="h-3 w-20 rounded bg-slate-200" />
            <div className="h-12 w-full rounded-2xl bg-slate-200" />
          </div>
        </div>
        <div className="flex gap-3 pt-1">
          <div className="h-12 flex-1 rounded-2xl bg-slate-200" />
          <div className="h-12 w-24 rounded-2xl bg-slate-200" />
        </div>
      </div>

      {/* RIGHT SKELETON */}
      <div className="flex flex-col gap-6">
        <div className="rounded-[28px] border border-slate-200/70 bg-white/95 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.04)] backdrop-blur-xl flex flex-col gap-4">
          <div className="h-4 w-24 rounded bg-slate-200" />
          <div className="h-[420px] w-full rounded-3xl bg-slate-200" />
          <div className="flex gap-3">
            <div className="h-12 flex-1 rounded-2xl bg-slate-200" />
            <div className="h-12 flex-1 rounded-2xl bg-slate-200" />
            <div className="h-12 flex-[1.8] rounded-2xl bg-slate-200" />
          </div>
        </div>
        <div className="rounded-[28px] border border-slate-200/70 bg-white/95 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.04)] backdrop-blur-xl">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <div className="h-4 w-24 rounded bg-slate-200" />
              <div className="h-3 w-40 rounded bg-slate-200" />
            </div>
            <div className="h-3 w-14 rounded bg-slate-200" />
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            <div className="aspect-square rounded-2xl bg-slate-200" />
            <div className="aspect-square rounded-2xl bg-slate-200" />
            <div className="aspect-square rounded-2xl bg-slate-200" />
            <div className="aspect-square rounded-2xl bg-slate-200" />
            <div className="aspect-square rounded-2xl bg-slate-200" />
          </div>
        </div>
      </div>

      <style>{`
        .loading-history .bg-slate-200 {
          position: relative;
          overflow: hidden;
        }

        .loading-history .bg-slate-200::after {
          content: "";
          position: absolute;
          inset: 0;
          transform: translateX(-120%);
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.75),
            transparent
          );
          animation: historyShine 1.6s ease-in-out infinite;
        }

        @keyframes historyShine {
          100% {
            transform: translateX(120%);
          }
        }
      `}</style>
    </div>
  );
}
