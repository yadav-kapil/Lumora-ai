import { useState, useRef, useEffect } from "react";
import {
  RiSparklingFill,
  RiImageAddLine,
  RiDownloadLine,
  RiRefreshLine,
  RiCloseLine,
  RiArrowDownSLine,
  RiVipCrownFill,
  RiDeleteBin6Line,
  RiHistoryLine,
} from "react-icons/ri";
import { useAuthContext } from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { MODELS } from "../../data/imageToImageData";
import { useToast } from "../../context/ToastContext";
import useImageToImage from "../../hooks/useImageToImage";
import { downloadImage } from "../../utils/downloadHelper";
import { useAppContext } from "../../context/app/AppContext";
import LoadingHistory from "../../components/app/LoadingHistory";
import ImageToImageHistory from "../../components/app/ImageToImageHistory";

export default function ImageToImagePage() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const isFreePlan = !user || user.plan === "free";

  const {
    generateImage,
    isLoading: generating,
    error,
    setError,
  } = useImageToImage();

  const { historyByType, isLoading: isHistoryLoading } = useAppContext();
  const [showHistory, setShowHistory] = useState(false);

  const [uploadedImages, setUploadedImages] = useState([]); // Array of { id, file, preview }
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [prompt, setPrompt] = useState(
    "Make the background snowy and add vintage lighting.",
  );
  const [strength, setStrength] = useState(0.65);
  const [resultImg, setResultImg] = useState("");
  const [resultImgs, setResultImgs] = useState([]);
  const [quality, setQuality] = useState("normal");
  const [numberOfImages, setNumberOfImages] = useState(1);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (error) {
      showToast(error, "error", "Generation Failed");
      setError("");
    }
  }, [error, showToast, setError]);

  if (isHistoryLoading) {
    return <LoadingHistory />;
  }

  const imageToImageHistory = historyByType?.imageToImage || [];

  const handleGenerate = async () => {
    if (isFreePlan) {
      showToast(
        "This is a premium feature, upgrade to Pro",
        "alert",
        "Premium Feature",
      );
      return;
    }
    if (uploadedImages.length === 0) return;
    setResultImg("");
    setResultImgs([]);

    const result = await generateImage({
      type: "imageToImage",
      prompt,
      model: selectedModel.model,
      provider: selectedModel.provider,
      strength,
      quality,
      numberOfImages,
      inputImages: uploadedImages.map((img) => img.file),
    });

    if (result && result.success) {
      const historyItem = result.data.historyItem;
      const images = historyItem.outputImageUrls || historyItem.imageUrls || [];
      if (images.length > 0) {
        const urls = images.map((img) => img.url);
        setResultImgs(urls);
        setResultImg(urls[0]);
      }
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 items-start">
        {/* LEFT COLUMN: Controls */}
        <div className="flex flex-col gap-6 rounded-[28px] border border-slate-200/70 bg-white/95 p-6 md:p-8 shadow-[0_10px_40px_rgba(15,23,42,0.03)] backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100">
              <RiImageAddLine size={22} />
            </div>
            <div>
              <h2 className="text-[18px] font-black text-slate-900 tracking-tight leading-none flex items-center gap-1.5">
                Image to Image
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
              <p className="text-xs text-slate-400 mt-1.5">
                Modify structure, style, and details of existing photos
              </p>
            </div>
          </div>

          {/* Model Selection Dropdown */}
          <div className="relative">
            <label className="block text-xs font-bold text-slate-500 mb-2.5 uppercase tracking-wide">
              Model
            </label>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50/50 p-4 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer text-left"
            >
              <div className="flex flex-col">
                <span className="text-xs font-black text-slate-800">
                  {selectedModel.name}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold mt-0.5">
                  {selectedModel.description}
                </span>
              </div>
              <RiArrowDownSLine
                size={18}
                className={`text-slate-450 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 right-0 z-40 mt-2 rounded-2xl border border-slate-100 bg-white p-2.5 shadow-xl">
                {MODELS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setSelectedModel(m);
                      setDropdownOpen(false);
                      if (uploadedImages.length > m.maxImages) {
                        const toTrim = uploadedImages.slice(m.maxImages);
                        toTrim.forEach((img) =>
                          URL.revokeObjectURL(img.preview),
                        );
                        setUploadedImages((prev) => prev.slice(0, m.maxImages));
                      }
                    }}
                    className={`w-full flex flex-col p-3 rounded-xl text-left transition-all cursor-pointer hover:bg-slate-50 ${
                      selectedModel.id === m.id ? "bg-slate-50" : ""
                    }`}
                  >
                    <span className="text-xs font-black text-slate-800">
                      {m.name}
                    </span>
                    <span className="text-[10px] text-slate-455 mt-1">
                      {m.description}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Step 1: Upload Images */}
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-2.5 uppercase tracking-wide">
              Upload Source Images
            </label>
            <input
              type="file"
              multiple={selectedModel.maxImages > 1}
              accept="image/*"
              ref={fileInputRef}
              disabled={uploadedImages.length >= selectedModel.maxImages}
              onChange={(e) => {
                const files = Array.from(e.target.files);
                if (files.length === 0) return;

                const remainingSlots =
                  selectedModel.maxImages - uploadedImages.length;
                if (remainingSlots <= 0) return;

                const filesToUpload = files.slice(0, remainingSlots);
                const newImages = filesToUpload.map((file) => ({
                  id: Math.random().toString(36).substr(2, 9),
                  file,
                  preview: URL.createObjectURL(file),
                }));
                setUploadedImages((prev) => [...prev, ...newImages]);
                setResultImg("");
                setResultImgs([]);
              }}
              className="hidden"
            />
            <div
              onClick={() => {
                if (uploadedImages.length < selectedModel.maxImages) {
                  fileInputRef.current?.click();
                }
              }}
              className={`border-2 border-dashed border-slate-200/80 rounded-2xl p-6 text-center hover:border-blue-400 hover:bg-blue-50/20 transition-all cursor-pointer bg-slate-50/30 flex flex-col items-center justify-center gap-3 min-h-[140px] ${
                uploadedImages.length >= selectedModel.maxImages
                  ? "opacity-50 cursor-not-allowed pointer-events-none"
                  : ""
              }`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-150 text-slate-500 shadow-inner">
                <RiImageAddLine size={22} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-700">
                  {uploadedImages.length >= selectedModel.maxImages
                    ? "Image limit reached"
                    : "Click to upload images"}
                </p>
                <p className="text-[10px] text-slate-400 mt-1">
                  {selectedModel.maxImages === 1
                    ? "This model supports exactly 1 source image."
                    : `Supports up to ${selectedModel.maxImages} source images.`}
                </p>
              </div>
            </div>

            {/* Thumbnail Preview Row */}
            {uploadedImages.length > 0 && (
              <div className="mt-4 grid grid-cols-4 gap-2.5">
                {uploadedImages.map((img) => (
                  <div
                    key={img.id}
                    className="group relative aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-50 shadow-xs"
                  >
                    <img
                      src={img.preview}
                      alt="Upload Preview"
                      className="h-full w-full object-cover"
                    />
                    {/* Hover Overlay with cross corner */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          URL.revokeObjectURL(img.preview);
                          setUploadedImages((prev) =>
                            prev.filter((item) => item.id !== img.id),
                          );
                        }}
                        className="absolute top-1 right-1 flex h-5.5 w-5.5 items-center justify-center rounded-full bg-red-500 hover:bg-red-650 text-white cursor-pointer transition-all shadow-md hover:scale-105"
                      >
                        <RiCloseLine size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Step 2: Prompt */}
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-2.5 uppercase tracking-wide">
              Describe Changes
            </label>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3 focus-within:bg-white focus-within:border-blue-300 transition-all">
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
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                Image Strength ({Math.round(strength * 100)}%)
              </label>
              <span className="text-[10px] font-bold text-slate-400">
                Low = More creative freedom
              </span>
            </div>
            <input
              type="range"
              min="0.0"
              max="1.0"
              step="0.05"
              value={strength}
              onChange={(e) => setStrength(parseFloat(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-150 rounded-lg outline-none"
            />
          </div>

          {/* Step 4: Resolution */}
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-2.5 uppercase tracking-wide">
              Resolution
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["normal", "hd", "ultra"].map((res) => (
                <button
                  key={res}
                  type="button"
                  onClick={() => setQuality(res)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] capitalize ${
                    quality === res
                      ? "border-blue-500 bg-blue-50 text-blue-600 shadow-sm font-black"
                      : "border-slate-200 bg-white text-slate-650 hover:border-slate-350 hover:bg-slate-50"
                  }`}
                >
                  {res === "normal" ? "standard" : res}
                </button>
              ))}
            </div>
          </div>

          {/* Step 5: Number of Images */}
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-2.5 uppercase tracking-wide">
              Number of Images
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 4].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setNumberOfImages(count)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
                    numberOfImages === count
                      ? "border-blue-500 bg-blue-50 text-blue-600 shadow-sm font-black"
                      : "border-slate-200 bg-white text-slate-650 hover:border-slate-350 hover:bg-slate-50"
                  }`}
                >
                  {count} {count === 1 ? "Image" : "Images"}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-3">
            <button
              onClick={handleGenerate}
              disabled={generating || uploadedImages.length === 0}
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 py-3.5 text-xs font-bold text-white shadow-lg shadow-blue-200/50 hover:brightness-115 hover:-translate-y-px transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <RiSparklingFill size={14} />
              {generating ? "Transforming..." : "Generate Variant"}
            </button>
            <button
              onClick={() => {
                uploadedImages.forEach((img) =>
                  URL.revokeObjectURL(img.preview),
                );
                setUploadedImages([]);
                setResultImg("");
                setResultImgs([]);
                setPrompt(
                  "Make the background snowy and add vintage lighting.",
                );
                setStrength(0.65);
                setQuality("normal");
                setNumberOfImages(1);
                setDropdownOpen(false);
              }}
              className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-xs font-bold text-slate-650 hover:bg-slate-50 cursor-pointer transition-all shadow-sm"
            >
              <RiRefreshLine size={14} />
              Reset
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Output Preview & History */}
        <div className="flex flex-col gap-6">
          {/* Preview Card */}
          <div className="rounded-[28px] border border-slate-200/70 bg-white/95 p-6 md:p-8 shadow-[0_10px_40px_rgba(15,23,42,0.03)] backdrop-blur-xl flex flex-col gap-5">
            <div>
              <h3 className="text-sm font-black text-slate-900 tracking-tight leading-none mb-1">
                Output Preview
              </h3>
              <p className="text-xs text-slate-400 mb-5">
                Preview of the transformed output image
              </p>
            </div>

            <div className="relative flex h-[420px] w-full items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-5 select-none transition-all duration-300">
              {generating ? (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 bg-white/70 backdrop-blur-xs rounded-3xl">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
                  <p className="text-xs font-semibold text-slate-555">
                    Generating variant...
                  </p>
                </div>
              ) : resultImg ? (
                <div className="relative max-h-full max-w-full overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)] transition-all duration-300 flex items-center justify-center animate-fade-in">
                  <img
                    src={resultImg}
                    alt="Generated Output"
                    className="max-h-[380px] w-auto max-w-full object-contain rounded-[24px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-md">
                    <RiSparklingFill size={10} className="text-blue-400" />
                    <span className="text-[10px] font-semibold tracking-wide text-white">
                      AI GENERATED
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100/80 shadow-inner">
                    <RiImageAddLine size={28} className="text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-650">
                      No output image loaded
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Upload source images and click Generate
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnails Navigation for Multiple Images */}
            {resultImgs.length > 1 && (
              <div className="mt-4 flex justify-center gap-2 flex-wrap">
                {resultImgs.map((url, idx) => (
                  <button
                    key={url || idx}
                    onClick={() => setResultImg(url)}
                    className={`h-11 w-11 overflow-hidden rounded-xl border-2 transition-all cursor-pointer ${
                      resultImg === url
                        ? "border-blue-500 scale-105 shadow-md shadow-blue-100"
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

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  setResultImg("");
                  setResultImgs([]);
                }}
                disabled={!resultImg}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-3.5 text-xs font-semibold text-slate-600 shadow-sm hover:border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all"
              >
                <RiDeleteBin6Line size={14} />
                Clear
              </button>
              <button
                disabled={!resultImg}
                onClick={() =>
                  downloadImage(resultImg, "lumora-image-to-image.jpg")
                }
                className="flex-[2] flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 py-3.5 text-xs font-bold text-white shadow shadow-blue-200/50 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all"
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
                  Your recently generated images
                </p>
              </div>

              <button
                onClick={() => setShowHistory(true)}
                className="text-xs font-semibold text-blue-600 transition-colors hover:text-blue-700 cursor-pointer"
              >
                View All
              </button>
            </div>

            {imageToImageHistory.length === 0 ? (
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
                {imageToImageHistory.slice(0, 5).map((item, i) => {
                  const itemImages = item.outputImageUrls || item.imageUrls || [];
                  const firstImageUrl = itemImages[0]?.url || "";
                  return (
                    <button
                      key={item._id || i}
                      onClick={() => {
                        const urls = itemImages.map((img) => img.url);
                        setResultImgs(urls);
                        setResultImg(urls[0]);
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
                        className="absolute right-2 bottom-2 flex h-7 w-7 items-center justify-center rounded-xl bg-white/95 opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 hover:bg-blue-500 hover:text-white"
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

      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
      {showHistory && (
        <ImageToImageHistory
          onClose={() => setShowHistory(false)}
          onSelect={(urls, selectedUrl) => {
            setResultImgs(urls);
            setResultImg(selectedUrl || (urls.length > 0 ? urls[0] : ""));
          }}
        />
      )}
    </div>
  );
}
