"use client";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import { Play, ArrowRight, Zap, Film, Loader2, ChevronDown } from "lucide-react";
import React from "react";
import DynamicIcon from "@/components/DynamicIcon";
import VideoModal from "@/components/VideoModal";

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
  stats?: string | null;
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

interface ShowcaseContent {
  hero: {
    title: string;
    subtitle: string;
  };
  services: Array<{
    icon: string;
    name: string;
    count: string;
  }>;
  techStack: Array<{
    name: string;
    icon: string;
    color: string;
  }>;
  industries: Array<{
    title: string;
    image: string;
  }>;
}

const DEFAULT_CONTENT: ShowcaseContent = {
  hero: {
    title: "Our Showcase",
    subtitle: "Explore our portfolio of visual effects and animation projects that push the boundaries of creativity",
  },
  services: [
    { icon: "🎬", name: "Film & OTT", count: "100+" },
    { icon: "🎮", name: "Gaming", count: "50+" },
    { icon: "📺", name: "Commercial", count: "200+" },
    { icon: "🖥️", name: "Unreal Engine", count: "30+" },
  ],
  techStack: [
    { name: "After Effects", icon: "🎨", color: "from-purple-500 to-blue-500" },
    { name: "Nuke", icon: "💣", color: "from-blue-500 to-cyan-500" },
    { name: "Maya", icon: "🔷", color: "from-cyan-500 to-teal-500" },
    { name: "Unreal Engine", icon: "🎮", color: "from-red-500 to-orange-500" },
    { name: "Houdini", icon: "🌀", color: "from-orange-500 to-yellow-500" },
    { name: "Blender", icon: "🔶", color: "from-yellow-500 to-green-500" },
    { name: "Cinema 4D", icon: "📦", color: "from-green-500 to-emerald-500" },
    { name: "Substance", icon: "🎭", color: "from-pink-500 to-rose-500" },
  ],
  industries: [
    { title: "Film and OTT", image: "https://horizonvfx.in/images/flm.png" },
    { title: "Game", image: "https://horizonvfx.in/images/game.jpg" },
    { title: "Commercial", image: "https://horizonvfx.in/images/Commercial.jpg" },
    { title: "Unreal", image: "https://horizonvfx.in/images/unreal.jpg" },
  ],
};

export default function ShowcasePage() {
  const [content, setContent] = useState<ShowcaseContent>(DEFAULT_CONTENT);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Hero Projects (type=project)
  const [projects, setProjects] = useState<VideoProject[]>([]);
  const [projectsPage, setProjectsPage] = useState(1);
  const [projectsHasMore, setProjectsHasMore] = useState(true);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [isLoadingMoreProjects, setIsLoadingMoreProjects] = useState(false);

  // Showreel (type=reel)
  const [reels, setReels] = useState<VideoProject[]>([]);
  const [reelsPage, setReelsPage] = useState(1);
  const [reelsHasMore, setReelsHasMore] = useState(true);
  const [isLoadingReels, setIsLoadingReels] = useState(false);
  const [isLoadingMoreReels, setIsLoadingMoreReels] = useState(false);

  // Video modal
  const [selectedVideo, setSelectedVideo] = useState<VideoProject | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const observerTarget = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Load content from CMS
  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch("/api/pages/showcase");
        const result = await response.json();

        if (result.success && result.data) {
          setContent(result.data);
        }
      } catch (error) {
        console.error("Error loading showcase content:", error);
        // Keep default content on error
      }
    };

    loadContent();
  }, []);

  // Load initial data
  useEffect(() => {
    fetchInitialProjects();
    fetchInitialReels();
  }, []);

  // Fetch initial projects
  const fetchInitialProjects = async () => {
    try {
      setIsLoadingProjects(true);
      const response = await fetch('/api/videos?public=true&type=project&page=1&limit=8');
      if (response.ok) {
        const data: VideoResponse = await response.json();
        setProjects(data.videos || []);
        setProjectsPage(1);
        setProjectsHasMore(data.pagination?.hasMore ?? false);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setIsLoadingProjects(false);
    }
  };

  // Fetch initial reels
  const fetchInitialReels = async () => {
    try {
      setIsLoadingReels(true);
      const response = await fetch('/api/videos?public=true&type=reel&page=1&limit=12');
      if (response.ok) {
        const data: VideoResponse = await response.json();
        setReels(data.videos || []);
        setReelsPage(1);
        setReelsHasMore(data.pagination?.hasMore ?? false);
      }
    } catch (error) {
      console.error('Error loading reels:', error);
    } finally {
      setIsLoadingReels(false);
    }
  };

  // Load more projects
  const loadMoreProjects = useCallback(async () => {
    if (isLoadingMoreProjects || !projectsHasMore) return;

    setIsLoadingMoreProjects(true);
    try {
      const response = await fetch(`/api/videos?public=true&type=project&page=${projectsPage + 1}&limit=8`);
      if (response.ok) {
        const data: VideoResponse = await response.json();
        setProjects(prev => [...prev, ...(data.videos || [])]);
        setProjectsPage(prev => prev + 1);
        setProjectsHasMore(data.pagination?.hasMore ?? false);
      }
    } catch (error) {
      console.error('Error loading more projects:', error);
    } finally {
      setIsLoadingMoreProjects(false);
    }
  }, [projectsPage, projectsHasMore, isLoadingMoreProjects]);

  // Load more reels (infinite scroll)
  const loadMoreReels = useCallback(async () => {
    if (isLoadingMoreReels || !reelsHasMore) return;

    setIsLoadingMoreReels(true);
    try {
      const response = await fetch(`/api/videos?public=true&type=reel&page=${reelsPage + 1}&limit=12`);
      if (response.ok) {
        const data: VideoResponse = await response.json();
        setReels(prev => [...prev, ...(data.videos || [])]);
        setReelsPage(prev => prev + 1);
        setReelsHasMore(data.pagination?.hasMore ?? false);
      }
    } catch (error) {
      console.error('Error loading more reels:', error);
    } finally {
      setIsLoadingMoreReels(false);
    }
  }, [reelsPage, reelsHasMore, isLoadingMoreReels]);

  // Infinite scroll for reels
  useEffect(() => {
    const currentRef = observerTarget.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreReels();
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
  }, [loadMoreReels]);

  // Handle video click
  const handleVideoClick = (video: VideoProject) => {
    if (video.videoUrl) {
      setSelectedVideo(video);
      setIsVideoModalOpen(true);
    }
  };

  // Close video modal
  const handleCloseVideoModal = () => {
    setIsVideoModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Hero Section - Modern 3D Parallax */}
      <motion.section
        style={{ y }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
            style={{
              background:
                "conic-gradient(from 0deg, #06b6d4, #3b82f6, #8b5cf6, #06b6d4)",
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-3xl"
            style={{
              background: "radial-gradient(circle, #10b981 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block mb-6"
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Zap className="w-12 h-12 text-cyan-400 fill-cyan-400" />
            </motion.div>
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 tracking-tight"
              style={{
                background:
                  "linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {content.hero.title}
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {content.hero.subtitle}
            </motion.p>
          </motion.div>

          {/* Animated Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {content.services.map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group p-6 rounded-3xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-white/10 relative overflow-hidden"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:via-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500"
                />
                <motion.div
                  className="text-5xl mb-3 relative z-10"
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                >
                  <DynamicIcon name={service.icon} size={40} />
                </motion.div>
                <div className="text-4xl font-bold text-white mb-1 relative z-10">
                  {service.count}
                </div>
                <div className="text-sm text-gray-400 relative z-10">
                  {service.name}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Animated scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-3 bg-white/50 rounded-full"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Featured Projects - 3D Parallax Cards */}
      <section className="py-32 px-4 md:px-6 bg-gradient-to-b from-black via-zinc-950 to-black relative">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-white/10 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Film className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-gray-300">Featured Work</span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Hero Projects
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Award-winning visual effects that defined industries
            </p>
          </motion.div>

          {isLoadingProjects ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="text-blue-500 animate-spin" size={48} />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No projects available</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {projects.map((project, index) => (
                  <ParallaxCard
                    key={project.id}
                    project={project}
                    index={index}
                    isHovered={hoveredIndex === index}
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    onVideoClick={handleVideoClick}
                  />
                ))}
              </div>

              {/* Load More Button */}
              {projectsHasMore && (
                <div className="flex justify-center mt-12">
                  <button
                    onClick={loadMoreProjects}
                    disabled={isLoadingMoreProjects}
                    className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
                  >
                    {isLoadingMoreProjects ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        Loading...
                      </>
                    ) : (
                      <>
                        <ChevronDown size={18} />
                        Load More Projects
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Infinite Scroll Showreel - Masonry Layout */}
      <section className="py-20 px-4 md:px-6 bg-black relative">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Complete Showreel
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Scroll to explore more projects
            </p>
          </motion.div>

          {isLoadingReels ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="text-blue-500 animate-spin" size={48} />
            </div>
          ) : reels.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No reels available</p>
            </div>
          ) : (
            <>
              <MasonryGrid projects={reels} onVideoClick={handleVideoClick} />

              {/* Infinite scroll trigger */}
              <div ref={observerTarget} className="flex justify-center py-8">
                {isLoadingMoreReels && (
                  <div className="flex items-center gap-3">
                    <Loader2 className="text-blue-500 animate-spin" size={24} />
                    <span className="text-gray-400">Loading more...</span>
                  </div>
                )}
                {!reelsHasMore && reels.length > 0 && (
                  <div className="text-center">
                    <p className="text-gray-500 text-lg">No more reels</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-32 px-4 md:px-6 bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Industries We Serve
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              From blockbuster films to immersive gaming experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.industries.map((item, index) => (
              <IndustryCard key={item.title} service={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-32 px-4 md:px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-green-400 bg-clip-text text-transparent">
                Our Tech Stack
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Powered by industry-leading tools
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {content.techStack.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="relative group"
              >
                <div className="p-8 rounded-3xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-white/10 text-center">
                  <motion.div
                    className="text-6xl mb-4"
                    animate={{
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  >
                    <DynamicIcon name={tech.icon} size={32} />
                  </motion.div>
                  <div
                    className={`text-sm font-semibold bg-gradient-to-r ${tech.color} bg-clip-text text-transparent`}
                  >
                    {tech.name}
                  </div>
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${tech.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10 blur-2xl`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          isOpen={isVideoModalOpen}
          onClose={handleCloseVideoModal}
          videoUrl={selectedVideo.videoUrl!}
          title={selectedVideo.title}
          thumbnail={selectedVideo.thumbnailUrl}
        />
      )}
    </div>
  );
}

// 3D Parallax Card Component
function ParallaxCard({
  project,
  index,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onVideoClick,
}: {
  project: VideoProject;
  index: number;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onVideoClick: (project: VideoProject) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100, rotateX: 10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className="group relative"
      style={{
        perspective: "1000px",
      }}
    >
      <motion.div
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-white/10"
        animate={
          isHovered
            ? {
                rotateY: (mousePosition.x / 20) - 10,
                rotateX: -((mousePosition.y / 20) - 10),
              }
            : { rotateY: 0, rotateX: 0 }
        }
        transition={{ duration: 0.3 }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Image with parallax effect */}
        <div className="aspect-video overflow-hidden relative">
          <motion.img
            src={project.thumbnailUrl}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            initial={{ scale: 0 }}
            animate={isHovered ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            onClick={() => onVideoClick(project)}
          >
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
              <Play className="text-white" size={32} fill="white" />
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-8 relative z-10">
          <motion.div
            initial={{ x: -20 }}
            animate={isHovered ? { x: 0 } : { x: -20 }}
            className="flex items-center gap-3 mb-4"
          >
            <span
              className={`px-4 py-1.5 rounded-full bg-gradient-to-r ${project.gradient} text-white text-xs font-semibold`}
            >
              {project.category}
            </span>
            {project.stats && <span className="text-gray-400 text-sm">{project.stats}</span>}
          </motion.div>

          <h3
            className={`text-3xl font-bold mb-3 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}
          >
            {project.title}
          </h3>

          <p className="text-gray-400 mb-6">{project.description}</p>

          <motion.button
            onClick={() => onVideoClick(project)}
            className={`inline-flex items-center gap-2 text-transparent bg-gradient-to-r ${project.gradient} bg-clip-text font-semibold group-hover:gap-4 transition-all`}
            whileHover={{ x: 5 }}
          >
            View Project
            <ArrowRight size={20} />
          </motion.button>
        </div>

        {/* Glow effect */}
        <motion.div
          className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10 blur-2xl`}
        />
      </motion.div>
    </motion.div>
  );
}

// Masonry Grid Component
function MasonryGrid({
  projects,
  onVideoClick,
}: {
  projects: VideoProject[];
  onVideoClick: (project: VideoProject) => void;
}) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
      {projects.map((project, index) => (
        <MasonryCard key={project.id} project={project} index={index} onVideoClick={onVideoClick} />
      ))}
    </div>
  );
}

// Individual Masonry Card
function MasonryCard({
  project,
  index,
  onVideoClick,
}: {
  project: VideoProject;
  index: number;
  onVideoClick: (project: VideoProject) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px",
  });

  const gradients = [
    "from-orange-500 to-red-500",
    "from-cyan-500 to-blue-500",
    "from-purple-500 to-pink-500",
    "from-green-500 to-emerald-500",
  ];
  const gradient = gradients[index % gradients.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: -10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      onClick={() => onVideoClick(project)}
      className="relative break-inside-avoid mb-4 rounded-2xl overflow-hidden group cursor-pointer bg-zinc-900 border border-white/5"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <div className="relative aspect-square overflow-hidden">
        <motion.img
          src={project.thumbnailUrl}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
          animate={{ opacity: isHovered ? 0.9 : 0.7 }}
        />
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <div className="flex items-end justify-between">
            <motion.div
              className="flex-1"
              animate={{ y: isHovered ? -5 : 0 }}
            >
              <h3 className="text-xl font-bold text-white mb-1 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                {project.title}
              </h3>
              <motion.p
                className="text-sm text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
              >
                {project.category}
              </motion.p>
            </motion.div>
            <motion.div
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20"
              animate={{ scale: isHovered ? 1.1 : 1 }}
            >
              <Play size={20} className="text-white" fill="white" />
            </motion.div>
          </div>
        </div>
        <motion.div
          className={`absolute inset-0 border-2 border-transparent rounded-2xl bg-gradient-to-r ${gradient}`}
          animate={{ opacity: isHovered ? 0.3 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

// Industry Card Component
function IndustryCard({
  service,
  index,
}: {
  service: { title: string; image: string };
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, y: -10 }}
      className="relative aspect-square bg-zinc-900 rounded-3xl overflow-hidden group cursor-pointer border border-white/10"
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.img
        src={service.image}
        alt={service.title}
        className="w-full h-full object-cover"
        animate={{ scale: isHovered ? 1.15 : 1 }}
        transition={{ duration: 0.6 }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
        animate={{ opacity: isHovered ? 1 : 0.8 }}
      />
      <div className="absolute inset-0 flex items-end p-8">
        <motion.h3
          className="text-3xl font-bold z-10 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
          animate={{ y: isHovered ? -10 : 0, scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {service.title}
        </motion.h3>
      </div>
      <motion.div
        className="absolute inset-0 border-2 border-blue-500/0 rounded-3xl"
        animate={{ borderColor: isHovered ? "rgba(59, 130, 246, 0.5)" : "rgba(59, 130, 246, 0)" }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-blue-500/0 to-purple-500/0 rounded-3xl"
        animate={{
          opacity: isHovered ? 0.2 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
