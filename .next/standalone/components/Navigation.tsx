"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TW, GRADIENTS } from "@/lib/colors";

interface NavigationProps {
  loading: boolean;
}

export default function Navigation({ loading }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Team", href: "/team" },
    { name: "Showcase", href: "/showcase" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: loading ? -100 : 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/90 backdrop-blur-xl py-3 border-b border-white/10"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-8 flex items-center justify-between">
          <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
          >
            <img
              src="/logo.svg"
              alt="HorizonVFX"
              className="h-8 md:h-10 lg:h-12"
            />
          </motion.div>
        </Link>
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item, i) => (
              <Link key={item.href} href={item.href}>
                <motion.span
                  className={`text-xs lg:text-sm font-medium relative group transition-colors ${
                    pathname === item.href
                      ? "text-transparent bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text font-bold"
                      : "text-white/90 hover:text-white"
                  }`}
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300"
                    style={{
                      width: pathname === item.href ? "100%" : "0"
                    }}
                  />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-green-500 group-hover:w-full transition-all duration-300" />
                </motion.span>
              </Link>
            ))}
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden z-50 p-2"
          >
            <motion.div
              animate={{ rotate: menuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-black z-40 md:hidden"
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: GRADIENTS.primaryLight,
                opacity: 0.1,
              }}
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="relative flex flex-col justify-center h-full px-8 md:px-12 space-y-6 md:space-y-8">
              {navItems.map((item, i) => (
                <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-3xl md:text-4xl font-bold flex items-center justify-between group"
                  >
                    <span className={`bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300 ${
                      pathname === item.href
                        ? "from-blue-500 to-green-500"
                        : "from-white to-white/60 group-hover:from-blue-500 group-hover:to-green-500"
                    }`}>
                      {item.name}
                    </span>
                    <ArrowRight
                      className="group-hover:translate-x-2 transition-transform"
                      size={32}
                    />
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
