import { useState } from "react";
import {
  RiSparklingFill,
  RiDownloadLine,
  RiRefreshLine,
  RiArrowLeftRightLine,
  RiUploadCloud2Line,
  RiVipCrownFill,
} from "react-icons/ri";

export default function UpscalerPage() {
  const [sourceImg, setSourceImg] = useState("");
  const [scale, setScale] = useState("2x");
  const [mode, setMode] = useState("photo");
  const [generating, setGenerating] = useState(false);
  const [resultImg, setResultImg] = useState("");
  const [sliderPos, setSliderPos] = useState(50);

  const handleUpload = () => {
    // Mock upload a slightly blurry portrait photo
    setSourceImg("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&fit=crop&blur=30");
    setResultImg("");
  };

  const handleGenerate = () => {
    if (!sourceImg) return;
    setGenerating(true);
    setTimeout(() => {
      // Mock result (ultra-clear detailed portrait)
      setResultImg("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&fit=crop");
      setGenerating(false);
    }, 2000);
  };

  const handleReset = () => {
    setSourceImg("");
    setResultImg("");
    setScale("2x");
    setMode("photo");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* LEFT COLUMN: Controls */}
        <div className="flex flex-col gap-6 rounded-[28px] border border-slate-200/70 bg-white/95 p-6 md:p-8 shadow-[0_10px_40px_rgba(15,23,42,0.03)] backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-[#f97316] border border-orange-100">
              <RiUploadCloud2Line size={22} />
            </div>
            <div>
              <h2 className="text-[18px] font-black text-slate-900 tracking-tight leading-none">Super Resolution Upscaler</h2>
              <p className="text-xs text-slate-400 mt-1.5">Upscale blurry low-res graphics into crisp HD masterpieces</p>
            </div>
          </div>

          {/* Upload Area */}
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-2.5 uppercase tracking-wide">1. Upload Low-Res Graphic</label>
            {sourceImg ? (
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 group aspect-video bg-slate-55 flex items-center justify-center">
                <img src={sourceImg} alt="Source" className="h-full w-full object-cover blur-[1.5px]" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                  <button
                    onClick={() => setSourceImg("")}
                    className="px-4 py-2 bg-red-650 hover:bg-red-600 text-white font-bold text-xs rounded-xl shadow cursor-pointer transition-all"
                  >
                    Remove Photo
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={handleUpload}
                className="border-2 border-dashed border-slate-200/80 rounded-2xl p-6 text-center hover:border-orange-400 hover:bg-orange-50/20 transition-all cursor-pointer bg-slate-50/30 flex flex-col items-center justify-center gap-3 min-h-[160px]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-150 text-slate-500 shadow-inner">
                  <RiUploadCloud2Line size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-700">Click to upload blurry graphic</p>
                  <p className="text-[10px] text-slate-400 mt-1">Supports PNG, JPG up to 8MB</p>
                </div>
              </div>
            )}
          </div>

          {/* Scale selection */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">2. Scale Factor</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "2x", label: "2X Scale", desc: "HD Output", premium: false },
                { id: "4x", label: "4X Scale", desc: "4K Detail", premium: true },
                { id: "8x", label: "8X Scale", desc: "8K Premium", premium: true },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setScale(s.id)}
                  className={`flex flex-col items-center justify-center gap-1 rounded-2xl border py-3 transition-all cursor-pointer relative ${
                    scale === s.id
                      ? "border-orange-500 bg-orange-50/20 text-[#ea580c] shadow-sm font-bold"
                      : "border-slate-200 bg-white text-slate-550 hover:border-slate-350 hover:text-slate-800"
                  }`}
                >
                  {s.premium && (
                    <RiVipCrownFill size={10} className="absolute top-1.5 right-1.5 text-amber-500" />
                  )}
                  <span className="text-xs">{s.label}</span>
                  <span className="text-[9px] text-slate-400 font-normal">{s.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Enhancement Mode selection */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">3. Enhancement AI Mode</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "photo", label: "Photo / Portrait" },
                { id: "anime", label: "Anime / Art" },
                { id: "text", label: "Text / Scan" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    mode === m.id
                      ? "border-orange-500 bg-orange-50/20 text-[#ea580c]"
                      : "border-slate-200 bg-white text-slate-500 hover:border-slate-350"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-3">
            <button
              onClick={handleGenerate}
              disabled={generating || !sourceImg}
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 py-3.5 text-xs font-bold text-white shadow-lg shadow-orange-200/50 hover:brightness-110 hover:-translate-y-px transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <RiSparklingFill size={14} />
              {generating ? "Upscaling..." : "Upscale Image"}
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-xs font-bold text-slate-650 hover:bg-slate-50 cursor-pointer transition-all shadow-sm"
            >
              <RiRefreshLine size={14} />
              Reset
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Comparison Split Slider */}
        <div className="rounded-[28px] border border-slate-200/70 bg-white/95 p-6 md:p-8 shadow-[0_10px_40px_rgba(15,23,42,0.03)] backdrop-blur-xl flex flex-col justify-between min-h-[460px]">
          <div>
            <h3 className="text-sm font-black text-slate-900 tracking-tight leading-none mb-1">Interactive Quality Compare</h3>
            <p className="text-xs text-slate-400 mb-5">Move slider to view high-frequency upscaled details</p>
          </div>

          <div className="relative flex-1 rounded-2xl overflow-hidden border border-slate-150 shadow-inner bg-slate-55 flex items-center justify-center select-none aspect-video">
            {generating ? (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 bg-white/70 backdrop-blur-xs">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
                <p className="text-xs font-bold text-slate-500">Injecting detail pixels...</p>
              </div>
            ) : resultImg ? (
              <div className="relative w-full h-full overflow-hidden" onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                setSliderPos(Math.min(100, Math.max(0, x)));
              }}>
                {/* Upscaled (Bottom Layer) */}
                <img src={resultImg} alt="Upscaled Detail" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />

                {/* Original (Top Layer, Width Clipped, Blurry) */}
                <div className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none" style={{ width: `${sliderPos}%` }}>
                  <img src={sourceImg} alt="Original Blurry" className="absolute inset-0 w-full h-full object-cover max-w-none filter blur-[1.5px]" style={{ width: "100%", height: "100%" }} />
                </div>

                {/* Divider Line */}
                <div className="absolute inset-y-0 z-10 w-0.5 bg-white shadow pointer-events-none" style={{ left: `${sliderPos}%` }}>
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-700 shadow-md border border-slate-200">
                    <RiArrowLeftRightLine size={12} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-450 shadow-inner">
                  <RiArrowLeftRightLine size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-650">No comparison loaded</p>
                  <p className="text-[10px] text-slate-400 mt-1">Upload low-res file and click Upscale</p>
                </div>
              </div>
            )}
          </div>

          <button
            disabled={!resultImg}
            className="w-full mt-6 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 py-3.5 text-xs font-bold text-white shadow hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all"
          >
            <RiDownloadLine size={14} />
            Download Super Resolution Output
          </button>
        </div>
      </div>
    </div>
  );
}
