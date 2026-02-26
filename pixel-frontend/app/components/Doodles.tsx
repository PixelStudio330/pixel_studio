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

  const numIcons = isMobile ? 12 : 25;

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
            initial={{ x: startX, y: startY, opacity: 0, scale: 0.5 }}
            animate={{
              x: [startX, startX + (isMobile ? 40 : 100), startX - (isMobile ? 40 : 100), startX],
              y: [startY, startY - (isMobile ? 60 : 150), startY + (isMobile ? 60 : 150), startY],
              rotate: [0, 180, 360],
              scale: [0.7, 1.1, 1.1, 0.7],
              // 🎨 Reach full visibility almost immediately and hold it
              opacity: [0, 1, 1, 0], 
            }}
            transition={{
              // 🏎️ Faster base duration for more energy
              duration: isMobile ? 8 + i : 12 + i, 
              repeat: Infinity,
              ease: "easeInOut",
              // ✨ Staggered start so they pop in one by one
              delay: i * 0.15,
              // 🧠 0% to 10% = Fade in | 10% to 90% = Stay visible | 90% to 100% = Fade out
              times: [0, 0.1, 0.9, 1], 
            }}
            className="absolute"
            style={{ 
              willChange: "transform",
              filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.2))" 
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