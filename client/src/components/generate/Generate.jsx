import { useState, useRef, useEffect } from "react";
import {
  RiSparklingFill,
  RiVipCrownFill,
  RiCheckLine,
  RiArrowDownSLine,
  RiRefreshLine,
  RiDownloadLine,
  RiHistoryLine,
  RiImageAddLine,
} from "react-icons/ri";
import {
  STYLES,
  SIZES,
  MODELS,
  RESOLUTIONS,
  IMAGE_COUNTS,
  HISTORY,
} from "../../data/generateData";

const PREVIEW_IMG = "";

function Dropdown({ selected, options, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const current = options.find((o) => o.id === selected);

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
        className="flex w-full items-center justify-between rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-emerald-300 hover:bg-emerald-50/40 hover:shadow-md"
      >
        <div className="flex items-center gap-2 overflow-hidden">
          {current?.crown && (
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
        <div className="absolute left-0 bottom-[calc(100%+8px)] z-30 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.12)] backdrop-blur-xl">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => {
                onChange(opt.id);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between px-4 py-3 text-sm transition-all ${
                selected === opt.id
                  ? "bg-emerald-50 font-semibold text-emerald-700"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-2 overflow-hidden">
                {opt.crown && (
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
      )}
    </div>
  );
}

export default function Generate() {
  const [prompt, setPrompt] = useState(
    "A cozy workspace with warm sunlight, laptop, plants, and minimal desk setup.",
  );

  const [style, setStyle] = useState("realistic");
  const [size, setSize] = useState("landscape");
  const [model, setModel] = useState("basic");
  const [res, setRes] = useState("normal");
  const [count, setCount] = useState(1);

  const ratio = SIZES.find((s) => s.id === size) || SIZES[0];

  return (
    <div className="mt-18 grid grid-cols-1 gap-5 bg-slate-50/70 p-3 sm:p-5 lg:grid-cols-2 lg:gap-6 lg:p-6">
      {/* ───────── LEFT ───────── */}
      <div className="flex flex-col gap-7 rounded-[28px] border border-slate-200/70 bg-white/95 p-7 shadow-[0_10px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 via-green-500 to-teal-500 shadow-lg shadow-emerald-200/60">
            <RiSparklingFill size={20} className="text-white" />
          </div>

          <div>
            <h2 className="text-[18px] font-bold tracking-tight text-slate-900">
              Generate Image
            </h2>

            <p className="mt-0.5 text-xs text-slate-400">
              Turn your ideas into stunning visuals with AI
            </p>
          </div>
        </div>

        {/* Prompt */}
        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Prompt
          </p>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition-all focus-within:border-emerald-300 focus-within:bg-white focus-within:shadow-sm">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              maxLength={1000}
              rows={4}
              placeholder="Describe your image…"
              className="w-full resize-none bg-transparent text-sm leading-relaxed text-slate-700 placeholder:text-slate-300 outline-none"
            />

            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] text-slate-300">
                {prompt.length}/1000
              </span>

              <div className="relative">
                <RiVipCrownFill
                  size={13}
                  className="absolute -top-2 -left-1.5 z-10 -rotate-[28deg] text-amber-400 drop-shadow-sm"
                />

                <button className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-emerald-300/40 transition-all hover:-translate-y-px hover:brightness-110">
                  <RiSparklingFill size={12} />
                  Enhance Prompt
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Style */}
        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Style
          </p>

          <div className="flex gap-3 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
            {STYLES.map((s) => (
              <button
                key={s.id}
                onClick={() => setStyle(s.id)}
                className={`group relative shrink-0 overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                  style === s.id
                    ? "border-emerald-500 bg-white shadow-lg shadow-emerald-100"
                    : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                }`}
              >
                {s.premium && (
                  <RiVipCrownFill
                    size={11}
                    className="absolute top-1.5 left-1.5 z-10 -rotate-[25deg] text-amber-400 drop-shadow-sm"
                  />
                )}

                <img
                  src={s.img}
                  alt={s.label}
                  className="h-[62px] w-[92px] object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {style === s.id && (
                  <>
                    <div className="absolute inset-0 bg-emerald-500/10" />

                    <div className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 shadow-sm">
                      <RiCheckLine size={10} className="text-white" />
                    </div>
                  </>
                )}

                <div
                  className={`border-t px-2 py-2 text-center text-[11px] font-semibold ${
                    style === s.id
                      ? "border-emerald-100 text-emerald-600"
                      : "border-slate-100 text-slate-600"
                  }`}
                >
                  {s.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Size */}
        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Size
          </p>

          <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
            {SIZES.map((sz) => {
              const Icon = sz.icon;
              return (
                <button
                  key={sz.id}
                  onClick={() => setSize(sz.id)}
                  className={`flex flex-col items-center gap-1 rounded-2xl border-2 px-2 py-3 transition-all duration-200 ${
                    size === sz.id
                      ? "border-emerald-500 bg-emerald-50 shadow-md shadow-emerald-100"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <Icon
                    size={22}
                    className={`transition-colors ${
                      size === sz.id ? "text-emerald-500" : "text-slate-400"
                    }`}
                  />

                  <span
                    className={`text-[11px] font-semibold ${
                      size === sz.id ? "text-emerald-600" : "text-slate-700"
                    }`}
                  >
                    {sz.label}
                  </span>

                  <span className="text-[9px] text-slate-400">{sz.dims}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Model + Resolution */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Model
            </p>

            <Dropdown selected={model} options={MODELS} onChange={setModel} />
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Resolution
            </p>

            <div className="flex gap-2">
              {RESOLUTIONS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRes(r.id)}
                  className={`relative flex flex-1 items-center justify-center rounded-2xl border-2 py-3 text-xs font-semibold transition-all ${
                    res === r.id
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {r.crown && (
                    <RiVipCrownFill
                      size={11}
                      className="absolute -top-1.5 -left-1.5 -rotate-[25deg] text-amber-400"
                    />
                  )}

                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Number of Images */}
        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Number of Images
          </p>

          <Dropdown
            selected={count}
            options={IMAGE_COUNTS}
            onChange={setCount}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <button className="relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 py-3.5 text-sm font-bold text-white shadow-xl shadow-emerald-300/40 transition-all hover:-translate-y-px hover:brightness-110">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.4s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <RiSparklingFill size={15} />
            Generate Image
          </button>

          <button className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50">
            <RiRefreshLine size={15} />
            Reset
          </button>
        </div>
      </div>

      {/* ───────── RIGHT ───────── */}
      <div className="flex flex-col gap-6">
        {/* Preview Card */}
        <div className="rounded-[28px] border border-slate-200/70 bg-white/95 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <h3 className="text-[17px] font-bold tracking-tight text-slate-900">
                Preview
              </h3>

              <p className="mt-0.5 text-xs text-slate-400">
                This is your generated image
              </p>
            </div>

            <button className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50">
              {ratio.previewLabel}
            </button>
          </div>

          <div className="relative flex h-[420px] w-full items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-5">
            <div
              className="relative overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)] transition-all duration-300"
              style={{
                width: "100%",
                maxWidth: ratio.previewWidth,
                aspectRatio: ratio.ratio,
              }}
            >
              {PREVIEW_IMG ? (
                <>
                  <img
                    src={PREVIEW_IMG}
                    alt="Preview"
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-md">
                    <RiSparklingFill size={10} className="text-emerald-400" />

                    <span className="text-[10px] font-semibold tracking-wide text-white">
                      AI GENERATED
                    </span>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100">
                    <RiImageAddLine size={28} className="text-slate-400" />
                  </div>

                  <div className="text-center">
                    <p className="text-sm font-semibold text-slate-600">
                      No image generated yet
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Write a prompt and click Generate
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button className="relative mt-5 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 py-3.5 text-sm font-bold text-white shadow-xl shadow-emerald-300/40 transition-all hover:-translate-y-px hover:brightness-110">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.4s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <RiDownloadLine size={16} />
            Download
          </button>
        </div>

        {/* History Card */}
        <div className="rounded-[28px] border border-slate-200/70 bg-white/95 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-[17px] font-bold tracking-tight text-slate-900">
                History
              </h3>

              <p className="mt-0.5 text-xs text-slate-400">
                Your recently generated images
              </p>
            </div>

            <button className="text-xs font-semibold text-emerald-600 transition-colors hover:text-emerald-700">
              View All
            </button>
          </div>

          {HISTORY.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-12">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-100">
                <RiHistoryLine size={24} className="text-slate-400" />
              </div>

              <p className="text-sm font-semibold text-slate-500">
                No images generated yet
              </p>

              <p className="text-xs text-slate-400">
                Your generated images will appear here
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {HISTORY.map((img, i) => (
                <button
                  key={i}
                  className="group relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg"
                >
                  <img
                    src={img}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="absolute right-2 bottom-2 flex h-7 w-7 items-center justify-center rounded-xl bg-white/95 opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100">
                    <RiDownloadLine size={13} className="text-slate-700" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </div>
  );
}
