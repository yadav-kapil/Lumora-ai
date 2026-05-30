import { useState, useRef } from "react";
import {
  RiSparklingFill,
  RiVideoLine,
  RiDownloadLine,
  RiRefreshLine,
  RiPlayFill,
  RiPauseFill,
  RiVipCrownFill,
  RiCameraLine,
} from "react-icons/ri";

export default function VideoPage() {
  const [prompt, setPrompt] = useState("Cinematic slow motion shot of space nebula swirling with neon dust, 8k.");
  const [duration, setDuration] = useState("4s");
  const [motion, setMotion] = useState(5);
  const [generating, setGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [playing, setPlaying] = useState(false);
  
  const videoRef = useRef(null);

  const handleGenerate = () => {
    if (!prompt) return;
    setGenerating(true);
    setVideoUrl("");
    setPlaying(false);

    setTimeout(() => {
      // Mock generated space loop video
      setVideoUrl("https://assets.mixkit.co/videos/preview/mixkit-star-field-in-space-background-32431-large.mp4");
      setGenerating(false);
    }, 2800);
  };

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const handleReset = () => {
    setPrompt("");
    setDuration("4s");
    setMotion(5);
    setVideoUrl("");
    setPlaying(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* LEFT COLUMN: Controls */}
        <div className="flex flex-col gap-6 rounded-[28px] border border-slate-200/70 bg-white/95 p-6 md:p-8 shadow-[0_10px_40px_rgba(15,23,42,0.03)] backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-[#8b5cf6] border border-purple-100">
              <RiVideoLine size={22} />
            </div>
            <div>
              <h2 className="text-[18px] font-black text-slate-900 tracking-tight leading-none">Text to Video</h2>
              <p className="text-xs text-slate-400 mt-1.5">Animate your text descriptions into rich cinematic loops</p>
            </div>
          </div>

          {/* Prompt */}
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-2.5 uppercase tracking-wide">1. Write Video Prompt</label>
            <div className="rounded-2xl border border-slate-250 bg-slate-50/80 p-3 focus-within:bg-white focus-within:border-purple-350 transition-all">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the motion scene in detail... e.g. Drone flyover of green hills, waterfall at sunset..."
                className="w-full h-20 bg-transparent resize-none outline-none text-xs leading-relaxed text-slate-700 font-semibold placeholder:text-slate-350"
              />
            </div>
          </div>

          {/* Duration Selector */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">2. Video Duration</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "4s", label: "4 Seconds", desc: "Fast Render", premium: false },
                { id: "8s", label: "8 Seconds", desc: "HQ Motion", premium: true },
                { id: "16s", label: "16 Seconds", desc: "Ultra Loop", premium: true },
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDuration(d.id)}
                  className={`flex flex-col items-center justify-center gap-1 rounded-2xl border py-3 transition-all cursor-pointer relative ${
                    duration === d.id
                      ? "border-purple-500 bg-purple-50/20 text-[#7c3aed] shadow-sm font-bold"
                      : "border-slate-200 bg-white text-slate-550 hover:border-slate-350 hover:text-slate-800"
                  }`}
                >
                  {d.premium && (
                    <RiVipCrownFill size={10} className="absolute top-1.5 right-1.5 text-amber-500" />
                  )}
                  <span className="text-xs">{d.label}</span>
                  <span className="text-[9px] text-slate-400 font-normal">{d.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Camera Motion Control */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                <RiCameraLine size={14} className="text-slate-400" />
                3. Camera Motion Level ({motion})
              </label>
              <span className="text-[10px] font-bold text-slate-400">High = Dynamic pan & tilts</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={motion}
              onChange={(e) => setMotion(parseInt(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer h-1.5 bg-slate-150 rounded-lg outline-none"
            />
          </div>

          {/* Action Row */}
          <div className="flex gap-3 pt-3">
            <button
              onClick={handleGenerate}
              disabled={generating || !prompt}
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] py-3.5 text-xs font-bold text-white shadow-lg shadow-purple-200/50 hover:brightness-110 hover:-translate-y-px transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <RiSparklingFill size={14} />
              {generating ? "Simulating Frames..." : "Generate Video"}
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

        {/* RIGHT COLUMN: Video Preview player */}
        <div className="rounded-[28px] border border-slate-200/70 bg-white/95 p-6 md:p-8 shadow-[0_10px_40px_rgba(15,23,42,0.03)] backdrop-blur-xl flex flex-col justify-between min-h-[460px]">
          <div>
            <h3 className="text-sm font-black text-slate-900 tracking-tight leading-none mb-1">Generated Loop Output</h3>
            <p className="text-xs text-slate-400 mb-5">Click Play to verify frame-rate rendering and camera tilts</p>
          </div>

          {/* Custom Styled Video Box */}
          <div className="relative flex-1 rounded-2xl overflow-hidden border border-slate-150 bg-slate-950 flex items-center justify-center select-none aspect-video">
            {generating ? (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 bg-slate-900/80 backdrop-blur-xs">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
                <p className="text-xs font-bold text-white">Rendering frames...</p>
              </div>
            ) : videoUrl ? (
              <div className="relative w-full h-full group flex items-center justify-center">
                <video
                  ref={videoRef}
                  src={videoUrl}
                  loop
                  playsInline
                  onClick={handleTogglePlay}
                  className="w-full h-full object-cover cursor-pointer"
                />

                {/* Overlay Play/Pause overlay buttons */}
                <div
                  onClick={handleTogglePlay}
                  className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <button className="h-14 w-14 rounded-full bg-white/90 text-slate-800 flex items-center justify-center shadow-lg border border-slate-100/50 transform hover:scale-105 active:scale-95 transition-all">
                    {playing ? <RiPauseFill size={22} /> : <RiPlayFill size={22} className="ml-1" />}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 text-center text-slate-400">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-slate-500 shadow-inner">
                  <RiVideoLine size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">No video loop generated yet</p>
                  <p className="text-[10px] text-slate-500 mt-1">Input prompt settings and click Generate</p>
                </div>
              </div>
            )}
          </div>

          <button
            disabled={!videoUrl}
            className="w-full mt-6 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] py-3.5 text-xs font-bold text-white shadow hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all"
          >
            <RiDownloadLine size={14} />
            Download Generated MP4
          </button>
        </div>
      </div>
    </div>
  );
}
