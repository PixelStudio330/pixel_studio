"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SparkleTrail from "../components/SparkleTrail";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isInView, setIsInView] = useState(false); // 🧠 Brain: Track visibility
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isCarousel = Array.isArray(videoSrc);

  const currentVideo = isCarousel ? (videoSrc as string[])[currentIndex] : videoSrc as string;
  const currentLink = isCarousel && Array.isArray(link) ? link[currentIndex] : link as string;
  const currentTitle = isCarousel && pageTitles ? pageTitles[currentIndex] : "";

  // 🧠 Brain: Only load video when card is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Once loaded, keep it loaded
        }
      },
      { rootMargin: "200px" } // Start loading 200px before it scrolls into view
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setIsVideoLoading(true);
  }, [currentVideo]);

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

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-5xl bg-gradient-to-br from-[#FFF8F3] to-[#F4E8D4] border border-[#8A6674]/20 rounded-3xl overflow-hidden shadow-lg mx-auto"
    >
      <div
        className="relative w-full h-[400px] md:h-[480px] lg:h-[500px] overflow-hidden rounded-t-3xl flex items-start justify-center bg-black"
        style={{ paddingTop: videoPaddingTop || "1.5rem" }}
      >
        <AnimatePresence>
          {isVideoLoading && currentVideo && currentVideo !== "#" && (
            <motion.div 
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#F4E8D4]"
            >
              <div className="text-[#8C5383] font-bold flex flex-col items-center gap-2">
                <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-3xl">✨</motion.span>
                <span className="tracking-widest text-xs uppercase animate-pulse">Summoning Pixels...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isCarousel && (
          <div className="absolute inset-0 flex items-center justify-between px-4 z-30 pointer-events-none">
            <button onClick={handlePrev} className="pointer-events-auto bg-[#8C5383]/80 text-white p-3 rounded-full hover:bg-[#8C5383] transition-all"><FaChevronLeft size={18} /></button>
            <button onClick={handleNext} className="pointer-events-auto bg-[#8C5383]/80 text-white p-3 rounded-full hover:bg-[#8C5383] transition-all"><FaChevronRight size={18} /></button>
          </div>
        )}

        {/* 🧠 Brain: Only render the video tag and src if isInView is true */}
        {isInView && currentVideo && currentVideo !== "#" ? (
          <video
            ref={videoRef}
            key={currentVideo} 
            src={currentVideo}
            autoPlay loop muted playsInline 
            preload="metadata" // 🧠 Brain: Don't choke the network
            onCanPlayThrough={() => setIsVideoLoading(false)}
            className={`object-contain w-full h-full transition-opacity duration-700 ${isVideoLoading ? 'opacity-0' : 'opacity-100'}`}
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full text-[#8C5383]/40 font-bold text-lg">
            {!isInView ? "Waiting to shine..." : "Coming Soon"}
          </div>
        )}
      </div>

      <div className="p-8 flex flex-col justify-between bg-white/60 backdrop-blur-md">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-[#743014] mb-2">{name}</h3>
          <p className="text-[#442D1C]/80 mb-5 text-sm md:text-base leading-relaxed">{desc}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span key={i} className="bg-[#F5E6C7] text-[#84592B] px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">{tag}</span>
            ))}
          </div>
        </div>

        {currentLink && currentLink !== "#" ? (
          <Link href={currentLink} target="_blank" className="mt-6 inline-block text-center bg-[#8C5383] text-[#FFF8F3] font-semibold px-6 py-3 rounded-full hover:bg-[#743014] transition-all duration-300 shadow-lg">Visit Project ✨</Link>
        ) : (
          <div className="mt-6 inline-block text-center bg-[#8C5383]/10 text-[#743014]/30 font-semibold px-6 py-3 rounded-full border border-dashed border-[#8C5383]/20">Coming Soon</div>
        )}
      </div>
    </motion.div>
  );
};

export default function ProjectsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#D9E0A4]" />;

  return (
    <main className="min-h-screen bg-[#D9E0A4] text-[#8C5383] py-20 px-4 md:px-12 relative overflow-x-hidden flex flex-col items-center space-y-12 md:space-y-20">
      <SparkleTrail />
      
      <div className="text-center z-10 max-w-3xl mt-10">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black text-[#8C5383] mb-4 tracking-tight">Our Projects</motion.h1>
        <p className="text-[#442D1C]/70 text-lg md:text-xl font-medium">Where pixels get fancy and code finds its rhythm. 💃</p>
      </div>

      <div className="w-full flex flex-col gap-16 md:gap-32 pb-20">
        <ProjectCard
          name="Pawsky Wawsky"
          desc="Find your next furry soulmate. We designed a pet discovery experience that's as warm and fuzzy as a puppy's ears."
          tags={["E-Commerce", "UX/UI", "Brand Identity"]}
          videoSrc={["/videos/final-pawsky.mp4", "/videos/pawsky-babies.mp4"]}
          link={["/videos/final-pawsky.mp4", "/videos/pawsky-babies.mp4"]}
          pageTitles={["Home Showcase", "Pet Gallery"]}
          videoPaddingTop="2rem"
        />

        <ProjectCard
          name="Pixel Code Studio"
          desc="Our very own flagship showreel. A five-page journey through the sugar-coated world of high-end digital design."
          tags={["Next.js 14", "Framer Motion", "Tailwind"]}
          videoSrc={["/videos/sugar.mp4", "/videos/sugar-about.mp4", "/videos/reviews-sugar.mp4", "/videos/sugar-offer.mp4", "/videos/sugar-contact.mp4"]}
          link={["/videos/sugar.mp4", "/videos/sugar-about.mp4", "/videos/reviews-sugar.mp4", "/videos/sugar-offer.mp4", "/videos/sugar-contact.mp4"]}
          pageTitles={["Lobby", "Legacy", "Love", "Treats", "Connect"]}
          videoPaddingTop="3rem"
        />

        <ProjectCard
          name="Project Chaos"
          desc="Something bold is cooking in the studio. A top-secret collaboration that's about to break the internet."
          tags={["Experimental", "Web3", "Coming Soon"]}
          videoPaddingTop="1.5rem"
        />
      </div>
    </main>
  );
}