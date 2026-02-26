"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Star, Circle, Zap as Lightning } from "lucide-react";

const ICON_COLORS = [
  "#8A6674", "#7D99A3", "#FFCDC1", "#D7E7C3", "#8C5383",
  "#19485F", "#D9E0A4", "#604C39", "#99A285", "#7B3B4B", "#D6A53C",
];

const Doodles: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if we are on mobile to reduce "Icon Tax"
    setIsMobile(window.innerWidth < 768);

    const hero = document.querySelector("#hero-section") as HTMLElement;
    const updateDimensions = () => {
      if (hero) {
        setDimensions({ width: hero.offsetWidth, height: hero.offsetHeight });
      } else {
        // Fallback to window if hero isn't found immediately
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // 🧠 Brain: Memoize the icons so they don't "re-roll" on every tiny state change
  const doodleIcons = useMemo(() => [
    (color: string) => <Star className="w-8 h-8 md:w-11 md:h-11" style={{ fill: color, stroke: "#FFF", strokeWidth: 2 }} />,
    (color: string) => <Circle className="w-7 h-7 md:w-10 md:h-10" style={{ fill: color, stroke: "#FFF", strokeWidth: 2 }} />,
    (color: string) => <Lightning className="w-7 h-7 md:w-10 md:h-10" style={{ fill: color, stroke: "#FFF", strokeWidth: 2 }} />,
  ], []);

  if (!mounted || dimensions.width === 0) return null;

  // 🧠 Beauty with Brain: 25 icons on PC, but only 10 on Mobile to prevent crashing
  const numIcons = isMobile ? 10 : 25;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      {Array.from({ length: numIcons }).map((_, i) => {
        const color = ICON_COLORS[i % ICON_COLORS.length];
        const DoodleFn = doodleIcons[i % doodleIcons.length];
        
        // Randomize initial stats
        const startX = Math.random() * dimensions.width;
        const startY = Math.random() * dimensions.height;
        
        return (
          <motion.div
            key={i}
            initial={{ x: startX, y: startY, opacity: 0, rotate: 0 }}
            animate={{
              // 🧠 Brain: Smaller, tighter movement loops for mobile to save memory
              x: [startX, startX + (isMobile ? 40 : 100), startX - (isMobile ? 40 : 100), startX],
              y: [startY, startY - (isMobile ? 60 : 150), startY + (isMobile ? 60 : 150), startY],
              rotate: [0, 180, 360],
              opacity: [0, 0.8, 0.8, 0], // Fade in and out to keep it "dreamy"
            }}
            transition={{
              duration: isMobile ? 15 + i : 25 + i, // Slower is actually easier on the CPU
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute"
            style={{ 
              willChange: "transform", // 🧠 Brain: Force iOS to use GPU hardware
              filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" 
            }}
          >
            {DoodleFn(color)}
          </motion.div>
        );
      })}
    </div>
  );
};

export default Doodles;