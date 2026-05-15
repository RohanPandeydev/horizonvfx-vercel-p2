"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
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

  return (
    <>
      {/* Smooth scroll wrapper */}
      <SmoothScroll />

      {/* Cinematic film grain overlay */}
      <FilmGrain />

      {/* Preloader */}
      <Preloader loading={loading} />

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
