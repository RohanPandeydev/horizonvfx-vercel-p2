"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import HolographicCard from "./HolographicCard";
import TextReveal from "./TextReveal";
import { GRADIENTS } from "@/lib/colors";

const projects = [
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
  {
    id: 5,
    title: "Character Animation",
    category: "Animation",
    image: "https://horizonvfx.in/images/animation4.jpg",
  },
  {
    id: 6,
    title: "Visual Effects",
    category: "VFX",
    image: "https://horizonvfx.in/images/animation5.jpg",
  },
  {
    id: 7,
    title: "Compositing Work",
    category: "Compositing",
    image: "https://horizonvfx.in/images/animation1.jpg",
  },
  {
    id: 8,
    title: "Special Effects",
    category: "Special FX",
    image: "https://horizonvfx.in/images/sp-effect1.jpg",
  },
];

export default function Showcase() {
  return (
    <section
      id="showcase"
      className="pt-16 md:pt-24 pb-8 md:pb-10 px-4 md:px-6 max-w-[1400px] mx-auto relative"
    >
      <motion.div
        className="absolute top-20 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />
      <TextReveal
        text="Showreel"
        className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 md:mb-16 text-center block"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-12 md:mt-16"
      >
        <motion.a
          href="#showcase"
          className="text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold inline-block relative group"
          whileHover={{ scale: 1.05 }}
        >
          <span className="bg-gradient-to-r from-white to-white bg-clip-text text-transparent group-hover:from-blue-500 group-hover:via-green-500 group-hover:to-purple-500 transition-all duration-500">
            Explore More
          </span>
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-green-500/20 to-purple-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.a>
      </motion.div>
    </section>
  );
}

// Enhanced ProjectCard with 3D hover
function ProjectCard({
  project,
  index,
}: {
  project: { id: number; title: string; category: string; image: string };
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = React.useRef(null);
  const isInView = require("framer-motion").useInView(ref, {
    once: true,
    margin: "-100px",
  });

  return (
    <HolographicCard className="relative cursor-pointer aspect-square rounded-lg overflow-hidden">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 60, rotateX: -10 }}
        animate={
          isInView
            ? { opacity: 1, y: 0, rotateX: 0 }
            : { opacity: 0, y: 60, rotateX: -10 }
        }
        transition={{ duration: 0.6, delay: index * 0.1 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        className="relative w-full h-full bg-black rounded-lg p-[2px] overflow-hidden"
        style={{
          transformStyle: "preserve-3d",
          background: GRADIENTS.primaryLight,
        }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : "0% 0%",
          }}
          transition={{ duration: 1 }}
          style={{
            background: GRADIENTS.primaryLight,
            backgroundSize: "200% 200%",
          }}
        />
        <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.6 }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
            animate={{
              opacity: isHovered ? 0.9 : 0.7,
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
            <div className="flex items-end justify-between gap-6">
              <motion.div
                className="shrink-0 w-8 h-14 flex items-center justify-center bg-gradient-to-b from-blue-500/20 to-transparent backdrop-blur-sm rounded-full"
                animate={{
                  scale: isHovered ? 1.2 : 1,
                }}
              >
                {!isHovered ? (
                  <Play
                    size={20}
                    className="text-blue-400"
                    fill="currentColor"
                  />
                ) : (
                  <Pause size={20} className="text-green-400" />
                )}
              </motion.div>
              <motion.div
                className="text-right max-w-[75%]"
                animate={{
                  y: isHovered ? -5 : 0,
                }}
              >
                <h3 className="text-lg lg:text-xl font-semibold text-white leading-tight break-words bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  {project.title}
                </h3>
                <motion.p
                  className="text-sm text-gray-400 mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                >
                  {project.category}
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </HolographicCard>
  );
}
