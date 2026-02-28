"use client";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import React from "react";
import DynamicIcon from "@/components/DynamicIcon";

interface Service {
  title: string;
  description: string;
  icon: string;
  gradient: string;
  features: string[];
}

interface FlowchartNode {
  id: number;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  details: string[];
}

interface ServicesContent {
  hero: {
    title: string;
    subtitle: string;
  };
  services?: Service[];
  process?: FlowchartNode[];
}

const DEFAULT_CONTENT: ServicesContent = {
  hero: {
    title: "Our Services",
    subtitle: "From concept to final delivery, we provide comprehensive visual effects and animation services that bring your vision to life",
  },
  process: [
    {
      id: 0,
      title: "Concept & Pre-Production",
      description: "Where ideas take shape",
      icon: "💡",
      gradient: "from-cyan-500 to-blue-500",
      details: [
        "Creative consultation and concept development",
        "Storyboarding and previs",
        "Budget estimation and project planning",
        "Team allocation and resource management",
      ],
    },
    {
      id: 1,
      title: "Asset Creation",
      description: "Building the foundation",
      icon: "🎨",
      gradient: "from-blue-500 to-purple-500",
      details: [
        "3D modeling and texturing",
        "Character design and rigging",
        "Environment creation",
        "Asset library management",
      ],
    },
    {
      id: 2,
      title: "Animation & Simulation",
      description: "Bringing it to life",
      icon: "🎬",
      gradient: "from-purple-500 to-pink-500",
      details: [
        "Character animation",
        "Particle simulations",
        "Physics and dynamics",
        "Motion capture integration",
      ],
    },
    {
      id: 3,
      title: "Lighting & Rendering",
      description: "Setting the mood",
      icon: "✨",
      gradient: "from-pink-500 to-rose-500",
      details: [
        "Scene lighting setup",
        "Shader development",
        "Render farm optimization",
        "Multi-pass rendering",
      ],
    },
    {
      id: 4,
      title: "Compositing & VFX",
      description: "The magic happens",
      icon: "🔮",
      gradient: "from-rose-500 to-orange-500",
      details: [
        "Green screen keying",
        "Rotoscope and paint",
        "Color grading",
        "Final integration",
      ],
    },
    {
      id: 5,
      title: "Delivery & Support",
      description: "Ready for the world",
      icon: "🚀",
      gradient: "from-orange-500 to-yellow-500",
      details: [
        "Final quality checks",
        "Format conversion and delivery",
        "Client revisions",
        "Post-project support",
      ],
    },
  ],
  services: [
    {
      title: "Visual Effects",
      description: "CGI, compositing, and green screen integration for films and commercials",
      icon: "🎥",
      gradient: "from-cyan-500 to-blue-500",
      features: ["Green Screen", "CGI", "Rotoscope", "Match Move"],
    },
    {
      title: "3D Animation",
      description: "Character animation, rigging, and motion graphics for any medium",
      icon: "🎬",
      gradient: "from-blue-500 to-purple-500",
      features: ["Character Rigging", "Motion Graphics", "Mocap", "Keyframe Animation"],
    },
    {
      title: "Game Cinematics",
      description: "High-impact cinematic sequences and trailers for gaming projects",
      icon: "🎮",
      gradient: "from-purple-500 to-pink-500",
      features: ["Real-time Renders", "Game Trailers", "Cutscenes", "Asset Creation"],
    },
    {
      title: "Pre-visualization",
      description: "Storyboard animation and previs to plan your shots effectively",
      icon: "📋",
      gradient: "from-pink-500 to-rose-500",
      features: ["Storyboarding", "3D Previs", "Techvis", "Postvis"],
    },
    {
      title: "Color Grading",
      description: "Professional color correction and grading for cinematic looks",
      icon: "🎨",
      gradient: "from-rose-500 to-orange-500",
      features: ["Color Correction", "Look Development", "HDR Grading", "Film Emulation"],
    },
    {
      title: "Virtual Production",
      description: "LED wall volumes and real-time rendering for on-set VFX",
      icon: "🖥️",
      gradient: "from-orange-500 to-yellow-500",
      features: ["LED Volumes", "Real-time Rendering", "Camera Tracking", "Virtual Sets"],
    },
  ],
};

export default function ServicesPage() {
  const { scrollY } = useScroll();
  const [activeNode, setActiveNode] = useState(0);
  const [isFlowchartVisible, setIsFlowchartVisible] = useState(false);
  const [content, setContent] = useState<ServicesContent>(DEFAULT_CONTENT);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const response = await fetch("/api/pages/services");
      const result = await response.json();

      if (result.success && result.data) {
        const cmsData = result.data.content || result.data;
        setContent({
          ...DEFAULT_CONTENT,
          ...cmsData,
          hero: { ...DEFAULT_CONTENT.hero, ...cmsData.hero },
          services: cmsData.services || DEFAULT_CONTENT.services,
          process: cmsData.process || DEFAULT_CONTENT.process,
        });
      }
    } catch (error) {
      console.error("Error loading content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-white/10 mb-8"
          >
            <span className="text-sm text-gray-300">What We Do</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
              {content.hero.title}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            {content.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/#projects">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-white"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                View Our Work
                <ArrowRight className="inline ml-2" size={20} />
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-lg font-semibold text-white border border-white/20"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.2)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="text-white/50" size={32} />
        </motion.div>
      </section>

      {/* 3D Animated Flowchart Section */}
      <section className="py-32 px-4 md:px-6 bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-white/10 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm text-gray-300">Our Process</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                How We Work
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Our streamlined VFX pipeline ensures efficient delivery without
              compromising quality
            </p>
          </motion.div>

          <InteractiveFlowchart
            nodes={content.process || DEFAULT_CONTENT.process!}
            activeNode={activeNode}
            setActiveNode={setActiveNode}
          />
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-32 px-4 md:px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Comprehensive VFX Services
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              End-to-end visual effects solutions for films, games, commercials,
              and more
            </p>
          </motion.div>

          <ServicesGrid services={content.services || DEFAULT_CONTENT.services!} />
        </div>
      </section>
    </div>
  );
}

// 3D Interactive Flowchart Component
interface FlowchartNode {
  id: number;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  details: string[];
}

function InteractiveFlowchart({
  nodes,
  activeNode,
  setActiveNode,
}: {
  nodes: FlowchartNode[];
  activeNode: number;
  setActiveNode: (node: number) => void;
}) {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const activeNodeData = nodes[activeNode];
  const flowchartNodes = nodes;

  return (
    <>
      {/* Main Flowchart Structure */}
      <div className="relative max-w-6xl mx-auto pb-32">
        <div className="relative" style={{ minHeight: `${flowchartNodes.length * 400}px` }}>
        {/* Connection SVG Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
        >
          {flowchartNodes.map((_, index) => {
            if (index === flowchartNodes.length - 1) return null;

              const isVertical = index % 2 === 0;
              const startX = isVertical ? 50 : 25;
              const endX = isVertical ? 50 : 75;
              const startY = index * 16.66 + 8.33;
              const endY = (index + 1) * 16.66 + 8.33;

              return (
                <g key={`line-${index}`}>
                  {/* Animated connection line */}
                  <motion.path
                    d={`M ${startX}% ${startY}% Q ${startX}% ${(startY + endY) / 2}% ${endX}% ${endY}%`}
                    stroke="url(#lineGradient)"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: activeNode > index ? 1 : 0 }}
                    transition={{ duration: 1.2, delay: index * 0.15 }}
                    opacity={activeNode > index ? 1 : 0.15}
                  />

                  {/* Animated particles */}
                  {activeNode > index && (
                    <>
                      <motion.circle
                        r="6"
                        fill="url(#particleGradient)"
                        animate={{
                          cx: [`${startX}%`, `${endX}%`],
                          cy: [`${startY}%`, `${endY}%`],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </>
                  )}

                  {/* Glowing dots at connection points */}
                  {activeNode > index && (
                    <>
                      <motion.circle
                        cx={`${startX}%`}
                        cy={`${startY}%`}
                        r="4"
                        fill="url(#glowGradient)"
                        animate={{ r: [4, 8, 4], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.circle
                        cx={`${endX}%`}
                        cy={`${endY}%`}
                        r="4"
                        fill="url(#glowGradient)"
                        animate={{ r: [4, 8, 4], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      />
                    </>
                  )}
                </g>
              );
            })}

            {/* Gradient definitions */}
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
              <radialGradient id="particleGradient">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
              </radialGradient>
              <radialGradient id="glowGradient">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>

          {/* Flowchart Nodes - Zigzag Layout */}
          <div className="relative z-10 space-y-12 py-8">
            {flowchartNodes.map((node, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, x: isLeft ? -100 : 100, y: 50 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className={`flex items-center ${isLeft ? "justify-start" : "justify-end"}`.trim()}
                >
                  <motion.div
                    onClick={() => setActiveNode(node.id)}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className={`relative group cursor-pointer ${isLeft ? "" : "order-2"}`.trim()}
                    style={{ width: "45%" }}
                  >
                    {/* Node Card */}
                    <motion.div
                      className="bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 backdrop-blur-xl rounded-3xl p-6 border relative overflow-hidden"
                      style={{
                        borderColor: activeNode === node.id ? "rgba(6, 182, 212, 0.5)" : "rgba(255, 255, 255, 0.1)",
                        boxShadow: activeNode === node.id ? "0 35px 60px -15px rgba(6, 182, 212, 0.3)" : "none",
                        transformStyle: "preserve-3d",
                        perspective: "1000px",
                      }}
                      whileHover={{
                        scale: 1.03,
                        rotateY: isLeft ? 3 : -3,
                        rotateX: 3,
                        boxShadow: "0 35px 60px -15px rgba(6, 182, 212, 0.3)",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Animated background glow */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${node.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                        animate={
                          activeNode === node.id
                            ? {
                                opacity: [0.1, 0.2, 0.1],
                                scale: [1, 1.1, 1],
                              }
                            : {}
                        }
                        transition={{ duration: 3, repeat: Infinity }}
                      />

                      {/* Pulsing border */}
                      {activeNode === node.id && (
                        <motion.div
                          className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${node.gradient} opacity-30`}
                          animate={{
                            scale: [1, 1.05, 1],
                              opacity: [0.2, 0.4, 0.2],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}

                      {/* Content */}
                      <div className="relative z-10">
                        <div className="flex items-start gap-4">
                          {/* Icon with glow */}
                          <div className="relative">
                            <motion.div
                              className={`text-5xl md:text-6xl`}
                              animate={
                                activeNode === node.id
                                  ? {
                                      rotate: [0, 15, -15, 0],
                                      scale: [1, 1.1, 1],
                                    }
                                  : {}
                              }
                              transition={{
                                duration: 0.6,
                                repeat: activeNode === node.id ? Infinity : 0,
                              }}
                            >
                              <DynamicIcon name={node.icon} size={32} />
                            </motion.div>
                            {/* Glow effect behind icon */}
                            {activeNode === node.id && (
                              <motion.div
                                className={`absolute inset-0 bg-gradient-to-r ${node.gradient} blur-2xl opacity-50 -z-10`}
                                animate={{
                                  scale: [1, 1.3, 1],
                                  opacity: [0.3, 0.6, 0.3],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            )}
                          </div>

                          {/* Main content */}
                          <div className="flex-1">
                            {/* Step badge */}
                            <motion.div
                              className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${node.gradient} text-white text-xs font-bold mb-2 shadow-lg`}
                              animate={
                                activeNode === node.id
                                  ? { scale: [1, 1.05, 1] }
                                  : {}
                              }
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              0{index + 1}
                            </motion.div>

                            <h3
                              className={`text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r ${node.gradient} bg-clip-text text-transparent`}
                            >
                              {node.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                              {node.description}
                            </p>

                            {/* Active indicator */}
                            {activeNode === node.id && (
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                className={`h-1 mt-3 rounded-full bg-gradient-to-r ${node.gradient}`}
                              />
                            )}
                          </div>

                          {/* Arrow indicator */}
                          <motion.div
                            className={`text-2xl ${
                              activeNode === node.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            } transition-opacity`}
                            animate={activeNode === node.id ? { x: [0, 5, 0] } : {}}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            {isLeft ? "→" : "←"}
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detailed Info Panel - Fixed at Bottom */}
      <motion.div
          key={activeNode}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-950/95 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden shadow-2xl">
            {/* Animated background */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${activeNodeData.gradient} opacity-5`}
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ backgroundSize: "200% 200%" }}
            />

            {/* Header */}
            <div className="relative z-10 mb-8">
              <motion.div
                className="flex items-center gap-6 mb-6"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <motion.div
                  className="text-8xl md:text-9xl"
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                >
                  <DynamicIcon name={activeNodeData.icon} size={80} />
                </motion.div>
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div
                      className={`inline-block px-5 py-2 rounded-full bg-gradient-to-r ${activeNodeData.gradient} text-white text-sm font-bold mb-3 shadow-lg`}
                    >
                      STEP {activeNode + 1} OF {flowchartNodes.length}
                    </div>
                  </motion.div>
                  <h2
                    className={`text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r ${activeNodeData.gradient} bg-clip-text text-transparent`}
                  >
                    {activeNodeData.title}
                  </h2>
                  <p className="text-gray-400 text-lg max-w-2xl">
                    {activeNodeData.description}
                  </p>
                </div>
              </motion.div>

              {/* Progress bar */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${activeNodeData.gradient}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${((activeNode + 1) / flowchartNodes.length) * 100}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                <span className="text-white font-bold text-lg">
                  {Math.round(((activeNode + 1) / flowchartNodes.length) * 100)}%
                </span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="relative z-10">
              <h4 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
                <motion.span
                  className={`w-2 h-8 bg-gradient-to-r ${activeNodeData.gradient} rounded-full`}
                  animate={{ height: [32, 40, 32] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                Key Activities & Deliverables
              </h4>

              <div className="grid md:grid-cols-2 gap-4">
                {activeNodeData.details.map((detail, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.08 }}
                    whileHover={{ scale: 1.02, y: -3 }}
                    className="group"
                  >
                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                      <motion.div
                        className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r ${activeNodeData.gradient} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {idx + 1}
                      </motion.div>
                      <div className="flex-1">
                        <span className="text-gray-200 leading-relaxed font-medium">
                          {detail}
                        </span>
                      </div>
                      <motion.div
                        className={`text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity`}
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="relative z-10 mt-10 flex items-center justify-between gap-4 pt-8 border-t border-white/10">
              {/* Step indicators */}
              <div className="flex items-center gap-2">
                {flowchartNodes.map((_, idx) => {
                  const isActive = idx === activeNode;
                  const isCompleted = idx < activeNode;

                  return (
                    <motion.button
                      key={idx}
                      onClick={() => setActiveNode(idx)}
                      className="rounded-full transition-all"
                      style={{
                        width: isActive ? "2rem" : "0.75rem",
                        height: "0.75rem",
                        background: isActive
                          ? `linear-gradient(to right, #06b6d4, #a855f7)`
                          : isCompleted
                          ? "rgba(6, 182, 212, 0.5)"
                          : "rgba(255, 255, 255, 0.2)",
                      }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  );
                })}
              </div>

              {/* Navigation buttons */}
              <div className="flex gap-3">
                <motion.button
                  onClick={() => setActiveNode(Math.max(0, activeNode - 1))}
                  disabled={activeNode === 0}
                  className="px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: activeNode === 0 ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.1)",
                  }}
                  whileHover={activeNode > 0 ? { x: -5 } : {}}
                  whileTap={activeNode > 0 ? { scale: 0.95 } : {}}
                >
                  ← Previous
                </motion.button>
                <motion.button
                  onClick={() => setActiveNode(Math.min(flowchartNodes.length - 1, activeNode + 1))}
                  disabled={activeNode === flowchartNodes.length - 1}
                  className="px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: activeNode === flowchartNodes.length - 1
                      ? "rgba(255,255,255,0.05)"
                      : undefined
                  }}
                  whileHover={activeNode < flowchartNodes.length - 1 ? { x: 5 } : {}}
                  whileTap={activeNode < flowchartNodes.length - 1 ? { scale: 0.95 } : {}}
                >
                  {activeNode === flowchartNodes.length - 1 ? (
                    <span>Next →</span>
                  ) : (
                    <span className={`bg-gradient-to-r ${activeNodeData.gradient} bg-clip-text block`}>
                      Next →
                    </span>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
    </>
  );
}

// Services Grid Component
function ServicesGrid({ services }: { services: Service[] }) {
  console.log("ServicesGrid received:", services.length, "services");

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service, index) => {
        console.log(`Rendering service ${index + 1}:`, service.title);
        return (
          <motion.div
            key={`service-${index}-${service.title}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group"
          >
          <div className="p-8 rounded-3xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-white/10 h-full relative overflow-hidden">
            {/* Hover glow */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
            />

            <div className="relative z-10">
              <motion.div
                className="text-6xl mb-6"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              >
                <DynamicIcon name={service.icon} size={64} />
              </motion.div>

              <h3
                className={`text-2xl font-bold mb-3 bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}
              >
                {service.title}
              </h3>

              <p className="text-gray-400 mb-6 leading-relaxed">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1 rounded-full bg-white/5 text-sm text-gray-300 border border-white/10"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        );
      })}
    </div>
  );
}
