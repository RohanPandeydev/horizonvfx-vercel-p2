"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { Play, ArrowRight, ExternalLink } from "lucide-react";
import Showcase from "@/components/Showcase";
import GalacticShowcase from "@/components/GalacticShowcase";

const showcaseProjects = [
  {
    title: "Pushpa 2: The Rule",
    category: "Film & OTT",
    image: "https://horizonvfx.in/images/Pushpa_2.png",
    description: "Mind-bending visual effects for the blockbuster sequel",
    gradient: "from-orange-500 to-red-500",
    stats: "200+ VFX Shots",
  },
  {
    title: "Commercial Campaign",
    category: "Advertisement",
    image: "https://horizonvfx.in/images/Commercial.jpg",
    description: "Stunning commercial visuals with photorealistic CG",
    gradient: "from-blue-500 to-cyan-500",
    stats: "50+ Shots",
  },
  {
    title: "Game Cinematics",
    category: "Gaming",
    image: "https://horizonvfx.in/images/game.jpg",
    description: "Immersive game trailers and cinematic sequences",
    gradient: "from-purple-500 to-pink-500",
    stats: "15+ Trailers",
  },
  {
    title: "Unreal Engine Integration",
    category: "Virtual Production",
    image: "https://horizonvfx.in/images/unreal.jpg",
    description: "Real-time rendering and virtual production",
    gradient: "from-green-500 to-emerald-500",
    stats: "30+ Projects",
  },
];

const services = [
  { icon: "🎬", name: "Film & OTT", count: "100+" },
  { icon: "🎮", name: "Gaming", count: "50+" },
  { icon: "📺", name: "Commercial", count: "200+" },
  { icon: "🖥️", name: "Unreal Engine", count: "30+" },
];

export default function ShowcasePage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section - Inspired by CoolLaser */}
      <motion.section
        style={{ y }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8"
              style={{
                background:
                  "linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #10b981 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Our Showcase
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Explore our portfolio of visual effects and animation projects
              that push the boundaries of creativity
            </motion.p>
          </motion.div>

          {/* Stats - Inspired by CoolLaser */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            {services.map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8, scale: 1.05 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-white/10"
              >
                <div className="text-4xl mb-2">{service.icon}</div>
                <div className="text-3xl font-bold text-white mb-1">
                  {service.count}
                </div>
                <div className="text-sm text-gray-400">{service.name}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </motion.section>

      {/* Featured Projects Grid - Inspired by Opti.ai */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A glimpse into the cosmic tapestry we've woven for our clients
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {showcaseProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-white/10">
                  {/* Image */}
                  <div className="aspect-video overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      animate={
                        hoveredIndex === index ? { scale: 1.1 } : { scale: 1 }
                      }
                      transition={{ duration: 0.5 }}
                    />
                    {/* Gradient overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-0 group-hover:opacity-70 transition-opacity duration-500`}
                    />

                    {/* Play button */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={
                        hoveredIndex === index ? { scale: 1 } : { scale: 0 }
                      }
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Play className="text-white" size={32} fill="white" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <motion.div
                      initial={{ x: -20 }}
                      animate={hoveredIndex === index ? { x: 0 } : { x: -20 }}
                      className="flex items-center gap-3 mb-3"
                    >
                      <span
                        className={`px-3 py-1 rounded-full bg-gradient-to-r ${project.gradient} text-white text-xs font-semibold`}
                      >
                        {project.category}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {project.stats}
                      </span>
                    </motion.div>

                    <h3
                      className={`text-3xl font-bold mb-3 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}
                    >
                      {project.title}
                    </h3>

                    <p className="text-gray-400 mb-6">{project.description}</p>

                    <motion.button
                      className={`inline-flex items-center gap-2 text-transparent bg-gradient-to-r ${project.gradient} bg-clip-text font-semibold`}
                      whileHover={{ x: 5 }}
                    >
                      View Project
                      <ArrowRight size={20} />
                    </motion.button>
                  </div>

                  {/* Hover accent line */}
                  <motion.div
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${project.gradient}`}
                    initial={{ width: 0 }}
                    animate={
                      hoveredIndex === index ? { width: "100%" } : { width: 0 }
                    }
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive 3D Section */}
      <section className="py-20 px-4 md:px-6 relative overflow-hidden bg-zinc-950">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Galactic Showcase
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Dive into our Galactic Showcase for a glimpse into the cosmic
              tapestry
            </p>
          </motion.div>

          {/* Showcase Components */}
          <Showcase />
          <GalacticShowcase />
        </div>
      </section>

      {/* Technologies Section - Inspired by CoolLaser */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-zinc-950 to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Cutting-Edge Technologies
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Powered by the latest tools and technologies
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: "After Effects",
                icon: "🎨",
                color: "from-purple-500 to-blue-500",
              },
              { name: "Nuke", icon: "💣", color: "from-blue-500 to-cyan-500" },
              { name: "Maya", icon: "🔷", color: "from-cyan-500 to-teal-500" },
              {
                name: "Unreal Engine",
                icon: "🎮",
                color: "from-red-500 to-orange-500",
              },
              {
                name: "Houdini",
                icon: "🌀",
                color: "from-orange-500 to-yellow-500",
              },
              {
                name: "Blender",
                icon: "🔶",
                color: "from-yellow-500 to-green-500",
              },
              {
                name: "Cinema 4D",
                icon: "📦",
                color: "from-green-500 to-emerald-500",
              },
              {
                name: "Substance",
                icon: "🎭",
                color: "from-pink-500 to-rose-500",
              },
            ].map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="relative group"
              >
                <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-white/10 text-center">
                  <div className="text-5xl mb-3">{tech.icon}</div>
                  <div
                    className={`text-sm font-semibold bg-gradient-to-r ${tech.color} bg-clip-text text-transparent`}
                  >
                    {tech.name}
                  </div>
                  {/* Hover glow */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${tech.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10 blur-xl`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 rounded-3xl bg-gradient-to-br from-zinc-800/30 to-zinc-900/30 backdrop-blur-sm border border-white/10 relative overflow-hidden text-center"
          >
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-green-500" />
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl" />

            {/* <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Create Something Amazing?
              </h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Let's bring your vision to life with our cutting-edge visual
                effects and creative expertise
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start a Project
                </motion.button>
                <motion.button
                  className="px-8 py-4 bg-white/5 border border-white/20 rounded-lg font-semibold text-white flex items-center justify-center gap-2"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255,255,255,0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Full Portfolio
                  <ExternalLink size={20} />
                </motion.button>
              </div>
            </div> */}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
