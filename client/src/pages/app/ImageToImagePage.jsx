import { useState } from "react";
import {
  RiSparklingFill,
  RiImageAddLine,
  RiDownloadLine,
  RiRefreshLine,
  RiArrowLeftRightLine,
  RiCheckLine,
} from "react-icons/ri";

export default function ImageToImagePage() {
  const [sourceImg, setSourceImg] = useState("");
  const [prompt, setPrompt] = useState("Make the background snowy and add vintage lighting.");
  const [strength, setStrength] = useState(0.65);
  const [generating, setGenerating] = useState(false);
  const [resultImg, setResultImg] = useState("");
  const [sliderPos, setSliderPos] = useState(50);
  const [style, setStyle] = useState("cinematic");

  const handleUpload = (e) => {
    // Mock upload a landscape photo
    setSourceImg("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&fit=crop");
    setResultImg("");
  };

  const handleGenerate = () => {
    if (!sourceImg) return;
    setGenerating(true);
    setTimeout(() => {
      // Mock result (snowy lake landscape)
      setResultImg("https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?w=800&fit=crop");
      setGenerating(false);
    }, 2000);
  };

  const handleReset = () => {
    setSourceImg("");
    setResultImg("");
    setPrompt("");
    setStrength(0.5);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* LEFT COLUMN: Controls */}
        <div className="flex flex-col gap-6 rounded-[28px] border border-slate-200/70 bg-white/95 p-6 md:p-8 shadow-[0_10px_40px_rgba(15,23,42,0.03)] backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100">
              <RiImageAddLine size={22} />
            </div>
            <div>
              <h2 className="text-[18px] font-black text-slate-900 tracking-tight leading-none">Image to Image</h2>
              <p className="text-xs text-slate-400 mt-1.5">Modify structure, style, and details of existing photos</p>
            </div>
          </div>

          {/* Step 1: Upload Image */}
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-2.5 uppercase tracking-wide">1. Upload Source Image</label>
            {sourceImg ? (
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 group aspect-video bg-slate-50 flex items-center justify-center">
                <img src={sourceImg} alt="Source" className="h-full w-full object-cover" />
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
                className="border-2 border-dashed border-slate-200/80 rounded-2xl p-6 text-center hover:border-blue-400 hover:bg-blue-50/20 transition-all cursor-pointer bg-slate-50/30 flex flex-col items-center justify-center gap-3 min-h-[160px]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-150 text-slate-500 shadow-inner">
                  <RiImageAddLine size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-700">Click to upload image</p>
                  <p className="text-[10px] text-slate-400 mt-1">Supports PNG, JPG up to 10MB</p>
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Prompt */}
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-2.5 uppercase tracking-wide">2. Describe Changes</label>
            <div className="rounded-2xl border border-slate-250 bg-slate-50/80 p-3 focus-within:bg-white focus-within:border-blue-300 transition-all">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="What changes would you like to make to this image? e.g. Make it sunset scene, cybernetic armor..."
                className="w-full h-20 bg-transparent resize-none outline-none text-xs leading-relaxed text-slate-700 font-semibold placeholder:text-slate-350"
              />
            </div>
          </div>

          {/* Step 3: Influence Strength */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">3. Image Strength ({Math.round(strength * 100)}%)</label>
              <span className="text-[10px] font-bold text-slate-400">Low = More creative freedom</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="0.9"
              step="0.05"
              value={strength}
              onChange={(e) => setStrength(parseFloat(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-150 rounded-lg outline-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-3">
            <button
              onClick={handleGenerate}
              disabled={generating || !sourceImg}
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-650 py-3.5 text-xs font-bold text-white shadow-lg shadow-blue-200/50 hover:brightness-115 hover:-translate-y-px transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <RiSparklingFill size={14} />
              {generating ? "Transforming..." : "Generate Variant"}
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

        {/* RIGHT COLUMN: Interactive Comparison Preview */}
        <div className="rounded-[28px] border border-slate-200/70 bg-white/95 p-6 md:p-8 shadow-[0_10px_40px_rgba(15,23,42,0.03)] backdrop-blur-xl flex flex-col justify-between min-h-[460px]">
          <div>
            <h3 className="text-sm font-black text-slate-900 tracking-tight leading-none mb-1">Before / After Compare</h3>
            <p className="text-xs text-slate-400 mb-5">Drag slider to compare source vs generated output</p>
          </div>

          <div className="relative flex-1 rounded-2xl overflow-hidden border border-slate-150 shadow-inner bg-slate-50 flex items-center justify-center select-none aspect-video">
            {generating ? (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 bg-white/70 backdrop-blur-xs">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
                <p className="text-xs font-bold text-slate-500">Transforming layout styles...</p>
              </div>
            ) : resultImg ? (
              // Comparison slider container
              <div className="relative w-full h-full overflow-hidden" onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                setSliderPos(Math.min(100, Math.max(0, x)));
              }}>
                {/* Result Image (Bottom Layer) */}
                <img src={resultImg} alt="After" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />

                {/* Source Image (Top Layer, Width Clipped) */}
                <div className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none" style={{ width: `${sliderPos}%` }}>
                  <img src={sourceImg} alt="Before" className="absolute inset-0 w-full h-full object-cover max-w-none" style={{ width: "100%", height: "100%" }} />
                </div>

                {/* Vertical Divider line */}
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
                  <p className="text-[10px] text-slate-400 mt-1">Upload source image and click Generate</p>
                </div>
              </div>
            )}
          </div>

          <button
            disabled={!resultImg}
            className="w-full mt-6 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-500 py-3.5 text-xs font-bold text-white shadow hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all"
          >
            <RiDownloadLine size={14} />
            Download Generated Result
          </button>
        </div>
      </div>
    </div>
  );
}
