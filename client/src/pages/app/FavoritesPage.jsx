import { useState } from "react";
import { RiHeartFill, RiHeartLine, RiDownloadLine, RiHistoryLine } from "react-icons/ri";

const MOCK_FAVORITES = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
    prompt: "Scenic alpine lake with high pine trees reflecting on pristine blue water, morning mist.",
    timeAgo: "15 min ago",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?w=500&q=80",
    prompt: "Cyberpunk neon street at night, glowing storefront signs, reflections in rain puddles.",
    timeAgo: "32 min ago",
  },
];

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(MOCK_FAVORITES);

  const handleRemove = (id) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

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

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-24 border border-dashed border-slate-200 rounded-[24px] bg-slate-50/20">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-rose-50 text-rose-400">
              <RiHeartLine size={28} />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-slate-700">No favorite creations yet</p>
              <p className="mt-1.5 text-xs text-slate-400">Click the heart icon on any generated image to save it here.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((item) => (
              <div key={item.id} className="group relative aspect-square overflow-hidden rounded-[24px] border border-slate-150 bg-slate-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <img src={item.url} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Heart Toggle */}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-xl bg-white text-rose-500 shadow-sm hover:scale-110 active:scale-90 transition-all cursor-pointer"
                >
                  <RiHeartFill size={16} />
                </button>

                {/* Info & Download */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-1.5 rounded-lg bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white">
                    <RiHistoryLine size={10} />
                    <span>{item.timeAgo}</span>
                  </div>
                  <a href={item.url} download className="flex h-8 w-8 items-center justify-center rounded-xl bg-white hover:bg-emerald-500 hover:text-white transition-all shadow">
                    <RiDownloadLine size={14} className="text-slate-800 hover:text-inherit" />
                  </a>
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
