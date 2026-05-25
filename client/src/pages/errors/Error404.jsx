import { NavLink } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import Navbar from "../../components/Navbar";

import errorAnime from "../../assets/json_anime/Error404.json";

export default function Error404() {
  return (
    <>
      <Navbar />

      <div className="flex min-h-screen items-center justify-center px-4 py-18 text-center">
        {/* main card */}
        <div
          className="relative w-full max-w-2xl overflow-hidden
          rounded-[36px]
          border border-white/70
          bg-gradient-to-br from-white via-green-50/70 to-emerald-50/60
          px-6 py-10
          shadow-[0_25px_80px_rgba(16,24,40,0.08)]
          ring-1 ring-green-100/60
          backdrop-blur-2xl
          sm:px-10 sm:py-14"
        >
          {/* glass shine */}
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.55),rgba(255,255,255,0.08))]" />

          {/* top badge */}
          <div
            className="relative mx-auto flex w-fit items-center gap-2
            rounded-full border border-green-100
            bg-white/90 px-4 py-1.5
            text-[11px] font-semibold
            tracking-[0.22em]
            text-green-700
            shadow-[0_6px_20px_rgba(34,197,94,0.10)]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>

              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
            </span>

            PAGE NOT FOUND
          </div>

          {/* LOTTIE */}
          <div className="relative mt-6 mb-8 flex items-center justify-center sm:mt-8 sm:mb-10">
            {/* floating ring */}
            <div className="absolute h-[220px] w-[220px] rounded-full border border-green-100/60 bg-white/30 sm:h-[300px] sm:w-[300px]" />

            <DotLottieReact
              data={errorAnime}
              loop
              autoplay
              className="relative z-10 w-[240px] scale-[1.22] sm:w-[360px] sm:scale-[1.3]"
            />
          </div>

          {/* title */}
          <div className="relative">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Page Not Found
            </h2>

            {/* underline */}
            <div className="mx-auto mt-5 h-[4px] w-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 shadow-[0_0_18px_rgba(34,197,94,0.3)]" />

            <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-slate-500 sm:text-base">
              The page you’re looking for may have been moved, deleted, or never
              existed. Let’s guide you back to Lumora AI.
            </p>
          </div>

          {/* buttons */}
          <div className="relative mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* home */}
            <NavLink
              to="/"
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_35px_rgba(34,197,94,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(34,197,94,0.38)] active:scale-[0.98] sm:w-auto"
            >
              {/* shine */}
              <div className="absolute inset-0 translate-x-[-120%] bg-[linear-gradient(110deg,transparent_20%,rgba(255,255,255,0.3)_50%,transparent_80%)] transition-transform duration-700 group-hover:translate-x-[120%]" />

              <span className="relative">
                Return Home
              </span>

              <svg
                className="relative transition-transform duration-300 group-hover:translate-x-1"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 12H19M19 12L13 6M19 12L13 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </NavLink>

            {/* support */}
            <NavLink
              to="/contact"
              className="group flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/90 px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-[0_8px_24px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-[0_14px_34px_rgba(15,23,42,0.08)] active:scale-[0.98] sm:w-auto"
            >
              Contact Support

              <svg
                className="transition-transform duration-300 group-hover:translate-x-1"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 12H19M19 12L13 6M19 12L13 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </NavLink>
          </div>

          {/* footer */}
          <div className="relative mt-10 flex items-center justify-center gap-2 text-xs font-medium text-slate-400">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />

            Lumora AI Navigation System Online
          </div>
        </div>
      </div>
    </>
  );
}
