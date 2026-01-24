"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Settings,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Gauge,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Hls from "hls.js";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
  thumbnail: string;
}

interface QualityLevel {
  height: number;
  width: number;
  bitrate: number;
  name: string;
}

export default function VideoModal({
  isOpen,
  onClose,
  videoUrl,
  title,
  thumbnail,
}: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [qualityLevels, setQualityLevels] = useState<QualityLevel[]>([]);
  const [currentQuality, setCurrentQuality] = useState<number>(-1); // -1 = auto
  const [showSettings, setShowSettings] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [bufferProgress, setBufferProgress] = useState(0);

  // Initialize HLS
  useEffect(() => {
    if (!isOpen || !videoRef.current) return;

    const video = videoRef.current;

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

      hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
        if (data.levels && data.levels[0] && data.levels[0].details) {
          setDuration(data.levels[0].details.totalduration || 0);
        }

        // Extract quality levels
        const levels: QualityLevel[] = data.levels.map((level, index) => ({
          height: level.height,
          width: level.width,
          bitrate: level.bitrate,
          name: getQualityName(level.height),
        }));
        setQualityLevels(levels);
      });

      hls.on(Hls.Events.LEVEL_SWITCHED, function (event, data) {
        setCurrentQuality(hls.levels[data.level].height);
      });

      hls.on(Hls.Events.ERROR, function (event, data) {
        if (data.fatal) {
          console.error("HLS fatal error:", data);
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
  }, [isOpen, videoUrl]);

  // Update time and buffer
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      // Update buffer progress
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const bufferPercent = (bufferedEnd / video.duration) * 100;
        setBufferProgress(bufferPercent);
      }
    };
    const handleLoadedMetadata = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleWaiting = () => console.log("Video buffering...");
    const handleCanPlay = () => console.log("Video ready to play");

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("canplay", handleCanPlay);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [isOpen]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      const video = videoRef.current;
      if (!video) return;

      switch (e.key) {
        case " ":
        case "k":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowRight":
          e.preventDefault();
          video.currentTime = Math.min(video.currentTime + 5, video.duration);
          break;
        case "ArrowLeft":
          e.preventDefault();
          video.currentTime = Math.max(video.currentTime - 5, 0);
          break;
        case "ArrowUp":
          e.preventDefault();
          video.volume = Math.min(video.volume + 0.1, 1);
          setVolume(video.volume);
          break;
        case "ArrowDown":
          e.preventDefault();
          video.volume = Math.max(video.volume - 0.1, 0);
          setVolume(video.volume);
          break;
        case "m":
          e.preventDefault();
          toggleMute();
          break;
        case "f":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isPlaying, volume, isFullscreen]);

  // Auto-hide controls
  const resetControlsTimeout = useCallback(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    setShowControls(true);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      resetControlsTimeout();
    }
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying, resetControlsTimeout]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(!video.muted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = parseFloat(e.target.value);
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = parseFloat(e.target.value);
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleQualityChange = (height: number) => {
    const hls = hlsRef.current;
    if (!hls) return;

    if (height === -1) {
      // Auto quality
      hls.currentLevel = -1;
      setCurrentQuality(-1);
    } else {
      // Find level with matching height
      const levelIndex = hls.levels.findIndex((level) => level.height === height);
      if (levelIndex !== -1) {
        hls.currentLevel = levelIndex;
        setCurrentQuality(height);
      }
    }
    setShowQualityMenu(false);
  };

  const handleSpeedChange = (rate: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = rate;
    setPlaybackRate(rate);
    setShowSpeedMenu(false);
  };

  const toggleFullscreen = () => {
    const container = document.getElementById("video-container");
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getQualityName = (height: number) => {
    if (height >= 2160) return "4K";
    if (height >= 1080) return "1080p";
    if (height >= 720) return "720p";
    if (height >= 480) return "480p";
    if (height >= 360) return "360p";
    return `${height}p`;
  };

  const playbackSpeeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            onMouseMove={resetControlsTimeout}
          >
            {/* Header */}
            <div
              className={`absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 via-black/50 to-transparent p-6 transition-opacity duration-300 ${
                showControls ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">{title}</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 text-white hover:text-blue-400 transition-colors"
                    title="Fullscreen (F)"
                  >
                    {isFullscreen ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 text-white hover:text-red-400 transition-colors"
                    title="Close (Esc)"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
            </div>

            {/* Video Container */}
            <div id="video-container" className="relative aspect-video bg-black">
              <video
                ref={videoRef}
                className="w-full h-full"
                poster={thumbnail}
                playsInline
                controls={false}
                onClick={togglePlay}
              />

              {/* Play/Pause Overlay */}
              {!isPlaying && (
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors group"
                >
                  <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play size={32} className="text-black ml-1" fill="currentColor" />
                  </div>
                </button>
              )}

              {/* Video Controls */}
              <div
                className={`absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black via-black/80 to-transparent p-6 transition-opacity duration-300 ${
                  showControls ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* Progress Bar */}
                <div className="mb-4">
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    style={{
                      background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                        (currentTime / (duration || 1)) * 100
                      }%, rgba(255,255,255,0.3) ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.3) ${bufferProgress}%, #4b5563 ${bufferProgress}%)`,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Play/Pause */}
                    <button
                      onClick={togglePlay}
                      className="text-white hover:text-blue-400 transition-colors"
                      title={isPlaying ? "Pause (Space)" : "Play (Space)"}
                    >
                      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>

                    {/* Volume */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={toggleMute}
                        className="text-white hover:text-blue-400 transition-colors"
                        title="Mute (M)"
                      >
                        {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        title="Volume (↑/↓)"
                      />
                    </div>

                    {/* Time */}
                    <span className="text-white text-sm font-medium">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Settings */}
                    <div className="relative">
                      <button
                        onClick={() => {
                          setShowSettings(!showSettings);
                          setShowQualityMenu(false);
                          setShowSpeedMenu(false);
                        }}
                        className="p-2 text-white hover:text-blue-400 transition-colors"
                        title="Settings"
                      >
                        <Settings size={20} />
                      </button>

                      {/* Settings Menu */}
                      {showSettings && (
                        <div className="absolute bottom-full right-0 mb-2 w-48 bg-black/95 rounded-lg overflow-hidden border border-gray-700">
                          {/* Quality */}
                          <div className="relative">
                            <button
                              onClick={() => {
                                setShowQualityMenu(!showQualityMenu);
                                setShowSpeedMenu(false);
                              }}
                              className="w-full px-4 py-3 flex items-center justify-between text-white hover:bg-gray-800 transition-colors"
                            >
                              <span className="text-sm">Quality</span>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400">
                                  {currentQuality === -1 ? "Auto" : `${currentQuality}p`}
                                </span>
                                {showQualityMenu ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                              </div>
                            </button>

                            {showQualityMenu && (
                              <div className="absolute bottom-full left-0 right-0 mb-1 bg-black/95 rounded-lg overflow-hidden border border-gray-700 max-h-60 overflow-y-auto">
                                <button
                                  onClick={() => handleQualityChange(-1)}
                                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-800 transition-colors ${
                                    currentQuality === -1 ? "text-blue-400" : "text-white"
                                  }`}
                                >
                                  Auto
                                </button>
                                {qualityLevels.map((level) => (
                                  <button
                                    key={level.height}
                                    onClick={() => handleQualityChange(level.height)}
                                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-800 transition-colors flex items-center justify-between ${
                                      currentQuality === level.height ? "text-blue-400" : "text-white"
                                    }`}
                                  >
                                    <span>{level.name}</span>
                                    {level.bitrate > 0 && (
                                      <span className="text-xs text-gray-400">
                                        {Math.round(level.bitrate / 1000)}k
                                      </span>
                                    )}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Playback Speed */}
                          <div className="relative border-t border-gray-700">
                            <button
                              onClick={() => {
                                setShowSpeedMenu(!showSpeedMenu);
                                setShowQualityMenu(false);
                              }}
                              className="w-full px-4 py-3 flex items-center justify-between text-white hover:bg-gray-800 transition-colors"
                            >
                              <span className="text-sm">Speed</span>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400">{playbackRate}x</span>
                                {showSpeedMenu ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                              </div>
                            </button>

                            {showSpeedMenu && (
                              <div className="absolute bottom-full left-0 right-0 mb-1 bg-black/95 rounded-lg overflow-hidden border border-gray-700 max-h-60 overflow-y-auto">
                                {playbackSpeeds.map((speed) => (
                                  <button
                                    key={speed}
                                    onClick={() => handleSpeedChange(speed)}
                                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-800 transition-colors ${
                                      playbackRate === speed ? "text-blue-400" : "text-white"
                                    }`}
                                  >
                                    {speed}x
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Fullscreen */}
                    <button
                      onClick={toggleFullscreen}
                      className="p-2 text-white hover:text-blue-400 transition-colors"
                      title="Fullscreen (F)"
                    >
                      {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                    </button>
                  </div>
                </div>

                {/* Keyboard Shortcuts Hint */}
                <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-gray-800 rounded">Space</kbd> Play/Pause
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-gray-800 rounded">←</kbd>
                    <kbd className="px-1.5 py-0.5 bg-gray-800 rounded">→</kbd> Seek
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-gray-800 rounded">M</kbd> Mute
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-gray-800 rounded">F</kbd> Fullscreen
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
