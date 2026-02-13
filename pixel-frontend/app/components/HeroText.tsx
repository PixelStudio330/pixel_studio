"use client";

import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

const HeroText = () => {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-[#D9E0A4] drop-shadow-lg text-center"
    >
      {/** Static part before typewriter */}
      We Build{" "}
      <span className="text-[#D9E0A4]/80">
        <Typewriter
          words={[
            "Beautiful Websites ✨",
            "Blazing-Fast Experiences 🚀",
            "Your dream websites🫶",
            "Pixel-Perfect Designs 💻",
          ]}
          loop={0}          // 0 = infinite loop
          cursor            // show the blinking cursor
          cursorStyle="|" 
          typeSpeed={80}    // typing speed
          deleteSpeed={50}  // deleting speed
          delaySpeed={1500} // delay before typing next word
        />
      </span>
    </motion.h1>
  );
};

export default HeroText;
