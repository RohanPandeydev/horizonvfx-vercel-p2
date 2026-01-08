"use client";

import { useState } from "react";
import { Upload, Search, Filter, Trash2, Download, Eye } from "lucide-react";

interface MediaFile {
  id: string;
  name: string;
  type: "image" | "video";
  url: string;
  size: string;
  uploaded: string;
}

export default function MediaPage() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([
    {
      id: "1",
      name: "hero-banner.jpg",
      type: "image",
      url: "/images/hero-banner.jpg",
      size: "2.4 MB",
      uploaded: "2025-01-04",
    },
    {
      id: "2",
      name: "team-member-1.jpg",
      type: "image",
      url: "/images/team-1.jpg",
      size: "856 KB",
      uploaded: "2025-01-03",
    },
    {
      id: "3",
      name: "project-showcase.mp4",
      type: "video",
      url: "/videos/showcase.mp4",
      size: "45.2 MB",
      uploaded: "2025-01-02",
    },
    {
      id: "4",
      name: "about-image.jpg",
      type: "image",
      url: "/images/about.jpg",
      size: "1.2 MB",
      uploaded: "2025-01-01",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "image" | "video">("all");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const filteredFiles = mediaFiles.filter((file) => {
    const matchesSearch = file.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || file.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this file?")) {
      setMediaFiles(mediaFiles.filter((file) => file.id !== id));
    }
  };

  const handleBulkDelete = () => {
    if (
      confirm(`Are you sure you want to delete ${selectedFiles.length} files?`)
    ) {
      setMediaFiles(mediaFiles.filter((file) => !selectedFiles.includes(file.id)));
      setSelectedFiles([]);
    }
  };

  const toggleFileSelection = (id: string) => {
    setSelectedFiles((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Will be replaced with actual upload logic
      console.log("Files to upload:", files);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Media Library</h1>
          <p className="text-gray-400">Manage images and videos</p>
        </div>
        <button
          onClick={() => setUploadModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Upload className="w-5 h-5" />
          Upload Files
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-black/50 backdrop-blur-xl border border-gray-800 rounded-xl p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search media..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-all"
            >
              <option value="all">All Media</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
            </select>
          </div>
          {selectedFiles.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20 transition-all"
            >
              <Trash2 className="w-4 h-4" />
              Delete Selected ({selectedFiles.length})
            </button>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-gray-800 rounded-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold text-white mb-4">Upload Files</h2>
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-purple-500 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-300 mb-2">
                Drag and drop files here, or click to browse
              </p>
              <p className="text-gray-500 text-sm">
                Supports: JPG, PNG, GIF, MP4, WebM
              </p>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-block mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors cursor-pointer"
              >
                Choose Files
              </label>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setUploadModalOpen(false)}
                className="px-4 py-2 border border-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all">
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredFiles.map((file) => (
          <div
            key={file.id}
            className="group bg-black/50 backdrop-blur-xl border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all"
          >
            {/* Preview */}
            <div className="relative aspect-video bg-black/30 flex items-center justify-center">
              {file.type === "image" ? (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-4xl">🖼️</span>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-4xl">🎬</span>
                </div>
              )}

              {/* Checkbox */}
              <div className="absolute top-2 left-2">
                <input
                  type="checkbox"
                  checked={selectedFiles.includes(file.id)}
                  onChange={() => toggleFileSelection(file.id)}
                  className="w-4 h-4 rounded border-gray-600 bg-black/50 text-purple-500 focus:ring-purple-500/20"
                />
              </div>

              {/* Actions overlay */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  className="p-2 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-all"
                  title="Preview"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  className="p-2 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-all"
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(file.id)}
                  className="p-2 bg-red-500/20 backdrop-blur-sm rounded-lg text-red-400 hover:bg-red-500/30 transition-all"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* File Info */}
            <div className="p-4">
              <h3 className="text-white font-medium truncate mb-1">
                {file.name}
              </h3>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{file.size}</span>
                <span>{file.uploaded}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFiles.length === 0 && (
        <div className="text-center py-12 bg-black/50 backdrop-blur-xl border border-gray-800 rounded-xl">
          <p className="text-gray-400">No media files found.</p>
        </div>
      )}

      {/* Storage Info */}
      <div className="bg-black/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Storage</h2>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">Used Space</span>
              <span className="text-white font-medium">65%</span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full w-[65%] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">6.5 GB of 10 GB used</span>
            <button className="text-purple-400 hover:text-purple-300 transition-colors">
              Upgrade Storage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
