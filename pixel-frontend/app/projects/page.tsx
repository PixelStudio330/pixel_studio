"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SparkleTrail from "../components/SparkleTrail";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// ✅ Helper to generate the optimized Cloudinary URL
const getCloudinaryUrl = (publicId: string) => 
  `https://res.cloudinary.com/dkelheskm/video/upload/f_auto,q_auto/${publicId}.mp4`;

interface ProjectCardProps {
  name: string;
  desc: string;
  tags: string[];
  videoSrc?: string[]; 
  link?: string[]; 
  videoPaddingTop?: string;
  pageTitles?: string[]; 
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  desc,
  tags,
  videoSrc = [],
  link = [],
  videoPaddingTop,
  pageTitles,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isInView, setIsInView] = useState(false); 
  const cardRef = useRef<HTMLDivElement>(null);

  const currentVideo = videoSrc[currentIndex];
  const currentLink = link[currentIndex] || "#";
  const currentTitle = pageTitles ? pageTitles[currentIndex] : "";

  // 🧠 Brain: Only load video when card is near viewport (200px threshold)
  useEffect(() => {
    // Force immediate load for the first project (Pawsky)
    if (name === "Pawsky Wawsky") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [name]);

  useEffect(() => {
    setIsVideoLoading(true);
  }, [currentVideo]);

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsVideoLoading(true);
    setCurrentIndex((prev) => (prev + 1) % videoSrc.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsVideoLoading(true);
    setCurrentIndex((prev) => (prev - 1 + videoSrc.length) % videoSrc.length);
  };

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="relative w-full max-w-5xl bg-gradient-to-br from-[#FFF8F3] to-[#F4E8D4] border border-[#8A6674]/20 rounded-3xl overflow-hidden shadow-lg mx-auto"
    >
      <div
        className="relative w-full h-[400px] md:h-[480px] lg:h-[500px] overflow-hidden bg-black"
        style={{ paddingTop: videoPaddingTop || "1.5rem" }}
      >
        <AnimatePresence mode="wait">
          {isVideoLoading && currentVideo && (
            <motion.div 
              key="loader"
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#F4E8D4]"
            >
              <div className="text-[#8C5383] font-bold flex flex-col items-center gap-2">
                <span className="text-3xl animate-bounce">✨</span>
                <span className="tracking-widest text-xs uppercase animate-pulse">Summoning Pixels...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {currentTitle && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#8C5383]/90 text-white px-4 py-1 rounded-full font-semibold z-20 text-xs">
            {currentTitle}
          </div>
        )}

        {videoSrc.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-4 z-30 pointer-events-none">
            <button onClick={handlePrev} className="pointer-events-auto bg-[#8C5383]/80 text-white p-3 rounded-full hover:bg-[#8C5383] transition-all"><FaChevronLeft size={18} /></button>
            <button onClick={handleNext} className="pointer-events-auto bg-[#8C5383]/80 text-white p-3 rounded-full hover:bg-[#8C5383] transition-all"><FaChevronRight size={18} /></button>
          </div>
        )}

        {isInView && currentVideo ? (
          <video
            key={currentVideo}
            autoPlay loop muted playsInline
            onLoadedData={() => setIsVideoLoading(false)}
            className={`object-contain w-full h-full transition-opacity duration-500 ${isVideoLoading ? 'opacity-0' : 'opacity-100'}`}
          >
            <source src={currentVideo} type="video/mp4" />
          </video>
        ) : (
          <div className="w-full h-full bg-[#F4E8D4]/20" />
        )}
      </div>

      <div className="p-8 bg-white/60 backdrop-blur-md">
        <h3 className="text-2xl md:text-3xl font-bold text-[#743014] mb-2">{name}</h3>
        <p className="text-[#442D1C]/80 mb-5 text-sm md:text-base leading-relaxed">{desc}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span key={i} className="bg-[#F5E6C7] text-[#84592B] px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">{tag}</span>
          ))}
        </div>
        {currentLink && (
          <Link href={currentLink} target="_blank" className="mt-6 inline-block bg-[#8C5383] text-[#FFF8F3] font-semibold px-6 py-3 rounded-full hover:bg-[#743014] transition-all duration-300 shadow-lg">Visit Project ✨</Link>
        )}
      </div>
    </motion.div>
  );
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#D9E0A4] text-[#8C5383] py-20 px-4 flex flex-col items-center space-y-20">
      <SparkleTrail />
      
      <div className="text-center mt-10">
        <h1 className="text-5xl md:text-7xl font-black text-[#8C5383] mb-4">Our Projects</h1>
        <p className="text-[#442D1C]/70 text-lg md:text-xl font-medium">Where pixels get fancy and code finds its rhythm. 💃</p>
      </div>

      <div className="w-full flex flex-col gap-32 pb-20">
        <ProjectCard
          name="Pawsky Wawsky"
          desc="Find your next furry soulmate. We designed a pet discovery experience that's as warm and fuzzy as a puppy's ears."
          tags={["E-Commerce", "UX/UI", "Brand Identity"]}
          videoSrc={[
  "https://res.cloudinary.com/dkelheskm/video/upload/f_auto,q_auto/v1772116338/final-pawsky_burltv.mp4",
  "https://res.cloudinary.com/dkelheskm/video/upload/f_auto,q_auto/v1772116542/pawsky-babies_icn60m.mp4"
]}
          link={["#", "#"]}
          pageTitles={["Home Showcase", "Pet Gallery"]}
        />

        <ProjectCard
          name="Pixel Code Studio"
          desc="Our very own flagship showreel. A five-page journey through the sugar-coated world of high-end digital design."
          tags={["Next.js 14", "Framer Motion", "Tailwind"]}
          videoSrc={[
  "https://res.cloudinary.com/dkelheskm/video/upload/f_auto,q_auto/v1772116750/sugar_ho5lkj.mp4",        // Lobby
  "https://res.cloudinary.com/dkelheskm/video/upload/f_auto,q_auto/v1772116797/sugar-about_xdiohe.mp4",  // Legacy
  "https://res.cloudinary.com/dkelheskm/video/upload/f_auto,q_auto/v1772116657/reviews-sugar_wu61tq.mp4",// Love
  "https://res.cloudinary.com/dkelheskm/video/upload/f_auto,q_auto/v1772116949/sugar-offer_tl7llb.mp4",  // Treats
  "https://res.cloudinary.com/dkelheskm/video/upload/f_auto,q_auto/v1772116927/sugar-contact_kq1yeg.mp4" // Connect
]}
          link={["#", "#", "#", "#", "#"]}
          pageTitles={["Lobby", "Legacy", "Love", "Treats", "Connect"]}
        />
      </div>
    </main>
  );
}