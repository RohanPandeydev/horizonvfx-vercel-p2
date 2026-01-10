"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Save,
  Image,
  Plus,
  Trash2,
  Upload,
  Film,
  Grid,
  List,
  Search,
  Filter,
  Star,
  Lock,
  Unlock,
} from "lucide-react";

interface MediaItem {
  id: number;
  title: string;
  type: "project" | "reel";
  isReel: boolean;
  thumbnail: string;
  video?: string;
  category: string;
  isFeatured: boolean;
  isPublic: boolean;
  description?: string;
  gradient: string;
  stats?: string;
  technologies?: string[];
  createdAt: number;
}

const categories = [
  "Film & OTT",
  "Advertisement",
  "Gaming",
  "Virtual Production",
  "Animation",
  "VFX",
  "Post Production",
  "Other",
];

const gradients = [
  "from-orange-500 via-red-500 to-pink-500",
  "from-cyan-500 via-blue-500 to-purple-500",
  "from-purple-500 via-pink-500 to-rose-500",
  "from-green-500 via-emerald-500 to-teal-500",
  "from-blue-500 to-cyan-500",
];

const techOptions = [
  "After Effects",
  "Nuke",
  "Maya",
  "Unreal Engine",
  "Houdini",
  "Blender",
  "Cinema 4D",
  "Substance",
];

export default function MediaLibraryEditor() {
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "project" | "reel" | "featured">("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    {
      id: 1,
      title: "Pushpa 2: The Rule",
      type: "project",
      isReel: false,
      thumbnail: "https://horizonvfx.in/images/Pushpa_2.png",
      video: "https://www.horizonvfx.in/images/reel1.mp4",
      category: "Film & OTT",
      isFeatured: true,
      isPublic: true,
      description: "Mind-bending visual effects for the blockbuster sequel",
      gradient: "from-orange-500 via-red-500 to-pink-500",
      stats: "200+ VFX Shots",
      technologies: ["Nuke", "Maya", "After Effects"],
      createdAt: Date.now() - 100000,
    },
    {
      id: 2,
      title: "Commercial Campaign",
      type: "project",
      isReel: false,
      thumbnail: "https://horizonvfx.in/images/Commercial.jpg",
      category: "Advertisement",
      isFeatured: true,
      isPublic: true,
      description: "Stunning commercial visuals with photorealistic CG",
      gradient: "from-cyan-500 via-blue-500 to-purple-500",
      stats: "50+ Shots",
      technologies: ["After Effects", "Cinema 4D"],
      createdAt: Date.now() - 200000,
    },
    {
      id: 3,
      title: "Game Cinematics Reel",
      type: "reel",
      isReel: true,
      thumbnail: "https://horizonvfx.in/images/game.jpg",
      category: "Gaming",
      isFeatured: true,
      isPublic: true,
      description: "Immersive game trailers and cinematic sequences",
      gradient: "from-purple-500 via-pink-500 to-rose-500",
      technologies: ["Unreal Engine", "Maya"],
      createdAt: Date.now() - 300000,
    },
  ]);

  const handleSave = () => {
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 1000);
  };

  const updateMediaItem = (id: number, field: string, value: any) => {
    setMediaItems(
      mediaItems.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const addMediaItem = () => {
    const newId = Math.max(...mediaItems.map((item) => item.id), 0) + 1;
    const newItem: MediaItem = {
      id: newId,
      title: "New Project",
      type: "project",
      isReel: false,
      thumbnail: "",
      category: "Film & OTT",
      isFeatured: false,
      isPublic: true,
      gradient: "from-blue-500 to-purple-500",
      technologies: [],
      createdAt: Date.now(),
    };
    // Prepend to the beginning of array
    setMediaItems([newItem, ...mediaItems]);
    setEditingId(newId);
    setCurrentPage(1); // Go to first page to see the new item
  };

  const removeMediaItem = (id: number) => {
    if (mediaItems.length > 1) {
      setMediaItems(mediaItems.filter((item) => item.id !== id));
      if (editingId === id) setEditingId(null);
    }
  };

  const updateTechnology = (id: number, techIndex: number, value: string) => {
    setMediaItems(
      mediaItems.map((item) =>
        item.id === id
          ? {
              ...item,
              technologies: item.technologies?.map((tech, idx) =>
                idx === techIndex ? value : tech
              ),
            }
          : item
      )
    );
  };

  const addTechnology = (id: number) => {
    setMediaItems(
      mediaItems.map((item) =>
        item.id === id
          ? { ...item, technologies: [...(item.technologies || []), ""] }
          : item
      )
    );
  };

  const removeTechnology = (id: number, techIndex: number) => {
    setMediaItems(
      mediaItems.map((item) =>
        item.id === id
          ? {
              ...item,
              technologies: item.technologies?.filter((_, idx) => idx !== techIndex),
            }
          : item
      )
    );
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    field: "thumbnail" | "video"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateMediaItem(id, field, url);
    }
  };

  // Sort items by createdAt (newest first)
  const sortedItems = [...mediaItems].sort((a, b) => b.createdAt - a.createdAt);

  // Filter items
  const filteredItems = sortedItems.filter((item) => {
    const searchLower = searchQuery.toLowerCase().trim();
    const matchesSearch =
      searchLower === "" ||
      item.title.toLowerCase().includes(searchLower) ||
      item.category.toLowerCase().includes(searchLower) ||
      item.description?.toLowerCase().includes(searchLower) ||
      item.technologies?.some((tech) => tech.toLowerCase().includes(searchLower));

    const matchesType =
      filterType === "all" ||
      (filterType === "featured" && item.isFeatured) ||
      item.type === filterType ||
      (filterType === "reel" && item.isReel);

    const matchesCategory = filterCategory === "all" || item.category === filterCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
            <Image className="text-indigo-600" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Media Library</h1>
            <p className="text-sm text-slate-600">Manage projects and reels</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={addMediaItem}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus size={18} />
            Add New
          </button>
          <button
            onClick={handleSave}
            disabled={saveStatus === "saving"}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Save size={18} />
            {saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "Saved!" : "Save All"}
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              placeholder="Search by title, category, description, or technology..."
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-slate-400" />
            <select
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value as any);
                setCurrentPage(1); // Reset to first page on filter change
              }}
              className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="featured">Featured Only</option>
              <option value="project">Projects</option>
              <option value="reel">Reels</option>
            </select>
          </div>

          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* View Toggle */}
          <div className="flex items-center gap-2 border border-slate-200 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded transition-colors ${
                viewMode === "grid" ? "bg-indigo-100 text-indigo-600" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded transition-colors ${
                viewMode === "list" ? "bg-indigo-100 text-indigo-600" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Media Items */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        {/* Results Info */}
        <div className="px-6 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <p className="text-sm text-slate-600">
            Showing <span className="font-semibold text-slate-900">{paginatedItems.length}</span> of{" "}
            <span className="font-semibold text-slate-900">{filteredItems.length}</span> items
            {filteredItems.length !== mediaItems.length && (
              <span className="text-slate-500"> (filtered from {mediaItems.length} total)</span>
            )}
          </p>
        </div>

        {viewMode === "grid" ? (
          <div className="p-6 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {paginatedItems.map((item) => (
              <MediaCard
                key={item.id}
                item={item}
                isEditing={editingId === item.id}
                onToggleEdit={() => setEditingId(editingId === item.id ? null : item.id)}
                onUpdate={(field, value) => updateMediaItem(item.id, field, value)}
                onDelete={() => removeMediaItem(item.id)}
                onFileUpload={(field, e) => handleFileUpload(e, item.id, field)}
                onTechnologyUpdate={(idx, val) => updateTechnology(item.id, idx, val)}
                onTechnologyAdd={() => addTechnology(item.id)}
                onTechnologyRemove={(idx) => removeTechnology(item.id, idx)}
              />
            ))}
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {paginatedItems.map((item) => (
              <MediaListItem
                key={item.id}
                item={item}
                isEditing={editingId === item.id}
                onToggleEdit={() => setEditingId(editingId === item.id ? null : item.id)}
                onUpdate={(field, value) => updateMediaItem(item.id, field, value)}
                onDelete={() => removeMediaItem(item.id)}
                onFileUpload={(field, e) => handleFileUpload(e, item.id, field)}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === pageNum
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Quick Tips */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-indigo-900 mb-2">💡 Tips</h3>
        <ul className="text-sm text-indigo-800 space-y-1">
          <li>• Upload thumbnails and videos directly from your computer.</li>
          <li>• Featured items appear prominently on the showcase page.</li>
          <li>• Toggle visibility with the Public/Private setting.</li>
          <li>• Videos play when users click on the thumbnail image.</li>
          <li>• Use technologies to showcase the tools used in each project.</li>
        </ul>
      </div>
    </div>
  );
}

// Media Grid Card Component
function MediaCard({
  item,
  isEditing,
  onToggleEdit,
  onUpdate,
  onDelete,
  onFileUpload,
  onTechnologyUpdate,
  onTechnologyAdd,
  onTechnologyRemove,
}: {
  item: MediaItem;
  isEditing: boolean;
  onToggleEdit: () => void;
  onUpdate: (field: string, value: any) => void;
  onDelete: () => void;
  onFileUpload: (field: "thumbnail" | "video", e: React.ChangeEvent<HTMLInputElement>) => void;
  onTechnologyUpdate: (index: number, value: string) => void;
  onTechnologyAdd: () => void;
  onTechnologyRemove: (index: number) => void;
}) {
  return (
    <motion.div
      layout
      className={`bg-slate-50 rounded-xl border ${isEditing ? "border-indigo-500" : "border-slate-200"} overflow-hidden`}
    >
      {/* Thumbnail/Video Preview */}
      <div className="relative aspect-video bg-zinc-900">
        {item.thumbnail ? (
          <>
            <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
            {item.video && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                <Film className="text-white" size={48} />
              </div>
            )}
            {item.isFeatured && (
              <div className="absolute top-2 left-2">
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full">
                  <Star size={12} />
                  Featured
                </span>
              </div>
            )}
            {!item.isPublic && (
              <div className="absolute top-2 right-2">
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-700 text-white text-xs font-bold rounded-full">
                  <Lock size={12} />
                  Private
                </span>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-zinc-800/50">
            <Upload size={32} className="mb-2 opacity-50" />
            <span className="text-sm">No image</span>
            <span className="text-xs text-gray-500 mt-1">Upload a thumbnail</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {isEditing ? (
          <>
            <input
              type="text"
              value={item.title}
              onChange={(e) => onUpdate("title", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-semibold"
              placeholder="Project title"
            />

            <div className="grid grid-cols-2 gap-2">
              <select
                value={item.type}
                onChange={(e) => {
                  const newType = e.target.value as "project" | "reel";
                  onUpdate("type", newType);
                  // Sync isReel flag with type
                  onUpdate("isReel", newType === "reel");
                }}
                className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="project">Project</option>
                <option value="reel">Reel</option>
              </select>

              <select
                value={item.category}
                onChange={(e) => onUpdate("category", e.target.value)}
                className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <textarea
              value={item.description || ""}
              onChange={(e) => onUpdate("description", e.target.value)}
              rows={2}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="Description"
            />

            <input
              type="text"
              value={item.stats || ""}
              onChange={(e) => onUpdate("stats", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Stats (e.g., 200+ VFX Shots)"
            />

            <select
              value={item.gradient}
              onChange={(e) => onUpdate("gradient", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {gradients.map((grad) => (
                <option key={grad} value={grad}>
                  {grad}
                </option>
              ))}
            </select>

            {/* Technologies */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-slate-600">Technologies</label>
                <button
                  onClick={onTechnologyAdd}
                  className="text-xs text-indigo-600 hover:text-indigo-800"
                >
                  + Add
                </button>
              </div>
              <div className="space-y-1">
                {item.technologies?.map((tech, idx) => (
                  <div key={idx} className="flex gap-1">
                    <select
                      value={tech}
                      onChange={(e) => onTechnologyUpdate(idx, e.target.value)}
                      className="flex-1 px-2 py-1 text-xs border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      {techOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {item.technologies && item.technologies.length > 1 && (
                      <button
                        onClick={() => onTechnologyRemove(idx)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* File Uploads */}
            <div className="space-y-2">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Thumbnail</label>
                <label className="block">
                  <div className="flex items-center gap-2 px-3 py-2 border border-dashed border-slate-300 rounded cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors">
                    <Upload size={14} />
                    <span className="text-xs text-slate-600">Upload image</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => onFileUpload("thumbnail", e)}
                  />
                </label>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Video (optional)</label>
                <label className="block">
                  <div className="flex items-center gap-2 px-3 py-2 border border-dashed border-slate-300 rounded cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors">
                    <Upload size={14} />
                    <span className="text-xs text-slate-600">Upload video</span>
                  </div>
                  <input
                    type="file"
                    accept="video/mp4,video/webm"
                    className="hidden"
                    onChange={(e) => onFileUpload("video", e)}
                  />
                </label>
              </div>
            </div>

            {/* Toggles */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
              <button
                onClick={() => onUpdate("isFeatured", !item.isFeatured)}
                className={`flex items-center gap-2 text-sm ${
                  item.isFeatured ? "text-yellow-600" : "text-slate-400"
                }`}
              >
                <Star size={16} fill={item.isFeatured ? "currentColor" : "none"} />
                Featured
              </button>

              <button
                onClick={() => onUpdate("isPublic", !item.isPublic)}
                className={`flex items-center gap-2 text-sm ${
                  item.isPublic ? "text-green-600" : "text-slate-400"
                }`}
              >
                {item.isPublic ? <Unlock size={16} /> : <Lock size={16} />}
                {item.isPublic ? "Public" : "Private"}
              </button>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={onToggleEdit}
                className="flex-1 px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Done
              </button>
              <button
                onClick={onDelete}
                className="px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-block px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded mb-1">
                  {item.type}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.category}</p>
              </div>
            </div>

            {item.description && (
              <p className="text-sm text-slate-600 line-clamp-2">{item.description}</p>
            )}

            {item.stats && (
              <p className="text-xs text-slate-500">{item.stats}</p>
            )}

            {item.technologies && item.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {item.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-slate-200 text-slate-700 text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-2 border-t border-slate-200">
              <button
                onClick={onToggleEdit}
                className="flex-1 px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={onDelete}
                className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

// Media List Item Component
function MediaListItem({
  item,
  isEditing,
  onToggleEdit,
  onUpdate,
  onDelete,
  onFileUpload,
}: {
  item: MediaItem;
  isEditing: boolean;
  onToggleEdit: () => void;
  onUpdate: (field: string, value: any) => void;
  onDelete: () => void;
  onFileUpload: (field: "thumbnail" | "video", e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className={`p-4 ${isEditing ? "bg-indigo-50" : ""} hover:bg-slate-50 transition-colors`}>
      <div className="flex items-start gap-4">
        {/* Thumbnail */}
        <div className="relative w-32 h-20 flex-shrink-0 bg-zinc-900 rounded-lg overflow-hidden">
          {item.thumbnail ? (
            <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-zinc-800/50">
              <Upload size={16} className="mb-1 opacity-50" />
              <span className="text-xs">No image</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={item.title}
                onChange={(e) => onUpdate("title", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Project title"
              />

              <div className="flex gap-2">
                <select
                  value={item.type}
                  onChange={(e) => {
                    const newType = e.target.value as "project" | "reel";
                    onUpdate("type", newType);
                    // Sync isReel flag with type
                    onUpdate("isReel", newType === "reel");
                  }}
                  className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="project">Project</option>
                  <option value="reel">Reel</option>
                </select>

                <select
                  value={item.category}
                  onChange={(e) => onUpdate("category", e.target.value)}
                  className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => onUpdate("isFeatured", !item.isFeatured)}
                  className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                    item.isFeatured ? "bg-yellow-100 text-yellow-700" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  <Star size={16} fill={item.isFeatured ? "currentColor" : "none"} />
                </button>

                <button
                  onClick={() => onUpdate("isPublic", !item.isPublic)}
                  className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                    item.isPublic ? "bg-green-100 text-green-700" : "bg-slate-700 text-white"
                  }`}
                >
                  {item.isPublic ? <Unlock size={16} /> : <Lock size={16} />}
                </button>
              </div>

              <div className="flex gap-2">
                <label className="flex-1">
                  <div className="flex items-center gap-2 px-3 py-2 border border-dashed border-slate-300 rounded cursor-pointer hover:border-indigo-500">
                    <Upload size={14} />
                    <span className="text-xs">Thumbnail</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => onFileUpload("thumbnail", e)}
                  />
                </label>

                <label className="flex-1">
                  <div className="flex items-center gap-2 px-3 py-2 border border-dashed border-slate-300 rounded cursor-pointer hover:border-indigo-500">
                    <Upload size={14} />
                    <span className="text-xs">Video</span>
                  </div>
                  <input
                    type="file"
                    accept="video/mp4,video/webm"
                    className="hidden"
                    onChange={(e) => onFileUpload("video", e)}
                  />
                </label>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={onToggleEdit}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg"
                >
                  Done
                </button>
                <button
                  onClick={onDelete}
                  className="px-3 py-2 text-sm text-red-600 bg-red-50 rounded-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-block px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded">
                  {item.type}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                {item.isFeatured && (
                  <Star size={16} className="text-yellow-500" fill="currentColor" />
                )}
                {!item.isPublic && (
                  <Lock size={16} className="text-slate-400" />
                )}
              </div>
              <p className="text-sm text-slate-500">{item.category}</p>
              {item.description && (
                <p className="text-sm text-slate-600 mt-1">{item.description}</p>
              )}
            </div>
          )}

          {!isEditing && (
            <div className="flex items-center gap-2">
              <button
                onClick={onToggleEdit}
                className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={onDelete}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
