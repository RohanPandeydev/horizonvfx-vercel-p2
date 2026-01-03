"use client";
import React from "react";
import { motion } from "framer-motion";
import { TW } from "@/lib/colors";

export default function About() {
  return (
    <section
      id="about"
      className="py-20 md:py-32 px-4 md:px-6 bg-gradient-to-b from-black via-zinc-900 to-black relative overflow-hidden"
    >
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
        }}
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-7xl font-bold mb-12 md:mb-16 text-center bg-gradient-to-r from-white via-green-200 to-white bg-clip-text text-transparent"
        >
          Why HorizonVFX
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, rotateY: 5 }}
            className="space-y-4 md:space-y-6 p-6 md:p-8 rounded-xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-white/10"
            style={{ transformStyle: "preserve-3d" }}
          >
            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Innovative Visionaries
            </h3>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              Our team consists of forward-thinking artists and tech savants who
              thrive on pushing the boundaries of visual innovation.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: 15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, rotateY: -5 }}
            className="space-y-4 md:space-y-6 p-6 md:p-8 rounded-xl bg-gradient-to-br from-zinc-900/50 to-zinc-800/50 backdrop-blur-sm border border-white/10"
            style={{ transformStyle: "preserve-3d" }}
          >
            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Tech Odyssey
            </h3>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              Journey with us into the future as we employ the latest in VFX
              technology, ensuring your project is at the forefront of industry
              advancements.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
