"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GRADIENTS, RGBA } from "@/lib/colors";

interface PreloaderProps {
  loading: boolean;
}

export default function Preloader({ loading }: PreloaderProps) {
  const [mounted, setMounted] = useState(false);
  const [loaderParticles] = useState(() =>
    [...Array(20)].map(() => ({
      x: Math.random(),
      y: Math.random(),
    }))
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
        >
          <motion.div className="absolute inset-0">
            {mounted &&
              loaderParticles.map((particle, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-500 rounded-full"
                  initial={{
                    x: particle.x * window.innerWidth,
                    y: particle.y * window.innerHeight,
                    scale: 0,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 1.5, rotateY: 180 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <span className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-green-400 to-emerald-400 bg-clip-text text-transparent tracking-tight">HFX</span>
          </motion.div>
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at center, rgba(30, 58, 138, 0.15) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 1) 100%)",
            }}
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
