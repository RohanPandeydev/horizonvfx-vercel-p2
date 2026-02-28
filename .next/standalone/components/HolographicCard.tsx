"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function HolographicCard({
  children,
  className = "",
}: HolographicCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    mouseX.set(rotateX);
    mouseY.set(rotateY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {/* Holographic gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-0 pointer-events-none rounded-lg"
        animate={{
          opacity: isHovered ? 0.3 : 0,
          background: [
            "linear-gradient(135deg, #3b82f6 0%, transparent 50%, #10b981 100%)",
            "linear-gradient(225deg, transparent 0%, #8b5cf6 50%, transparent 100%)",
            "linear-gradient(135deg, #3b82f6 0%, transparent 50%, #10b981 100%)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ mixBlendMode: "overlay" }}
      />

      {/* Glitch line effect on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            animate={{
              top: ["0%", "100%"],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}

      {/* Scanline effect */}
      <div
        className="absolute inset-0 pointer-events-none rounded-lg opacity-20"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.1) 2px, rgba(0, 0, 0, 0.1) 4px)",
        }}
      />

      {/* Content */}
      <div
        className="relative z-10"
        style={{ transform: "translateZ(20px)" }}
      >
        {children}
      </div>

      {/* Glowing border on hover */}
      <motion.div
        className="absolute -inset-[2px] rounded-lg opacity-0 blur-sm -z-10"
        animate={{
          opacity: isHovered ? 1 : 0,
          background: [
            "linear-gradient(135deg, #3b82f6, #10b981, #8b5cf6)",
            "linear-gradient(225deg, #8b5cf6, #3b82f6, #10b981)",
            "linear-gradient(135deg, #3b82f6, #10b981, #8b5cf6)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </motion.div>
  );
}
