"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Plus,
  Trash2,
  Grid,
  List,
  Search,
  Filter,
  Star,
  Lock,
  Unlock,
  AlertCircle,
  CheckCircle,
  Eye,
  Loader2,
} from "lucide-react";
import VideoCardPlayer from "@/components/admin/VideoCardPlayer";
import VideoModal from "@/components/VideoModal";
import { useToast } from "@/lib/toast-context";
import { authFetch } from "@/lib/auth-helper";

interface MediaItem {
  id: string;
  title: string;
  type: "project" | "reel";
  isReel: boolean;
  thumbnailUrl: string;
  videoUrl: string;
  thumbnailFile?: File; // Store file for upload on save
  videoFile?: File; // Store file for upload on save
  category: string;
  isFeatured: boolean;
  isPublic: boolean;
  description: string;
  gradient: string;
  technologies: string[];
  createdAt: string;
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

const gradients = [
  "from-orange-500 via-red-500 to-pink-500",
  "from-cyan-500 via-blue-500 to-purple-500",
  "from-purple-500 via-pink-500 to-rose-500",
  "from-green-500 via-emerald-500 to-teal-500",
  "from-blue-500 to-cyan-500",
];

// API Functions
async function fetchVideos(): Promise<MediaItem[]> {
  const response = await authFetch('/api/videos');

  if (!response.ok) throw new Error('Failed to fetch videos');

  const data = await response.json();
  // Handle both old array format and new paginated format
  return Array.isArray(data) ? data : data.videos || [];
}

async function createVideo(formData: FormData): Promise<MediaItem> {
  const response = await authFetch('/api/videos', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create video');
  }
  return response.json();
}

async function updateVideo(id: string, data: Partial<MediaItem>): Promise<MediaItem> {
  const response = await authFetch(`/api/videos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update video');
  }
  return response.json();
}

async function deleteVideo(id: string): Promise<void> {
  const response = await authFetch(`/api/videos/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete video');
  }
}

export default function MediaLibraryEditor() {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "project" | "reel" | "featured">("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<MediaItem | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Load videos on mount
  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const videos = await fetchVideos();
      setMediaItems(videos);
    } catch (err) {
      if (err instanceof Error && err.message === 'UNAUTHORIZED') {
        router.push('/hzn-ctrl-x9k2/login');
        return;
      }
      setError(err instanceof Error ? err.message : 'Failed to load videos');
      console.error('Error loading videos:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateMediaItem = (id: string, field: string, value: any) => {
    setMediaItems(
      mediaItems.map((item) => {
        if (item.id === id) {
          // Handle multiple field updates at once
          if (field === "__multiple__" && typeof value === "object") {
            return { ...item, ...value };
          }
          // Handle single field update
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  // Quick update for isFeatured and isPublic toggles
  const quickUpdateField = async (id: string, field: 'isFeatured' | 'isPublic', value: boolean) => {
    // Don't update if it's a temp item
    if (id.startsWith('temp-')) {
      updateMediaItem(id, field, value);
      return;
    }

    try {
      // Update local state immediately for responsive UI
      updateMediaItem(id, field, value);

      // Call API to persist the change
      await authFetch(`/api/videos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [field]: value }),
      });

      showSuccess(`${field === 'isFeatured' ? 'Featured' : 'Public'} status updated!`);
    } catch (err) {
      console.error('Error updating field:', err);
      // Revert the change on error
      updateMediaItem(id, field, !value);
      showError('Failed to update status');
    }
  };

  const handleOpenVideoModal = (item: MediaItem) => {
    setSelectedVideo(item);
    setIsVideoModalOpen(true);
  };

  const addMediaItem = () => {
    const newItem: MediaItem = {
      id: 'temp-' + Date.now(),
      title: "",
      type: "project",
      isReel: false,
      thumbnailUrl: "",
      videoUrl: "",
      category: "Film & OTT",
      isFeatured: false,
      isPublic: true,
      description: "",
      gradient: gradients[Math.floor(Math.random() * gradients.length)],
      technologies: [],
      createdAt: new Date().toISOString(),
    };
    setMediaItems([newItem, ...mediaItems]);
    setEditingId(newItem.id);
    setCurrentPage(1);
  };

  const removeMediaItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      if (!id.startsWith('temp-')) {
        await deleteVideo(id);
      }
      setMediaItems(mediaItems.filter((item) => item.id !== id));
      if (editingId === id) setEditingId(null);
      showSuccess("Item deleted successfully!");
    } catch (err) {
      console.error('Error deleting video:', err);
      showError('Failed to delete video');
    }
  };

  const saveMediaItem = async (id: string, item: MediaItem) => {
    try {
      // Debug logging
      console.log('Saving item:', {
        id: item.id,
        title: item.title,
        hasThumbnailFile: !!item.thumbnailFile,
        hasThumbnailUrl: !!item.thumbnailUrl,
        hasVideoFile: !!item.videoFile,
        hasVideoUrl: !!item.videoUrl,
      });

      if (id.startsWith('temp-')) {
        // Create new item - createVideo API handles file uploads
        const formData = new FormData();
        formData.append('title', item.title || '');
        formData.append('type', item.type || 'project');
        formData.append('category', item.category || 'Film & OTT');
        formData.append('isFeatured', item.isFeatured ? 'true' : 'false');
        formData.append('isPublic', item.isPublic ? 'true' : 'false');
        formData.append('description', item.description || '');
        formData.append('gradient', item.gradient || 'from-blue-500 to-purple-500');
        formData.append('technologies', JSON.stringify(item.technologies || []));

        // Append files - the API will handle the uploads
        if (item.thumbnailFile) {
          formData.append('thumbnail', item.thumbnailFile);
          console.log('Appending thumbnail file to FormData:', item.thumbnailFile.name);
        }
        if (item.videoFile) {
          formData.append('video', item.videoFile);
          console.log('Appending video file to FormData:', item.videoFile.name);
        }

        const createdItem = await createVideo(formData);

        // Update local state with the created item (with real ID)
        setMediaItems(mediaItems.map(i =>
          i.id === id ? { ...createdItem, technologies: createdItem.technologies || [] } : i
        ));

        showSuccess('Video created successfully!');
      } else {
        // Update existing item - no file uploads for updates
        const updateData = {
          title: item.title,
          type: item.type,
          isReel: item.isReel,
          category: item.category,
          isFeatured: item.isFeatured,
          isPublic: item.isPublic,
          description: item.description,
          gradient: item.gradient,
          technologies: item.technologies,
          thumbnailUrl: item.thumbnailUrl,
          videoUrl: item.videoUrl,
        };

        await updateVideo(id, updateData);
        showSuccess('Video updated successfully!');
      }
    } catch (err) {
      console.error('Error saving video:', err);
      if (err instanceof Error && err.message === 'UNAUTHORIZED') {
        router.push('/hzn-ctrl-x9k2/login');
        return;
      }
      showError('Failed to save video');
      throw err; // Re-throw to prevent closing edit mode
    }
  };

  // Sort items
  const sortedItems = [...mediaItems].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

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

    return matchesSearch && matchesType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <motion.div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      {/* Header */}
      <div className="max-w-[1800px] mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 bg-white rounded-xl shadow-sm p-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Media Library
            </h1>
            <p className="text-slate-600 mt-1">Manage your video projects and showreel</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={addMediaItem}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-sm"
            >
              <Plus size={18} />
              Add New
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by title, category, description, or technology..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder:text-slate-400"
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3">
                <Filter size={18} className="text-slate-400" />
                <select
                  value={filterType}
                  onChange={(e) => {
                    setFilterType(e.target.value as any);
                    setCurrentPage(1);
                  }}
                  className="bg-transparent py-2.5 pr-2 text-black focus:outline-none"
                >
                  <option value="all">All Types</option>
                  <option value="featured">Featured Only</option>
                  <option value="project">Projects</option>
                  <option value="reel">Reels</option>
                </select>
              </div>

              <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded transition-colors ${
                    viewMode === "grid" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded transition-colors ${
                    viewMode === "list" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-[1800px] mx-auto mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="max-w-[1800px] mx-auto">
          {/* Grid View */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedItems.map((item) => (
                <MediaGridCard
                  key={item.id}
                  item={item}
                  isEditing={editingId === item.id}
                  onToggleEdit={() => setEditingId(editingId === item.id ? null : item.id)}
                  onUpdate={(field, value) => updateMediaItem(item.id, field, value)}
                  onQuickUpdate={(field, value) => quickUpdateField(item.id, field, value)}
                  onDelete={() => removeMediaItem(item.id)}
                  onExpandVideo={handleOpenVideoModal}
                  onSave={saveMediaItem}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedItems.map((item) => (
                <MediaListItem
                  key={item.id}
                  item={item}
                  isEditing={editingId === item.id}
                  onToggleEdit={() => setEditingId(editingId === item.id ? null : item.id)}
                  onUpdate={(field, value) => updateMediaItem(item.id, field, value)}
                  onQuickUpdate={(field, value) => quickUpdateField(item.id, field, value)}
                  onDelete={() => removeMediaItem(item.id)}
                  onExpandVideo={handleOpenVideoModal}
                  onSave={saveMediaItem}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8 bg-white rounded-xl shadow-sm p-4">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 transition-colors"
              >
                Previous
              </button>
              <span className="text-slate-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          isOpen={isVideoModalOpen}
          onClose={() => {
            setIsVideoModalOpen(false);
            setSelectedVideo(null);
          }}
          videoUrl={selectedVideo.videoUrl}
          title={selectedVideo.title || 'Untitled'}
          thumbnail={selectedVideo.thumbnailUrl}
        />
      )}
    </motion.div>
  );
}

// Grid Card Component
interface MediaGridCardProps {
  item: MediaItem;
  isEditing: boolean;
  onToggleEdit: () => void;
  onUpdate: (field: string, value: any) => void;
  onQuickUpdate: (field: 'isFeatured' | 'isPublic', value: boolean) => void;
  onDelete: () => void;
  onExpandVideo: (item: MediaItem) => void;
  onSave: (id: string, item: MediaItem) => Promise<void>;
}

function MediaGridCard({ item, isEditing, onToggleEdit, onUpdate, onQuickUpdate, onDelete, onExpandVideo, onSave }: MediaGridCardProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStage, setUploadStage] = useState<string>('');

  // Manage blob URLs for video and thumbnail files
  React.useEffect(() => {
    // Clean up function for blob URLs
    let videoBlobUrl: string | null = null;
    let thumbnailBlobUrl: string | null = null;

    // Create blob URL for video file
    if (item.videoFile) {
      videoBlobUrl = URL.createObjectURL(item.videoFile);
      onUpdate("videoUrl", videoBlobUrl);
    }

    // Create blob URL for thumbnail file
    if (item.thumbnailFile) {
      thumbnailBlobUrl = URL.createObjectURL(item.thumbnailFile);
      onUpdate("thumbnailUrl", thumbnailBlobUrl);
    }

    // Cleanup: revoke blob URLs when component unmounts or files change
    return () => {
      if (videoBlobUrl) {
        URL.revokeObjectURL(videoBlobUrl);
      }
      if (thumbnailBlobUrl) {
        URL.revokeObjectURL(thumbnailBlobUrl);
      }
    };
  }, [item.videoFile, item.thumbnailFile]);

  const validateField = (field: string, value: any) => {
    let error = "";

    if (field === "title" && !value?.trim()) {
      error = "Title is required";
    }
    if (field === "category" && !value) {
      error = "Category is required";
    }
    if (field === "thumbnailUrl" && !value) {
      error = "Thumbnail is required";
    }
    if (field === "videoUrl" && !value) {
      error = "Video is required";
    }

    setErrors(prev => ({ ...prev, [field]: error }));
    return !error;
  };

  const handleBlur = (field: string, value: any) => {
    validateField(field, value);
  };

  const handleSaveItem = async () => {
    const newErrors: Record<string, string> = {};

    if (!item.title?.trim()) newErrors.title = "Title is required";
    if (!item.category) newErrors.category = "Category is required";
    if (!item.thumbnailUrl && !item.thumbnailFile) newErrors.thumbnailUrl = "Thumbnail is required";
    if (!item.videoUrl && !item.videoFile) newErrors.videoUrl = "Video is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsSaving(true);
    try {
      await onSave(item.id, item);
      onToggleEdit();
    } catch (err) {
      // Error is already handled by the parent component
      console.error('Save failed:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all ${
        isEditing ? 'ring-2 ring-purple-500' : 'hover:shadow-md'
      }`}
    >
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
        <div className="flex items-center justify-between">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            item.type === 'reel'
              ? 'bg-pink-600 text-white'
              : 'bg-purple-600 text-white'
          }`}>
            {item.type === 'reel' ? 'Reel' : 'Project'}
          </span>

          <div className="flex items-center gap-2">
            {item.isFeatured && (
              <div className="p-1.5 bg-yellow-500 rounded-full">
                <Star size={14} className="text-yellow-900 fill-yellow-900" />
              </div>
            )}
            <button
              onClick={() => onQuickUpdate("isFeatured", !item.isFeatured)}
              className={`p-2 rounded-lg transition-colors ${
                item.isFeatured ? 'bg-yellow-500/20 text-yellow-600' : 'bg-slate-100 text-slate-400'
              }`}
              title={item.isFeatured ? "Featured" : "Not Featured"}
            >
              <Star size={16} fill={item.isFeatured ? "currentColor" : "none"} />
            </button>
            <button
              onClick={() => onQuickUpdate("isPublic", !item.isPublic)}
              className={`p-2 rounded-lg transition-colors ${
                item.isPublic ? 'bg-green-500/20 text-green-600' : 'bg-slate-100 text-slate-400'
              }`}
              title={item.isPublic ? "Public" : "Private"}
            >
              {item.isPublic ? <Unlock size={16} /> : <Lock size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {isEditing ? (
          <>
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={item.title}
                onChange={(e) => onUpdate("title", e.target.value)}
                onBlur={(e) => handleBlur("title", e.target.value)}
                className={`w-full px-3 py-2 text-sm bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black placeholder:text-slate-400 ${
                  errors.title ? 'border-red-300 focus:border-red-500' : 'border-slate-200'
                }`}
                placeholder="Project title"
              />
              {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
            </div>

            {/* Type & Category */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={item.type}
                  onChange={(e) => {
                    const newType = e.target.value as "project" | "reel";
                    // Update both type and isReel in a single object
                    const updates = {
                      type: newType,
                      isReel: newType === "reel"
                    };
                    // Apply both updates atomically
                    onUpdate("__multiple__", updates);
                  }}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                >
                  <option value="project">Project</option>
                  <option value="reel">Reel</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={item.category}
                  onChange={(e) => onUpdate("category", e.target.value)}
                  onBlur={(e) => handleBlur("category", e.target.value)}
                  className={`w-full px-3 py-2 text-sm bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black ${
                    errors.category ? 'border-red-300 focus:border-red-500' : 'border-slate-200'
                  }`}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="text-xs text-red-600 mt-1">{errors.category}</p>}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={item.description}
                onChange={(e) => onUpdate("description", e.target.value)}
                onBlur={(e) => handleBlur("description", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black placeholder:text-slate-400 resize-none"
                placeholder="Project description"
              />
            </div>

            {/* Technologies */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Technologies
              </label>
              <div className="space-y-2">
                {item.technologies.map((tech, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      list="tech-options"
                      value={tech}
                      onChange={(e) => {
                        const newTechs = [...item.technologies];
                        newTechs[idx] = e.target.value;
                        onUpdate("technologies", newTechs);
                      }}
                      placeholder="Type or select technology"
                      className="flex-1 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                    />
                    <datalist id="tech-options">
                      {techOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </datalist>
                    <button
                      onClick={() => {
                        const newTechs = item.technologies.filter((_, i) => i !== idx);
                        onUpdate("technologies", newTechs);
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => onUpdate("technologies", [...item.technologies, ""])}
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                >
                  + Add Technology
                </button>
              </div>
            </div>

            {/* Thumbnail Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Thumbnail <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    console.log('Thumbnail file selected:', file.name, file.size);
                    onUpdate("thumbnailFile", file);
                    // Clear error when file is selected
                    setErrors(prev => ({ ...prev, thumbnailUrl: "" }));
                  }
                }}
                className={`w-full px-3 py-2 text-sm bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black ${
                  errors.thumbnailUrl ? 'border-red-300' : 'border-slate-200'
                }`}
              />
              {item.thumbnailFile ? (
                <p className="text-xs text-green-600 mt-1">
                  Selected: {item.thumbnailFile.name} ({(item.thumbnailFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              ) : item.thumbnailUrl ? (
                <p className="text-xs text-gray-500 mt-1 truncate">Current: {item.thumbnailUrl}</p>
              ) : null}
              {errors.thumbnailUrl && <p className="text-xs text-red-600 mt-1">{errors.thumbnailUrl}</p>}
            </div>

            {/* Video Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Video <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    console.log('Video file selected:', file.name, file.size);
                    onUpdate("videoFile", file);
                    // Clear error when file is selected
                    setErrors(prev => ({ ...prev, videoUrl: "" }));
                  }
                }}
                className={`w-full px-3 py-2 text-sm bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black ${
                  errors.videoUrl ? 'border-red-300' : 'border-slate-200'
                }`}
              />
              {item.videoFile ? (
                <p className="text-xs text-green-600 mt-1">
                  Selected: {item.videoFile.name} ({(item.videoFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              ) : item.videoUrl ? (
                <p className="text-xs text-gray-500 mt-1 truncate">Current: {item.videoUrl}</p>
              ) : null}
              {errors.videoUrl && <p className="text-xs text-red-600 mt-1">{errors.videoUrl}</p>}
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleSaveItem}
                disabled={isSaving}
                className="flex-1 px-4 py-2 text-sm font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    {uploadStage || 'Saving...'}
                  </>
                ) : (
                  'Save'
                )}
              </button>
              <button
                onClick={onToggleEdit}
                disabled={isSaving}
                className="flex-1 px-4 py-2 text-sm font-medium bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={onDelete}
                disabled={isSaving}
                className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              >
                <Trash2 size={16} />
              </button>
            </div>

            {/* Upload Progress Bar */}
            {isSaving && uploadProgress > 0 && (
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>Uploading...</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-full transition-all duration-300 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {/* View Mode */}
            <div className="space-y-3">
              <h3 className="font-bold text-slate-800 text-lg">{item.title || 'Untitled'}</h3>
              <p className="text-sm text-slate-600">{item.category}</p>
              {item.description && (
                <p className="text-sm text-slate-500 line-clamp-2">{item.description}</p>
              )}

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {item.isFeatured && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">
                    <Star size={10} fill="currentColor" />
                    Featured
                  </span>
                )}
                {!item.isPublic && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">
                    <Lock size={10} />
                    Private
                  </span>
                )}
                {item.technologies.length > 0 && (
                  item.technologies.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full"
                    >
                      {tech}
                    </span>
                  ))
                )}
              </div>

              {/* Video Preview */}
              {item.videoUrl && (
                <div className="rounded-lg overflow-hidden bg-black">
                  <VideoCardPlayer
                    videoUrl={item.videoUrl}
                    thumbnail={item.thumbnailUrl}
                    className="w-full h-48"
                    onExpand={() => onExpandVideo(item)}
                  />
                </div>
              )}

              {/* Thumbnail fallback if no video */}
              {!item.videoUrl && item.thumbnailUrl && (
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title || 'Untitled'}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
            </div>

            {/* Actions Footer */}
            <div className="flex gap-2 pt-4 border-t border-slate-200">
              <button
                onClick={onToggleEdit}
                className="flex-1 px-3 py-2 text-sm font-medium bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={onDelete}
                className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
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

// List Item Component
interface MediaListItemProps {
  item: MediaItem;
  isEditing: boolean;
  onToggleEdit: () => void;
  onUpdate: (field: string, value: any) => void;
  onQuickUpdate: (field: 'isFeatured' | 'isPublic', value: boolean) => void;
  onDelete: () => void;
  onExpandVideo: (item: MediaItem) => void;
  onSave: (id: string, item: MediaItem) => Promise<void>;
}

function MediaListItem({ item, isEditing, onToggleEdit, onUpdate, onQuickUpdate, onDelete, onExpandVideo, onSave }: MediaListItemProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStage, setUploadStage] = useState<string>('');

  // Manage blob URLs for video and thumbnail files
  React.useEffect(() => {
    // Clean up function for blob URLs
    let videoBlobUrl: string | null = null;
    let thumbnailBlobUrl: string | null = null;

    // Create blob URL for video file
    if (item.videoFile) {
      videoBlobUrl = URL.createObjectURL(item.videoFile);
      onUpdate("videoUrl", videoBlobUrl);
    }

    // Create blob URL for thumbnail file
    if (item.thumbnailFile) {
      thumbnailBlobUrl = URL.createObjectURL(item.thumbnailFile);
      onUpdate("thumbnailUrl", thumbnailBlobUrl);
    }

    // Cleanup: revoke blob URLs when component unmounts or files change
    return () => {
      if (videoBlobUrl) {
        URL.revokeObjectURL(videoBlobUrl);
      }
      if (thumbnailBlobUrl) {
        URL.revokeObjectURL(thumbnailBlobUrl);
      }
    };
  }, [item.videoFile, item.thumbnailFile]);

  const validateField = (field: string, value: any) => {
    let error = "";

    if (field === "title" && !value?.trim()) {
      error = "Title is required";
    }
    if (field === "category" && !value) {
      error = "Category is required";
    }
    if (field === "thumbnailUrl" && !value) {
      error = "Thumbnail is required";
    }
    if (field === "videoUrl" && !value) {
      error = "Video is required";
    }

    setErrors(prev => ({ ...prev, [field]: error }));
    return !error;
  };

  const handleBlur = (field: string, value: any) => {
    validateField(field, value);
  };

  const handleSaveItem = async () => {
    const newErrors: Record<string, string> = {};

    if (!item.title?.trim()) newErrors.title = "Title is required";
    if (!item.category) newErrors.category = "Category is required";
    if (!item.thumbnailUrl && !item.thumbnailFile) newErrors.thumbnailUrl = "Thumbnail is required";
    if (!item.videoUrl && !item.videoFile) newErrors.videoUrl = "Video is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsSaving(true);
    try {
      await onSave(item.id, item);
      onToggleEdit();
    } catch (err) {
      // Error is already handled by the parent component
      console.error('Save failed:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all ${
        isEditing ? 'ring-2 ring-purple-500' : 'hover:shadow-md'
      }`}
    >
      {isEditing ? (
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={item.title}
                onChange={(e) => onUpdate("title", e.target.value)}
                onBlur={(e) => handleBlur("title", e.target.value)}
                className={`w-full px-3 py-2 text-sm bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black placeholder:text-slate-400 ${
                  errors.title ? 'border-red-300' : 'border-slate-200'
                }`}
                placeholder="Project title"
              />
              {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Type <span className="text-red-500">*</span>
              </label>
              <select
                value={item.type}
                onChange={(e) => {
                  const newType = e.target.value as "project" | "reel";
                  // Update both type and isReel in a single object
                  const updates = {
                    type: newType,
                    isReel: newType === "reel"
                  };
                  // Apply both updates atomically
                  onUpdate("__multiple__", updates);
                }}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
              >
                <option value="project">Project</option>
                <option value="reel">Reel</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={item.category}
                onChange={(e) => onUpdate("category", e.target.value)}
                onBlur={(e) => handleBlur("category", e.target.value)}
                className={`w-full px-3 py-2 text-sm bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black ${
                  errors.category ? 'border-red-300' : 'border-slate-200'
                }`}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-xs text-red-600 mt-1">{errors.category}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={item.description}
              onChange={(e) => onUpdate("description", e.target.value)}
              rows={2}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black placeholder:text-slate-400 resize-none"
              placeholder="Project description"
            />
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Technologies
            </label>
            <div className="flex flex-wrap gap-2">
              {item.technologies.map((tech, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <input
                    list="tech-options-list"
                    value={tech}
                    onChange={(e) => {
                      const newTechs = [...item.technologies];
                      newTechs[idx] = e.target.value;
                      onUpdate("technologies", newTechs);
                    }}
                    placeholder="Type or select"
                    className="w-32 px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                  />
                  <datalist id="tech-options-list">
                    {techOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </datalist>
                  <button
                    onClick={() => {
                      const newTechs = item.technologies.filter((_, i) => i !== idx);
                      onUpdate("technologies", newTechs);
                    }}
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => onUpdate("technologies", [...item.technologies, ""])}
                className="px-3 py-1.5 text-sm text-purple-600 hover:text-purple-700 font-medium bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                + Add
              </button>
            </div>
          </div>

          {/* Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Thumbnail <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    onUpdate("thumbnailFile", file);
                    setErrors(prev => ({ ...prev, thumbnailUrl: "" }));
                  }
                }}
                className={`w-full px-3 py-2 text-sm bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black ${
                  errors.thumbnailUrl ? 'border-red-300' : 'border-slate-200'
                }`}
              />
              {item.thumbnailUrl && !item.thumbnailFile && (
                <p className="text-xs text-gray-500 mt-1 truncate">Current: {item.thumbnailUrl}</p>
              )}
              {errors.thumbnailUrl && <p className="text-xs text-red-600 mt-1">{errors.thumbnailUrl}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Video <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    onUpdate("videoFile", file);
                    setErrors(prev => ({ ...prev, videoUrl: "" }));
                  }
                }}
                className={`w-full px-3 py-2 text-sm bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black ${
                  errors.videoUrl ? 'border-red-300' : 'border-slate-200'
                }`}
              />
              {item.videoUrl && !item.videoFile && (
                <p className="text-xs text-gray-500 mt-1 truncate">Current: {item.videoUrl}</p>
              )}
              {item.videoFile && (
                <p className="text-xs text-green-600 mt-1">Selected: {item.videoFile.name}</p>
              )}
              {errors.videoUrl && <p className="text-xs text-red-600 mt-1">{errors.videoUrl}</p>}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={handleSaveItem}
              disabled={isSaving}
              className="px-4 py-2 text-sm font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  {uploadStage || 'Saving...'}
                </>
              ) : (
                'Save'
              )}
            </button>
            <button
              onClick={onToggleEdit}
              disabled={isSaving}
              className="px-4 py-2 text-sm font-medium bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onDelete}
              disabled={isSaving}
              className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
            >
              <Trash2 size={16} />
            </button>
          </div>

          {/* Upload Progress Bar */}
          {isSaving && uploadProgress > 0 && (
            <div className="pt-2">
              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                <span>Uploading...</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-600 to-pink-600 h-full transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="p-4">
          <div className="flex items-start gap-4">
            {/* Thumbnail/Video */}
            <div className="w-32 h-20 flex-shrink-0 bg-slate-100 rounded-lg overflow-hidden">
              {item.videoUrl ? (
                <VideoCardPlayer
                  videoUrl={item.videoUrl}
                  thumbnail={item.thumbnailUrl}
                  className="w-full h-full"
                  onExpand={() => onExpandVideo(item)}
                />
              ) : item.thumbnailUrl ? (
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  No image
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-slate-800 truncate">{item.title || 'Untitled'}</h3>
                  <p className="text-sm text-slate-600">{item.category}</p>
                </div>

                <div className="flex items-center gap-2">
                  {item.isFeatured && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">
                      <Star size={10} fill="currentColor" />
                      Featured
                    </span>
                  )}
                  {!item.isPublic && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">
                      <Lock size={10} />
                      Private
                    </span>
                  )}
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    item.type === 'reel'
                      ? 'bg-pink-100 text-pink-700'
                      : 'bg-purple-100 text-purple-700'
                  }`}>
                    {item.type}
                  </span>
                </div>
              </div>

              {item.description && (
                <p className="text-sm text-slate-500 line-clamp-2 mb-2">{item.description}</p>
              )}

              {item.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {item.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-700 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => window.open(item.videoUrl, '_blank')}
                className="p-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                title="Preview video"
              >
                <Eye size={16} />
              </button>
              <button
                onClick={onToggleEdit}
                className="px-3 py-2 text-sm font-medium bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={onDelete}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
