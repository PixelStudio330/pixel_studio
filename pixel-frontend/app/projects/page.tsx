"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import SparkleTrail from "../components/SparkleTrail";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ProjectCardProps {
  name: string;
  desc: string;
  tags: string[];
  videoSrc?: string | string[]; // can be single video or multiple
  link?: string | string[]; // corresponding link(s)
  videoPaddingTop?: string;
  pageTitles?: string[]; // for carousel pages
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

  const handlePrev = () => {
    if (!isCarousel) return;
    setCurrentIndex((prev) => (prev - 1 + videoSrc.length) % videoSrc.length);
  };

  const handleNext = () => {
    if (!isCarousel) return;
    setCurrentIndex((prev) => (prev + 1) % videoSrc.length);
  };

  const currentVideo = isCarousel ? videoSrc[currentIndex] : videoSrc;
  const currentLink = isCarousel && Array.isArray(link) ? link[currentIndex] : link;
  const currentTitle = isCarousel && pageTitles ? pageTitles[currentIndex] : "";

  return (
    <motion.div className="relative w-full max-w-5xl bg-gradient-to-br from-[#FFF8F3] to-[#F4E8D4] border border-[#8A6674]/20 rounded-3xl overflow-hidden shadow-lg mx-auto">
      
      {/* 🎬 Video Preview */}
      <div
        className="relative w-full h-[460px] md:h-[480px] lg:h-[500px] overflow-hidden rounded-t-3xl flex items-start justify-center"
        style={{ paddingTop: videoPaddingTop || "1.5rem" }}
      >
        {/* Page title overlay */}
        {currentTitle && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#8C5383]/70 text-[#FFF8F3] px-4 py-1 rounded-full font-semibold z-10 shadow-md">
            {currentTitle}
          </div>
        )}

        {/* Carousel Arrows */}
        {isCarousel && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#8C5383]/40 hover:bg-[#8C5383]/70 text-white p-2 rounded-full z-10"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#8C5383]/40 hover:bg-[#8C5383]/70 text-white p-2 rounded-full z-10"
            >
              <FaChevronRight />
            </button>
          </>
        )}

        {currentVideo ? (
          <motion.video
            key={currentIndex} // ensure animation on slide
            src={currentVideo}
            autoPlay
            loop
            muted
            playsInline
            className="object-contain w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-[#8C5383]/20 text-[#8C5383]/70 font-semibold text-lg">
            Coming Soon 💻
          </div>
        )}
      </div>

      {/* 📜 Details */}
      <div className="p-8 flex flex-col justify-between">
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

        {/* 🌐 Button */}
        {currentLink ? (
          <Link
            href="#"
            target="_blank"
            className="mt-6 inline-block text-center bg-[#8C5383] text-[#FFF8F3] font-semibold px-6 py-2 rounded-full hover:bg-[#743014] transition-all duration-300 shadow-md"
          >
            Visit Project ✨
          </Link>
        ) : (
          <div className="mt-6 inline-block text-center bg-[#8C5383]/30 text-[#743014]/70 font-semibold px-6 py-2 rounded-full cursor-not-allowed">
            Coming Soon
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#D9E0A4] text-[#8C5383] py-24 px-6 md:px-12 relative overflow-hidden flex flex-col items-center space-y-16">

      {/* ✨ Sparkle Trail */}
      <SparkleTrail />

      {/* 🌸 Floating Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        {["🌸", "💫"].map((icon, i) => {
          const style =
            i === 0
              ? { top: "15%", left: "12%" }
              : { top: "70%", left: "82%" };

          return (
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
              style={style}
            >
              {icon}
            </motion.div>
          );
        })}
      </div>

      {/* 💫 Header */}
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

      {/* 🧩 Stacked Projects */}
      <ProjectCard
        name="Pawsky Wawsky"
        desc="A cozy sanctuary to find your best pet buddy built with a playful yet premium UI."
        tags={["Web Design", "Responsive", "Pet Shop"]}
        videoSrc={[
          "/videos/final-pawsky.mp4",
          "/videos/pawsky-babies.mp4",
          "#",
          "#",
        ]}
        link="/videos/final-pawsky.mp4"
         pageTitles={["Home", "Know Our Babies", "About", "Contact"]}
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
          "/videos/page1.mp4",
          "/videos/page2.mp4",
          "/videos/page3.mp4",
          "/videos/page4.mp4",
          "/videos/page5.mp4",
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

    </main>
  );
}
