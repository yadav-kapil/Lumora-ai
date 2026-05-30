import { useState } from "react";
import { RiFolderLine, RiFolder3Line, RiFolderAddLine, RiImage2Line, RiMore2Fill } from "react-icons/ri";

const MOCK_COLLECTIONS = [
  {
    id: 1,
    title: "Nature & Landscapes",
    count: 12,
    coverUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
  },
  {
    id: 2,
    title: "Cyberpunk Concepts",
    count: 4,
    coverUrl: "https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?w=400&q=80",
  },
  {
    id: 3,
    title: "Realistic Portraits",
    count: 7,
    coverUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
  },
];

export default function CollectionsPage() {
  const [collections, setCollections] = useState(MOCK_COLLECTIONS);
  const [newTitle, setNewTitle] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setCollections((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: newTitle,
        count: 0,
        coverUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&fit=crop",
      },
    ]);
    setNewTitle("");
    setShowAdd(false);
  };

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
          <form onSubmit={handleAdd} className="mb-6 p-4 border border-slate-200 rounded-2xl bg-slate-50/50 flex gap-3 items-center animate-[slideIn_0.2s_ease-out]">
            <input
              type="text"
              placeholder="Collection name..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="flex-1 h-10 px-4 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-emerald-500"
            />
            <button type="submit" className="h-10 px-4 bg-emerald-500 text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-emerald-600">
              Create
            </button>
            <button type="button" onClick={() => setShowAdd(false)} className="h-10 px-4 border border-slate-250 bg-white rounded-xl text-xs font-bold cursor-pointer hover:bg-slate-55">
              Cancel
            </button>
          </form>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {collections.map((item) => (
            <div key={item.id} className="group relative rounded-3xl border border-slate-150 bg-white p-4 shadow-sm hover:shadow-md transition-all duration-300">
              {/* Stack effect */}
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 border border-slate-100">
                <img src={item.coverUrl} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute bottom-3 left-3 flex h-7 w-7 items-center justify-center rounded-lg bg-white/90 shadow">
                  <RiFolderLine size={14} className="text-slate-700" />
                </div>
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 tracking-tight group-hover:text-emerald-600 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs font-medium text-slate-400 mt-1 flex items-center gap-1">
                    <RiImage2Line size={12} />
                    {item.count} items
                  </p>
                </div>
                <button className="h-7 w-7 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-650 cursor-pointer">
                  <RiMore2Fill size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
