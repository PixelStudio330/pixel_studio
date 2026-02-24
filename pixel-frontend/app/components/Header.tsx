'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowLeft, LogOut, User } from "lucide-react"; 
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react"; 

export default function Header() {
  const { data: session } = useSession(); 
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [fullLogo, setFullLogo] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setShowTip(true);
    const interval = setInterval(() => setShowTip(true), 20000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showTip) {
      const timeout = setTimeout(() => setShowTip(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [showTip]);

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
          
          {/* Logo + Name Section */}
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
                  clearTimeout(clickTimeout.current);
                  clickTimeout.current = null;
                  setFullLogo(true);
                } else {
                  clickTimeout.current = setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    clickTimeout.current = null;
                  }, 250);
                }
              }}
              ref={logoRef}
            />

            <motion.span
              className="text-2xl font-extrabold tracking-wide ml-3 cursor-pointer"
              style={{ color: "#D9E0A4" }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ color: "#F9F7F1", scale: 1.05 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Pixel Studio
            </motion.span>

            <AnimatePresence>
              {showTip && !fullLogo && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute left-0 top-full mt-2 bg-[#F9F7F1]/95 text-[#19485F] text-xs md:text-sm px-3 py-1 rounded-2xl shadow-md whitespace-nowrap z-50"
                >
                  💫 Double click the logo to see the magic!
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation + Auth Toggle */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-10 mr-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div key={link.name} className="relative group" whileHover={{ scale: 1.05 }}>
                    <Link
                      href={link.href}
                      className={`font-semibold text-lg transition-colors duration-300 ${
                        isActive ? "text-[#F9F7F1]" : "text-[#D9E0A4] hover:text-[#F9F7F1]"
                      }`}
                    >
                      {link.name}
                    </Link>
                    <span className={`absolute left-0 bottom-[-6px] h-[2px] rounded-full transition-all duration-500 ${isActive ? "bg-[#F9F7F1] w-full" : "bg-[#F9F7F1]/50 w-0 group-hover:w-full"}`}></span>
                  </motion.div>
                );
              })}
            </nav>

            {/* --- Simplified Auth Toggle --- */}
            <div className="flex items-center gap-4 border-l border-[#D9E0A4]/30 pl-8">
              {session ? (
                // LOGGED IN: Show Email + Sign Out
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-[#D9E0A4] opacity-80">
                    <User size={18} />
                    <span className="text-sm font-medium">{session.user?.email}</span>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="flex items-center gap-2 bg-[#8A6674]/80 text-[#F9F7F1] px-5 py-2 rounded-full text-sm font-bold hover:bg-[#8A6674] transition-all shadow-md active:scale-95"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              ) : (
                // LOGGED OUT: Single Unified "Sign In" Button
                <Link
                  href="/register" 
                  className="bg-[#D9E0A4] text-[#19485F] px-8 py-2 rounded-full text-sm font-bold hover:bg-[#F9F7F1] hover:scale-105 transition-all shadow-lg active:scale-95"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-[#F9F7F1]" onClick={() => setMenuOpen(!menuOpen)}>
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
              className="md:hidden flex flex-col items-start space-y-4 pb-8 px-8 bg-[#19485F] border-b border-[#D9E0A4]/20"
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`font-medium text-lg w-full py-2 ${isActive ? "text-[#F9F7F1] border-l-4 border-[#F9F7F1] pl-3" : "text-[#F9F7F1]/80 pl-3"}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
              
              {/* Mobile Auth Logic */}
              <div className="w-full pt-4 mt-4 border-t border-[#D9E0A4]/20 flex flex-col gap-4">
                {session ? (
                  <button onClick={() => signOut()} className="w-full text-left text-[#F9F7F1] font-bold py-2 flex items-center gap-2">
                    <LogOut size={20} /> Sign Out
                  </button>
                ) : (
                  <Link 
                    href="/register" 
                    className="bg-[#D9E0A4] text-[#19485F] text-center py-3 rounded-xl font-bold" 
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Full Logo Overlay stays the same */}
      <AnimatePresence>
        {fullLogo && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-[60] cursor-pointer"
              onClick={() => setFullLogo(false)}
            ></motion.div>

            <motion.img
              src="/images/logo.jpg"
              alt="Pixel Studio Full Logo"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 z-[70] rounded-md object-cover shadow-2xl"
            />

            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="fixed top-[calc(50%-12rem-1rem)] left-[calc(50%-12rem-1rem)] z-[70] text-[#F9F7F1] p-2 bg-[#8A6674]/70 rounded-full hover:bg-[#8A6674] shadow-lg"
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