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
    setIsMobile(window.innerWidth < 768);

    const updateDimensions = () => {
      const hero = document.querySelector("#hero-section") as HTMLElement;
      if (hero) {
        setDimensions({ width: hero.offsetWidth, height: hero.offsetHeight });
      } else {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const doodleIcons = useMemo(() => [
    (color: string) => <Star className="w-8 h-8 md:w-12 md:h-12" style={{ fill: color, stroke: "#FFF", strokeWidth: 2.5 }} />,
    (color: string) => <Circle className="w-7 h-7 md:w-10 md:h-10" style={{ fill: color, stroke: "#FFF", strokeWidth: 2.5 }} />,
    (color: string) => <Lightning className="w-8 h-8 md:w-11 md:h-11" style={{ fill: color, stroke: "#FFF", strokeWidth: 2.5 }} />,
  ], []);

  // Pre-calculate positions to avoid "jumpy" initial renders
  const positions = useMemo(() => {
    if (dimensions.width === 0) return [];
    return Array.from({ length: 25 }).map(() => ({
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
    }));
  }, [dimensions]);

  if (!mounted || dimensions.width === 0) return null;

  const numIcons = isMobile ? 12 : 25;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      {positions.slice(0, numIcons).map((pos, i) => {
        const color = ICON_COLORS[i % ICON_COLORS.length];
        const DoodleFn = doodleIcons[i % doodleIcons.length];
        
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0, x: pos.x, y: pos.y }}
            animate={{
              // Faster, tighter movement loops
              x: [pos.x, pos.x + (isMobile ? 20 : 40), pos.x - (isMobile ? 20 : 40), pos.x],
              y: [pos.y, pos.y - (isMobile ? 30 : 60), pos.y + (isMobile ? 30 : 60), pos.y],
              rotate: [0, 180, 360],
              scale: [0.8, 1.1, 1.1, 0.8],
              opacity: [0, 1, 1, 0], 
            }}
            transition={{
              // 🚀 CRITICAL: Fast 3-5s loops instead of 12s+
              duration: isMobile ? 3 + (i % 2) : 4 + (i % 3), 
              repeat: Infinity,
              ease: "linear", 
              // Very short delay so they all appear almost at once
              delay: i * 0.05, 
              times: [0, 0.1, 0.9, 1], 
            }}
            className="absolute"
            style={{ 
              transform: 'translateZ(0)', // Force GPU acceleration
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))" 
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