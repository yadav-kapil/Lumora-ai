import { useState, useEffect } from "react";
import { RiHeartFill, RiHeartLine, RiDownloadLine, RiHistoryLine, RiSparklingFill } from "react-icons/ri";
import { useToast } from "../../context/ToastContext";
import useLibrary from "../../hooks/useLibrary";
import { downloadImage } from "../../utils/downloadHelper";
import { useAuthContext } from "../../context/auth/AuthContext";

export default function FavoritesPage() {
  const [dbHistoryItems, setDbHistoryItems] = useState([]);
  const { showToast } = useToast();
  const { getFavourites, markFavourite, isLoading } = useLibrary();
  const { accessToken } = useAuthContext();

  const fetchFavorites = async () => {
    const result = await getFavourites();
    if (result && result.success) {
      setDbHistoryItems(result.data || []);
    } else {
      showToast(result.message || "Failed to load favorites", "error", "Error Loading");
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchFavorites();
    }
  }, [accessToken]);

  const handleRemove = async (generationId, imageUrl) => {
    const result = await markFavourite({
      generationId,
      imageUrl,
      isFavourite: false,
    });
    if (result && result.success) {
      showToast("Removed from your favorites successfully.", "success", "Favorite Removed");
      // Update local state to filter it out immediately
      setDbHistoryItems((prev) =>
        prev.map((item) => {
          if (item._id !== generationId) return item;
          return {
            ...item,
            inputImageUrls: (item.inputImageUrls || []).map((img) =>
              img.url === imageUrl ? { ...img, isFavourite: false } : img
            ),
            outputImageUrls: (item.outputImageUrls || []).map((img) =>
              img.url === imageUrl ? { ...img, isFavourite: false } : img
            ),
          };
        })
      );
    } else {
      showToast(result.message || "Failed to remove favorite", "error", "Removal Failed");
    }
  };

  const formatTimeAgo = (dateString) => {
    if (!dateString) return "unknown";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  // Extract all images marked as favorite
  const items = dbHistoryItems.flatMap((item) => {
    const inputs = (item.inputImageUrls || []).filter(img => img.isFavourite).map((img, index) => ({
      id: `${item._id}_in_${index}`,
      generationId: item._id,
      url: img.url,
      prompt: item.prompt || "Input image",
      timeAgo: formatTimeAgo(item.createdAt),
      type: item.type || "textToImage",
    }));
    const outputs = (item.outputImageUrls || []).filter(img => img.isFavourite).map((img, index) => ({
      id: `${item._id}_out_${index}`,
      generationId: item._id,
      url: img.url,
      prompt: item.prompt || "Output image",
      timeAgo: formatTimeAgo(item.createdAt),
      type: item.type || "textToImage",
    }));
    return [...inputs, ...outputs];
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col rounded-[28px] border border-slate-200/70 bg-white/95 p-6 md:p-8 shadow-[0_10px_40px_rgba(15,23,42,0.03)] backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 border border-rose-100">
              <RiHeartFill size={22} />
            </div>
            <div>
              <h2 className="text-[20px] font-black text-slate-900 tracking-tight leading-none">
                My Favorites
              </h2>
              <p className="mt-1.5 text-xs font-semibold text-slate-400">
                Creations you've marked as favorite
              </p>
            </div>
          </div>
        </div>

        {isLoading && items.length === 0 ? (
          <div className="flex items-center justify-center py-24">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-rose-500 border-t-transparent" />
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-24 border border-dashed border-slate-200 rounded-[24px] bg-slate-55/20">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-rose-50 text-rose-450 shadow-inner">
              <RiHeartLine size={28} />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-slate-700">No favorite creations yet</p>
              <p className="mt-1.5 text-xs text-slate-400">Click the heart icon on any generated image to save it here.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <div key={item.id} className="group relative aspect-square overflow-hidden rounded-[24px] border border-slate-150 bg-slate-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <img src={item.url} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Heart Toggle */}
                <button
                  onClick={() => handleRemove(item.generationId, item.url)}
                  className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-xl bg-white text-rose-500 shadow-sm hover:scale-110 active:scale-90 transition-all cursor-pointer z-10"
                >
                  <RiHeartFill size={16} className="animate-[bounce_0.3s_ease-out]" />
                </button>

                {/* Info & Download */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="flex items-center gap-1.5 rounded-lg bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white">
                    <RiHistoryLine size={10} />
                    <span>{item.timeAgo}</span>
                  </div>
                  <button
                    onClick={() => downloadImage(item.url, `lumora-favourite-${item.id}.jpg`)}
                    className="flex h-8 w-8 items-center justify-center rounded-xl bg-white hover:bg-emerald-500 hover:text-white transition-all shadow cursor-pointer"
                  >
                    <RiDownloadLine size={14} className="text-slate-800 hover:text-inherit" />
                  </button>
                </div>

                {/* Prompt Tooltip */}
                <div className="absolute inset-x-0 top-0 p-3 bg-gradient-to-b from-black/75 to-transparent text-[11px] font-semibold text-white/90 opacity-0 group-hover:opacity-100 pointer-events-none line-clamp-2">
                  {item.prompt}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
