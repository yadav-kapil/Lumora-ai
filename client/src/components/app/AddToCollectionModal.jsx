import { useState, useEffect } from "react";
import { RiCloseLine, RiFolderAddLine, RiFolderLine, RiAddLine, RiLoader4Line } from "react-icons/ri";
import { useToast } from "../../context/ToastContext";
import useLibrary from "../../hooks/useLibrary";

export default function AddToCollectionModal({ onClose, generationId, imageUrl, imageId }) {
  const { showToast } = useToast();
  const { getCollections, addToCollection } = useLibrary();
  const [collectionsList, setCollectionsList] = useState([]);
  const [isLoadingCollections, setIsLoadingCollections] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal mode: "existing" or "new"
  const [mode, setMode] = useState("existing");
  const [selectedCollectionId, setSelectedCollectionId] = useState("");
  const [newCollectionName, setNewCollectionName] = useState("");

  // Block Background Scrolling when modal is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle || "auto";
    };
  }, []);

  // Fetch user's collections to populate the dropdown
  useEffect(() => {
    const fetchCollectionsList = async () => {
      setIsLoadingCollections(true);
      const result = await getCollections();
      setIsLoadingCollections(false);
      if (result && result.success) {
        const list = result.data || [];
        setCollectionsList(list);
        if (list.length > 0) {
          setSelectedCollectionId(list[0]._id);
        } else {
          // If no collections, default to "new" mode
          setMode("new");
        }
      }
    };
    fetchCollectionsList();
  }, []);

  const handleAdd = async () => {
    let collectionName = "";

    if (mode === "existing") {
      const selectedCol = collectionsList.find((col) => col._id === selectedCollectionId);
      if (!selectedCol) {
        showToast("Please select an existing collection.", "warning", "Validation Error");
        return;
      }
      collectionName = selectedCol.collectionName;
    } else {
      if (!newCollectionName.trim()) {
        showToast("Please enter a collection name.", "warning", "Validation Error");
        return;
      }
      collectionName = newCollectionName.trim();
    }

    setIsSubmitting(true);
    const result = await addToCollection({
      collectionName,
      generationId,
      imageId,
    });
    setIsSubmitting(false);

    if (result && result.success) {
      showToast(`Successfully added image to "${collectionName}"`, "success", "Added to Collection");
      onClose();
    } else {
      showToast(result.message || "Failed to add image to collection", "error", "Operation Failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-[6px] animate-[fadeIn_0.2s_ease-out]">
      {/* Modal Container */}
      <div className="relative flex w-full max-w-md flex-col rounded-[28px] border border-slate-100 bg-white p-6 shadow-[0_32px_80px_rgba(15,23,42,0.18)] animate-[slideIn_0.3s_cubic-bezier(0.16,1,0.3,1)]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100/50">
              <RiFolderAddLine size={20} />
            </div>
            <div>
              <h2 className="text-[17px] font-black text-slate-900 tracking-tight leading-none">
                Add to Collection
              </h2>
              <p className="mt-1 text-[11px] font-semibold text-slate-400">
                Organize your generated masterpieces
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <RiCloseLine size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="py-5 space-y-4">
          
          {/* Mode Switcher Tabs */}
          {collectionsList.length > 0 && (
            <div className="flex rounded-xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setMode("existing")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  mode === "existing"
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <RiFolderLine size={13} />
                Existing Collection
              </button>
              <button
                type="button"
                onClick={() => setMode("new")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  mode === "new"
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <RiAddLine size={13} />
                New Collection
              </button>
            </div>
          )}

          {isLoadingCollections ? (
            <div className="flex flex-col items-center justify-center py-6 gap-2">
              <RiLoader4Line size={24} className="text-slate-400 animate-spin" />
              <p className="text-[11px] font-semibold text-slate-400">Loading collections...</p>
            </div>
          ) : mode === "existing" && collectionsList.length > 0 ? (
            /* Existing Collection Dropdown */
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                Select Collection
              </label>
              <select
                value={selectedCollectionId}
                onChange={(e) => setSelectedCollectionId(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-semibold text-slate-700 outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all shadow-sm cursor-pointer"
              >
                {collectionsList.map((col) => (
                  <option key={col._id} value={col._id}>
                    {col.collectionName} ({col.imagesList?.length || 0} items)
                  </option>
                ))}
              </select>
            </div>
          ) : (
            /* New Collection Name Input */
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                Collection Name
              </label>
              <input
                type="text"
                placeholder="e.g. Cyberpunk Styles, Logos, Characters"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-semibold text-slate-700 outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all shadow-sm"
                maxLength={30}
              />
            </div>
          )}

          {/* Mini Image Preview */}
          <div className="flex items-center gap-3 p-3 bg-slate-50/50 border border-slate-100 rounded-2xl">
            <div className="h-12 w-12 rounded-xl overflow-hidden border border-slate-200/50 shadow-sm shrink-0">
              <img src={imageUrl} alt="Image to add" className="h-full w-full object-cover" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-slate-700 truncate">Adding this image</p>
              <p className="text-[10px] text-slate-400 font-semibold truncate">Ref: {generationId}</p>
            </div>
          </div>

        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100 shrink-0">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onClose}
            className="flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 h-10 text-xs font-bold text-slate-650 hover:bg-slate-50 hover:border-slate-350 transition-all cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleAdd}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 px-5 h-10 text-xs font-bold text-white shadow-md shadow-emerald-300/40 hover:-translate-y-px hover:brightness-105 active:translate-y-0 active:brightness-100 transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
          >
            {isSubmitting ? (
              <>
                <RiLoader4Line size={14} className="animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <RiAddLine size={14} />
                Add to Collection
              </>
            )}
          </button>
        </div>

      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from {
            transform: scale(0.96) translateY(12px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
