"use client";
import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ServicesPage() {
  const { scrollY } = useScroll();
  const [activeNode, setActiveNode] = useState(0);
  const [isFlowchartVisible, setIsFlowchartVisible] = useState(false);

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
              Our Services
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            From concept to final delivery, we provide comprehensive visual
            effects and animation services that bring your vision to life
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

          <ServicesGrid />
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

const flowchartNodes: FlowchartNode[] = [
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
];

function InteractiveFlowchart({
  activeNode,
  setActiveNode,
}: {
  activeNode: number;
  setActiveNode: (node: number) => void;
}) {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const activeNodeData = flowchartNodes[activeNode];

  return (
    <div className="relative">
      {/* Main Content - Split Layout */}
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left Side - Flowchart Nodes */}
        <div className="relative space-y-6" style={{ paddingTop: "2%", paddingBottom: "2%" }}>
          {/* Connection Lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
          >
            {flowchartNodes.map((_, index) => {
              if (index === flowchartNodes.length - 1) return null;

              const startX = 50;
              const endX = 50;
              const startY = index * 16.66 + 8.33;
              const endY = (index + 1) * 16.66 + 8.33;

              return (
                <g key={`line-${index}`}>
                  {/* Animated connection line */}
                  <motion.line
                    x1={`${startX}%`}
                    y1={`${startY}%`}
                    x2={`${endX}%`}
                    y2={`${endY}%`}
                    stroke="url(#lineGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: activeNode > index ? 1 : 0 }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    opacity={activeNode > index ? 0.8 : 0.2}
                  />

                  {/* Animated particles flowing along the line */}
                  {activeNode > index && (
                    <motion.circle
                      r="4"
                      fill="url(#particleGradient)"
                      animate={{
                        cx: [`${startX}%`, `${endX}%`],
                        cy: [`${startY}%`, `${endY}%`],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
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
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#a855f7" />
              </radialGradient>
            </defs>
          </svg>

          {/* Flowchart Nodes */}
          <div className="relative z-10">
            {flowchartNodes.map((node, index) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveNode(node.id)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className={`relative group cursor-pointer mb-4 transition-all duration-300 ${
                  activeNode === node.id ? "scale-105" : hoveredNode === node.id ? "scale-102" : ""
                }`}
              >
                {/* 3D Card */}
                <motion.div
                  className={`bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 backdrop-blur-sm rounded-2xl p-6 border relative overflow-hidden transition-all duration-300 ${
                    activeNode === node.id ? "border-cyan-500/50 shadow-lg shadow-cyan-500/20" : "border-white/10"
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                  }}
                  whileHover={{
                    scale: 1.02,
                    rotateX: 5,
                    rotateY: -5,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Glow effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${node.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  {/* Active indicator */}
                  {activeNode === node.id && (
                    <motion.div
                      className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-r ${node.gradient}`}
                      layoutId="activeIndicator"
                    />
                  )}

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <motion.div
                        className={`text-4xl md:text-5xl flex-shrink-0`}
                        animate={
                          activeNode === node.id ? { rotate: [0, 10, -10, 0] } : {}
                        }
                        transition={{
                          duration: 0.5,
                          repeat: activeNode === node.id ? Infinity : 0,
                        }}
                      >
                        {node.icon}
                      </motion.div>

                      {/* Main content */}
                      <div className="flex-1">
                        <h3
                          className={`text-xl md:text-2xl font-bold mb-1 bg-gradient-to-r ${node.gradient} bg-clip-text text-transparent`}
                        >
                          {node.title}
                        </h3>
                        <p className="text-gray-400 text-sm">{node.description}</p>
                      </div>

                      {/* Step number */}
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r ${node.gradient} flex items-center justify-center text-white font-bold`}
                      >
                        {index + 1}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side - Info View Panel */}
        <div className="relative">
          <motion.div
            key={activeNode}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="sticky top-24"
          >
            {/* Info Panel Card */}
            <div className="bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 backdrop-blur-xl rounded-3xl p-8 border border-white/10 relative overflow-hidden">
              {/* Animated background glow */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${activeNodeData.gradient} opacity-5`}
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Header */}
              <div className="relative z-10 mb-8">
                <motion.div
                  className="text-7xl mb-6"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  {activeNodeData.icon}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div
                    className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${activeNodeData.gradient} text-white text-sm font-semibold mb-4`}
                  >
                    Step {activeNode + 1}
                  </div>
                </motion.div>

                <h2
                  className={`text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r ${activeNodeData.gradient} bg-clip-text text-transparent`}
                >
                  {activeNodeData.title}
                </h2>

                <p className="text-gray-400 text-lg leading-relaxed">
                  {activeNodeData.description}
                </p>
              </div>

              {/* Details List */}
              <div className="relative z-10">
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" />
                  Key Activities
                </h4>

                <ul className="space-y-4">
                  {activeNodeData.details.map((detail, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + idx * 0.1 }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <motion.div
                        className={`flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-r ${activeNodeData.gradient} flex items-center justify-center text-white font-bold`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {idx + 1}
                      </motion.div>
                      <span className="text-gray-300 leading-relaxed">{detail}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Progress indicator */}
              <div className="relative z-10 mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                  <span>Progress</span>
                  <span>{Math.round(((activeNode + 1) / flowchartNodes.length) * 100)}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${activeNodeData.gradient}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${((activeNode + 1) / flowchartNodes.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="relative z-10 mt-6 flex gap-3">
                <motion.button
                  onClick={() => setActiveNode(Math.max(0, activeNode - 1))}
                  disabled={activeNode === 0}
                  className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                    activeNode === 0
                      ? "bg-white/5 text-gray-600 cursor-not-allowed"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                  whileHover={activeNode > 0 ? { scale: 1.05 } : {}}
                  whileTap={activeNode > 0 ? { scale: 0.95 } : {}}
                >
                  ← Previous
                </motion.button>
                <motion.button
                  onClick={() => setActiveNode(Math.min(flowchartNodes.length - 1, activeNode + 1))}
                  disabled={activeNode === flowchartNodes.length - 1}
                  className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                    activeNode === flowchartNodes.length - 1
                      ? "bg-white/5 text-gray-600 cursor-not-allowed"
                      : `bg-gradient-to-r ${activeNodeData.gradient} text-white hover:opacity-90`
                  }`}
                  whileHover={activeNode < flowchartNodes.length - 1 ? { scale: 1.05 } : {}}
                  whileTap={activeNode < flowchartNodes.length - 1 ? { scale: 0.95 } : {}}
                >
                  Next →
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Services Grid Component
function ServicesGrid() {
  const services = [
    {
      title: "Visual Effects",
      description:
        "CGI, compositing, and green screen integration for films and commercials",
      icon: "🎥",
      gradient: "from-cyan-500 to-blue-500",
      features: ["Green Screen", "CGI", "Rotoscope", "Match Move"],
    },
    {
      title: "3D Animation",
      description:
        "Character animation, rigging, and motion graphics for any medium",
      icon: "🎬",
      gradient: "from-blue-500 to-purple-500",
      features: [
        "Character Rigging",
        "Motion Graphics",
        "Mocap",
        "Keyframe Animation",
      ],
    },
    {
      title: "Game Cinematics",
      description:
        "High-impact cinematic sequences and trailers for gaming projects",
      icon: "🎮",
      gradient: "from-purple-500 to-pink-500",
      features: [
        "Real-time Renders",
        "Game Trailers",
        "Cutscenes",
        "Asset Creation",
      ],
    },
    {
      title: "Pre-visualization",
      description:
        "Storyboard animation and previs to plan your shots effectively",
      icon: "📋",
      gradient: "from-pink-500 to-rose-500",
      features: ["Storyboarding", "3D Previs", "Techvis", "Postvis"],
    },
    {
      title: "Color Grading",
      description:
        "Professional color correction and grading for cinematic looks",
      icon: "🎨",
      gradient: "from-rose-500 to-orange-500",
      features: [
        "Color Correction",
        "Look Development",
        "HDR Grading",
        "Film Emulation",
      ],
    },
    {
      title: "Virtual Production",
      description: "LED wall volumes and real-time rendering for on-set VFX",
      icon: "🖥️",
      gradient: "from-orange-500 to-yellow-500",
      features: [
        "LED Volumes",
        "Real-time Rendering",
        "Camera Tracking",
        "Virtual Sets",
      ],
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service, index) => (
        <motion.div
          key={service.title}
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
                {service.icon}
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
      ))}
    </div>
  );
}
