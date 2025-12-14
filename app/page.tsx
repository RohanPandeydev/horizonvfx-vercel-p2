"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useInView,
  AnimatePresence,
  useTransform,
} from "framer-motion";
import { Menu, X, Play, ArrowRight, FastForward, Pause } from "lucide-react";

export default function HorizonVFX() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const services = [
    { title: "Film and OTT", image: "https://horizonvfx.in/images/flm.png" },
    { title: "Game", image: "https://horizonvfx.in/images/game.jpg" },
    {
      title: "Commercial",
      image: "https://horizonvfx.in/images/Commercial.jpg",
    },
    { title: "Unreal", image: "https://horizonvfx.in/images/unreal.jpg" },
  ];

  const team = [
    {
      name: "Dibakar Chakraborty",
      role: "Founder",
      image: "https://horizonvfx.in/images/tm1.jpg",
    },
    {
      name: "Mitun Dasgupta",
      role: "Founder",
      image: "https://horizonvfx.in/images/tm2.jpg",
    },
  ];

  const clients = [
    "https://horizonvfx.in/images/c-logo1.jpg",
    "https://horizonvfx.in/images/c-logo2.jpg",
    "https://horizonvfx.in/images/c-logo3.jpg",
    "https://horizonvfx.in/images/c-logo4.jpg",
  ];

  return (
    <>
      {/* Preloader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <img
                src="https://horizonvfx.in/images/logo.png"
                alt="HorizonVFX"
                className="h-16 md:h-20"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-black text-white min-h-screen overflow-x-hidden">
        {/* Navigation */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: loading ? -100 : 0 }}
          transition={{ delay: 0.5 }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled
              ? "bg-black/95 backdrop-blur-md py-4"
              : "bg-transparent py-6"
          }`}
        >
          <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
            <motion.a
              href="#home"
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
            >
              <img
                src="https://horizonvfx.in/images/logo.png"
                alt="HorizonVFX"
                className="h-10"
              />
            </motion.a>
            <div className="hidden md:flex items-center gap-8">
              <motion.a
                href="#home"
                className="text-sm font-medium hover:text-gray-300 transition-colors"
                whileHover={{ x: 2 }}
              >
                Home
              </motion.a>
              <motion.a
                href="#about"
                className="text-sm font-medium hover:text-gray-300 transition-colors"
                whileHover={{ x: 2 }}
              >
                About Us
              </motion.a>
              <motion.a
                href="#team"
                className="text-sm font-medium hover:text-gray-300 transition-colors"
                whileHover={{ x: 2 }}
              >
                Team Player
              </motion.a>
              <motion.a
                href="#showcase"
                className="text-sm font-medium hover:text-gray-300 transition-colors flex items-center gap-2 group"
                whileHover={{ x: 2 }}
              >
                <Play
                  size={12}
                  className="group-hover:translate-x-0.5 transition-transform"
                  fill="white"
                />
                Showcase
              </motion.a>
              <motion.a
                href="#contact"
                className="text-sm font-medium hover:text-gray-300 transition-colors flex items-center gap-2"
                whileHover={{ x: 2 }}
              >
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                Contact Us
              </motion.a>
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden z-50"
            >
              <motion.div
                animate={{ rotate: menuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </button>
          </div>
        </motion.nav>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: menuOpen ? 1 : 0, x: menuOpen ? 0 : "100%" }}
          transition={{ type: "tween", duration: 0.4 }}
          className="fixed inset-0 bg-black z-40 md:hidden"
          style={{ pointerEvents: menuOpen ? "auto" : "none" }}
        >
          <div className="flex flex-col justify-center h-full px-12 space-y-8">
            {["Home", "About Us", "Team Player", "Showcase", "Contact Us"].map(
              (item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: menuOpen ? 1 : 0, x: menuOpen ? 0 : 50 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-5xl font-bold flex items-center justify-between group"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                  <ArrowRight
                    className="group-hover:translate-x-2 transition-transform"
                    size={40}
                  />
                </motion.a>
              )
            )}
          </div>
        </motion.div>

        {/* Hero Section */}
        <section
          id="home"
          className="relative w-full h-screen flex items-end justify-end overflow-hidden pb-20 pr-12"
        >
          <motion.div
            className="absolute inset-0 mx-10 p-0.5 rounded-xl overflow-hidden bg-gradient-to-br from-black via-blue-600 to-green-500"
            initial={{ scale: 1.1 }}
            animate={{ scale: loading ? 1.1 : 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            style={{
              scale: useTransform(scrollY, [0, 500], [1, 1.1]),
              opacity: useTransform(scrollY, [0, 500], [1, 0.7]),
            }}
          >
            <div className="relative w-full h-full bg-black rounded-xl overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-40"
                src="https://www.horizonvfx.in/images/Video1.mp4"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
            </div>
          </motion.div>

          <motion.div
            className="relative z-10 text-right px-6 max-w-6xl"
            style={{
              y: useTransform(scrollY, [0, 600], [0, -150]),
              opacity: useTransform(scrollY, [0, 400], [1, 0]),
              scale: useTransform(scrollY, [0, 500], [1, 0.95]),
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: loading ? 0 : 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="space-y-0 leading-tight"
            >
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: loading ? 0 : 1, x: loading ? 50 : 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="leading-none"
                style={{
                  y: useTransform(scrollY, [0, 600], [0, -30]),
                  opacity: useTransform(scrollY, [0, 400], [1, 0.8]),
                }}
              >
                <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight">
                  Where{" "}
                </span>
                <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light italic uppercase tracking-tight">
                  Creativity
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: loading ? 0 : 1, x: loading ? 50 : 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="leading-none"
                style={{
                  y: useTransform(scrollY, [0, 600], [0, -40]),
                  opacity: useTransform(scrollY, [0, 400], [1, 0.7]),
                }}
              >
                <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight">
                  Meet{" "}
                </span>
                <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight">
                  Horizon
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: loading ? 0 : 1, x: loading ? 50 : 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="leading-none mt-4"
                style={{
                  y: useTransform(scrollY, [0, 600], [0, -20]),
                  opacity: useTransform(scrollY, [0, 400], [1, 0.6]),
                }}
              >
                <span className="text-3xl sm:text-4xl md:text-5xl font-light italic tracking-tight">
                  Visual Effects • Animation • Post Production
                </span>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: loading ? 0 : 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2"
            >
              <motion.div
                className="w-1.5 h-1.5 bg-white rounded-full"
                animate={{ y: [0, 16, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </motion.div>
          </motion.div>
        </section>

        {/* Services Marquee  */}
        <section className="py-12 mt-16 border-t border-b border-white/10 overflow-hidden bg-black relative">
          {/* Top Row - Outline Text, Moves Right on Scroll */}
          <div className="flex overflow-hidden">
            {[0, 1].map((set) => (
              <motion.div
                key={set}
                style={{
                  x: useTransform(
                    scrollY,
                    [0, 2000],
                    [set * 1920, set * 1920 + 1920]
                  ),
                }}
                className="flex gap-8 whitespace-nowrap flex-shrink-0"
              >
                {[
                  "POST - PRODUCTION",
                  "VFX",
                  "3D",
                  "COMPOSITING",
                  "GRADING",
                  "POST - PRODUCTION",
                  "VFX",
                  "3D",
                  "COMPOSITING",
                  "GRADING",
                ].map((service, i, arr) => (
                  <React.Fragment key={i}>
                    <span
                      className="text-2xl md:text-4xl font-bold tracking-tight text-transparent"
                      style={{ WebkitTextStroke: "1px white" }}
                    >
                      {service}
                    </span>
                    {i < arr.length - 1 && (
                      <>
                        <Play size={16} className="text-white" fill="white" />
                        <div className="w-3 h-3 bg-white"></div>
                      </>
                    )}
                  </React.Fragment>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Bottom Row - Solid Text, Moves Left on Scroll */}
          <div className="flex overflow-hidden mt-4">
            {[0, 1].map((set) => (
              <motion.div
                key={set}
                style={{
                  x: useTransform(
                    scrollY,
                    [0, 2000],
                    [-(set * 1920), -(set * 1920 + 1920)]
                  ),
                }}
                className="flex gap-8 whitespace-nowrap flex-shrink-0"
              >
                {[
                  "GRADING",
                  "VFX",
                  "3D",
                  "COMPOSITING",
                  "POST - PRODUCTION",
                  "GRADING",
                  "VFX",
                  "3D",
                  "COMPOSITING",
                  "POST - PRODUCTION",
                ].map((service, i, arr) => (
                  <React.Fragment key={i}>
                    <span className="text-3xl md:text-6xl font-bold tracking-tight text-white">
                      {service}
                    </span>
                    {i < arr.length - 1 && (
                      <>
                        <FastForward size={20} className="text-white" />
                        <Play size={16} className="text-white" fill="white" />
                        <div className="w-3 h-3 bg-white"></div>
                      </>
                    )}
                  </React.Fragment>
                ))}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Showreel Section */}
        <section
          id="showcase"
          className="pt-24 pb-10 px-6 max-w-[1400px] mx-auto"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold mb-16 text-center"
          >
            Showreel
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <motion.a
              href="#showcase"
              className="text-4xl md:text-6xl lg:text-8xl font-semibold inline-block text-white transition-all duration-500 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-green-500 hover:via-blue-500 hover:to-purple-400"
              whileHover={{ scale: 1.05 }}
            >
              Explore More
            </motion.a>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 px-6 bg-zinc-900">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-bold mb-16 text-center"
            >
              Why HorizonVFX
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="text-3xl font-bold">Innovative Visionaries</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Our team consists of forward-thinking artists and tech savants
                  who thrive on pushing the boundaries of visual innovation.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="text-3xl font-bold">Tech Odyssey</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Journey with us into the future as we employ the latest in VFX
                  technology, ensuring your project is at the forefront of
                  industry advancements.
                </p>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <motion.a
                href="#about"
                className="text-xl font-medium inline-flex items-center gap-2 group"
                whileHover={{ x: 5 }}
              >
                Read More
                <ArrowRight
                  className="group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Galactic Showcase */}
        <section className="py-24 px-6 max-w-[1400px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold mb-8 text-center"
          >
            Galactic Showcase
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto"
          >
            Dive into our Galactic Showcase for a glimpse into the cosmic
            tapestry we've woven for our clients
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((item, index) => (
              <ServiceCard key={item.title} service={item} index={index} />
            ))}
          </div>
        </section>

        {/* Clients Section */}
        <section className="py-24 px-6 max-w-[1400px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold mb-16 text-center"
          >
            Our Clients
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {clients.map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-center p-6 bg-white rounded-sm"
              >
                <img
                  src={logo}
                  alt={`Client ${index + 1}`}
                  className="w-full h-20 object-contain"
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-32 px-6 bg-zinc-900">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-bold mb-8 text-center"
            >
              Meet the HorizonVFX Collective
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg text-gray-300 text-center mb-16 max-w-4xl mx-auto leading-relaxed"
            >
              At HorizonVFX, our strength lies in the diversity and expertise of
              our team. Each member is a vital piece of the puzzle, contributing
              unique skills and perspectives to create the visual tapestry that
              defines our institution. Get to know the faces behind the
              magic—the dedicated individuals who bring innovation, passion, and
              creativity to every project.
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl mx-auto">
              {team.map((member, index) => (
                <TeamCard key={member.name} member={member} index={index} />
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <motion.a
                href="#team"
                className="text-xl font-medium inline-flex items-center gap-2 group"
                whileHover={{ x: 5 }}
              >
                Explore More
                <ArrowRight
                  className="group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24 px-6 max-w-[1400px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold mb-20 text-center"
          >
            Services
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <ServiceDetailCard
              title="Pre Production"
              items={[
                "Conceptualization and Planning",
                "Script Analysis: Careful examination of the script to identify scenes that require visual effects",
                "Concept Art: Creation of concept art and storyboards to visualize the director's vision for the visual effects",
                "VFX Budget: Estimation of the costs associated with visual effects production",
                "VFX Schedule: Development of a timeline for the VFX work, aligning it with the overall production schedule",
                "VFX Supervisor: Appointment of a VFX supervisor who will oversee the entire VFX process",
              ]}
              index={0}
            />
            <ServiceDetailCard
              title="Production"
              items={[
                "On-Set Supervision: If there are scenes that require on-set visual effects supervision, a VFX supervisor with their team will be present to ensure proper data acquisition, tracking, and other on-set requirements",
                "Green Screen Setup: Implementation of green screen setups for scenes requiring background replacement",
                "CG Character, Assets and Environment Development",
              ]}
              index={1}
            />
            <ServiceDetailCard
              title="Post Production"
              items={[
                "Shot Analysis: VFX Shot analysis for pipeline setup and work allocation",
                "VFX Desk Work: Roto and Cleanup, Matte Paint, Tracking Live action and CG Compositing, Simulation, Special Effects, CG rendering",
                "Quality Control: Regularly review visual effects shots with the director and other key stakeholders, gathering feedback for revisions",
                "Quality Assurance: Ensure that all visual effects meet the required quality standards and are consistent with the overall look of the film or project",
                "Delivery: Obtain final approval from the director and other stakeholders",
              ]}
              index={2}
            />
          </div>
        </section>

        {/* Footer */}
        <footer
          id="contact"
          className="border-t border-white/10 py-20 px-6 bg-black"
        >
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <img
                  src="https://horizonvfx.in/images/logo.png"
                  alt="HorizonVFX"
                  className="h-12 mb-8"
                />
                <div className="space-y-2 text-gray-400">
                  <a
                    href="tel:+919748712372"
                    className="block hover:text-white transition-colors"
                  >
                    +91 974 871 2372
                  </a>
                  <a
                    href="tel:+918767025601"
                    className="block hover:text-white transition-colors"
                  >
                    +91 876 702 5601
                  </a>
                  <a
                    href="mailto:info@horizonvfx.in"
                    className="block hover:text-white transition-colors"
                  >
                    info@horizonvfx.in
                  </a>
                </div>
              </motion.div>
              <motion.div
                className="text-left md:text-right"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-3xl md:text-4xl font-bold mb-6">
                  Get in touch
                </h3>
                <div className="space-y-3">
                  <a
                    href="#home"
                    className="block hover:text-gray-300 transition-colors"
                  >
                    Home
                  </a>
                  <a
                    href="#about"
                    className="block hover:text-gray-300 transition-colors"
                  >
                    About Us
                  </a>
                  <a
                    href="#team"
                    className="block hover:text-gray-300 transition-colors"
                  >
                    Team Player
                  </a>
                  <a
                    href="#showcase"
                    className="block hover:text-gray-300 transition-colors"
                  >
                    Showcase
                  </a>
                  <a
                    href="#contact"
                    className="block hover:text-gray-300 transition-colors"
                  >
                    Contact Us
                  </a>
                </div>
              </motion.div>
            </div>
            <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-500">
              <p>© 2024 HorizonVFX.com All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: { id: number; title: string; category: string; image: string };
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative cursor-pointer aspect-square rounded-sm p-[1.5px] bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-700 hover:from-indigo-500 hover:via-green-500 hover:to-pink-500 transition-all duration-500 overflow-hidden"
    >
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <div className="flex items-end justify-between gap-6">
          <div className="shrink-0 w-6 h-12 flex items-center justify-center">
            {!isHovered ? (
              <Play size={20} className="text-white" fill="white" />
            ) : (
              <Pause size={20} className="text-white" />
            )}
          </div>
          <div className="text-right max-w-[75%]">
            <h3 className="text-lg lg:text-xl font-semibold text-white leading-tight break-words">
              {project.title}
            </h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: { title: string; image: string };
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative aspect-square bg-zinc-900 rounded-sm overflow-hidden group cursor-pointer"
    >
      <motion.img
        src={service.image}
        alt={service.title}
        className="w-full h-full object-cover"
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.6 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
        <motion.h3
          className="text-2xl font-bold z-10"
          animate={{ y: isHovered ? -5 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {service.title}
        </motion.h3>
      </div>
    </motion.div>
  );
}

function TeamCard({
  member,
  index,
}: {
  member: { name: string; role: string; image: string };
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="text-center"
    >
      <div className="aspect-square overflow-hidden rounded-sm mb-6">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
      <p className="text-gray-400">{member.role}</p>
    </motion.div>
  );
}

function ServiceDetailCard({
  title,
  items,
  index,
}: {
  title: string;
  items: string[];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-zinc-900 p-8 rounded-sm"
    >
      <h3 className="text-3xl font-bold mb-6">{title}</h3>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-gray-300">
            <span className="text-white mt-1">▸</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
