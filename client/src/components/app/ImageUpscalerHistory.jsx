import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/app/AppContext";
import { downloadImage } from "../../utils/downloadHelper";

import {
  RiSearchLine,
  RiCloseLine,
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

const ITEMS_PER_PAGE = 10;

const SCALE_OPTIONS = [
  { id: "all", label: "All Targets" },
  { id: "1k", label: "1K Resolution" },
  { id: "2k", label: "2K Resolution" },
  { id: "4k", label: "4K Resolution" },
];

const SORT_OPTIONS = [
  { id: "newest", label: "Newest First" },
  { id: "oldest", label: "Oldest First" },
];

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

const getScaleLabel = (scaleId) => {
  if (scaleId === "1k") return "1K Target";
  if (scaleId === "2k") return "2K Target";
  if (scaleId === "4k") return "4K Target";
  return scaleId || "Unknown";
};

export default function ImageUpscalerHistory({ onClose, onSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedScale, setSelectedScale] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [viewType, setViewType] = useState("grid"); // grid or list
  const [currentPage, setCurrentPage] = useState(1);

  // Custom Dropdown Open States
  const [scaleDropdownOpen, setScaleDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  // Dropdown Refs for Click Outside
  const scaleRef = useRef(null);
  const sortRef = useRef(null);

  // Block Background Scrolling
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle || "auto";
    };
  }, []);

  // Click Outside Listener for Custom Dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (scaleRef.current && !scaleRef.current.contains(event.target)) {
        setScaleDropdownOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setSortDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { historyByType } = useAppContext();
  const dbHistoryItems = historyByType?.imageUpscaler || [];

  const items = dbHistoryItems.flatMap((item) => {
    const itemImages = item.outputImageUrls || item.imageUrls || [];
    return (itemImages && itemImages.length > 0 ? itemImages : []).map((img, index) => ({
      id: `${item._id}_${index}`,
      url: img.url,
      urls: itemImages ? itemImages.map((i) => i.url) : [],
      prompt: item.prompt || "",
      scale: item.model || "", // saved as model in database schema
      premium: item.provider && item.provider !== "stock",
      createdAt: item.createdAt,
      timestamp: new Date(item.createdAt).getTime(),
      timeAgo: formatTimeAgo(item.createdAt),
    }))
  });

  // Filter & Sort Logic
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.prompt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesScale = selectedScale === "all" || item.scale === selectedScale;
    return matchesSearch && matchesScale;
  }).sort((a, b) => {
    if (sortOrder === "newest") return b.timestamp - a.timestamp;
    return a.timestamp - b.timestamp;
  });

  // Calculate Pagination values
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE));
  
  // Safe rendering page calculation (defaults to 1 if out of bounds)
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

  const activeScaleLabel = SCALE_OPTIONS.find((s) => s.id === selectedScale)?.label || "All Targets";
  const activeSortLabel = SORT_OPTIONS.find((s) => s.id === sortOrder)?.label || "Newest First";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-[6px] animate-[fadeIn_0.22s_ease-out]">
      
      {/* Modal Container with fixed height (h-[700px]) */}
      <div className="relative flex w-full max-w-5xl h-[700px] flex-col rounded-[32px] border border-slate-100 bg-white p-6 md:p-8 shadow-[0_32px_80px_rgba(15,23,42,0.18)] animate-[slideIn_0.32s_cubic-bezier(0.16,1,0.3,1)] overflow-hidden">
        
        {/* Header (Sticky / Fixed at top) */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-[#f97316] shadow-[0_4px_14px_rgba(249,115,22,0.12)] border border-orange-100/50">
              <RiTimeLine size={24} className="animate-[spin_12s_linear_infinite]" />
            </div>
            <div>
              <h2 className="text-[20px] font-black text-slate-900 tracking-tight leading-none">
                Upscaler History
              </h2>
              <p className="mt-1.5 text-xs font-semibold text-slate-400">
                Your recently upscaled images
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/app/history"
              onClick={onClose}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 h-10 text-xs font-bold text-slate-650 hover:border-slate-350 hover:bg-slate-50 shadow-sm transition-all cursor-pointer"
            >
              Open Full Page
            </Link>
            <button
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-50 hover:border-slate-350 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
            >
              <RiCloseLine size={20} />
            </button>
          </div>

        </div>

        {/* Search & Custom Dropdown Filters (Fixed in place) */}
        <div className="flex flex-wrap items-center gap-3.5 mt-5 mb-5 shrink-0">
          {/* Search Input */}
          <div className="flex-1 min-w-[260px] relative">
            <RiSearchLine
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by prompt..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-11 pl-11 pr-4 rounded-2xl border border-slate-200 bg-slate-50/30 text-sm text-slate-750 placeholder:text-slate-400 outline-none focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-500/5 transition-all shadow-sm"
            />
          </div>

          {/* Custom Scale Dropdown */}
          <div ref={scaleRef} className="relative z-40">
            <button
              onClick={() => {
                setScaleDropdownOpen(!scaleDropdownOpen);
                setSortDropdownOpen(false);
              }}
              className="h-11 rounded-2xl border border-slate-200 bg-white pl-4 pr-10 text-sm font-bold text-slate-700 hover:border-orange-350 hover:bg-slate-50/40 transition-all flex items-center gap-2 cursor-pointer shadow-sm min-w-[140px]"
            >
              <RiFilter3Line size={15} className="text-slate-400 shrink-0" />
              <span className="truncate">{activeScaleLabel}</span>
              <RiArrowDownSLine
                size={16}
                className={`absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-transform duration-250 ${
                  scaleDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {scaleDropdownOpen && (
              <div className="absolute left-0 mt-2 z-50 w-48 rounded-2xl border border-slate-100 bg-white/95 p-1.5 shadow-[0_12px_36px_rgba(15,23,42,0.12)] backdrop-blur-md animate-[slideDown_0.2s_ease-out]">
                {SCALE_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setSelectedScale(opt.id);
                      setScaleDropdownOpen(false);
                      setCurrentPage(1);
                    }}
                    className={`flex w-full items-center justify-between px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
                      selectedScale === opt.id
                        ? "bg-orange-50 text-orange-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {selectedScale === opt.id && <RiCheckLine size={14} className="text-orange-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Custom Sort Dropdown */}
          <div ref={sortRef} className="relative z-40">
            <button
              onClick={() => {
                setSortDropdownOpen(!sortDropdownOpen);
                setScaleDropdownOpen(false);
              }}
              className="h-11 rounded-2xl border border-slate-200 bg-white pl-4 pr-10 text-sm font-bold text-slate-700 hover:border-orange-355 hover:bg-slate-50/40 transition-all flex items-center gap-2 cursor-pointer shadow-sm min-w-[140px]"
            >
              <RiSortDesc size={15} className="text-slate-400 shrink-0" />
              <span className="truncate">{activeSortLabel}</span>
              <RiArrowDownSLine
                size={16}
                className={`absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-transform duration-250 ${
                  sortDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {sortDropdownOpen && (
              <div className="absolute right-0 mt-2 z-50 w-44 rounded-2xl border border-slate-100 bg-white/95 p-1.5 shadow-[0_12px_36px_rgba(15,23,42,0.12)] backdrop-blur-md animate-[slideDown_0.2s_ease-out]">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setSortOrder(opt.id);
                      setSortDropdownOpen(false);
                      setCurrentPage(1);
                    }}
                    className={`flex w-full items-center justify-between px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
                      sortOrder === opt.id
                        ? "bg-orange-50 text-orange-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {sortOrder === opt.id && <RiCheckLine size={14} className="text-orange-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Layout switcher */}
          <div className="flex items-center gap-1 bg-slate-100 rounded-2xl p-1 border border-slate-200/40 shadow-inner shrink-0">
            <button
              onClick={() => setViewType("grid")}
              className={`h-9 w-9 rounded-xl flex items-center justify-center transition-all ${
                viewType === "grid"
                  ? "bg-white text-orange-600 shadow-sm border border-slate-200/10 font-bold"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <RiGridFill size={18} />
            </button>
            <button
              onClick={() => setViewType("list")}
              className={`h-9 w-9 rounded-xl flex items-center justify-center transition-all ${
                viewType === "list"
                  ? "bg-white text-orange-600 shadow-sm border border-slate-200/10 font-bold"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <RiListUnordered size={18} />
            </button>
          </div>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto pr-1 min-h-0 select-none scrollbar-premium">
          {paginatedItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20 border border-dashed border-slate-200 rounded-[24px] bg-slate-50/20">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-400 shadow-sm">
                <RiSearchLine size={28} />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-slate-700">No generated images match your filters</p>
                <p className="mt-1.5 text-xs text-slate-400">Try adjusting your search query or target options.</p>
              </div>
            </div>
          ) : viewType === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 py-1">
              {paginatedItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    if (onSelect) onSelect(item.urls, item.url);
                    onClose();
                  }}
                  className="group relative aspect-square overflow-hidden rounded-[20px] border border-slate-100 bg-slate-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(15,23,42,0.12)] hover:border-slate-300 cursor-pointer"
                >
                  <img
                    src={item.url}
                    alt={item.prompt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Premium Golden Badge */}
                  {item.premium && (
                    <div className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-lg bg-white/95 backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-slate-100 hover:scale-110 transition-transform duration-200">
                      <RiVipCrownFill size={12} className="text-amber-400" />
                    </div>
                  )}

                  {/* Time Stamp */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-[2px]">
                    <RiTimeLine size={10} className="text-slate-300" />
                    <span>{item.timeAgo}</span>
                  </div>

                  {/* Download hover button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadImage(item.url, `lumora-generation-${item.id}.jpg`);
                    }}
                    className="absolute right-3 bottom-3 flex h-8 w-8 items-center justify-center rounded-xl bg-white opacity-0 shadow-md translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-orange-500 hover:text-white cursor-pointer"
                  >
                    <RiDownloadLine size={14} className="text-slate-805 hover:text-white" />
                  </button>

                  {/* Floating tooltip prompt description */}
                  <div className="absolute inset-x-0 top-0 p-3 bg-gradient-to-b from-black/75 to-transparent text-[11px] font-semibold text-white/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none line-clamp-2">
                    {item.prompt}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="flex flex-col gap-3 py-1">
              {paginatedItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    if (onSelect) onSelect(item.urls, item.url);
                    onClose();
                  }}
                  className="flex items-center gap-4 p-3 rounded-2xl border border-slate-150 bg-white hover:bg-slate-50/40 transition-all hover:border-slate-300 cursor-pointer shadow-[0_2px_8px_rgba(15,23,42,0.02)]"
                >
                  <img
                    src={item.url}
                    alt={item.prompt}
                    className="h-16 w-16 rounded-xl object-cover border border-slate-150 shadow-sm"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate">{item.prompt || "Upscaled Image"}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/50">
                        {getScaleLabel(item.scale)}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1 font-semibold">
                        <RiTimeLine size={12} />
                        {item.timeAgo}
                      </span>
                    </div>
                  </div>
                  {item.premium && (
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 border border-amber-100 text-amber-500 shadow-[0_2px_6px_rgba(245,158,11,0.06)]">
                      <RiVipCrownFill size={13} />
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadImage(item.url, `lumora-generation-${item.id}.jpg`);
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-250 bg-white hover:border-orange-500 hover:bg-orange-500 hover:text-white transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <RiDownloadLine size={14} className="text-slate-600 hover:text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredItems.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-6 border-t border-slate-100 pt-5 shrink-0">
            <button
              onClick={handlePrevPage}
              disabled={activePage === 1}
              className={`h-9 w-9 rounded-xl border flex items-center justify-center transition-all shadow-sm ${
                activePage === 1
                  ? "border-slate-100 bg-slate-50 text-slate-350 cursor-not-allowed"
                  : "border-slate-200 bg-white text-slate-500 hover:text-slate-800 hover:border-slate-350 hover:bg-slate-50 active:scale-95 cursor-pointer"
              }`}
            >
              <RiArrowLeftSLine size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`h-9 w-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all shadow-sm cursor-pointer ${
                  activePage === page
                    ? "border-2 border-orange-500 bg-orange-50 text-orange-600 shadow-[0_4px_12px_rgba(249,115,22,0.12)]"
                    : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:border-slate-300 active:scale-95"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={handleNextPage}
              disabled={activePage === totalPages}
              className={`h-9 w-9 rounded-xl border flex items-center justify-center transition-all shadow-sm ${
                activePage === totalPages
                  ? "border-slate-100 bg-slate-50 text-slate-350 cursor-not-allowed"
                  : "border-slate-200 bg-white text-slate-500 hover:text-slate-800 hover:border-slate-350 hover:bg-slate-50 active:scale-95 cursor-pointer"
              }`}
            >
              <RiArrowRightSLine size={18} />
            </button>
          </div>
        )}

      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from {
            transform: scale(0.96) translateY(16px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
        @keyframes slideDown {
          from {
            transform: translateY(-8px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .scrollbar-premium::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-premium::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-premium::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 9999px;
          transition: background 0.2s;
        }
        .scrollbar-premium::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
