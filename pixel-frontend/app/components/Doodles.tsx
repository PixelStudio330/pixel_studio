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

    const hero = document.querySelector("#hero-section") as HTMLElement;
    const updateDimensions = () => {
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

  // 🎨 Beauty: Thickened strokes and solid fills
  const doodleIcons = useMemo(() => [
    (color: string) => (
      <Star 
        className="w-8 h-8 md:w-12 md:h-12" 
        style={{ fill: color, stroke: "#FFF", strokeWidth: 2.5 }} 
      />
    ),
    (color: string) => (
      <Circle 
        className="w-7 h-7 md:w-10 md:h-10" 
        style={{ fill: color, stroke: "#FFF", strokeWidth: 2.5 }} 
      />
    ),
    (color: string) => (
      <Lightning 
        className="w-8 h-8 md:w-11 md:h-11" 
        style={{ fill: color, stroke: "#FFF", strokeWidth: 2.5 }} 
      />
    ),
  ], []);

  if (!mounted || dimensions.width === 0) return null;

  const numIcons = isMobile ? 10 : 25;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      {Array.from({ length: numIcons }).map((_, i) => {
        const color = ICON_COLORS[i % ICON_COLORS.length];
        const DoodleFn = doodleIcons[i % doodleIcons.length];
        
        const startX = Math.random() * dimensions.width;
        const startY = Math.random() * dimensions.height;
        
        return (
          <motion.div
            key={i}
            initial={{ x: startX, y: startY, opacity: 0, rotate: 0, scale: 0.5 }}
            animate={{
              x: [startX, startX + (isMobile ? 50 : 120), startX - (isMobile ? 50 : 120), startX],
              y: [startY, startY - (isMobile ? 70 : 180), startY + (isMobile ? 70 : 180), startY],
              rotate: [0, 180, 360],
              scale: [0.8, 1.1, 1.1, 0.8], // Subtle "breathing" effect
              opacity: [0, 1, 1, 0], // 🎨 Brain: Stay fully opaque (1) for the middle of the trip
            }}
            transition={{
              duration: isMobile ? 12 + i : 20 + i, 
              repeat: Infinity,
              ease: "easeInOut", // Smoother than linear for a "floating" feel
            }}
            className="absolute"
            style={{ 
              willChange: "transform",
              // 🎨 Beauty: Deeper, more solid shadow for a 3D pop
              filter: "drop-shadow(0 8px 10px rgba(0,0,0,0.25))" 
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