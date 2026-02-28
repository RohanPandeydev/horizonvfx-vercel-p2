"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { TW } from "@/lib/colors";

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

export default function Team() {
  return (
    <section
      id="team"
      className="py-20 md:py-32 px-4 md:px-6 bg-gradient-to-b from-black via-zinc-900 to-black relative overflow-hidden"
    >
      <motion.div
        className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
        }}
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 md:mb-8 text-center bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent"
        >
          Meet the HorizonVFX Collective
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-base md:text-lg text-gray-300 text-center mb-12 md:mb-16 max-w-4xl mx-auto leading-relaxed px-4"
        >
          At HorizonVFX, our strength lies in the diversity and expertise of our
          team. Each member is a vital piece of the puzzle, contributing unique
          skills and perspectives to create the visual tapestry that defines
          our institution.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-3xl mx-auto">
          {team.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamCard({
  member,
  index,
}: {
  member: { name: string; role: string; image: string };
  index: number;
}) {
  const ref = React.useRef(null);
  const isInView = require("framer-motion").useInView(ref, {
    once: true,
    margin: "-50px",
  });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateY: -20 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, rotateY: 0 }
          : { opacity: 0, y: 40, rotateY: -20 }
      }
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, z: 50 }}
      className="text-center group"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="aspect-square overflow-hidden rounded-lg mb-6 relative">
        <motion.img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.6 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
        />
      </div>
      <motion.h3
        className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
        animate={{
          y: isHovered ? -5 : 0,
        }}
      >
        {member.name}
      </motion.h3>
      <motion.p
        className="text-gray-400"
        animate={{
          color: isHovered ? "#60a5fa" : "#9ca3af",
        }}
      >
        {member.role}
      </motion.p>
    </motion.div>
  );
}
