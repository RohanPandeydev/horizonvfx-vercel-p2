"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Team from "@/components/Team";

const teamMembers = [
  {
    name: "Bhuvnesh Kumar Varshney",
    role: "Creative Animation Supervisor",
    image: "https://horizonvfx.in/images/tm1.jpg",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    name: "Dibakar Chakraborty",
    role: "Founder & VFX Supervisor",
    image: "https://horizonvfx.in/images/tm2.jpg",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    name: "Rahul Sharma",
    role: "3D Artist",
    image: "https://horizonvfx.in/images/tm3.jpg",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    name: "Priya Singh",
    role: "Compositor",
    image: "https://horizonvfx.in/images/tm4.jpg",
    gradient: "from-orange-500 to-red-500"
  },
  {
    name: "Amit Patel",
    role: "Motion Graphics Artist",
    image: "https://horizonvfx.in/images/tm5.jpg",
    gradient: "from-cyan-500 to-blue-500"
  }
];

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative pt-32 pb-20 px-4 md:px-6 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden"
      >
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Meet the HorizonVFX Collective
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            At HorizonVFX, our strength lies in the diversity and expertise of our team.
            <br />
            Each member is a vital piece of the puzzle, contributing unique skills and perspectives.
          </motion.p>
        </div>
      </motion.section>

      {/* Team Introduction */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-gray-400 leading-relaxed mb-8"
          >
            Get to know the faces behind the magic—the dedicated individuals who bring
            <span className="text-transparent bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text font-semibold"> innovation</span>,
            <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-semibold"> passion</span>, and
            <span className="text-transparent bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text font-semibold"> creativity</span> to every project.
          </motion.p>
        </div>
      </section>

      {/* Team Grid - Creative Cards */}
      <section className="py-20 px-4 md:px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -12 }}
                onClick={() => setSelectedMember(member)}
                className="group relative cursor-pointer"
              >
                {/* Card */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-white/10">
                  {/* Image */}
                  <div className="aspect-[3/4] overflow-hidden">
                    <motion.img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                    {/* Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${member.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      <h3 className={`text-2xl font-bold text-white mb-2 bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent`}>
                        {member.name}
                      </h3>
                      <p className="text-gray-300 text-sm">{member.role}</p>
                    </motion.div>
                  </div>

                  {/* Hover effect - decorative elements */}
                  <motion.div
                    className={`absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center`}
                    initial={{ scale: 0, rotate: -180 }}
                    whileHover={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-white text-xl">→</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-zinc-950 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 rounded-3xl bg-gradient-to-br from-zinc-800/30 to-zinc-900/30 backdrop-blur-sm border border-white/10 relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Join Our Creative Team
              </h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Be part of something extraordinary. We're always looking for talented individuals who share our passion for visual excellence.
              </p>
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Openings
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Original Team Component */}
      <Team />
    </div>
  );
}
