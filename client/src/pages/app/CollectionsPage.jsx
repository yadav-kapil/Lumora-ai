import { useState, useEffect } from "react";
import {
  RiFolderLine,
  RiFolder3Line,
  RiFolderAddLine,
  RiImage2Line,
  RiMore2Fill,
  RiCloseLine,
  RiCheckLine,
  RiEditBoxLine,
  RiDeleteBin6Line,
  RiLoader4Line,
} from "react-icons/ri";
import { useAppContext } from "../../context/app/AppContext";
import { useToast } from "../../context/ToastContext";
import useLibrary from "../../hooks/useLibrary";
import CollectionFolder from "../../components/app/CollectionFolder";

export default function CollectionsPage() {
  const { collections, dispatch } = useAppContext();
  const { showToast } = useToast();
  const { getCollections, addToCollection, renameCollection, deleteCollection, isLoading } = useLibrary();

  const [isPageLoading, setIsPageLoading] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  // Selected collection for folder view
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);

  // States for Editing/Renaming
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  // States for Dropdown Menu Active
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Deletion Confirmation Modal State
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);


  // Fetch collections when page mounts
  const fetchCollections = async () => {
    setIsPageLoading(true);
    const result = await getCollections();
    setIsPageLoading(false);
    if (result && result.success) {
      dispatch({ type: "SET_COLLECTIONS", payload: result.data });
    } else {
      showToast(result.message || "Failed to load collections", "error", "Error Loading");
    }
  };

  useEffect(() => {
    fetchCollections();

    // Close menus on click outside
    const handleOutsideClick = () => setActiveMenuId(null);
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const result = await addToCollection({
      collectionName: newTitle.trim(),
    });

    if (result && result.success) {
      showToast(`Collection "${newTitle}" created successfully.`, "success", "Collection Created");
      setNewTitle("");
      setShowAdd(false);
    } else {
      showToast(result.message || "Failed to create collection", "error", "Creation Failed");
    }
  };

  const handleStartRename = (e, item) => {
    e.stopPropagation();
    setEditingId(item._id);
    setEditingName(item.collectionName);
    setActiveMenuId(null);
  };

  const handleSaveRename = async (id) => {
    if (!editingName.trim()) {
      showToast("Collection name cannot be empty", "warning", "Validation Error");
      return;
    }

    const result = await renameCollection(id, editingName.trim());
    if (result && result.success) {
      showToast("Collection renamed successfully", "success", "Renamed Successfully");
      setEditingId(null);
    } else {
      showToast(result.message || "Failed to rename collection", "error", "Rename Failed");
    }
  };

  const handleDeleteClick = (e, id) => {
    e.stopPropagation();
    setActiveMenuId(null);
    setDeleteConfirmId(id);
  };

  const confirmDelete = async (id) => {
    const result = await deleteCollection(id);
    if (result && result.success) {
      showToast("Collection deleted successfully", "success", "Collection Deleted");
      if (selectedCollectionId === id) {
        setSelectedCollectionId(null);
      }
    } else {
      showToast(result.message || "Failed to delete collection", "error", "Delete Failed");
    }
  };

  const selectedCollection = collections?.find((col) => col._id === selectedCollectionId);

  if (selectedCollectionId && selectedCollection) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col rounded-[28px] border border-slate-200/70 bg-white/95 p-6 md:p-8 shadow-[0_10px_40px_rgba(15,23,42,0.03)] backdrop-blur-xl">
          <CollectionFolder
            collection={selectedCollection}
            onBack={() => setSelectedCollectionId(null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col rounded-[28px] border border-slate-200/70 bg-white/95 p-6 md:p-8 shadow-[0_10px_40px_rgba(15,23,42,0.03)] backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100/50">
              <RiFolder3Line size={22} />
            </div>
            <div>
              <h2 className="text-[20px] font-black text-slate-900 tracking-tight leading-none">
                My Collections
              </h2>
              <p className="mt-1.5 text-xs font-semibold text-slate-400">
                Organize your generated masterpieces into folders
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAdd(!showAdd)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 px-4 py-2.5 text-xs font-bold text-white shadow shadow-emerald-250 cursor-pointer hover:brightness-110 hover:-translate-y-px transition-all"
          >
            <RiFolderAddLine size={14} />
            New Folder
          </button>
        </div>

        {/* Add Folder form */}
        {showAdd && (
          <form onSubmit={handleCreate} className="mb-6 p-4 border border-slate-200 rounded-2xl bg-slate-55/20 flex gap-3 items-center animate-[slideIn_0.2s_ease-out]">
            <input
              type="text"
              placeholder="Collection name..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="flex-1 h-10 px-4 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 outline-none focus:border-emerald-500"
              maxLength={30}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !newTitle.trim()}
              className="h-10 px-4 bg-emerald-500 text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-emerald-600 disabled:opacity-50 transition-all flex items-center justify-center gap-1.5"
            >
              {isLoading ? <RiLoader4Line className="animate-spin" size={13} /> : "Create"}
            </button>
            <button
              type="button"
              onClick={() => setShowAdd(false)}
              className="h-10 px-4 border border-slate-250 bg-white text-slate-650 rounded-xl text-xs font-bold cursor-pointer hover:bg-slate-50"
            >
              Cancel
            </button>
          </form>
        )}

        {/* Collections Content */}
        {isPageLoading && (!collections || collections.length === 0) ? (
          <div className="flex items-center justify-center py-24">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
          </div>
        ) : !collections || collections.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-24 border border-dashed border-slate-200 rounded-[24px] bg-slate-55/20">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-500 shadow-inner">
              <RiFolderLine size={28} />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-slate-700">No collections yet</p>
              <p className="mt-1.5 text-xs text-slate-400">Click "New Folder" or add images directly from previews.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {collections.map((item) => {
              const hasImages = item.imagesList && item.imagesList.length > 0;
              let coverUrl = null;
              if (hasImages) {
                const firstItem = item.imagesList[0];
                const gen = firstItem.generationId;
                if (gen) {
                  const allImages = [...(gen.inputImageUrls || []), ...(gen.outputImageUrls || [])];
                  const imageObj = allImages.find((img) => img._id?.toString() === firstItem.imageId?.toString());
                  coverUrl = imageObj?.url;
                }
              }

              return (
                <div
                  key={item._id}
                  className="group relative rounded-3xl border border-slate-150 bg-white p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Folder Cover Layer */}
                  <div
                    onClick={() => setSelectedCollectionId(item._id)}
                    className="relative aspect-video rounded-2xl overflow-hidden mb-4 border border-slate-100 bg-slate-50 cursor-pointer"
                  >
                    {coverUrl ? (
                      <img
                        src={coverUrl}
                        alt={item.collectionName}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      /* Empty Collection Design */
                      <div className="h-full w-full bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center gap-1.5 select-none">
                        <RiFolderLine size={28} className="text-slate-350" />
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                          Empty Folder
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/5" />
                    <div className="absolute bottom-3 left-3 flex h-7 w-7 items-center justify-center rounded-lg bg-white/90 shadow select-none">
                      <RiFolderLine size={14} className="text-slate-700" />
                    </div>
                  </div>

                  {/* Metadata and Actions */}
                  <div className="flex items-start justify-between relative">
                    <div className="flex-1 overflow-hidden pr-2">
                      {editingId === item._id ? (
                        /* Rename Action Input */
                        <div className="flex items-center gap-1.5 w-full">
                          <input
                            type="text"
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            className="w-full h-8 px-2 py-0.5 border border-emerald-450 rounded-lg text-xs font-semibold text-slate-700 bg-white outline-none focus:ring-2 focus:ring-emerald-500/10"
                            maxLength={30}
                            autoFocus
                            disabled={isLoading}
                          />
                          <button
                            onClick={() => handleSaveRename(item._id)}
                            disabled={isLoading}
                            className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 shrink-0 cursor-pointer active:scale-95 transition-all"
                            title="Save"
                          >
                            <RiCheckLine size={15} />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            disabled={isLoading}
                            className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50 text-slate-500 hover:bg-slate-100 shrink-0 cursor-pointer active:scale-95 transition-all"
                            title="Cancel"
                          >
                            <RiCloseLine size={15} />
                          </button>
                        </div>
                      ) : (
                        /* Standard Details Display */
                        <>
                          <h4
                            onClick={() => setSelectedCollectionId(item._id)}
                            className="text-sm font-bold text-slate-800 tracking-tight group-hover:text-emerald-600 transition-colors truncate cursor-pointer"
                          >
                            {item.collectionName}
                          </h4>
                          <p className="text-xs font-semibold text-slate-400 mt-1 flex items-center gap-1.5">
                            <RiImage2Line size={12} className="text-slate-400" />
                            {item.imagesList?.length || 0} items
                          </p>
                        </>
                      )}
                    </div>

                    {editingId !== item._id && (
                      <div className="relative shrink-0">
                        {/* More Action Toggle Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuId(activeMenuId === item._id ? null : item._id);
                          }}
                          className="h-7 w-7 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-650 cursor-pointer active:scale-95 transition-all"
                        >
                          <RiMore2Fill size={14} />
                        </button>

                        {/* Dropdown Options Popup */}
                        {activeMenuId === item._id && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-0 bottom-full mb-1 z-30 w-32 rounded-xl border border-slate-100 bg-white py-1 shadow-lg shadow-slate-200/50 animate-[slideIn_0.15s_ease-out]"
                          >
                            <button
                              onClick={(e) => handleStartRename(e, item)}
                              className="flex w-full items-center gap-2 px-3 py-1.5 text-[11px] font-bold text-slate-650 hover:bg-slate-50 hover:text-slate-800 transition-all text-left"
                            >
                              <RiEditBoxLine size={13} className="text-slate-400" />
                              Rename
                            </button>
                            <button
                              onClick={(e) => handleDeleteClick(e, item._id)}
                              className="flex w-full items-center gap-2 px-3 py-1.5 text-[11px] font-bold text-red-500 hover:bg-red-50 transition-all text-left"
                            >
                              <RiDeleteBin6Line size={13} className="text-red-400" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

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

      {/* Custom delete confirmation dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-[4px] animate-[fadeIn_0.2s_ease-out]">
          <div className="relative flex w-full max-w-sm flex-col rounded-[24px] bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.15)] border border-slate-100 animate-[scaleIn_0.2s_cubic-bezier(0.16,1,0.3,1)]">
            <h3 className="text-sm font-black text-slate-800 tracking-tight">Delete Collection</h3>
            <p className="mt-2 text-xs font-semibold text-slate-450 leading-relaxed">
              Are you sure you want to delete this collection? This action cannot be undone.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-650 hover:bg-slate-50 cursor-pointer transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const targetId = deleteConfirmId;
                  setDeleteConfirmId(null);
                  confirmDelete(targetId);
                }}
                className="flex-1 h-9 flex items-center justify-center rounded-xl bg-gradient-to-r from-red-500 via-red-600 to-red-800 text-xs font-bold text-white shadow-md shadow-red-200/50 hover:brightness-105 active:scale-[0.99] cursor-pointer transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
