"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useScroll, useInView, useTransform } from "framer-motion";
import { motion } from "framer-motion";
import { Play, ArrowRight, ChevronUp } from "lucide-react";
import Link from "next/link";
import Hero from "@/components/Hero";
import ServicesMarquee from "@/components/ServicesMarquee";
import React from "react";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
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

  // Hero Projects from showcase (showing only 3)
  const heroProjects = [
    {
      id: 1,
      title: "Pushpa 2: The Rule",
      category: "Film & OTT",
      image: "https://horizonvfx.in/images/Pushpa_2.png",
      description: "Mind-bending visual effects for the blockbuster sequel",
      gradient: "from-orange-500 via-red-500 to-pink-500",
      stats: "200+ VFX Shots",
    },
    {
      id: 2,
      title: "Commercial Campaign",
      category: "Advertisement",
      image: "https://horizonvfx.in/images/Commercial.jpg",
      description: "Stunning commercial visuals with photorealistic CG",
      gradient: "from-cyan-500 via-blue-500 to-purple-500",
      stats: "50+ Shots",
    },
    {
      id: 3,
      title: "Game Cinematics",
      category: "Gaming",
      image: "https://horizonvfx.in/images/game.jpg",
      description: "Immersive game trailers and cinematic sequences",
      gradient: "from-purple-500 via-pink-500 to-rose-500",
      stats: "15+ Trailers",
    },
  ];

  // Showreel projects (showing only 2 rows)
  const showreelProjects = [
    {
      id: 1,
      title: "Pushpa 2",
      category: "Film",
      image: "https://horizonvfx.in/images/Pushpa_2.png",
    },
    {
      id: 2,
      title: "After Effects Project",
      category: "Post Production",
      image: "https://horizonvfx.in/images/after-effect.jpg",
    },
    {
      id: 3,
      title: "Animation Showcase",
      category: "Animation",
      image: "https://horizonvfx.in/images/animation2.jpg",
    },
    {
      id: 4,
      title: "3D Character Work",
      category: "3D Animation",
      image: "https://horizonvfx.in/images/animation3.jpg",
    },
  ];

  // Excellence features from About
  const excellenceFeatures = [
    {
      title: "Comprehensive Services",
      description:
        "We seamlessly navigate the entire spectrum of visual effects, offering comprehensive pre to post-production services.",
      icon: "🎬",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Vast Talent Pool",
      description:
        "With over 500 artists in our bank, each a virtuoso in their own right, we possess the capacity to undertake any project with unparalleled finesse.",
      icon: "👨‍🎨",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Innovation First",
      description:
        "Our diverse pool of creative minds, coupled with a commitment to staying at the forefront of industry trends, ensures innovation in every frame.",
      icon: "💡",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Collaborative Excellence",
      description:
        "We extend our expertise by offering clients access to our curated roster of artists, adding an extra layer of precision and creative flair.",
      icon: "🤝",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  // Tech stack from showcase
  const techStack = [
    { name: "After Effects", icon: "🎨", color: "from-purple-500 to-blue-500" },
    { name: "Nuke", icon: "💣", color: "from-blue-500 to-cyan-500" },
    { name: "Maya", icon: "🔷", color: "from-cyan-500 to-teal-500" },
    { name: "Unreal Engine", icon: "🎮", color: "from-red-500 to-orange-500" },
    { name: "Houdini", icon: "🌀", color: "from-orange-500 to-yellow-500" },
    { name: "Blender", icon: "🔶", color: "from-yellow-500 to-green-500" },
    { name: "Cinema 4D", icon: "📦", color: "from-green-500 to-emerald-500" },
    { name: "Substance", icon: "🎭", color: "from-pink-500 to-rose-500" },
  ];

  // Stats from showcase
  const stats = [
    { icon: "🎬", name: "Film & OTT", count: "100+" },
    { icon: "🎮", name: "Gaming", count: "50+" },
    { icon: "📺", name: "Commercial", count: "200+" },
    { icon: "🖥️", name: "Unreal Engine", count: "30+" },
  ];

  // Team leadership
  const team = [
    {
      name: "Dibakar Chakraborty",
      role: "Founder",
      image: "https://horizonvfx.in/images/tm1.jpg",
    },
    {
      name: "Mitun Dasgupta",
      role: "Founder",
      image: "https://horizonvfx.in/images/tm2.jpg",
    },
  ];

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

          <HeroProjects projects={heroProjects} />

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

      {/* Showreel - 2 rows only */}
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
            {showreelProjects.map((project, index) => (
              <ShowreelCard key={project.id} project={project} index={index} />
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

      {/* Clients - Auto Running Slider */}
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

      {/* Excellence in Every Frame - From About */}
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
              Excellence in Every Frame
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              At the heart of our success lies a commitment to excellence that
              extends from the inception to the completion of each project
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

      {/* Our Tech Stack - From Showcase */}
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

      {/* Stats Section - From Showcase */}
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

      {/* Leadership - From Team */}
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
            Leadership
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
    </>
  );
}

// Hero Projects Component with 3D Parallax
function HeroProjects({
  projects,
}: {
  projects: Array<{
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
    gradient: string;
    stats: string;
  }>;
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
}: {
  project: {
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
    gradient: string;
    stats: string;
  };
  index: number;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
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
            src={project.image}
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
            <span className="text-gray-400 text-sm">{project.stats}</span>
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
}: {
  project: {
    id: number;
    title: string;
    category: string;
    image: string;
  };
  index: number;
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
      className="relative rounded-2xl overflow-hidden group cursor-pointer bg-zinc-900 border border-white/5"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <div className="relative aspect-square overflow-hidden">
        <motion.img
          src={project.image}
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
