"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import FilmGrain from "@/components/FilmGrain";
import Preloader from "@/components/Preloader";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 20, stiffness: 100 });
  const smoothMouseY = useSpring(mouseY, { damping: 20, stiffness: 100 });

  // Don't use MainLayout for admin routes
  if (pathname?.startsWith("/hzn-ctrl-x9k2")) {
    return <>{children}</>;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Smooth scroll wrapper */}
      <SmoothScroll />

      {/* Cinematic film grain overlay */}
      <FilmGrain />

      {/* Preloader */}
      <Preloader loading={loading} />

      {/* Custom cursor effect */}
      <motion.div
        className="fixed w-8 h-8 border-2 border-blue-500 rounded-full pointer-events-none z-[60] mix-blend-difference hidden lg:block"
        style={{
          left: smoothMouseX,
          top: smoothMouseY,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />

      {/* Navigation - Fixed at top */}
      <Navigation loading={loading} />

      {/* Main Content */}
      <div className="bg-black text-white min-h-screen overflow-x-hidden">
        {children}
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
