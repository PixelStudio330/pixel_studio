'use client';

import Link from "next/link";
import { Facebook, Instagram, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";

export default function Footer() {
  const [showLogoTip, setShowLogoTip] = useState(false);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  const handleFooterLogoClick = () => {
    if (clickTimeout.current) {
      // DOUBLE CLICK: show tip
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
      setShowLogoTip(true);
      setTimeout(() => setShowLogoTip(false), 3000);
    } else {
      // SINGLE CLICK: wait a little to see if double click happens
      clickTimeout.current = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        clickTimeout.current = null;
      }, 250); // 250ms window to detect double click
    }
  };

  return (
    <footer className="bg-[#8C5383] text-[#D9E0A4] relative overflow-hidden">
      {/* ✨ Top Section */}
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-start gap-10">
        
        {/* Logo (top-left) */}
        <div className="flex flex-col items-start gap-2 relative">
          <div className="flex items-center gap-3">
            <motion.img
              src="/images/logo.jpg"
              alt="Pixel Studio Logo"
              className="w-12 h-12 object-contain rounded-xl shadow-lg cursor-pointer transition-transform duration-500"
              whileHover={{ scale: 1.1 }}
              onClick={handleFooterLogoClick}
            />
            <motion.span
              className="text-2xl font-bold transition-colors duration-300 cursor-pointer"
              whileHover={{ color: "#F9F7F1" }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Pixel Studio
            </motion.span>
          </div>

          {/* Tip Bubble */}
          <AnimatePresence>
            {showLogoTip && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.3 }}
                className="absolute top-[-2rem] left-0 bg-[#F9F7F1]/95 text-[#19485F] text-xs px-3 py-1 rounded-2xl shadow-md whitespace-nowrap z-50"
              >
                Oops, can't do it with this logo😭
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-sm text-[#D9E0A4]/80">
            Crafting digital experiences with speed & style
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col md:flex-row md:flex-wrap justify-start md:justify-end gap-3 md:gap-10 w-full md:w-auto">
          {quickLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative px-2 py-1 rounded-lg group w-full md:w-auto"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F9F7F1]/30 to-transparent opacity-0 rounded-lg blur-md transition-opacity duration-500 group-hover:opacity-100"></span>
              <span className="relative z-10 text-[#D9E0A4] group-hover:text-[#F9F7F1] transition-colors duration-300">{link.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center border-t border-[#D9E0A4]/30">
        <p className="text-sm text-center md:text-left text-[#D9E0A4]/90">
          © {new Date().getFullYear()} Pixel Studio. All rights reserved.
        </p>

        <div className="flex gap-4 mt-4 md:mt-0">
          {[{ icon: <Facebook size={20} />, href: "https://facebook.com" },
            { icon: <Instagram size={20} />, href: "https://instagram.com" },
            { icon: <Github size={20} />, href: "https://github.com" }].map((social, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.2, rotate: 10, color: "#F9F7F1" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href={social.href}
                target="_blank"
                className="text-[#D9E0A4] hover:text-[#F9F7F1] transition-colors duration-300"
              >
                {social.icon}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </footer>
  );
}
