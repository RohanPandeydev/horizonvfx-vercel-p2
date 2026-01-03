"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { TW } from "@/lib/colors";

const services = [
  { title: "Film and OTT", image: "https://horizonvfx.in/images/flm.png" },
  { title: "Game", image: "https://horizonvfx.in/images/game.jpg" },
  {
    title: "Commercial",
    image: "https://horizonvfx.in/images/Commercial.jpg",
  },
  { title: "Unreal", image: "https://horizonvfx.in/images/unreal.jpg" },
];

export default function GalacticShowcase() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 max-w-[1400px] mx-auto relative">
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
        }}
      />
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 md:mb-8 text-center bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent relative z-10"
      >
        Galactic Showcase
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-base md:text-xl text-gray-400 text-center mb-12 md:mb-16 max-w-3xl mx-auto relative z-10"
      >
        Dive into our Galactic Showcase for a glimpse into the cosmic tapestry
        we've woven for our clients
      </motion.p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 relative z-10">
        {services.map((item, index) => (
          <ServiceCard key={item.title} service={item} index={index} />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: { title: string; image: string };
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = React.useRef(null);
  const isInView = require("framer-motion").useInView(ref, {
    once: true,
    margin: "-50px",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: -15 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, rotateX: 0 }
          : { opacity: 0, y: 40, rotateX: -15 }
      }
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, z: 50 }}
      className="relative aspect-square bg-zinc-900 rounded-lg overflow-hidden group cursor-pointer border border-white/10"
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
        animate={{
          opacity: isHovered ? 1 : 0.8,
        }}
      />
      <div className="absolute inset-0 flex items-end p-6">
        <motion.h3
          className="text-2xl font-bold z-10 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
          animate={{
            y: isHovered ? -10 : 0,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {service.title}
        </motion.h3>
      </div>
      <motion.div
        className="absolute inset-0 border-2 border-blue-500/0 rounded-lg"
        animate={{
          borderColor: isHovered
            ? "rgba(59, 130, 246, 0.5)"
            : "rgba(59, 130, 246, 0)",
        }}
      />
    </motion.div>
  );
}
