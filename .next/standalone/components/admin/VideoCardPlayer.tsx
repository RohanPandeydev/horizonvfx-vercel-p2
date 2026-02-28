"use client";
import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import Hls from "hls.js";

interface VideoCardPlayerProps {
  videoUrl: string;
  thumbnail?: string;
  className?: string;
  onExpand?: () => void;
}

export default function VideoCardPlayer({
  videoUrl,
  thumbnail,
  className = "",
  onExpand,
}: VideoCardPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Initialize HLS
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setHasError(false);

    // Check if HLS is needed (.m3u8 files) or if native playback can be used
    if (Hls.isSupported() && videoUrl.includes(".m3u8")) {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }

      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });

      hls.loadSource(videoUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.ERROR, function (event, data) {
        if (data.fatal) {
          console.error("HLS fatal error:", data);
          setHasError(true);
        }
      });

      hlsRef.current = hls;
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native HLS support (Safari)
      video.src = videoUrl;
    } else {
      // Regular MP4/WebM playback
      video.src = videoUrl;
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [videoUrl]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video || hasError) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(err => {
        console.error("Play error:", err);
        setHasError(true);
      });
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(!video.muted);
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  return (
    <div
      className={`relative bg-black rounded-lg overflow-hidden group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={thumbnail}
        playsInline
        muted={isMuted}
        onPlay={handlePlay}
        onPause={handlePause}
        onError={() => setHasError(true)}
      />

      {/* Error overlay */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <p className="text-white text-sm">Video unavailable</p>
        </div>
      )}

      {/* Controls overlay - always visible on hover, or when paused */}
      {(isHovered || !isPlaying) && !hasError && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          {/* Play/Pause button */}
          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
          >
            {isPlaying ? (
              <Pause size={20} className="text-black" fill="currentColor" />
            ) : (
              <Play size={20} className="text-black ml-0.5" fill="currentColor" />
            )}
          </button>

          {/* Expand button - bottom left */}
          {onExpand && (
            <button
              onClick={onExpand}
              className="absolute bottom-2 left-2 p-1.5 rounded bg-black/60 text-white hover:bg-black/80 transition-colors"
              title="Open in modal"
            >
              <Maximize2 size={14} />
            </button>
          )}

          {/* Mute button - bottom right */}
          <button
            onClick={toggleMute}
            className="absolute bottom-2 right-2 p-1.5 rounded bg-black/60 text-white hover:bg-black/80 transition-colors"
          >
            {isMuted ? (
              <VolumeX size={14} />
            ) : (
              <Volume2 size={14} />
            )}
          </button>
        </div>
      )}

      {/* Playing indicator */}
      {isPlaying && !isHovered && (
        <div className="absolute top-2 right-2 px-2 py-1 rounded bg-black/60 text-white text-xs">
          Playing
        </div>
      )}
    </div>
  );
}
