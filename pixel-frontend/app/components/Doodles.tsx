"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Circle, Zap as Lightning } from "lucide-react";

// 🎨 Playful icon palette
const ICON_COLORS = [
  "#8A6674", "#7D99A3", "#FFCDC1", "#D7E7C3", "#8C5383",
  "#19485F", "#D9E0A4", "#604C39", "#99A285", "#7B3B4B", "#D6A53C",
];

const Doodles: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setMounted(true);
    const hero = document.querySelector("#hero-section") as HTMLElement;
    if (hero) setDimensions({ width: hero.offsetWidth, height: hero.offsetHeight });

    const handleResize = () => {
      if (hero) setDimensions({ width: hero.offsetWidth, height: hero.offsetHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted || dimensions.width === 0) return null;

  const numIcons = 25;

  const doodleArray = [
    (color: string) => (
      <Star
        className="w-11 h-11 drop-shadow-lg"
        style={{
          fill: color,
          stroke: "#FFFFFF",
          strokeWidth: 2,
          filter: "drop-shadow(0 0 6px rgba(255,255,255,0.3))",
        }}
      />
    ),
    (color: string) => (
      <Circle
        className="w-10 h-10 drop-shadow-lg"
        style={{
          fill: color,
          stroke: "#FFFFFF",
          strokeWidth: 2,
          filter: "drop-shadow(0 0 6px rgba(255,255,255,0.3))",
        }}
      />
    ),
    (color: string) => (
      <Lightning
        className="w-10 h-10 drop-shadow-lg"
        style={{
          fill: color,
          stroke: "#FFFFFF",
          strokeWidth: 2,
          filter: "drop-shadow(0 0 6px rgba(255,255,255,0.3))",
        }}
      />
    ),
  ];

  const randomPosition = () => ({
    x: Math.random() * dimensions.width,
    y: Math.random() * dimensions.height,
  });

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      {Array.from({ length: numIcons }).map((_, i) => {
        const color = ICON_COLORS[Math.floor(Math.random() * ICON_COLORS.length)];
        const doodleFn = doodleArray[Math.floor(Math.random() * doodleArray.length)];
        const startPos = randomPosition();
        const midPos1 = randomPosition();
        const midPos2 = randomPosition();

        return (
          <motion.div
            key={i}
            initial={{
              x: startPos.x,
              y: startPos.y,
              scale: 0.8 + Math.random() * 0.5,
              rotate: Math.random() * 360,
              opacity: 1,
            }}
            animate={{
              x: [startPos.x, midPos1.x, midPos2.x, startPos.x],
              y: [startPos.y, midPos1.y, midPos2.y, startPos.y],
              rotate: [0, 360, 720],
              scale: [0.8, 0.9, 0.8],
              opacity: 1,
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
            className="absolute"
          >
            {doodleFn(color)}
          </motion.div>
        );
      })}
    </div>
  );
};

export default Doodles;
