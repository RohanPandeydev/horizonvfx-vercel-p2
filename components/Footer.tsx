"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import MagneticButton from "./MagneticButton";
import { GRADIENTS, TW } from "@/lib/colors";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-white/10 py-16 md:py-20 px-4 md:px-6 bg-gradient-to-b from-black to-zinc-950 relative overflow-hidden"
    >
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />
      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Brand & Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.img
              src="/logo.svg"
              alt="HorizonVFX"
              className="h-12 md:h-14"
              whileHover={{ scale: 1.05, rotate: 2 }}
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              We craft visual experiences that push the boundaries of
              imagination. From concept to final delivery, we bring your vision
              to life.
            </p>

            {/* Contact Details */}
            <div className="space-y-3">
              <motion.a
                href="mailto:info@horizonvfx.in"
                className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors group"
                whileHover={{ x: 5 }}
              >
                <Mail
                  size={18}
                  className="text-blue-500 group-hover:scale-110 transition-transform"
                />
                <span className="text-sm">info@horizonvfx.in</span>
              </motion.a>
              <motion.a
                href="tel:+919748712372"
                className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors group"
                whileHover={{ x: 5 }}
              >
                <Phone
                  size={18}
                  className="text-green-500 group-hover:scale-110 transition-transform"
                />
                <span className="text-sm">+91 974 871 2372</span>
              </motion.a>
              <motion.a
                href="tel:+918767025601"
                className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors group"
                whileHover={{ x: 5 }}
              >
                <Phone
                  size={18}
                  className="text-green-500 group-hover:scale-110 transition-transform"
                />
                <span className="text-sm">+91 876 702 5601</span>
              </motion.a>
              <motion.div
                className="flex items-center gap-3 text-gray-400"
                whileHover={{ x: 5 }}
              >
                <MapPin size={18} className="text-purple-500" />
                <span className="text-sm">Mumbai, India</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <div className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Team", href: "/team" },
                { name: "Showcase", href: "/showcase" },
                { name: "Services", href: "/#services" },
                { name: "Contact", href: "/contact" },
              ].map((item, i) => (
                <Link key={`${item.href}-${item.name}`} href={item.href}>
                  <motion.span
                    className="block text-gray-400 hover:text-blue-400 transition-colors text-sm relative group cursor-pointer"
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-green-500 group-hover:w-full transition-all duration-300" />
                  </motion.span>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              Services
            </h3>
            <div className="space-y-3">
              {[
                "Visual Effects",
                "3D Animation",
                "Compositing",
                "Color Grading",
                "Motion Graphics",
                "Post Production",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  className="text-gray-400 hover:text-green-400 transition-colors text-sm relative group cursor-pointer"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 group-hover:w-full transition-all duration-300" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Social & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Connect With Us
            </h3> */}

            {/* Social Links */}
            {/* <div className="flex gap-4">
              {[
                {
                  icon: Instagram,
                  href: "#",
                  color: "hover:text-pink-500",
                },
                { icon: Youtube, href: "#", color: "hover:text-red-500" },
                { icon: Linkedin, href: "#", color: "hover:text-blue-500" },
                { icon: Twitter, href: "#", color: "hover:text-cyan-500" },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  className={`w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300`}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div> */}

            {/* CTA Button */}
            {/* <MagneticButton>
              <Link href="/contact">
                <motion.div
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg font-semibold text-white text-sm cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Start a Project</span>
                  <ArrowRight size={16} />
                </motion.div>
              </Link>
            </MagneticButton> */}

            {/* Stats */}
            <div className="pt-4 border-t border-white/10">
              <div className="grid grid-cols-3 gap-4 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-2xl font-bold text-white">50+</div>
                  <div className="text-xs text-gray-500">Projects</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="text-2xl font-bold text-white">20+</div>
                  <div className="text-xs text-gray-500">Clients</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="text-2xl font-bold text-white">5+</div>
                  <div className="text-xs text-gray-500">Years</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-gray-500">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              © 2024 HorizonVFX. All rights reserved.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex gap-6"
            >
              <a href="#" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
