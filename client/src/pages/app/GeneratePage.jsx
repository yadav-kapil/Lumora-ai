import { useState, useEffect } from "react";
import {
  RiSparklingFill,
  RiVipCrownFill,
  RiCheckLine,
  RiArrowDownSLine,
  RiRefreshLine,
  RiDownloadLine,
  RiHistoryLine,
  RiImageAddLine,
  RiDeleteBin6Line,
  RiCoinLine,
} from "react-icons/ri";
import {
  STYLES,
  SIZES,
  MODELS,
  RESOLUTIONS,
  IMAGE_COUNTS,
  generationCost,
} from "../../data/generateData";
import History from "../../components/app/History";
import Dropdown from "../../components/app/Dropdown";
import useTextToImage from "../../hooks/useTextToImage";
import { useAppContext } from "../../context/app/AppContext";
import { useAuthContext } from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import LoadingHistory from "../../components/app/LoadingHistory";
import { useToast } from "../../context/ToastContext";
import { downloadImage } from "../../utils/downloadHelper";

export default function GeneratePage() {
  const [promptObj, setPromptObj] = useState({
    prompt:
      "A cozy workspace with warm sunlight, laptop, plants, and minimal desk setup.",
    style: "realistic",
    size: "landscape",
    model: "pexels",
    provider: "stock",
    quality: "normal",
    numberOfImages: 1,
  });

  const [showHistory, setShowHistory] = useState(false);
  const [previewImg, setPreviewImg] = useState("");
  const [previewImgs, setPreviewImgs] = useState([]);

  const { user } = useAuthContext();
  const isFreePlan = !user || user.plan === "free";
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { generateImage, isLoading, error, setError } = useTextToImage();

  useEffect(() => {
    if (error) {
      showToast(error, "error", "Generation Failed");
      setError("");
    }
  }, [error, showToast, setError]);
  const { historyByType, isLoading: isHistoryLoading } = useAppContext();

  const providerCost =
    generationCost[promptObj.provider]?.[promptObj.model]?.[promptObj.size]?.[
      promptObj.quality
    ] || 0;
  const currentCost = providerCost * promptObj.numberOfImages;

  if (isHistoryLoading) {
    return <LoadingHistory />;
  }

  const ratio = SIZES.find((s) => s.id === promptObj.size) || SIZES[0];

  const textToImageHistory = historyByType.textToImage;

  const handleClear = () => {
    setPreviewImg("");
    setPreviewImgs([]);
  };

  const handleReset = () => {
    setPromptObj({
      prompt: "",
      style: "realistic",
      size: "landscape",
      model: "pexels",
      provider: "stock",
      quality: "normal",
      numberOfImages: 1,
    });
    setPreviewImg("");
    setPreviewImgs([]);
  };

  const handleModelChange = (modelId) => {
    const group = MODELS.find((g) => g.models.some((m) => m.id === modelId));
    const provider = group ? group.provider : "stock";
    setPromptObj((prev) => ({
      ...prev,
      model: modelId,
      provider,
      ...(provider === "stock" ? { quality: "normal" } : {}),
    }));
  };

  const handleGenerate = async () => {
    const result = await generateImage(promptObj);
    if (result && result.success) {
      const historyItem = result.data.historyItem;
      const images = historyItem.outputImageUrls || historyItem.imageUrls || [];
      if (images.length > 0) {
        const urls = images.map((img) => img.url);
        setPreviewImgs(urls);
        setPreviewImg(urls[0]);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 gap-5 bg-slate-50/70 p-3 sm:p-5 lg:grid-cols-2 lg:gap-6 lg:p-6">

      {/* ───────── LEFT ───────── */}
      <div className="flex flex-col gap-7 rounded-[28px] border border-slate-200/70 bg-white/95 p-7 shadow-[0_10px_40px_rgba(15,23,42,0.04)] backdrop-blur-xl">
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
              value={promptObj.prompt}
              onChange={(e) =>
                setPromptObj((prev) => ({ ...prev, prompt: e.target.value }))
              }
              maxLength={1000}
              rows={4}
              placeholder="Describe your image…"
              className="w-full resize-none bg-transparent text-sm leading-relaxed text-slate-700 placeholder:text-slate-300 outline-none"
            />

            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] text-slate-300">
                {promptObj.prompt.length}/1000
              </span>

              <div className="relative">
                {isFreePlan && (
                  <RiVipCrownFill
                    size={13}
                    className="absolute -top-2 -left-1.5 z-10 -rotate-[28deg] text-amber-400 drop-shadow-sm"
                  />
                )}

                <button
                  onClick={() => {
                    if (isFreePlan) {
                      showToast("This is a premium feature, upgrade to Pro", "alert", "Premium Feature");
                    }
                  }}
                  className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-emerald-300/40 transition-all hover:-translate-y-px hover:brightness-110 cursor-pointer"
                >
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
                onClick={() => {
                  if (s.premium && isFreePlan) {
                    showToast("This is a premium feature, upgrade to Pro", "alert", "Premium Feature");
                    return;
                  }
                  setPromptObj((prev) => ({ ...prev, style: s.id }));
                }}
                className={`group relative shrink-0 overflow-hidden rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                  promptObj.style === s.id
                    ? "border-emerald-500 bg-white shadow-lg shadow-emerald-100"
                    : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                }`}
              >
                {s.premium && isFreePlan && (
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

                {promptObj.style === s.id && (
                  <>
                    <div className="absolute inset-0 bg-emerald-500/10" />
                    <div className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 shadow-sm">
                      <RiCheckLine size={10} className="text-white" />
                    </div>
                  </>
                )}

                <div
                  className={`border-t px-2 py-2 text-center text-[11px] font-semibold ${
                    promptObj.style === s.id
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

          <div className="grid grid-cols-3 lg:grid-cols-3 gap-3">
            {SIZES.map((sz) => {
              const Icon = sz.icon;
              return (
                <button
                  key={sz.id}
                  onClick={() =>
                    setPromptObj((prev) => ({ ...prev, size: sz.id }))
                  }
                  className={`flex flex-col items-center gap-1 rounded-2xl border-2 px-2 py-3 transition-all duration-200 cursor-pointer ${
                    promptObj.size === sz.id
                      ? "border-emerald-500 bg-emerald-50 shadow-md shadow-emerald-100"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <Icon
                    size={22}
                    className={`transition-colors ${
                      promptObj.size === sz.id
                        ? "text-emerald-500"
                        : "text-slate-400"
                    }`}
                  />

                  <span
                    className={`text-[11px] font-semibold ${
                      promptObj.size === sz.id
                        ? "text-emerald-600"
                        : "text-slate-700"
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

        {/* Model */}
        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Model
          </p>
          <Dropdown
            selected={promptObj.model}
            options={MODELS}
            onChange={handleModelChange}
          />
        </div>

        {/* Number of Images + Resolution */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Number of Images
            </p>
            <Dropdown
              selected={promptObj.numberOfImages}
              options={IMAGE_COUNTS}
              onChange={(val) =>
                setPromptObj((prev) => ({ ...prev, numberOfImages: val }))
              }
            />
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Resolution
            </p>

            <div className="flex gap-2">
              {RESOLUTIONS.map((r) => {
                const isStock = promptObj.provider === "stock";
                const isDisabled =
                  isStock && (r.id === "hd" || r.id === "ultra");

                return (
                  <button
                    key={r.id}
                    disabled={isDisabled}
                    onClick={() => {
                      if (r.crown && isFreePlan) {
                        showToast("This is a premium feature, upgrade to Pro", "alert", "Premium Feature");
                        return;
                      }
                      setPromptObj((prev) => ({ ...prev, quality: r.id }));
                    }}
                    className={`relative flex flex-1 items-center justify-center rounded-2xl border-2 py-3 text-xs font-semibold transition-all cursor-pointer ${
                      promptObj.quality === r.id
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    } ${
                      isDisabled
                        ? "opacity-40 cursor-not-allowed pointer-events-none"
                        : ""
                    }`}
                  >
                    {r.crown && isFreePlan && (
                      <RiVipCrownFill
                        size={11}
                        className={`absolute -top-1.5 -left-1.5 -rotate-[25deg] ${
                          isDisabled ? "text-slate-300" : "text-amber-400"
                        }`}
                      />
                    )}
                    {r.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Cost Indicator Banner */}
        <div className="flex items-center justify-between rounded-2xl bg-slate-50 border border-slate-200/50 p-4 shadow-sm shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500 border border-emerald-100/50">
              <RiCoinLine size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">
                Credits Required
              </p>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                Based on model selection and resolution
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-250/30 rounded-xl px-3.5 py-1.5 shadow-sm">
              {currentCost} Credits
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <button
            onClick={handleGenerate}
            disabled={isLoading || !promptObj.prompt.trim()}
            className="relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 py-3.5 text-sm font-bold text-white shadow-xl shadow-emerald-300/40 transition-all hover:-translate-y-px hover:brightness-110 disabled:opacity-80 disabled:cursor-not-allowed cursor-pointer"
          >
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.4s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <RiSparklingFill size={15} />
            {isLoading ? "Generating..." : "Generate Image"}
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 cursor-pointer"
          >
            <RiRefreshLine size={15} />
            Reset
          </button>
        </div>
      </div>

      {/* ───────── RIGHT ───────── */}
      <div className="flex flex-col gap-6">
        {/* Preview Card */}
        <div className="rounded-[28px] border border-slate-200/70 bg-white/95 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.04)] backdrop-blur-xl">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <h3 className="text-[17px] font-bold tracking-tight text-slate-900">
                Preview
              </h3>
              <p className="mt-0.5 text-xs text-slate-400">
                This is your generated image
              </p>
            </div>

            <button className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 cursor-pointer">
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
              {isLoading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-50/50 backdrop-blur-xs">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
                  <p className="text-xs font-semibold text-slate-500">
                    Generating your masterpiece...
                  </p>
                </div>
              ) : previewImg ? (
                <>
                  <img
                    src={previewImg}
                    alt="Preview"
                    className="absolute inset-0 h-full w-full object-cover animate-fade-in"
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

          {/* Thumbnails Navigation for Multiple Images */}
          {previewImgs.length > 1 && (
            <div className="mt-4 flex justify-center gap-2 flex-wrap">
              {previewImgs.map((url, idx) => (
                <button
                  key={url || idx}
                  onClick={() => setPreviewImg(url)}
                  className={`h-11 w-11 overflow-hidden rounded-xl border-2 transition-all cursor-pointer ${
                    previewImg === url
                      ? "border-emerald-500 scale-105 shadow-md shadow-emerald-100"
                      : "border-slate-200/80 opacity-70 hover:opacity-100 hover:border-slate-350"
                  }`}
                >
                  <img
                    src={url}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Action Row - 3 Buttons matching the mockup */}
          <div className="mt-5 flex gap-3">
            <button
              onClick={handleGenerate}
              disabled={isLoading || !promptObj.prompt.trim()}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-3.5 text-xs font-semibold text-slate-600 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <RiRefreshLine size={14} />
              Regenerate
            </button>

            <button
              onClick={handleClear}
              disabled={!previewImg}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-3.5 text-xs font-semibold text-slate-600 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <RiDeleteBin6Line size={14} />
              Clear
            </button>

            <button
              disabled={!previewImg}
              onClick={() => downloadImage(previewImg, "lumora-preview.jpg")}
              className="relative flex-[1.8] flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 py-3.5 text-xs font-bold text-white shadow-xl shadow-emerald-300/40 transition-all hover:-translate-y-px hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.4s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <RiDownloadLine size={14} />
              <span className="max-md:hidden">Download</span>
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
                Your recently generated images
              </p>
            </div>

            <button
              onClick={() => setShowHistory(true)}
              className="text-xs font-semibold text-emerald-600 transition-colors hover:text-emerald-700 cursor-pointer"
            >
              View All
            </button>
          </div>

          {textToImageHistory.length === 0 ? (
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
              {textToImageHistory.slice(0, 5).map((item, i) => {
                const itemImages = item.outputImageUrls || item.imageUrls || [];
                const firstImageUrl = itemImages[0]?.url || "";
                return (
                  <button
                    key={item._id || i}
                    onClick={() => {
                      const urls = itemImages.map((img) => img.url);
                      setPreviewImgs(urls);
                      setPreviewImg(urls[0]);
                      setPromptObj({ ...promptObj, prompt: "" });
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
                          `lumora-generation-${item._id}.jpg`,
                        );
                      }}
                      className="absolute right-2 bottom-2 flex h-7 w-7 items-center justify-center rounded-xl bg-white/95 opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 hover:bg-emerald-500 hover:text-white"
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

      {showHistory && (
        <History
          onClose={() => setShowHistory(false)}
          onSelect={(urls, selectedUrl) => {
            setPreviewImgs(urls);
            setPreviewImg(selectedUrl || (urls.length > 0 ? urls[0] : ""));
          }}
        />
      )}

      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(200%);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
