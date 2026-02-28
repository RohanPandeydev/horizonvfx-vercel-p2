"use client";
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Eye } from "lucide-react";
import { RGBA } from "@/lib/colors";

export default function ServicesMarquee() {
  const topServices = [
    "POST - PRODUCTION",
    "VFX",
    "3D",
    "COMPOSITING",
    "GRADING",
    "POST - PRODUCTION",
    "VFX",
  ];

  const bottomServices = [
    "GRADING",
    "VFX",
    "3D",
    "COMPOSITING",
    "POST - PRODUCTION",
    "GRADING",
    "VFX",
  ];

  return (
    <section className="py-12 md:py-16 mt-12 md:mt-16 border-t border-b border-white/10 overflow-hidden bg-gradient-to-b from-black via-zinc-900 to-black relative">
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
      />

      {/* Top Row */}
      <div className="flex overflow-hidden mb-4 md:mb-6">
        <motion.div
          animate={{
            x: [0, -1200],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-6 md:gap-12 whitespace-nowrap items-center"
        >
          {topServices.map((service, i) => (
            <React.Fragment key={i}>
              <motion.span
                className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-transparent select-none"
                style={{
                  WebkitTextStroke: "1px rgba(255,255,255,0.3)",
                  textShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
                }}
                whileHover={{
                  scale: 1.1,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.setProperty(
                    "-webkit-text-stroke",
                    "2px rgba(59, 130, 246, 0.8)"
                  );
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.setProperty(
                    "-webkit-text-stroke",
                    "1px rgba(255,255,255,0.3)"
                  );
                }}
              >
                {service}
              </motion.span>
              {i < 6 && (
                <Sparkles
                  size={16}
                  className="text-blue-500 hidden sm:block flex-shrink-0"
                />
              )}
            </React.Fragment>
          ))}
          {/* Duplicate set for seamless loop */}
          {topServices.map((service, i) => (
            <React.Fragment key={`dup-${i}`}>
              <motion.span
                className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-transparent select-none"
                style={{
                  WebkitTextStroke: "1px rgba(255,255,255,0.3)",
                  textShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
                }}
                whileHover={{
                  scale: 1.1,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.setProperty(
                    "-webkit-text-stroke",
                    "2px rgba(59, 130, 246, 0.8)"
                  );
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.setProperty(
                    "-webkit-text-stroke",
                    "1px rgba(255,255,255,0.3)"
                  );
                }}
              >
                {service}
              </motion.span>
              {i < 6 && (
                <Sparkles
                  size={16}
                  className="text-blue-500 hidden sm:block flex-shrink-0"
                />
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="flex overflow-hidden">
        <motion.div
          animate={{
            x: [-1200, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-6 md:gap-12 whitespace-nowrap items-center"
        >
          {bottomServices.map((service, i) => (
            <React.Fragment key={i}>
              <motion.span
                className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-white via-blue-200 to-green-200 bg-clip-text text-transparent select-none"
                whileHover={{
                  scale: 1.05,
                  backgroundImage:
                    "linear-gradient(to right, #3b82f6, #10b981)",
                }}
              >
                {service}
              </motion.span>
              {i < 6 && (
                <Eye size={20} className="text-green-500 flex-shrink-0" />
              )}
            </React.Fragment>
          ))}
          {/* Duplicate set for seamless loop */}
          {bottomServices.map((service, i) => (
            <React.Fragment key={`dup-${i}`}>
              <motion.span
                className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-white via-blue-200 to-green-200 bg-clip-text text-transparent select-none"
                whileHover={{
                  scale: 1.05,
                  backgroundImage:
                    "linear-gradient(to right, #3b82f6, #10b981)",
                }}
              >
                {service}
              </motion.span>
              {i < 6 && (
                <Eye size={20} className="text-green-500 flex-shrink-0" />
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
