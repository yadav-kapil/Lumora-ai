import { useState, useEffect } from "react";
import {
  RiArrowLeftLine,
  RiHeartFill,
  RiHeartLine,
  RiDownloadLine,
  RiFolderLine,
  RiImageLine,
  RiMore2Fill,
  RiDeleteBin6Line,
} from "react-icons/ri";
import { useAppContext } from "../../context/app/AppContext";
import { useToast } from "../../context/ToastContext";
import useLibrary from "../../hooks/useLibrary";
import { downloadImage } from "../../utils/downloadHelper";

export default function CollectionFolder({ collection, onBack }) {
  const { fullHistory } = useAppContext();
  const { showToast } = useToast();
  const { markFavourite, removeFromCollection } = useLibrary();

  
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);

  
  const [removeConfirmId, setRemoveConfirmId] = useState(null);

  
  useEffect(() => {
    const handleOutsideClick = () => setActiveMenuIndex(null);
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  
  const getImgDetails = (item) => {
    const gen = item.generationId;
    const genId = gen?._id || gen;

    
    const globalGen = (fullHistory || []).find((h) => h._id === genId);
    const activeGen = globalGen || gen;

    if (!activeGen) return { url: "", isFavourite: false, prompt: "", genId };

    const allImages = [...(activeGen.inputImageUrls || []), ...(activeGen.outputImageUrls || [])];
    const imageObj = allImages.find((img) => img._id?.toString() === item.imageId?.toString());

    return {
      url: imageObj?.url || "",
      isFavourite: imageObj?.isFavourite || false,
      prompt: activeGen.prompt || "",
      genId,
    };
  };

  const handleToggleFavorite = async (e, genId, imageUrl, isFav) => {
    e.stopPropagation();
    const newFavState = !isFav;

    const result = await markFavourite({
      generationId: genId,
      imageUrl: imageUrl,
      isFavourite: newFavState,
    });

    if (result && result.success) {
      showToast(
        newFavState ? "Added to your favorites." : "Removed from your favorites.",
        "success",
        newFavState ? "Marked as Favorite" : "Removed Favorite"
      );
    } else {
      showToast(result.message || "Failed to update favorite status", "error", "Operation Failed");
    }
  };

  const handleDownload = (e, imageUrl, index) => {
    e.stopPropagation();
    downloadImage(imageUrl, `collection-${collection.collectionName.toLowerCase()}-${index}.jpg`);
  };

  const handleRemoveFromCollection = (e, imageId) => {
    e.stopPropagation();
    setActiveMenuIndex(null);
    setRemoveConfirmId(imageId);
  };

  const confirmRemove = async (imageId) => {
    const result = await removeFromCollection(collection._id, imageId);
    if (result && result.success) {
      showToast("Image removed from collection.", "success", "Removed from Collection");
    } else {
      showToast(result.message || "Failed to remove image", "error", "Operation Failed");
    }
  };

  return (
    <div className="flex flex-col animate-[fadeIn_0.2s_ease-out]">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex w-fit items-center gap-2 mb-6 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer group active:scale-95 shrink-0"
      >
        <RiArrowLeftLine size={16} className="group-hover:-translate-x-0.5 transition-transform" />
        Back to Collections
      </button>

      {/* Header */}
      <div className="flex items-center gap-4 pb-5 border-b border-slate-100 mb-8">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
          <RiFolderLine size={24} />
        </div>
        <div>
          <h2 className="text-[22px] font-black text-slate-900 tracking-tight leading-none">
            {collection.collectionName}
          </h2>
          <p className="mt-2 text-xs font-semibold text-slate-400">
            {collection.imagesList?.length || 0} images in this collection
          </p>
        </div>
      </div>

      {/* Grid Content */}
      {!collection.imagesList || collection.imagesList.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-24 border border-dashed border-slate-200 rounded-[24px] bg-slate-55/20">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-450 shadow-inner">
            <RiImageLine size={28} />
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-slate-700">This collection is empty</p>
            <p className="mt-1.5 text-xs text-slate-400">Add images to this folder from the generation page previews.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {collection.imagesList.map((item, index) => {
            const details = getImgDetails(item);
            if (!details.url) return null;

            return (
              <div
                key={`${details.genId}_${index}`}
                className="group relative aspect-square overflow-hidden rounded-[24px] border border-slate-150 bg-slate-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <img
                  src={details.url}
                  alt={details.prompt}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Prompt Tooltip */}
                <div className="absolute inset-x-0 top-0 p-3 bg-gradient-to-b from-black/75 to-transparent text-[11px] font-semibold text-white/90 opacity-0 group-hover:opacity-100 pointer-events-none line-clamp-2">
                  {details.prompt}
                </div>

                {/* Action Popover Trigger Button */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenuIndex(activeMenuIndex === index ? null : index);
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-slate-700 hover:text-slate-900 shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    title="Actions"
                  >
                    <RiMore2Fill size={16} />
                  </button>

                  {/* Dropdown Options Popup */}
                  {activeMenuIndex === index && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-0 top-full mt-1.5 z-20 w-36 rounded-xl border border-slate-100 bg-white py-1 shadow-lg shadow-slate-200/50 animate-[slideIn_0.15s_ease-out]"
                    >
                      {/* Toggle Favorite Option */}
                      <button
                        onClick={(e) => {
                          setActiveMenuIndex(null);
                          handleToggleFavorite(e, details.genId, details.url, details.isFavourite);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-1.5 text-[11px] font-bold text-slate-650 hover:bg-slate-50 transition-all text-left"
                      >
                        {details.isFavourite ? (
                          <>
                            <RiHeartFill size={13} className="text-rose-500" />
                            Unfavorite
                          </>
                        ) : (
                          <>
                            <RiHeartLine size={13} className="text-slate-400" />
                            Favorite
                          </>
                        )}
                      </button>

                      {/* Download Option */}
                      <button
                        onClick={(e) => {
                          setActiveMenuIndex(null);
                          handleDownload(e, details.url, index);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-1.5 text-[11px] font-bold text-slate-650 hover:bg-slate-50 transition-all text-left"
                      >
                        <RiDownloadLine size={13} className="text-slate-400" />
                        Download
                      </button>

                      {/* Remove Option */}
                      <button
                        onClick={(e) => handleRemoveFromCollection(e, item.imageId)}
                        className="flex w-full items-center gap-2 px-3 py-1.5 text-[11px] font-bold text-red-500 hover:bg-red-50 transition-all text-left border-t border-slate-50"
                      >
                        <RiDeleteBin6Line size={13} className="text-red-400" />
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from {
            transform: scale(0.97) translateY(4px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.95) translateY(12px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
      `}</style>

      {/* Custom remove confirmation dialog */}
      {removeConfirmId && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-[4px] animate-[fadeIn_0.2s_ease-out]">
          <div className="relative flex w-full max-w-sm flex-col rounded-[24px] bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.15)] border border-slate-100 animate-[scaleIn_0.2s_cubic-bezier(0.16,1,0.3,1)]">
            <h3 className="text-sm font-black text-slate-800 tracking-tight">Remove Image</h3>
            <p className="mt-2 text-xs font-semibold text-slate-450 leading-relaxed">
              Are you sure you want to remove this image from the collection?
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setRemoveConfirmId(null)}
                className="flex-1 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-650 hover:bg-slate-50 cursor-pointer transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const targetId = removeConfirmId;
                  setRemoveConfirmId(null);
                  confirmRemove(targetId);
                }}
                className="flex-1 h-9 flex items-center justify-center rounded-xl bg-gradient-to-r from-red-650 to-red-500 text-xs font-bold text-white shadow-md shadow-red-200/50 hover:brightness-105 active:scale-[0.99] cursor-pointer transition-all"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
