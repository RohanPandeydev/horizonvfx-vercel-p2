"use client";

import { motion } from "framer-motion";

interface AnimatedHeroTextProps {
  text: string;
  className?: string;
  delay?: number;
  isLoading?: boolean;
}

export default function AnimatedHeroText({
  text,
  className = "",
  delay = 0,
  isLoading = false,
}: AnimatedHeroTextProps) {
  // Convert milliseconds to seconds for the delay
  const delayInSeconds = delay / 1000;

  // Check if gradient is in className
  const hasGradient = className.includes('bg-gradient-to-r');

  if (isLoading) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {text.split("").map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.5,
            delay: delayInSeconds + (index * 0.03),
            type: "spring",
            stiffness: 150,
            damping: 20,
          }}
          className="inline-block"
          style={{
            transformStyle: "preserve-3d",
            display: "inline-block",
            // Apply gradient background to each letter if gradient exists
            ...(hasGradient && {
              backgroundImage: 'inherit',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
            }),
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
}
