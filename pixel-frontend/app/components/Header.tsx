'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [fullLogo, setFullLogo] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);
const logoRef = useRef<HTMLImageElement | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Pop-up tip every 20s + first load
  useEffect(() => {
    setShowTip(true);
    const interval = setInterval(() => setShowTip(true), 20000);
    return () => clearInterval(interval);
  }, []);

  // Close tip automatically after 3s
  useEffect(() => {
    if (showTip) {
      const timeout = setTimeout(() => setShowTip(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [showTip]);

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Payment", href: "/payment" },
    { name: "Our Projects", href: "/projects" },
  ];

  if (!mounted) return null;

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-[#19485F]/90 backdrop-blur-lg border-b border-[#D9E0A4]/30 shadow-[0_2px_15px_rgba(25,72,95,0.3)]">
        <div className="flex justify-between items-center px-8 py-6 md:py-7">
{/* Logo + Name */}

<div className="flex items-center gap-3 relative">
  <motion.img
    src="/images/logo.jpg"
    alt="Pixel Studio Logo"
    className={`object-cover rounded-md cursor-pointer transition-all duration-300 z-50 ${
      fullLogo ? "hidden" : "w-16 h-16"
    }`}
    whileHover={{
      scale: fullLogo ? 1 : 1.15,
      rotate: fullLogo ? 0 : 5,
      boxShadow: fullLogo
        ? "0 0 30px 15px rgba(217,224,164,0.6)"
        : "0 0 15px 6px rgba(217,224,164,0.6)",
    }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    onClick={() => {
      if (clickTimeout.current) {
        // Double click detected
        clearTimeout(clickTimeout.current);
        clickTimeout.current = null;
        setFullLogo(true); // stretch/show full logo
      } else {
        // First click: wait for potential double click
        clickTimeout.current = setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          clickTimeout.current = null;
        }, 250);
      }
    }}
    ref={logoRef}
  />

  {/* Pixel Studio Title */}
  <motion.span
    className="text-2xl font-extrabold tracking-wide ml-3 cursor-pointer"
    style={{ color: "#D9E0A4" }}
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ color: "#F9F7F1", scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  >
    Pixel Studio
  </motion.span>

  {/* 🌸 Tip Bubble */}
  <AnimatePresence>
    {showTip && !fullLogo && (
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.3 }}
        className="absolute left-0 top-full mt-2 bg-[#F9F7F1]/95 text-[#19485F] text-xs md:text-sm px-3 py-1 rounded-2xl shadow-md whitespace-nowrap z-50"
      >
        💫 Double click the logo to see the magic!
      </motion.div>
    )}
  </AnimatePresence>
</div>




{/* Desktop Nav */}
<nav className="hidden md:flex space-x-10">
  {navLinks.map((link) => {
    const isActive = pathname === link.href;
    return (
      <motion.div
        key={link.name}
        className="relative group"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Link
          href={link.href}
          className={`font-semibold text-lg relative transition-colors duration-300 ${
            isActive
              ? "text-[#F9F7F1]"
              : "text-[#D9E0A4] hover:text-[#F9F7F1]"
          }`}
        >
          {link.name}
        </Link>
        <span
          className={`absolute left-0 bottom-[-6px] h-[2px] rounded-full transition-all duration-500 ${
            isActive
              ? "bg-[#F9F7F1] w-full"
              : "bg-[#F9F7F1]/50 w-0 group-hover:w-full"
          }`}
        ></span>
      </motion.div>
    );
  })}
</nav>


          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#F9F7F1]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden flex flex-col items-start space-y-4 pb-6 px-6 bg-[#19485F]"
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`font-medium text-lg transition-all duration-300 ${
                      isActive
                        ? "text-[#F9F7F1] underline underline-offset-4 decoration-[#F9F7F1]"
                        : "text-[#F9F7F1]/80 hover:text-[#F9F7F1]"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Full Logo Overlay */}
      <AnimatePresence>
        {fullLogo && (
          <>
            {/* Gray Background (clickable to close) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40 cursor-pointer"
              onClick={() => setFullLogo(false)}
            ></motion.div>

            {/* Centered Full Logo */}
            <motion.img
              src="/images/logo.jpg"
              alt="Pixel Studio Full Logo"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 z-50 rounded-md object-cover"
            />

            {/* Exit Arrow (top-left corner of the logo) */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="fixed top-[calc(50%-12rem-1rem)] left-[calc(50%-12rem-1rem)] z-50 text-[#F9F7F1] p-2 bg-[#8A6674]/70 rounded-full hover:bg-[#8A6674] shadow-lg"
              onClick={() => setFullLogo(false)}
            >
              <ArrowLeft size={24} />
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
