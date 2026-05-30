import { useState, useEffect, useRef } from "react";
import {
  RiSearchLine,
  RiArrowDownSLine,
  RiGridFill,
  RiListUnordered,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiTimeLine,
  RiVipCrownFill,
  RiDownloadLine,
  RiCheckLine,
  RiFilter3Line,
  RiSortDesc,
} from "react-icons/ri";

const MOCK_HISTORY_ITEMS = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&q=80",
    prompt: "A cozy workspace with warm sunlight, laptop, plants, and minimal desk setup.",
    style: "realistic",
    timeAgo: "2 min ago",
    premium: true,
    timestamp: 1,
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
    prompt: "Scenic alpine lake with high pine trees reflecting on pristine blue water, morning mist.",
    style: "realistic",
    timeAgo: "15 min ago",
    premium: true,
    timestamp: 2,
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?w=500&q=80",
    prompt: "Cyberpunk neon street at night, glowing storefront signs, reflections in rain puddles.",
    style: "3d",
    timeAgo: "32 min ago",
    premium: true,
    timestamp: 3,
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80",
    prompt: "Luxurious modern living room, floor to ceiling glass windows looking at pine trees, midcentury modern furniture.",
    style: "realistic",
    timeAgo: "1 hour ago",
    premium: false,
    timestamp: 4,
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&q=80",
    prompt: "A cinematic portrait of a mysterious woman in warm glowing backlight, volumetric dust.",
    style: "realistic",
    timeAgo: "1 hour ago",
    premium: true,
    timestamp: 5,
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&q=80",
    prompt: "A cybernetic anime girl with pink neon glowing hair, standing in a futuristic arcade hall.",
    style: "anime",
    timeAgo: "2 hours ago",
    premium: true,
    timestamp: 6,
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&q=80",
    prompt: "A futuristic city skyline with space elevators and glowing tower bridges under a starry night.",
    style: "digital",
    timeAgo: "3 hours ago",
    premium: true,
    timestamp: 7,
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1472214222541-d510753a8707?w=500&q=80",
    prompt: "Golden hour sunset lighting over grand canyon mountains, orange clouds, cinematic wide shot.",
    style: "realistic",
    timeAgo: "5 hours ago",
    premium: false,
    timestamp: 8,
  },
  {
    id: 9,
    url: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf0a3?w=500&q=80",
    prompt: "A vintage yellow automobile parked on a European cobblestone street, sunlight filtering through trees.",
    style: "realistic",
    timeAgo: "6 hours ago",
    premium: true,
    timestamp: 9,
  },
  {
    id: 10,
    url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&q=80",
    prompt: "Detailed black and white charcoal sketch of a cozy cabin nestled deeply in the pine forest.",
    style: "sketch",
    timeAgo: "9 hours ago",
    premium: false,
    timestamp: 10,
  },
];

const ITEMS_PER_PAGE = 8;

const STYLE_OPTIONS = [
  { id: "all", label: "All Styles" },
  { id: "realistic", label: "Realistic" },
  { id: "anime", label: "Anime" },
  { id: "3d", label: "3D Render" },
  { id: "digital", label: "Digital Art" },
  { id: "sketch", label: "Sketch" },
];

const SORT_OPTIONS = [
  { id: "newest", label: "Newest First" },
  { id: "oldest", label: "Oldest First" },
];

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [viewType, setViewType] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);

  const [styleDropdownOpen, setStyleDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const styleRef = useRef(null);
  const sortRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (styleRef.current && !styleRef.current.contains(event.target)) {
        setStyleDropdownOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setSortDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredItems = MOCK_HISTORY_ITEMS.filter((item) => {
    const matchesSearch = item.prompt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStyle = selectedStyle === "all" || item.style === selectedStyle;
    return matchesSearch && matchesStyle;
  }).sort((a, b) => {
    if (sortOrder === "newest") return a.timestamp - b.timestamp;
    return b.timestamp - a.timestamp;
  });

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE));
  const activePage = currentPage > totalPages ? 1 : currentPage;
  const paginatedItems = filteredItems.slice(
    (activePage - 1) * ITEMS_PER_PAGE,
    activePage * ITEMS_PER_PAGE
  );

  const handlePrevPage = () => {
    if (activePage > 1) setCurrentPage(activePage - 1);
  };

  const handleNextPage = () => {
    if (activePage < totalPages) setCurrentPage(activePage + 1);
  };

  const activeStyleLabel = STYLE_OPTIONS.find((s) => s.id === selectedStyle)?.label || "All Styles";
  const activeSortLabel = SORT_OPTIONS.find((s) => s.id === sortOrder)?.label || "Newest First";

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col rounded-[28px] border border-slate-200/70 bg-white/95 p-6 md:p-8 shadow-[0_10px_40px_rgba(15,23,42,0.03)] backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100/50">
              <RiTimeLine size={24} />
            </div>
            <div>
              <h2 className="text-[20px] font-black text-slate-900 tracking-tight leading-none">
                Generation History
              </h2>
              <p className="mt-1.5 text-xs font-semibold text-slate-400">
                Your recently generated images in full view page
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3.5 mt-6 mb-6">
          <div className="flex-1 min-w-[260px] relative">
            <RiSearchLine size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by prompt..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-11 pl-11 pr-4 rounded-2xl border border-slate-200 bg-slate-50/30 text-sm text-slate-750 placeholder:text-slate-400 outline-none focus:border-emerald-400 focus:bg-white transition-all shadow-sm"
            />
          </div>

          <div ref={styleRef} className="relative z-20">
            <button
              onClick={() => setStyleDropdownOpen(!styleDropdownOpen)}
              className="h-11 rounded-2xl border border-slate-200 bg-white pl-4 pr-10 text-sm font-bold text-slate-700 hover:bg-slate-50 cursor-pointer transition-all flex items-center gap-2"
            >
              <RiFilter3Line size={15} className="text-slate-400" />
              <span>{activeStyleLabel}</span>
              <RiArrowDownSLine size={16} className={`absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-transform ${styleDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {styleDropdownOpen && (
              <div className="absolute left-0 mt-2 z-30 w-48 rounded-2xl border border-slate-100 bg-white p-1.5 shadow-lg">
                {STYLE_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setSelectedStyle(opt.id);
                      setStyleDropdownOpen(false);
                      setCurrentPage(1);
                    }}
                    className={`flex w-full items-center justify-between px-3.5 py-2 text-xs font-bold rounded-xl ${selectedStyle === opt.id ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-50"}`}
                  >
                    {opt.label}
                    {selectedStyle === opt.id && <RiCheckLine size={14} className="text-emerald-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div ref={sortRef} className="relative z-20">
            <button
              onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
              className="h-11 rounded-2xl border border-slate-200 bg-white pl-4 pr-10 text-sm font-bold text-slate-700 hover:bg-slate-50 cursor-pointer transition-all flex items-center gap-2"
            >
              <RiSortDesc size={15} className="text-slate-400" />
              <span>{activeSortLabel}</span>
              <RiArrowDownSLine size={16} className={`absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-transform ${sortDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {sortDropdownOpen && (
              <div className="absolute right-0 mt-2 z-30 w-44 rounded-2xl border border-slate-100 bg-white p-1.5 shadow-lg">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setSortOrder(opt.id);
                      setSortDropdownOpen(false);
                      setCurrentPage(1);
                    }}
                    className={`flex w-full items-center justify-between px-3.5 py-2 text-xs font-bold rounded-xl ${sortOrder === opt.id ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-50"}`}
                  >
                    {opt.label}
                    {sortOrder === opt.id && <RiCheckLine size={14} className="text-emerald-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 bg-slate-100 rounded-2xl p-1 border border-slate-200/40">
            <button
              onClick={() => setViewType("grid")}
              className={`h-9 w-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${viewType === "grid" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-400 hover:text-slate-650"}`}
            >
              <RiGridFill size={18} />
            </button>
            <button
              onClick={() => setViewType("list")}
              className={`h-9 w-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${viewType === "list" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-400 hover:text-slate-650"}`}
            >
              <RiListUnordered size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="min-h-[400px]">
          {paginatedItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20 border border-dashed border-slate-200 rounded-[24px]">
              <RiSearchLine size={28} className="text-slate-300" />
              <p className="text-sm font-bold text-slate-505">No matches found</p>
            </div>
          ) : viewType === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {paginatedItems.map((item) => (
                <div key={item.id} className="group relative aspect-square overflow-hidden rounded-[20px] border border-slate-100 bg-slate-50 hover:shadow-lg transition-all duration-300">
                  <img src={item.url} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {item.premium && (
                    <div className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-lg bg-white/95 shadow-sm">
                      <RiVipCrownFill size={12} className="text-amber-400" />
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white">
                    <RiTimeLine size={10} />
                    <span>{item.timeAgo}</span>
                  </div>
                  <a href={item.url} download className="absolute right-3 bottom-3 flex h-8 w-8 items-center justify-center rounded-xl bg-white opacity-0 group-hover:opacity-100 hover:bg-emerald-500 hover:text-white transition-all shadow">
                    <RiDownloadLine size={14} className="text-slate-800 hover:text-inherit" />
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {paginatedItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-3 rounded-2xl border border-slate-150 bg-white hover:bg-slate-50/40 transition-all">
                  <img src={item.url} alt="" className="h-16 w-16 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate">{item.prompt}</p>
                    <span className="text-xs text-slate-400 mt-1.5 block">{item.timeAgo}</span>
                  </div>
                  <a href={item.url} download className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-250 bg-white hover:bg-emerald-500 hover:text-white transition-all">
                    <RiDownloadLine size={14} className="text-slate-650 hover:text-inherit" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredItems.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-8 border-t border-slate-100 pt-5">
            <button onClick={handlePrevPage} disabled={activePage === 1} className="h-9 w-9 rounded-xl border flex items-center justify-center transition-all bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 cursor-pointer">
              <RiArrowLeftSLine size={18} />
            </button>
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
              <button key={page} onClick={() => setCurrentPage(page)} className={`h-9 w-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all cursor-pointer ${activePage === page ? "bg-emerald-50 text-emerald-600 border border-emerald-300" : "bg-white text-slate-500 border border-slate-200"}`}>
                {page}
              </button>
            ))}
            <button onClick={handleNextPage} disabled={activePage === totalPages} className="h-9 w-9 rounded-xl border flex items-center justify-center transition-all bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 cursor-pointer">
              <RiArrowRightSLine size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
