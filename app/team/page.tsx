"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Team from "@/components/Team";

const teamMembers = [
  {
    name: "Bhuvnesh Kumar Varshney",
    role: "Creative Animation Supervisor",
    image: "https://horizonvfx.in/images/tm1.jpg",
    gradient: "from-blue-500 to-cyan-500",
    bio: "15+ years of experience in animation and creative direction",
  },
  {
    name: "Dibakar Chakraborty",
    role: "Founder & VFX Supervisor",
    image: "https://horizonvfx.in/images/tm2.jpg",
    gradient: "from-purple-500 to-pink-500",
    bio: "Visionary leader with 20+ years in VFX industry",
  },
  {
    name: "Rahul Sharma",
    role: "3D Artist",
    image: "https://horizonvfx.in/images/tm3.jpg",
    gradient: "from-green-500 to-emerald-500",
    bio: "Specialized in 3D modeling and realistic texturing",
  },
  {
    name: "Priya Singh",
    role: "Compositor",
    image: "https://horizonvfx.in/images/tm4.jpg",
    gradient: "from-orange-500 to-red-500",
    bio: "Expert in compositing and color grading",
  },
  {
    name: "Amit Patel",
    role: "Motion Graphics Artist",
    image: "https://horizonvfx.in/images/tm5.jpg",
    gradient: "from-cyan-500 to-blue-500",
    bio: "Creative motion designer with passion for typography",
  },
];

// Three.js Background Component
function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Create floating geometric shapes
    const shapes: THREE.Mesh[] = [];
    const geometries = [
      new THREE.IcosahedronGeometry(0.3, 0),
      new THREE.OctahedronGeometry(0.3, 0),
      new THREE.TetrahedronGeometry(0.3, 0),
    ];

    const materials = [
      new THREE.MeshBasicMaterial({
        color: 0x3b82f6,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      }),
      new THREE.MeshBasicMaterial({
        color: 0xec4899,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      }),
    ];

    for (let i = 0; i < 15; i++) {
      const geometry = geometries[i % geometries.length];
      const material = materials[i % materials.length];
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.x = (Math.random() - 0.5) * 8;
      mesh.position.y = (Math.random() - 0.5) * 8;
      mesh.position.z = (Math.random() - 0.5) * 8;

      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;

      const scale = Math.random() * 0.5 + 0.5;
      mesh.scale.set(scale, scale, scale);

      shapes.push(mesh);
      scene.add(mesh);
    }

    camera.position.z = 3;

    // Mouse movement
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX / window.innerWidth - 0.5;
      mouseY = event.clientY / window.innerHeight - 0.5;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate particles
      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x += 0.0002;

      // Move camera with mouse
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Animate shapes
      shapes.forEach((shape, i) => {
        shape.rotation.x += 0.002 * (i % 2 === 0 ? 1 : -1);
        shape.rotation.y += 0.003 * (i % 2 === 0 ? -1 : 1);
        shape.position.y += Math.sin(Date.now() * 0.001 + i) * 0.001;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      shapes.forEach((shape) => {
        shape.geometry.dispose();
        if (shape.material instanceof THREE.Material) {
          shape.material.dispose();
        }
      });
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-10"
      style={{ background: "linear-gradient(to bottom, #000000, #09090b)" }}
    />
  );
}

export default function TeamPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const teamMembersForSlider = teamMembers.slice(2);
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(teamMembersForSlider.length / itemsPerSlide);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    })
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentSlide((prev) => {
      const next = prev + newDirection;
      if (next < 0) return totalSlides - 1;
      if (next >= totalSlides) return 0;
      return next;
    });
  };

  const getCurrentSlideMembers = () => {
    const start = currentSlide * itemsPerSlide;
    return teamMembersForSlider.slice(start, start + itemsPerSlide);
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <ThreeBackground />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative pt-32 pb-20 px-4 md:px-6"
      >
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              The Creative Minds
            </span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Meet the talented artists who bring{" "}
            <span className="text-white font-semibold">
              extraordinary visions
            </span>{" "}
            to life
          </motion.p>
        </div>
      </motion.section>

      {/* Leadership Section */}
      <section className="py-16 px-4 md:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              Leadership
            </motion.h2>
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "8rem" }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {teamMembers.slice(0, 2).map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900/60 to-zinc-950/60 backdrop-blur-xl border border-white/10">
                  {/* Animated gradient overlay */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0`}
                    animate={{
                      opacity: hoveredIndex === index ? 0.2 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  />

                  <div className="relative z-10 p-8">
                    {/* Image with 3D effect */}
                    <div className="relative mb-6 overflow-hidden rounded-2xl">
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 z-10`}
                        animate={{
                          opacity: hoveredIndex === index ? 0.3 : 0,
                        }}
                        transition={{ duration: 0.5 }}
                      />
                      <motion.img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-[400px] object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + 0.3 }}
                      >
                        <motion.h3
                          className="text-3xl font-bold text-white mb-3"
                          animate={{
                            y: hoveredIndex === index ? -5 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {member.name}
                        </motion.h3>
                        <motion.p
                          className={`text-xl bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent font-semibold mb-4`}
                        >
                          {member.role}
                        </motion.p>
                        <p className="text-gray-400 leading-relaxed">
                          {member.bio}
                        </p>
                      </motion.div>
                    </div>

                    {/* Floating glow effect */}
                    <motion.div
                      className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${member.gradient} opacity-20 blur-3xl rounded-full`}
                      animate={{
                        scale: hoveredIndex === index ? [1, 1.2, 1] : 1,
                        opacity: hoveredIndex === index ? 0.3 : 0.2,
                      }}
                      transition={{
                        duration: 2,
                        repeat: hoveredIndex === index ? Infinity : 0,
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members Slider Section */}
      <section className="py-16 px-4 md:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              Our Team
            </motion.h2>
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "8rem" }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            />
          </motion.div>

          {/* Slider Container */}
          <div className="relative">
            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mb-8">
              <motion.button
                onClick={() => paginate(-1)}
                className="p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={24} />
              </motion.button>
              <div className="flex items-center gap-2 px-6 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                <span className="text-white font-semibold">{currentSlide + 1}</span>
                <span className="text-gray-400">/</span>
                <span className="text-gray-400">{totalSlides}</span>
              </div>
              <motion.button
                onClick={() => paginate(1)}
                className="p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>

            {/* Slider Content */}
            <div className="relative overflow-hidden">
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 }
                }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {getCurrentSlideMembers().map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onHoverStart={() => setHoveredIndex(index + 10)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    className="group"
                  >
                    <motion.div
                      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900/60 to-zinc-950/60 backdrop-blur-lg border border-white/10"
                      whileHover={{
                        y: -10,
                        borderColor: "rgba(255, 255, 255, 0.3)",
                        boxShadow: "0 25px 50px -12px rgba(168, 85, 247, 0.25)",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Animated gradient overlay */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0`}
                        animate={{
                          opacity: hoveredIndex === index + 10 ? 0.15 : 0,
                        }}
                        transition={{ duration: 0.5 }}
                      />

                      {/* Image Section */}
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <motion.img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.15 }}
                          transition={{ duration: 0.6 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
                      </div>

                      {/* Content */}
                      <div className="relative z-10 p-6 -mt-20">
                        <motion.div
                          className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 backdrop-blur-xl rounded-xl p-6 border border-white/10"
                          whileHover={{
                            scale: 1.02,
                            borderColor: "rgba(255, 255, 255, 0.2)",
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.h3
                            className="text-xl font-bold text-white mb-2"
                            animate={{ x: hoveredIndex === index + 10 ? 5 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {member.name}
                          </motion.h3>
                          <p
                            className={`text-sm bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent font-semibold mb-3`}
                          >
                            {member.role}
                          </p>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            {member.bio}
                          </p>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentSlide ? 1 : -1);
                    setCurrentSlide(index);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "w-8 bg-gradient-to-r from-cyan-500 to-blue-500"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 md:px-6 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative p-12 rounded-3xl overflow-hidden group"
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/90 to-zinc-950/90 backdrop-blur-xl" />

            {/* Animated borders */}
            <motion.div
              className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
              animate={{ x: ["100%", "-100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative z-10 text-center">
              <motion.h3
                className="text-3xl md:text-4xl font-bold text-white mb-4"
                animate={{
                  textShadow: hoveredIndex !== null ? "0 0 20px rgba(168, 85, 247, 0.5)" : "none",
                }}
              >
                Join Our Creative Team
              </motion.h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg">
                Be part of our journey to create extraordinary visual
                experiences
              </p>
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold text-white shadow-lg shadow-purple-500/25"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px -10px rgba(168, 85, 247, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                View Open Positions
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Original Team Component */}
      {/* <Team /> */}
    </div>
  );
}
