"use client";
import { useState, useEffect, useRef } from "react";
import { useScroll, useInView, useTransform } from "framer-motion";
import { motion } from "framer-motion";
import { Play, ArrowRight, ChevronUp } from "lucide-react";
import Link from "next/link";
import Hero from "@/components/Hero";
import ServicesMarquee from "@/components/ServicesMarquee";
import VideoModal from "@/components/VideoModal";
import React from "react";

interface HomePageSections {
  showExcellence: boolean;
  showLeadership: boolean;
  showTechStack: boolean;
  showStats: boolean;
  showProjects: boolean;
  showShowreel: boolean;
  showClients: boolean;
}

interface AboutData {
  excellence: {
    heading: string;
    description: string;
    featureCards?: Array<{
      title: string;
      description: string;
      icon: string;
      gradient: string;
    }>;
    cards?: Array<{
      title: string;
      description: string;
      icon: string;
      gradient: string;
    }>;
  } | null;
}

interface TeamData {
  leadership: {
    heading: string;
    members: Array<{
      name: string;
      role: string;
      image: string;
      gradient: string;
      bio: string;
    }>;
  } | null;
}

interface ShowcaseData {
  techStack: Array<{
    name: string;
    icon: string;
    color: string;
  }> | null;
  stats: Array<{
    icon: string;
    name: string;
    count: string;
  }> | null;
  services: Array<{
    icon: string;
    name: string;
    count: string;
  }> | null;
}

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

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [sectionsConfig, setSectionsConfig] = useState<HomePageSections>({
    showExcellence: true,
    showLeadership: true,
    showTechStack: true,
    showStats: true,
    showProjects: true,
    showShowreel: true,
    showClients: true,
  });
  const [aboutData, setAboutData] = useState<AboutData>({ excellence: null });
  const [teamData, setTeamData] = useState<TeamData>({ leadership: null });
  const [showcaseData, setShowcaseData] = useState<ShowcaseData>({
    techStack: null,
    stats: null,
    services: null,
  });
  const [featuredProjects, setFeaturedProjects] = useState<VideoProject[]>([]);
  const [featuredReels, setFeaturedReels] = useState<VideoProject[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoProject | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Fetch sections configuration and page data
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        // Fetch sections config
        const configResponse = await fetch("/api/home/config");
        const configResult = await configResponse.json();
        if (configResult.success) {
          setSectionsConfig(configResult.data);
        }

        // Fetch about page data (excellence section)
        const aboutResponse = await fetch("/api/pages/about");
        const aboutResult = await aboutResponse.json();
        if (aboutResult.success) {
          setAboutData(aboutResult.data);
        }

        // Fetch team page data (leadership section)
        const teamResponse = await fetch("/api/pages/team");
        const teamResult = await teamResponse.json();
        if (teamResult.success) {
          setTeamData(teamResult.data);
        }

        // Fetch showcase page data (tech stack and stats)
        const showcaseResponse = await fetch("/api/pages/showcase");
        const showcaseResult = await showcaseResponse.json();
        if (showcaseResult.success) {
          setShowcaseData(showcaseResult.data);
        }

        // Fetch featured projects (type=project, isFeatured=true)
        const projectsResponse = await fetch("/api/videos?public=true&type=project&isFeatured=true");
        const projectsResult = await projectsResponse.json();
        if (projectsResult.videos) {
          setFeaturedProjects(projectsResult.videos);
        }

        // Fetch featured reels (type=reel, isFeatured=true)
        const reelsResponse = await fetch("/api/videos?public=true&type=reel&isFeatured=true");
        const reelsResult = await reelsResponse.json();
        if (reelsResult.videos) {
          setFeaturedReels(reelsResult.videos);
        }
      } catch (error) {
        console.error("Error fetching home page data:", error);
      }
    };

    fetchHomeData();
  }, []);

  // Track active section and show/hide back-to-top button
  useEffect(() => {
    const sections = ["hero", "projects", "showreel", "clients", "excellence", "techstack", "stats", "team"];

    const handleScroll = () => {
      // Show back-to-top button after scrolling 500px
      setShowBackToTop(window.scrollY > 500);

      // Determine active section
      const scrollPosition = window.scrollY + 300;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const offsetTop = section.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveSection(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section data for navigation
  const sections = [
    { id: "hero", label: "Home", icon: "🏠" },
    { id: "projects", label: "Projects", icon: "🎬" },
    { id: "showreel", label: "Showreel", icon: "🎥" },
    { id: "clients", label: "Clients", icon: "👥" },
    { id: "excellence", label: "Excellence", icon: "⭐" },
    { id: "techstack", label: "Tech Stack", icon: "🛠️" },
    { id: "stats", label: "Stats", icon: "📊" },
    { id: "team", label: "Team", icon: "👨‍💼" },
  ];

  const scrollToSection = (index: number) => {
    const sectionId = sections[index].id;
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenVideoModal = (project: VideoProject) => {
    setSelectedVideo(project);
    setIsVideoModalOpen(true);
  };

  // Excellence features from About page data
  const excellenceFeatures = aboutData.excellence?.featureCards || aboutData.excellence?.cards || [];

  // Tech stack from showcase page data
  const techStack = showcaseData.techStack || [];

  // Stats from showcase page data
  const stats = showcaseData.stats || [];

  // Team leadership from team page data
  const team = teamData.leadership?.members || [];

  // Clients logos
  const clients = [
    "https://horizonvfx.in/images/c-logo1.jpg",
    "https://horizonvfx.in/images/c-logo2.jpg",
    "https://horizonvfx.in/images/c-logo3.jpg",
    "https://horizonvfx.in/images/c-logo4.jpg",
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Section Navigation Dots */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            onClick={() => scrollToSection(index)}
            className="group relative flex items-center justify-center w-12 h-12"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Tooltip */}
            <motion.span
              className="absolute right-14 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-lg text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
              initial={{ x: 10 }}
              whileHover={{ x: 0 }}
            >
              {section.label}
            </motion.span>
            {/* Dot */}
            <motion.div
              className={`w-3 h-3 rounded-full border-2 ${
                activeSection === index
                  ? "bg-cyan-500 border-cyan-500"
                  : "bg-transparent border-white/30"
              }`}
              animate={activeSection === index ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3, repeat: activeSection === index ? Infinity : 0 }}
            />
          </motion.button>
        ))}
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: showBackToTop ? 1 : 0, scale: showBackToTop ? 1 : 0 }}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronUp size={24} />
      </motion.button>

      {/* Hero Section */}
      <div id="hero">
        <Hero loading={loading} scrollY={scrollY} />
      </div>

      {/* Services Marquee */}
      <ServicesMarquee />

      {/* Hero Projects - 3D Parallax Cards from Showcase */}
      {sectionsConfig.showProjects && (
        <section id="projects" className="py-20 md:py-32 px-4 md:px-6 bg-gradient-to-b from-black via-zinc-950 to-black relative">
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
            className="text-center mb-16"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-white/10 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm text-gray-300">Featured Work</span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Our Projects
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Award-winning visual effects that defined industries
            </p>
          </motion.div>

          <HeroProjects projects={featuredProjects} onExpandVideo={handleOpenVideoModal} />

          {/* Explore More Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-end mt-8"
          >
            <Link href="/showcase">
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-white"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore More
                <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
      )}

      {/* Showreel - 2 rows only */}
      {sectionsConfig.showShowreel && (
        <section id="showreel" className="py-20 px-4 md:px-6 bg-black relative">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Showreel
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {featuredReels.map((project, index) => (
              <ShowreelCard key={project.id} project={project} index={index} onExpandVideo={handleOpenVideoModal} />
            ))}
          </div>

          {/* Explore More Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-end"
          >
            <Link href="/showcase">
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-white"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore More
                <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
      )}

      {/* Clients - Auto Running Slider */}
      {sectionsConfig.showClients && (
        <section id="clients" className="py-20 md:py-32 px-4 md:px-6 bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold mb-12 md:mb-16 text-center bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent"
          >
            Our Clients
          </motion.h2>
          <ClientsSlider clients={clients} />
        </div>
      </section>
      )}

      {/* Excellence in Every Frame - From About */}
      {sectionsConfig.showExcellence && (
        <section id="excellence" className="py-20 md:py-32 px-4 md:px-6 bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {aboutData.excellence?.heading || "Excellence in Every Frame"}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {aboutData.excellence?.description || "At the heart of our success lies a commitment to excellence that extends from the inception to the completion of each project"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {excellenceFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-3xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-white/10 group hover:border-white/20 transition-all"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3
                  className={`text-2xl font-bold mb-3 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}
                >
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Our Tech Stack - From Showcase */}
      {sectionsConfig.showTechStack && (
        <section id="techstack" className="py-20 md:py-32 px-4 md:px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-green-400 bg-clip-text text-transparent">
                Our Tech Stack
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Powered by industry-leading tools
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {techStack.map((tech, i) => (
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
                    {tech.icon}
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
      )}

      {/* Stats Section - From Showcase */}
      {sectionsConfig.showStats && (
        <section id="stats" className="py-20 md:py-32 px-4 md:px-6 bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10, scale: 1.05 }}
                className="p-8 rounded-3xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-white/10 text-center"
              >
                <motion.div
                  className="text-5xl mb-3"
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                >
                  {stat.icon}
                </motion.div>
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.count}
                </div>
                <div className="text-sm text-gray-400">{stat.name}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      )}

      {/* Leadership - From Team */}
      {sectionsConfig.showLeadership && (
        <section
          id="team"
          className="py-20 md:py-32 px-4 md:px-6 bg-gradient-to-b from-black via-zinc-900 to-black relative overflow-hidden"
        >
        <motion.div
          className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
          }}
        />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 md:mb-8 text-center bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent"
          >
            {teamData.leadership?.heading || "Leadership"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base md:text-lg text-gray-300 text-center mb-12 md:mb-16 max-w-4xl mx-auto leading-relaxed px-4"
          >
            At HorizonVFX, our strength lies in the diversity and expertise of
            our team. Each member is a vital piece of the puzzle, contributing
            unique skills and perspectives to create the visual tapestry that
            defines our institution.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-3xl mx-auto">
            {team.map((member, index) => (
              <TeamCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Video Modal */}
      {selectedVideo && selectedVideo.videoUrl && (
        <VideoModal
          isOpen={isVideoModalOpen}
          onClose={() => {
            setIsVideoModalOpen(false);
            setSelectedVideo(null);
          }}
          videoUrl={selectedVideo.videoUrl}
          title={selectedVideo.title || 'Video'}
          thumbnail={selectedVideo.thumbnailUrl}
        />
      )}
    </>
  );
}

// Hero Projects Component with 3D Parallax
function HeroProjects({
  projects,
  onExpandVideo,
}: {
  projects: VideoProject[];
  onExpandVideo: (project: VideoProject) => void;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
      {projects.map((project, index) => (
        <ParallaxProjectCard
          key={project.id}
          project={project}
          index={index}
          isHovered={hoveredIndex === index}
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
          onExpandVideo={onExpandVideo}
        />
      ))}
    </div>
  );
}

// 3D Parallax Card Component
function ParallaxProjectCard({
  project,
  index,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onExpandVideo,
}: {
  project: VideoProject;
  index: number;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onExpandVideo: (project: VideoProject) => void;
}) {
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
      initial={{ opacity: 0, y: 100, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={() => project.videoUrl && onExpandVideo(project)}
      className="group relative cursor-pointer"
      style={{
        perspective: "1000px",
      }}
    >
      <motion.div
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-white/10"
        animate={
          isHovered
            ? {
                rotateY: mousePosition.x / 20 - 10,
                rotateX: -(mousePosition.y / 20 - 10),
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
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={isHovered ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
              <Play className="text-white" size={32} fill="white" />
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 relative z-10">
          <motion.div
            initial={{ x: -20 }}
            animate={isHovered ? { x: 0 } : { x: -20 }}
            className="flex items-center gap-3 mb-3"
          >
            <span
              className={`px-3 py-1 rounded-full bg-gradient-to-r ${project.gradient} text-white text-xs font-semibold`}
            >
              {project.category}
            </span>
            {project.stats && <span className="text-gray-400 text-sm">{project.stats}</span>}
          </motion.div>

          <h3
            className={`text-2xl font-bold mb-2 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}
          >
            {project.title}
          </h3>

          <p className="text-gray-400 text-sm mb-4">{project.description}</p>
        </div>

        {/* Glow effect */}
        <motion.div
          className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10 blur-2xl`}
        />
      </motion.div>
    </motion.div>
  );
}

// Clients Slider Component - Auto Running
function ClientsSlider({ clients }: { clients: string[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Duplicate clients for infinite scroll effect
  const duplicatedClients = [...clients, ...clients, ...clients];

  return (
    <div className="relative overflow-hidden">
      <motion.div
        ref={scrollRef}
        className="flex gap-8"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {duplicatedClients.map((logo, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, rotateY: 10 }}
            className="flex-shrink-0 w-48 md:w-64 flex items-center justify-center p-6 bg-white rounded-xl shadow-xl"
            style={{ transformStyle: "preserve-3d" }}
          >
            <img
              src={logo}
              alt={`Client ${(index % clients.length) + 1}`}
              className="w-full h-16 md:h-20 object-contain"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// Showreel Card Component
function ShowreelCard({
  project,
  index,
  onExpandVideo,
}: {
  project: VideoProject;
  index: number;
  onExpandVideo: (project: VideoProject) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = React.useRef(null);
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
      onClick={() => project.videoUrl && onExpandVideo(project)}
      className="relative rounded-2xl overflow-hidden group cursor-pointer bg-zinc-900 border border-white/5"
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
          <h3 className="text-lg font-bold text-white mb-1 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            {project.title}
          </h3>
          <motion.p
            className="text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            {project.category}
          </motion.p>
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

// Team Card Component
function TeamCard({
  member,
  index,
}: {
  member: { name: string; role: string; image: string };
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateY: -20 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, rotateY: 0 }
          : { opacity: 0, y: 40, rotateY: -20 }
      }
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, z: 50 }}
      className="text-center group"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="aspect-square overflow-hidden rounded-3xl mb-6 relative">
        <motion.img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
      <p className="text-gray-400">{member.role}</p>
    </motion.div>
  );
}
