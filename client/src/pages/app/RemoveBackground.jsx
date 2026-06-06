import { useState, useRef, useEffect } from "react";
import {
  RiSparklingFill,
  RiDownloadLine,
  RiRefreshLine,
  RiUploadCloud2Line,
  RiDeleteBin6Line,
  RiEraserLine,
  RiHeartFill,
  RiHeartLine,
  RiAddLine,
} from "react-icons/ri";
import AddToCollectionModal from "../../components/app/AddToCollectionModal";
import { useToast } from "../../context/ToastContext";
import useRemoveBG from "../../hooks/useRemoveBG";
import { downloadImage } from "../../utils/downloadHelper";
import { useAppContext } from "../../context/app/AppContext";
import useLibrary from "../../hooks/useLibrary";

export default function RemoveBackground() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [resultImg, setResultImg] = useState("");
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const fileInputRef = useRef(null);

  const { showToast } = useToast();
  const { removeBG, isLoading: generating, error, setError } = useRemoveBG();
  const { historyByType, isLoading: isHistoryLoading, fullHistory } = useAppContext();
  const { markFavourite } = useLibrary();

  const currentGenItem = (fullHistory || []).find((item) =>
    (item.outputImageUrls || item.imageUrls || []).some((img) => img.url === resultImg)
  );
  const isFav = currentGenItem
    ? (currentGenItem.outputImageUrls || currentGenItem.imageUrls || []).find((img) => img.url === resultImg)?.isFavourite || false
    : false;

  const handleToggleFavorite = async () => {
    if (!resultImg || !currentGenItem) return;
    const newFavState = !isFav;
    const result = await markFavourite({
      generationId: currentGenItem._id,
      imageUrl: resultImg,
      isFavourite: newFavState,
    });
    if (result.success) {
      showToast(
        newFavState ? "Added to your favorites." : "Removed from your favorites.",
        "success",
        newFavState ? "Marked as Favorite" : "Removed Favorite"
      );
    } else {
      showToast(result.message, "error", "Favorite Update Failed");
    }
  };

  useEffect(() => {
    if (error) {
      showToast(error, "error", "BG Removal Failed");
      setError("");
    }
  }, [error, showToast, setError]);

  const handleGenerate = async () => {
    if (!uploadedImage) return;
    setResultImg("");

    const result = await removeBG({
      type: "removeBG",
      model: "background/remove",
      provider: "bria",
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
    if (uploadedImage && uploadedImage.preview && uploadedImage.preview.startsWith("blob:")) {
      URL.revokeObjectURL(uploadedImage.preview);
    }
    setUploadedImage(null);
    setResultImg("");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 items-start">
        {/* LEFT COLUMN: Controls */}
        <div className="flex flex-col gap-6 rounded-[28px] border border-slate-100 bg-white/80 p-6 md:p-8 shadow-[0_20px_50px_rgba(99,102,241,0.02)] backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-650 border border-indigo-100">
              <RiEraserLine size={22} />
            </div>
            <div>
              <h2 className="text-[18px] font-black text-slate-900 tracking-tight leading-none">
                AI Background Remover
              </h2>
              <p className="text-xs text-slate-400 mt-1.5">Extract subjects and remove backgrounds instantly with AI</p>
            </div>
          </div>

          {/* Upload Area */}
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-2.5 uppercase tracking-wide">1. Upload Image</label>
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
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 group aspect-video bg-slate-50 flex items-center justify-center shadow-inner">
                <img src={uploadedImage.preview} alt="Source" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-slate-950/40 opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                  <button
                    onClick={() => {
                      if (uploadedImage.preview && uploadedImage.preview.startsWith("blob:")) {
                        URL.revokeObjectURL(uploadedImage.preview);
                      }
                      setUploadedImage(null);
                      setResultImg("");
                    }}
                    className="px-4.5 py-2 bg-red-500 hover:bg-red-800 active:scale-95 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-200/20 cursor-pointer transition-all flex items-center gap-1.5"
                  >
                    <RiDeleteBin6Line size={13} />
                    Remove Photo
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-200/85 rounded-2xl p-8 text-center hover:border-indigo-400/85 hover:bg-indigo-50/10 hover:shadow-[0_8px_30px_rgba(99,102,241,0.02)] transition-all duration-300 cursor-pointer bg-slate-50/30 flex flex-col items-center justify-center gap-3 min-h-[180px] group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-400 border border-slate-100 group-hover:text-indigo-500 group-hover:border-indigo-200 group-hover:bg-indigo-50/50 shadow-sm transition-all duration-300">
                  <RiUploadCloud2Line size={22} className="group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-700 group-hover:text-slate-800 transition-colors">Click to upload image</p>
                  <p className="text-[10px] text-slate-400 mt-1">Supports PNG, JPG up to 8MB</p>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-3">
            <button
              onClick={handleGenerate}
              disabled={generating || !uploadedImage || !uploadedImage.file}
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 py-3.5 text-xs font-bold text-white shadow-lg shadow-indigo-200/50 hover:brightness-110 hover:-translate-y-px transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <RiSparklingFill size={14} />
              {generating ? "Removing..." : "Remove BG"}
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

        {/* RIGHT COLUMN: Output Preview */}
        <div className="flex flex-col gap-6">
          <div className="rounded-[28px] border border-slate-100 bg-white/80 p-6 md:p-8 shadow-[0_20px_50px_rgba(99,102,241,0.02)] backdrop-blur-xl flex flex-col gap-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-black text-slate-900 tracking-tight leading-none mb-1">Subject Extract Preview</h3>
                <p className="text-xs text-slate-400 mb-5">Inspect transparent subject details and download</p>
              </div>

              {resultImg && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleToggleFavorite}
                    className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-rose-500 hover:border-slate-300 hover:shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    title={isFav ? "Remove from Favorites" : "Add to Favorites"}
                  >
                    {isFav ? (
                      <RiHeartFill
                        size={14}
                        className="text-rose-500 animate-[bounce_0.3s_ease-out]"
                      />
                    ) : (
                      <RiHeartLine size={14} />
                    )}
                  </button>
                  {currentGenItem && (
                    <button
                      onClick={() => setShowCollectionModal(true)}
                      className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-emerald-500 hover:border-slate-300 hover:shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      title="Add to Collection"
                    >
                      <RiAddLine size={16} />
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50/50 shadow-inner flex items-center justify-center select-none aspect-video bg-checkerboard">
              {generating ? (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 bg-white/80 backdrop-blur-xs rounded-2xl">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent shadow-[0_0_15px_rgba(99,102,241,0.2)]" />
                  <p className="text-xs font-bold text-slate-600">Extracting subject pixels...</p>
                </div>
              ) : resultImg ? (
                <div className="relative w-full h-full flex items-center justify-center p-2">
                  <img src={resultImg} alt="BG Removed Subject" className="max-h-full max-w-full object-contain pointer-events-none drop-shadow-md animate-[fadeIn_0.3s_ease-out]" />
                  
                  {/* AI Generated Overlay + Favorite Button */}
                  <div className="absolute top-3 left-3 z-20">
                    <div className="flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-md">
                      <RiSparklingFill size={10} className="text-indigo-400" />
                      <span className="text-[10px] font-semibold tracking-wide text-white">
                        AI GENERATED
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 text-center p-6 bg-white/60 w-full h-full backdrop-blur-xs">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-500 border border-indigo-100 shadow-[0_8px_20px_rgba(99,102,241,0.06)] animate-pulse">
                    <RiEraserLine size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700">Awaiting Subject Extraction</p>
                    <p className="text-xs text-slate-400 mt-1 max-w-[280px]">Upload an image and hit Remove BG to isolate the subject</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setResultImg("")}
                disabled={!resultImg}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-3.5 text-xs font-semibold text-slate-600 shadow-sm hover:border-slate-350 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all"
              >
                <RiDeleteBin6Line size={14} />
                Clear
              </button>
              <button
                disabled={!resultImg}
                onClick={() => downloadImage(resultImg, "lumora-subject-removed.png")}
                className="flex-[2] flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 py-3.5 text-xs font-bold text-white shadow shadow-indigo-200/50 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all"
              >
                <RiDownloadLine size={14} />
                Download PNG
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .bg-checkerboard {
          background-color: #ffffff;
          background-image: linear-gradient(45deg, #f1f5f9 25%, transparent 25%), linear-gradient(-45deg, #f1f5f9 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f1f5f9 75%), linear-gradient(-45deg, transparent 75%, #f1f5f9 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
      {(() => {
        const activeImgObj = currentGenItem
          ? [...(currentGenItem.inputImageUrls || []), ...(currentGenItem.outputImageUrls || [])].find((img) => img.url === resultImg)
          : null;
        const imageId = activeImgObj?._id;

        return showCollectionModal && currentGenItem && (
          <AddToCollectionModal
            generationId={currentGenItem._id}
            imageUrl={resultImg}
            imageId={imageId}
            onClose={() => setShowCollectionModal(false)}
          />
        );
      })()}
    </div>
  );
}
