"use client";
import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TW, COLORS } from "@/lib/colors";
import About3DScene from "./About3DScene";

type ColorTheme = "green" | "blue" | "purple" | "cyan" | "emerald";

const colorThemes: Record<ColorTheme, { primary: string; secondary: string; accent: string }> = {
  green: { primary: "#10b981", secondary: "#3b82f6", accent: "#4ade80" },
  blue: { primary: "#3b82f6", secondary: "#8b5cf6", accent: "#60a5fa" },
  purple: { primary: "#a855f7", secondary: "#ec4899", accent: "#c084fc" },
  cyan: { primary: "#06b6d4", secondary: "#3b82f6", accent: "#22d3ee" },
  emerald: { primary: "#10b981", secondary: "#06b6d4", accent: "#34d399" },
};

const stats = [
  { value: "500+", label: "Projects Delivered", icon: "🎬" },
  { value: "50+", label: "Happy Clients", icon: "🏆" },
  { value: "100+", label: "Team Members", icon: "👥" },
  { value: "10+", label: "Years Experience", icon: "⭐" },
];

const features = [
  {
    icon: "🚀",
    title: "Cutting-Edge Technology",
    description: "We leverage the latest VFX software and AI-powered tools to create stunning visual effects that push creative boundaries.",
    gradient: "from-blue-400 to-cyan-400",
  },
  {
    icon: "🎨",
    title: "Creative Excellence",
    description: "Our team of visionary artists and technicians craft immersive visual experiences that captivate audiences worldwide.",
    gradient: "from-purple-400 to-pink-400",
  },
  {
    icon: "⚡",
    title: "Lightning-Fast Delivery",
    description: "With optimized workflows and state-of-the-art rendering farms, we deliver exceptional results on time, every time.",
    gradient: "from-green-400 to-emerald-400",
  },
  {
    icon: "🌟",
    title: "Award-Winning Work",
    description: "Our commitment to excellence has earned us recognition from industry leaders and prestigious award ceremonies.",
    gradient: "from-yellow-400 to-orange-400",
  },
  {
    icon: "🔬",
    title: "R&D Innovation",
    description: "We invest in research and development to pioneer new techniques and stay ahead of industry trends.",
    gradient: "from-cyan-400 to-blue-400",
  },
  {
    icon: "🤝",
    title: "Collaborative Approach",
    description: "We work closely with directors, producers, and studios to bring their creative vision to life.",
    gradient: "from-pink-400 to-rose-400",
  },
];

export default function About() {
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>("green");
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Auto-cycle through themes
  useEffect(() => {
    const themes: ColorTheme[] = ["green", "blue", "purple", "cyan", "emerald"];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % themes.length;
      setCurrentTheme(themes[index]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const theme = colorThemes[currentTheme];

  return (
    <section
      id="about"
      className="relative py-32 overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 w-full h-full opacity-40">
        <About3DScene themeColor={theme.primary} />
      </div>

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{
          background: `radial-gradient(circle, ${theme.primary}, transparent)`,
          y,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{
          background: `radial-gradient(circle, ${theme.secondary}, transparent)`,
          y,
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          style={{ opacity }}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            style={{
              background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 50%, ${theme.accent} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            About HorizonVFX
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Where Creativity Meets the Horizon - Pioneering Visual Excellence in
            the Digital Age
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-white/10 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primary}10, ${theme.secondary}10)`,
                  }}
                />
                <div className="relative z-10">
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div
                    className="text-3xl md:text-4xl font-bold mb-2"
                    style={{
                      background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Story Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3
                className="text-3xl md:text-4xl font-bold"
                style={{
                  background: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Our Journey
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Founded in 2013, HorizonVFX emerged from a passion for pushing the
                boundaries of visual storytelling. What started as a small team of
                dreamers has evolved into a powerhouse of creativity and technical
                excellence.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Today, we stand at the forefront of the VFX industry, combining
                artistry with cutting-edge technology to create visual experiences
                that inspire and amaze. Our journey continues as we explore new
                horizons in virtual production, real-time rendering, and AI-assisted
                visual effects.
              </p>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-white/10 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-50"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primary}20, ${theme.secondary}20)`,
                  }}
                />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-2xl">
                      🎯
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Our Mission</h4>
                      <p className="text-sm text-gray-400">
                        Redefining visual storytelling
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
                      👁️
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Our Vision</h4>
                      <p className="text-sm text-gray-400">
                        To be the global leader in VFX innovation
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-2xl">
                      💎
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Our Values</h4>
                      <p className="text-sm text-gray-400">
                        Excellence, Innovation, Collaboration
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            style={{
              background: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Why Choose Us
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="relative h-full p-6 rounded-2xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-white/10 overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${theme.primary}10, transparent)`,
                    }}
                  />
                  <div className="relative z-10">
                    <div className="text-5xl mb-4">{feature.icon}</div>
                    <h4
                      className={`text-xl font-bold mb-3 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}
                    >
                      {feature.title}
                    </h4>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  {/* Hover effect line */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1"
                    style={{
                      background: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`,
                    }}
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Color Theme Selector */}
        <motion.div
          className="mt-16 flex justify-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {Object.entries(colorThemes).map(([key, colors]) => (
            <motion.button
              key={key}
              className="w-10 h-10 rounded-full border-2 border-white/20 hover:border-white/50 transition-all"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              }}
              onClick={() => setCurrentTheme(key as ColorTheme)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Switch to ${key} theme`}
            />
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
