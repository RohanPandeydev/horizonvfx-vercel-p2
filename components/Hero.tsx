"use client";
import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ParticleGalaxy from "./ParticleGalaxy";
import AnimatedHeroText from "./AnimatedHeroText";
import { GRADIENTS } from "@/lib/colors";

interface HeroProps {
  loading: boolean;
  scrollY: any;
}

export default function Hero({ loading, scrollY }: HeroProps) {
  const [heroParticles] = useState(() =>
    [...Array(15)].map(() => ({
      x: Math.random(),
      y: Math.random(),
      targetX: Math.random(),
      targetY: Math.random(),
      duration: 5 + Math.random() * 5,
    }))
  );

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden">
      {/* Add 3D Particle Galaxy Background */}
      <ParticleGalaxy />

      <motion.div
        className="absolute inset-0 mx-4 md:mx-10 p-1 rounded-xl overflow-hidden"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: loading ? 1.1 : 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        style={{
          background: GRADIENTS.hero,
          backgroundSize: "200% 200%",
        }}
      >
        <motion.div
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0"
          style={{
            background: GRADIENTS.hero,
            backgroundSize: "200% 200%",
          }}
        />
        <div className="relative w-full h-full bg-black rounded-xl overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40"
            src="https://www.horizonvfx.in/images/Video1.mp4"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

          {/* Animated particles */}
          <div className="absolute inset-0">
            {heroParticles.map((particle, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-500/30 rounded-full"
                initial={{
                  x: particle.x * 100 + "%",
                  y: particle.y * 100 + "%",
                }}
                animate={{
                  y: [particle.y * 100 + "%", particle.targetY * 100 + "%"],
                  x: [particle.x * 100 + "%", particle.targetX * 100 + "%"],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Hero text positioned at bottom right */}
      <motion.div
        className="absolute bottom-16 md:bottom-20 right-6 md:right-12 lg:right-16 z-10 text-right max-w-3xl lg:max-w-5xl"
        style={{
          y: useTransform(scrollY, [0, 600], [0, -150]),
          opacity: useTransform(scrollY, [0, 400], [1, 0]),
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loading ? 0 : 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="space-y-1 md:space-y-2"
        >
          {/* Animated "Where Creative Meets Horizon" text */}
          <div className="flex flex-wrap items-center justify-end gap-1 md:gap-2">
            <AnimatedHeroText
              text="Where"
              delay={200}
              isLoading={loading}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold uppercase tracking-tight text-white"
            />
            <AnimatedHeroText
              text="Creative"
              delay={400}
              isLoading={loading}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light italic uppercase tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
            />
            <AnimatedHeroText
              text="Meets"
              delay={600}
              isLoading={loading}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold uppercase tracking-tight text-white"
            />
            <AnimatedHeroText
              text="Horizon"
              delay={800}
              isLoading={loading}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold uppercase tracking-tight bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: loading ? 0 : 1, x: loading ? 50 : 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="leading-tight mt-2 md:mt-4"
          >
            <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-light italic tracking-tight text-gray-300">
              Visual Effects • Animation • Post Production
            </span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2 backdrop-blur-sm bg-white/5"
        >
          <motion.div
            className="w-1.5 h-1.5 bg-gradient-to-b from-blue-500 to-green-500 rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
