"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ServicesDetail() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 max-w-[1400px] mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl lg:text-7xl font-bold mb-12 md:mb-20 text-center bg-gradient-to-r from-white via-green-200 to-white bg-clip-text text-transparent"
      >
        Services
      </motion.h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12">
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
  const ref = React.useRef(null);
  const isInView = require("framer-motion").useInView(ref, {
    once: true,
    margin: "-50px",
  });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: -10 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, rotateX: 0 }
          : { opacity: 0, y: 40, rotateX: -10 }
      }
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 rounded-lg border border-white/10 relative overflow-hidden group"
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-green-500/10 opacity-0"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
      />
      <motion.h3
        className="text-3xl font-bold mb-6 relative z-10 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
      >
        {title}
      </motion.h3>
      <ul className="space-y-3 relative z-10">
        {items.map((item, i) => (
          <motion.li
            key={i}
            className="flex items-start gap-3 text-gray-300"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: index * 0.1 + i * 0.05 }}
          >
            <motion.span
              className="text-blue-400 mt-1"
              animate={{
                x: isHovered ? 5 : 0,
              }}
            >
              ▸
            </motion.span>
            <span>{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
