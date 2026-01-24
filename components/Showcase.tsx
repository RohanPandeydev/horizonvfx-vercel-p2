"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, Maximize2, ChevronDown, Loader2 } from "lucide-react";
import HolographicCard from "./HolographicCard";
import TextReveal from "./TextReveal";
import VideoModal from "./VideoModal";
import { GRADIENTS } from "@/lib/colors";

interface VideoProject {
  id: string;
  title: string;
  category: string;
  thumbnailUrl: string;
  videoUrl: string | null;
  gradient: string;
  isFeatured: boolean;
  isReel: boolean;
  isPublic: boolean;
  description: string | null;
  technologies: string[];
  type: "project" | "reel";
}

interface VideoResponse {
  videos: VideoProject[];
  pagination: {
    page: number;
    totalPages: number;
    total: number;
    hasMore: boolean;
  };
}

export default function Showcase() {
  const [projects, setProjects] = useState<VideoProject[]>([]);
  const [reels, setReels] = useState<VideoProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Pagination state
  const [projectsPage, setProjectsPage] = useState(1);
  const [reelsPage, setReelsPage] = useState(1);
  const [projectsHasMore, setProjectsHasMore] = useState(true);
  const [reelsHasMore, setReelsHasMore] = useState(true);

  const [selectedVideo, setSelectedVideo] = useState<VideoProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'reel' | 'project'>('reel');

  const observerTarget = useRef<HTMLDivElement>(null);

  // Load initial data
  useEffect(() => {
    fetchInitialData();
  }, []);

  // Fetch initial data for both sections
  const fetchInitialData = async () => {
    try {
      setIsLoading(true);

      const [projectsResponse, reelsResponse] = await Promise.all([
        fetch('/api/videos?public=true&type=project&page=1&limit=12'),
        fetch('/api/videos?public=true&type=reel&page=1&limit=12')
      ]);

      if (projectsResponse.ok) {
        const projectsData: VideoResponse = await projectsResponse.json();
        setProjects(projectsData.videos || []);
        setProjectsPage(1);
        setProjectsHasMore(projectsData.pagination?.hasMore ?? false);
      }

      if (reelsResponse.ok) {
        const reelsData: VideoResponse = await reelsResponse.json();
        setReels(reelsData.videos || []);
        setReelsPage(1);
        setReelsHasMore(reelsData.pagination?.hasMore ?? false);
      }
    } catch (error) {
      console.error('Error loading videos:', error);
      // Set empty arrays on error
      setProjects([]);
      setReels([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Load more data for infinite scroll
  const loadMoreData = useCallback(async () => {
    if (isLoadingMore) return;

    setIsLoadingMore(true);

    try {
      if (activeTab === 'project' && projectsHasMore) {
        const response = await fetch(`/api/videos?public=true&type=project&page=${projectsPage + 1}&limit=12`);
        if (response.ok) {
          const data: VideoResponse = await response.json();
          setProjects(prev => [...prev, ...(data.videos || [])]);
          setProjectsPage(prev => prev + 1);
          setProjectsHasMore(data.pagination?.hasMore ?? false);
        }
      } else if (activeTab === 'reel' && reelsHasMore) {
        const response = await fetch(`/api/videos?public=true&type=reel&page=${reelsPage + 1}&limit=12`);
        if (response.ok) {
          const data: VideoResponse = await response.json();
          setReels(prev => [...prev, ...(data.videos || [])]);
          setReelsPage(prev => prev + 1);
          setReelsHasMore(data.pagination?.hasMore ?? false);
        }
      }
    } catch (error) {
      console.error('Error loading more videos:', error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [activeTab, projectsPage, reelsPage, projectsHasMore, reelsHasMore, isLoadingMore]);

  // Infinite scroll observer
  useEffect(() => {
    const currentRef = observerTarget.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreData();
        }
      },
      { rootMargin: '200px', threshold: 0.1 }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [loadMoreData]);

  const handleVideoClick = (video: VideoProject) => {
    if (video.videoUrl) {
      setSelectedVideo(video);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  const currentData = activeTab === 'reel' ? reels : projects;
  const hasMore = activeTab === 'reel' ? reelsHasMore : projectsHasMore;

  return (
    <section
      id="showcase"
      className="pt-16 md:pt-24 pb-8 md:pb-10 px-4 md:px-6 max-w-[1400px] mx-auto relative"
    >
      <motion.div
        className="absolute top-20 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />

      <TextReveal
        text="Showcase"
        className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 md:mb-16 text-center block"
      />

      {/* Tab Navigation */}
      <div className="flex justify-center gap-4 mb-12">
        <button
          onClick={() => setActiveTab('reel')}
          className={`px-8 py-3 rounded-full font-semibold transition-all ${
            activeTab === 'reel'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
        >
          Reels
        </button>
        <button
          onClick={() => setActiveTab('project')}
          className={`px-8 py-3 rounded-full font-semibold transition-all ${
            activeTab === 'project'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
        >
          Projects
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : currentData.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            {activeTab === 'reel' ? 'No reels available' : 'No projects available'}
          </p>
        </div>
      ) : (
        <>
          {/* Videos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-12">
            {currentData.map((video, index) => (
              <VideoCard
                key={video.id}
                video={video}
                index={index}
                onClick={() => handleVideoClick(video)}
              />
            ))}
          </div>

          {/* Infinite Scroll Trigger */}
          <div ref={observerTarget} className="flex justify-center py-8">
            {isLoadingMore ? (
              <div className="flex items-center gap-3">
                <Loader2 className="text-blue-500 animate-spin" size={24} />
                <span className="text-gray-400">Loading more...</span>
              </div>
            ) : !hasMore ? (
              <div className="text-center">
                <p className="text-gray-500 text-lg">
                  {activeTab === 'reel' ? 'No more reels' : 'No more projects'}
                </p>
              </div>
            ) : null}
          </div>

          {/* Load More Button */}
          {!isLoadingMore && hasMore && (
            <div className="flex justify-center mb-8">
              <button
                onClick={loadMoreData}
                disabled={isLoadingMore}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
              >
                {isLoadingMore ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Loading...
                  </>
                ) : (
                  <>
                    <ChevronDown size={18} />
                    Load More
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}

      {/* Video Modal with enhanced features */}
      {selectedVideo && (
        <VideoModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          videoUrl={selectedVideo.videoUrl!}
          title={selectedVideo.title}
          thumbnail={selectedVideo.thumbnailUrl}
        />
      )}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-12 md:mt-16"
      >
        <motion.a
          href="#contact"
          className="text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold inline-block relative group"
          whileHover={{ scale: 1.05 }}
        >
          <span className="bg-gradient-to-r from-white to-white bg-clip-text text-transparent group-hover:from-blue-500 group-hover:via-green-500 group-hover:to-purple-500 transition-all duration-500">
            Get In Touch
          </span>
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-green-500/20 to-purple-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.a>
      </motion.div>
    </section>
  );
}

// Enhanced Video Card Component with maximize option
interface VideoCardProps {
  video: VideoProject;
  index: number;
  onClick: () => void;
}

function VideoCard({ video, index, onClick }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = React.useRef(null);
  const isInView = require("framer-motion").useInView(
    cardRef,
    { once: true, margin: "-100px" }
  );

  return (
    <div ref={cardRef} className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group" onClick={onClick}>
      <motion.div
        initial={{ opacity: 0, y: 60, rotateX: -10 }}
        animate={
          isInView
            ? { opacity: 1, y: 0, rotateX: 0 }
            : { opacity: 0, y: 60, rotateX: -10 }
        }
        transition={{ duration: 0.6, delay: index * 0.1 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        className="relative w-full h-full bg-black rounded-lg p-[2px] overflow-hidden"
        style={{
          transformStyle: "preserve-3d",
          background: GRADIENTS.primaryLight,
        }}
      >
        <HolographicCard>
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : "0% 0%",
            }}
            transition={{ duration: 1 }}
            style={{
              background: video.gradient || GRADIENTS.primaryLight,
              backgroundSize: "200% 200%",
            }}
          />

          {/* Thumbnail Image */}
          <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full h-full object-cover"
            />

            {/* Video Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
              animate={{
                opacity: isHovered ? 0.9 : 0.7,
              }}
            />

            {/* Play Button Overlay */}
            {video.videoUrl && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity"
                animate={{
                  scale: isHovered ? 1 : 0.8,
                  opacity: isHovered ? 1 : 0,
                }}
              >
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Play size={28} className="text-white" fill="currentColor" />
                </div>
              </motion.div>
            )}

            {/* Video Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              <div className="flex items-end justify-between gap-6">
                <motion.div
                  className="shrink-0 w-8 h-14 flex items-center justify-center bg-gradient-to-b from-blue-500/20 to-transparent backdrop-blur-sm rounded-full"
                  animate={{
                    scale: isHovered ? 1.2 : 1,
                  }}
                >
                  <Play
                    size={20}
                    className="text-blue-400"
                    fill="currentColor"
                  />
                </motion.div>

                <motion.div
                  className="text-right max-w-[75%]"
                  animate={{
                    y: isHovered ? -5 : 0,
                  }}
                >
                  <h3 className="text-lg lg:text-xl font-semibold text-white leading-tight break-words bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    {video.title}
                  </h3>
                  <motion.p
                    className="text-sm text-gray-400 mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                  >
                    {video.category}
                  </motion.p>
                  {video.description && (
                    <motion.p
                      className="text-xs text-gray-500 mt-1 line-clamp-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered ? 1 : 0 }}
                    >
                      {video.description}
                    </motion.p>
                  )}
                </motion.div>
              </div>

              {/* Technologies */}
              {video.technologies && video.technologies.length > 0 && (
                <motion.div
                  className="flex flex-wrap gap-1 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                >
                  {video.technologies.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-blue-500/20 backdrop-blur-sm text-blue-300 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Maximize Button - Top Right */}
            <motion.button
              className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              animate={{
                scale: isHovered ? 1 : 0.8,
                opacity: isHovered ? 1 : 0,
              }}
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              <Maximize2 size={16} className="text-white" />
            </motion.button>
          </div>
        </HolographicCard>
      </motion.div>
    </div>
  );
}
