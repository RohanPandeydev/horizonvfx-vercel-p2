"use client";
import React from "react";
import { motion } from "framer-motion";

const clients = [
  "https://horizonvfx.in/images/c-logo1.jpg",
  "https://horizonvfx.in/images/c-logo2.jpg",
  "https://horizonvfx.in/images/c-logo3.jpg",
  "https://horizonvfx.in/images/c-logo4.jpg",
];

export default function Clients() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 max-w-[1400px] mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl lg:text-7xl font-bold mb-12 md:mb-16 text-center bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent"
      >
        Our Clients
      </motion.h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {clients.map((logo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, rotateY: 10, z: 50 }}
            className="flex items-center justify-center p-4 md:p-6 bg-white rounded-lg shadow-xl"
            style={{ transformStyle: "preserve-3d" }}
          >
            <img
              src={logo}
              alt={`Client ${index + 1}`}
              className="w-full h-16 md:h-20 object-contain"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
