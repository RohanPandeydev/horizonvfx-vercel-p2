"use client";
import { useState, useEffect } from "react";
import { useScroll } from "framer-motion";
import Hero from "@/components/Hero";
import ServicesMarquee from "@/components/ServicesMarquee";
import Showcase from "@/components/Showcase";
import About from "@/components/About";
import GalacticShowcase from "@/components/GalacticShowcase";
import Clients from "@/components/Clients";
import Team from "@/components/Team";
import ServicesDetail from "@/components/ServicesDetail";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const { scrollY } = useScroll();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <Hero loading={loading} scrollY={scrollY} />

      {/* Services Marquee */}
      <ServicesMarquee />

      {/* Showcase/Showreel Section */}
      <Showcase />

      {/* About Preview Section */}
      <About />

      {/* Galactic Showcase */}
      <GalacticShowcase />

      {/* Clients Section */}
      <Clients />

      {/* Team Preview Section */}
      <Team />

      {/* Services Detail Section */}
      <ServicesDetail />
    </>
  );
}
