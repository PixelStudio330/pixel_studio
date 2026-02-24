"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SparkleTrail from "../components/SparkleTrail";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const dynamic = 'force-dynamic';

interface ProjectCardProps {
  name: string;
  desc: string;
  tags: string[];
  videoSrc?: string | string[]; 
  link?: string | string[]; 
  videoPaddingTop?: string;
  pageTitles?: string[]; 
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  desc,
  tags,
  videoSrc,
  link,
  videoPaddingTop,
  pageTitles,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isCarousel = Array.isArray(videoSrc);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isCarousel) return;
    setCurrentIndex((prev) => (prev - 1 + (videoSrc as string[]).length) % (videoSrc as string[]).length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isCarousel) return;
    setCurrentIndex((prev) => (prev + 1) % (videoSrc as string[]).length);
  };

  const currentVideo = isCarousel ? (videoSrc as string[])[currentIndex] : videoSrc as string;
  const currentLink = isCarousel && Array.isArray(link) ? link[currentIndex] : link as string;
  const currentTitle = isCarousel && pageTitles ? pageTitles[currentIndex] : "";

  return (
    <motion.div 
      layout
      className="relative w-full max-w-5xl bg-gradient-to-br from-[#FFF8F3] to-[#F4E8D4] border border-[#8A6674]/20 rounded-3xl overflow-hidden shadow-lg mx-auto"
    >
      {/* 🎬 Video Preview */}
      <div
        className="relative w-full h-[460px] md:h-[480px] lg:h-[500px] overflow-hidden rounded-t-3xl flex items-start justify-center bg-black/5"
        style={{ paddingTop: videoPaddingTop || "1.5rem" }}
      >
        {/* Page title overlay */}
        <AnimatePresence mode="wait">
          {currentTitle && (
            <motion.div 
              key={currentTitle}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#8C5383]/80 text-[#FFF8F3] px-4 py-1 rounded-full font-semibold z-20 shadow-md backdrop-blur-sm"
            >
              {currentTitle}
            </motion.div>
          )}
        </AnimatePresence>

        {isCarousel && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#8C5383]/60 hover:bg-[#8C5383] text-white p-3 rounded-full z-30 transition-all shadow-lg"
            >
              <FaChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#8C5383]/60 hover:bg-[#8C5383] text-white p-3 rounded-full z-30 transition-all shadow-lg"
            >
              <FaChevronRight size={20} />
            </button>
          </>
        )}

        {currentVideo && currentVideo !== "#" ? (
          <AnimatePresence mode="wait">
            <motion.video
              // 🔥 CRITICAL: Unique key per video source forces the browser to re-load the file
              key={currentVideo} 
              src={currentVideo}
              autoPlay
              loop
              muted
              playsInline
              // Helps browser prioritize loading
              preload="auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="object-contain w-full h-full pointer-events-none"
              transition={{ duration: 0.4 }}
            />
          </AnimatePresence>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full text-[#8C5383]/50 font-bold text-xl gap-4">
            <div className="text-4xl">⏳</div>
            Coming Soon...
          </div>
        )}
      </div>

      {/* 📜 Details */}
      <div className="p-8 flex flex-col justify-between bg-white/50 backdrop-blur-sm">
        <div>
          <h3 className="text-3xl font-bold text-[#743014] mb-3">{name}</h3>
          <p className="text-[#442D1C]/80 mb-5 text-base leading-relaxed">{desc}</p>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="bg-[#F5E6C7] text-[#84592B] px-3 py-1 rounded-full text-xs font-semibold tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {currentLink && currentLink !== "#" ? (
          <Link
            href={currentLink}
            target="_blank"
            className="mt-6 inline-block text-center bg-[#8C5383] text-[#FFF8F3] font-semibold px-6 py-2 rounded-full hover:bg-[#743014] transition-all duration-300 shadow-md"
          >
            Watch Demo ✨
          </Link>
        ) : (
          <div className="mt-6 inline-block text-center bg-[#8C5383]/20 text-[#743014]/40 font-semibold px-6 py-2 rounded-full cursor-not-allowed">
            Coming Soon
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default function ProjectsPage() {
  const [pageKey, setPageKey] = useState(0);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    setPageKey(prev => prev + 1);

    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 50);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <main 
      key={pageKey}
      className="min-h-screen bg-[#D9E0A4] text-[#8C5383] py-24 px-6 md:px-12 relative overflow-hidden flex flex-col items-center space-y-16"
    >
      <SparkleTrail />

      {/* 🌸 Floating Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        {["🌸", "💫"].map((icon, i) => (
          <motion.div
            key={i}
            animate={{
              x: [-10, 10, -5, 5, 0],
              y: [0, -10, 5, -5, 0],
              rotate: [0, 360, 180, 270, 0],
            }}
            transition={{
              duration: 10 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute text-3xl md:text-4xl"
            style={i === 0 ? { top: "15%", left: "12%" } : { top: "70%", left: "82%" }}
          >
            {icon}
          </motion.div>
        ))}
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold text-[#8C5383] mb-6 text-center mt-10 drop-shadow-md"
      >
        Our Projects
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-[#442D1C]/80 text-center max-w-2xl mx-auto mb-14 text-lg"
      >
        A peek into our world — where design flirts with code and ideas sparkle like glitter 💅
      </motion.p>

      {/* 🧩 Projects List */}
      <div className="w-full flex flex-col gap-20">
        <ProjectCard
          name="Pawsky Wawsky"
          desc="A cozy sanctuary to find your best pet buddy built with a playful yet premium UI."
          tags={["Web Design", "Responsive", "Pet Shop"]}
          videoSrc={[
            "/videos/final-pawsky.mp4",
            "/videos/pawsky-babies.mp4",
          ]}
          link={[
              "/videos/final-pawsky.mp4",
              "/videos/pawsky-babies.mp4",
          ]}
          pageTitles={["Home", "Know Our Babies"]}
          videoPaddingTop="2rem"
        />

        <ProjectCard
          name="Pixel Code Studio"
          desc="Our flagship creative demo — slide through all 5 pages!"
          tags={["Next.js", "Animations", "Framer Motion"]}
          videoSrc={[
            "/videos/sugar.mp4",
            "/videos/sugar-about.mp4",
            "/videos/reviews-sugar.mp4",
            "/videos/sugar-offer.mp4",
            "/videos/sugar-contact.mp4",
          ]}
          link={[
            "/videos/sugar.mp4",
            "/videos/sugar-about.mp4",
            "/videos/reviews-sugar.mp4",
            "/videos/sugar-offer.mp4",
            "/videos/sugar-contact.mp4",
          ]}
          pageTitles={["Home", "About", "Reviews", "Offers", "Contact"]}
          videoPaddingTop="3rem"
        />

        <ProjectCard
          name="Mystery Project"
          desc="A secret brewing in our digital cauldron 👀 Stay tuned for the chaos reveal."
          tags={["Coming Soon"]}
          videoPaddingTop="1.5rem"
        />
      </div>
    </main>
  );
}