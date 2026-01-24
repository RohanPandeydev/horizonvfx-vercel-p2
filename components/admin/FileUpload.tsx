import React, { useState, useEffect } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { validateImageFile, validateVideoFile } from "@/lib/validation";
import { authFetch, createBlobUrl, revokeBlobUrl } from "@/lib/auth-helper";

interface FileUploadProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  onError?: (error: string) => void;
  onSuccess?: (message: string) => void;
  accept?: "image" | "video";
  maxSizeMB?: number;
  placeholder?: string;
  showPreview?: boolean;
  className?: string;
  category?: string; // Category for S3 folder (e.g., 'team', 'about', 'showcase')
}

export default function FileUpload({
  label,
  value,
  onChange,
  onError,
  onSuccess,
  accept = "image",
  maxSizeMB = 5,
  placeholder = "Or enter image URL",
  showPreview = true,
  className = "",
  category = "general",
}: FileUploadProps) {
  const [previewError, setPreviewError] = useState(false);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Clean up object URL on unmount
  useEffect(() => {
    return () => {
      if (objectUrl) {
        revokeBlobUrl(objectUrl);
      }
    };
  }, [objectUrl]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Revoke previous object URL if exists
    if (objectUrl) {
      revokeBlobUrl(objectUrl);
      setObjectUrl(null);
    }

    // Validate file
    const validateFn = accept === "video"
      ? (f: File) => validateVideoFile(f, maxSizeMB)
      : (f: File) => validateImageFile(f, maxSizeMB);

    const validation = validateFn(file);
    if (!validation.isValid) {
      setPreviewError(true);
      onError?.(validation.error || "Invalid file");
      return;
    }

    // Create blob URL for immediate preview
    const blobUrl = createBlobUrl(file);
    setObjectUrl(blobUrl);

    // Upload to server
    setUploading(true);
    setUploadProgress(0);

    try {
      // Extract old media ID from current value if it's an API URL
      const oldMediaId = value.startsWith('/api/media/')
        ? value.split('/').pop()
        : null;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", category);
      formData.append("subfolder", accept === "video" ? "videos" : "images");
      if (oldMediaId) {
        formData.append("oldMediaId", oldMediaId);
      }

      const response = await authFetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Upload failed");
      }

      // Success - update with the new URL
      onChange(result.data.url);
      setPreviewError(false);
      onSuccess?.("File uploaded successfully!");
    } catch (error: any) {
      setPreviewError(true);
      onError?.(error.message || "Failed to upload file");
      // Keep the blob preview even if upload fails
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    onChange(url);
    setPreviewError(false);

    // Revoke object URL when user switches to manual URL entry
    if (objectUrl && !url.startsWith('blob:')) {
      revokeBlobUrl(objectUrl);
      setObjectUrl(null);
    }
  };

  const handleRemovePreview = () => {
    if (objectUrl) {
      revokeBlobUrl(objectUrl);
      setObjectUrl(null);
    }
    onChange("");
    setPreviewError(false);
  };

  const acceptTypes = accept === "video"
    ? "video/mp4,video/webm,video/quicktime"
    : "image/*";

  // Determine which URL to show (object URL takes precedence)
  const displayUrl = objectUrl || value;

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {label}
        </label>
      )}
      <div className="space-y-3">
        {/* File Upload Button */}
        <label className="block">
          <div className={`flex items-center gap-2 px-4 py-3 border-2 border-dashed rounded-lg transition-colors ${
            uploading
              ? "border-slate-300 bg-slate-50 cursor-not-allowed"
              : "border-slate-300 cursor-pointer hover:border-blue-500 hover:bg-blue-50"
          }`}>
            {uploading ? (
              <>
                <Loader2 size={20} className="text-slate-400 animate-spin" />
                <span className="text-sm text-slate-600">
                  Uploading... {uploadProgress}%
                </span>
              </>
            ) : (
              <>
                <Upload size={20} className="text-slate-400" />
                <span className="text-sm text-slate-600">
                  Upload {accept} (Max {maxSizeMB}MB)
                </span>
              </>
            )}
          </div>
          <input
            type="file"
            accept={acceptTypes}
            className="hidden"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>

        {/* URL Input */}
        <div className="relative">
          <input
            type="text"
            value={value}
            onChange={handleUrlChange}
            className="w-full px-4 py-3 pr-10 text-black border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-black"
            placeholder={placeholder}
          />
          {value && (
            <button
              type="button"
              onClick={handleRemovePreview}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors"
              title="Clear"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Preview */}
        {showPreview && displayUrl && !previewError && (
          <div className="mt-2 relative group">
            {accept === "video" ? (
              <video
                src={displayUrl}
                controls
                className="w-full h-32 object-cover rounded-lg bg-black"
                onError={() => setPreviewError(true)}
              />
            ) : (
              <img
                src={displayUrl}
                alt="Preview"
                className="w-full h-32 object-cover rounded-lg bg-slate-100"
                onError={() => setPreviewError(true)}
              />
            )}
            <button
              type="button"
              onClick={handleRemovePreview}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              title="Remove preview"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Preview Error */}
        {previewError && (
          <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">
              Failed to load preview. Please check the URL or try uploading again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
