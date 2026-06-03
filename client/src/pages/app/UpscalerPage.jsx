import { useState, useRef, useEffect } from "react";
import {
  RiSparklingFill,
  RiDownloadLine,
  RiRefreshLine,
  RiArrowLeftRightLine,
  RiUploadCloud2Line,
  RiVipCrownFill,
  RiDeleteBin6Line,
  RiHistoryLine,
} from "react-icons/ri";
import { useToast } from "../../context/ToastContext";
import useUpscaler from "../../hooks/useUpscaler";
import { downloadImage } from "../../utils/downloadHelper";
import { useAppContext } from "../../context/app/AppContext";
import LoadingHistory from "../../components/app/LoadingHistory";
import ImageUpscalerHistory from "../../components/app/ImageUpscalerHistory";
import { useAuthContext } from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function UpscalerPage() {
  const [uploadedImage, setUploadedImage] = useState(null); 
  const [targetResolution, setTargetResolution] = useState("1080");
  const [resultImg, setResultImg] = useState("");
  const [sliderPos, setSliderPos] = useState(50);
  const [showHistory, setShowHistory] = useState(false);
  const fileInputRef = useRef(null);

  const { user } = useAuthContext();
  const navigate = useNavigate();
  const isFreePlan = !user || user.plan === "free";

  const { showToast } = useToast();
  const { upscaleImage, isLoading: generating, error, setError } = useUpscaler();
  const { historyByType, isLoading: isHistoryLoading } = useAppContext();

  useEffect(() => {
    if (error) {
      showToast(error, "error", "Upscaling Failed");
      setError("");
    }
  }, [error, showToast, setError]);

  if (isHistoryLoading) {
    return <LoadingHistory />;
  }

  const imageUpscalerHistory = historyByType?.imageUpscaler || [];

  const handleGenerate = async () => {
    if (!uploadedImage) return;
    setResultImg("");

    const result = await upscaleImage({
      type: "imageUpscaler",
      model: "upscale/image",
      provider: "seedvr",
      target_resolution: targetResolutionNum,
      inputImage: uploadedImage.file,
    });

    if (result && result.success) {
      const historyItem = result.data.historyItem;
      const images = historyItem.outputImageUrls || historyItem.imageUrls || [];
      if (images.length > 0) {
        setResultImg(images[0].url);
      }
    }
  };

  const handleReset = () => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage.preview);
    }
    setUploadedImage(null);
    setResultImg("");
    setTargetResolution("1k");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 items-start">
        {/* LEFT COLUMN: Controls */}
        <div className="flex flex-col gap-6 rounded-[28px] border border-slate-200/70 bg-white/95 p-6 md:p-8 shadow-[0_10px_40px_rgba(15,23,42,0.03)] backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-[#f97316] border border-orange-100">
              <RiUploadCloud2Line size={22} />
            </div>
            <div>
              <h2 className="text-[18px] font-black text-slate-900 tracking-tight leading-none flex items-center gap-1.5">
                Super Resolution Upscaler
                {isFreePlan && (
                  <button
                    onClick={() => navigate("/app/billing")}
                    className="cursor-pointer hover:scale-110 active:scale-95 transition-all text-amber-500 shrink-0 flex items-center justify-center p-0.5"
                    title="Premium Feature - Subscribe to unlock"
                  >
                    <RiVipCrownFill size={16} />
                  </button>
                )}
              </h2>
              <p className="text-xs text-slate-400 mt-1.5">Upscale blurry low-res graphics into crisp HD masterpieces</p>
            </div>
          </div>

          {/* Upload Area */}
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-2.5 uppercase tracking-wide">1. Upload Low-Res Graphic</label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) => {
                const files = Array.from(e.target.files);
                if (files.length === 0) return;
                const file = files[0];
                setUploadedImage({
                  file,
                  preview: URL.createObjectURL(file),
                });
                setResultImg("");
              }}
              className="hidden"
            />
            {uploadedImage ? (
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 group aspect-video bg-slate-55 flex items-center justify-center">
                <img src={uploadedImage.preview} alt="Source" className="h-full w-full object-cover blur-[1.5px]" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all">
                  <button
                    onClick={() => {
                      URL.revokeObjectURL(uploadedImage.preview);
                      setUploadedImage(null);
                      setResultImg("");
                    }}
                    className="px-4 py-2 bg-red-655 bg-red-500 hover:bg-red-800 text-white font-bold text-xs rounded-xl shadow cursor-pointer transition-all"
                  >
                    Remove Photo
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
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

          {/* Upscale Target Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">2. Upscale Target</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "1080", label: "1K Resolution", desc: "Standard HD", premium: false },
                { id: "1440", label: "2K Resolution", desc: "QHD Quality", premium: true },
                { id: "2160", label: "4K Resolution", desc: "Ultra HD Detail", premium: true },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setTargetResolution(s.id)}
                  className={`flex flex-col items-center justify-center gap-1 rounded-2xl border py-3 transition-all cursor-pointer relative ${
                    targetResolution === s.id
                      ? "border-orange-500 bg-orange-50/20 text-[#ea580c] shadow-sm font-bold"
                      : "border-slate-200 bg-white text-slate-550 hover:border-slate-350 hover:text-slate-800"
                  }`}
                >
                  <span className="text-xs">{s.label}</span>
                  <span className="text-[9px] text-slate-400 font-normal">{s.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-3">
            <button
              onClick={handleGenerate}
              disabled={generating || !uploadedImage}
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

        {/* RIGHT COLUMN: Output Preview & History */}
        <div className="flex flex-col gap-6">
          {/* Comparison Split Slider Card */}
          <div className="rounded-[28px] border border-slate-200/70 bg-white/95 p-6 md:p-8 shadow-[0_10px_40px_rgba(15,23,42,0.03)] backdrop-blur-xl flex flex-col gap-5">
            <div>
              <h3 className="text-sm font-black text-slate-900 tracking-tight leading-none mb-1">Interactive Quality Compare</h3>
              <p className="text-xs text-slate-400 mb-5">Move slider to view high-frequency upscaled details</p>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-slate-150 shadow-inner bg-slate-55 flex items-center justify-center select-none aspect-video">
              {generating ? (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 bg-white/70 backdrop-blur-xs rounded-2xl">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
                  <p className="text-xs font-bold text-slate-550">Injecting detail pixels...</p>
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
                    <img src={uploadedImage?.preview} alt="Original Blurry" className="absolute inset-0 w-full h-full object-cover max-w-none filter blur-[1.5px]" style={{ width: "100%", height: "100%" }} />
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

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  setResultImg("");
                }}
                disabled={!resultImg}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-3.5 text-xs font-semibold text-slate-600 shadow-sm hover:border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all"
              >
                <RiDeleteBin6Line size={14} />
                Clear
              </button>
              <button
                disabled={!resultImg}
                onClick={() => downloadImage(resultImg, "lumora-upscale.jpg")}
                className="flex-[2] flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 py-3.5 text-xs font-bold text-white shadow shadow-orange-200/50 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all"
              >
                <RiDownloadLine size={14} />
                Download Result
              </button>
            </div>
          </div>

          {/* History Card */}
          <div className="rounded-[28px] border border-slate-200/70 bg-white/95 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.04)] backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-[17px] font-bold tracking-tight text-slate-900">
                  History
                </h3>
                <p className="mt-0.5 text-xs text-slate-400">
                  Your recently upscaled images
                </p>
              </div>

              <button
                onClick={() => setShowHistory(true)}
                className="text-xs font-semibold text-orange-600 transition-colors hover:text-orange-700 cursor-pointer"
              >
                View All
              </button>
            </div>

            {imageUpscalerHistory.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-12">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-100">
                  <RiHistoryLine size={24} className="text-slate-400" />
                </div>
                <p className="text-sm font-semibold text-slate-500">
                  No images upscaled yet
                </p>
                <p className="text-xs text-slate-400">
                  Your upscaled images will appear here
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {imageUpscalerHistory.slice(0, 5).map((item, i) => {
                  const itemImages = item.outputImageUrls || item.imageUrls || [];
                  const firstImageUrl = itemImages[0]?.url || "";
                  const sourceUrl = item.inputImageUrls?.[0]?.url || "";
                  return (
                    <button
                      key={item._id || i}
                      onClick={() => {
                        setResultImg(firstImageUrl);
                        setUploadedImage({
                          file: null,
                          preview: sourceUrl,
                        });
                      }}
                      className="group relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg cursor-pointer"
                    >
                      <img
                        src={firstImageUrl}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadImage(
                            firstImageUrl,
                            `lumora-upscale-${item._id}.jpg`,
                          );
                        }}
                        className="absolute right-2 bottom-2 flex h-7 w-7 items-center justify-center rounded-xl bg-white/95 opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 hover:bg-orange-500 hover:text-white"
                      >
                        <RiDownloadLine
                          size={13}
                          className="text-slate-700 hover:text-inherit"
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {showHistory && (
        <ImageUpscalerHistory
          onClose={() => setShowHistory(false)}
          onSelect={(urls, selectedUrl) => {
            setResultImg(selectedUrl || (urls.length > 0 ? urls[0] : ""));
          }}
        />
      )}
    </div>
  );
}
