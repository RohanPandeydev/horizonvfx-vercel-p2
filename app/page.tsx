"use client";
import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValue, useSpring } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import FilmGrain from "@/components/FilmGrain";
import Preloader from "@/components/Preloader";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ServicesMarquee from "@/components/ServicesMarquee";
import Showcase from "@/components/Showcase";
import About from "@/components/About";
import GalacticShowcase from "@/components/GalacticShowcase";
import Clients from "@/components/Clients";
import Team from "@/components/Team";
import ServicesDetail from "@/components/ServicesDetail";
import Footer from "@/components/Footer";

export default function HorizonVFX() {
  const [loading, setLoading] = useState(true);
  const { scrollY, scrollYProgress } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 20, stiffness: 100 });
  const smoothMouseY = useSpring(mouseY, { damping: 20, stiffness: 100 });

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
      {/* Add smooth scroll */}
      <SmoothScroll />

      {/* Add cinematic film grain overlay */}
      <FilmGrain />

      {/* Preloader */}
      <Preloader loading={loading} />

      {/* Floating cursor effect */}
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

      <div className="bg-black text-white min-h-screen overflow-x-hidden">
        {/* Navigation */}
        <Navigation loading={loading} />

        {/* Hero Section */}
        <Hero loading={loading} scrollY={scrollY} />

        {/* Services Marquee */}
        <ServicesMarquee />

        {/* Showcase/Showreel Section */}
        <Showcase />

        {/* About Section */}
        <About />

        {/* Galactic Showcase */}
        <GalacticShowcase />

        {/* Clients Section */}
        <Clients />

        {/* Team Section */}
        <Team />

        {/* Services Detail Section */}
        <ServicesDetail />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
