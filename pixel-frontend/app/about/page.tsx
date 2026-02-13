"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SparkleTrail from "../components/SparkleTrail";

export default function AboutPage() {
  const team = [
    {
      name: "Naira Mehjabin",
      role: "Frontend Developer",
      photo: "/images/Me.jpg",
      bio: "Pixel-perfect interfaces with a touch of chaos 💫 Loves coffee and code."
    },
    {
      name: "Gulnahar Zaman",
      role: "Backend Developer",
      photo: "/images/ammu.jpg",
      bio: "Keeps the engines running smoothly ⚡ Enjoys long walks through JSON forests."
    }
  ];

  const skills = [
    { title: "Web Design", desc: "Crafting interfaces that are sleek, intuitive, and super aesthetic 🎨" },
    { title: "Backend Work", desc: "Building strong, smooth, and secure systems ⚡" },
    { title: "UX Strategy", desc: "Turning user journeys into delightful experiences ✨" },
    { title: "Performance Optimization", desc: "Making your websites lightning fast 🚀" },
  ];

  return (
    <main className="min-h-screen bg-[#D9E0A4] text-[#8C5383] flex flex-col items-center justify-center p-10 relative overflow-hidden">

      {/* ✨ Sparkle Cursor Trail */}
      <SparkleTrail />

{/*✨Floating Chaos Icons (BACKGROUND) */}
<div className="absolute inset-0 pointer-events-none overflow-visible">
  {["🌸", "🌟", "🌀"].map((icon, i) => {
    // Assign positions per icon
    let style = {};
    if (icon === "🌸") {
      style = { top: "15%", left: "10%" }; // top-left
    } else if (icon === "🌟") {
      style = { top: "80%", left: "13%" }; // 🌟 near Web Design card (left side)
    } else if (icon === "🌀") {
      style = { top: "60%", left: "79%" }; // 🌀 near Web Design card (right side)
    }

    return (
      <motion.div
        key={i}
        animate={{
          x: [-15, 15, -10, 10, 0],
          y: [0, -10, 5, -5, 0],
          rotate: [0, 360, 180, 270, 0],
        }}
        transition={{
          duration: 12 + i * 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute text-2xl sm:text-3xl md:text-3xl"
        style={style}
      >
        {icon}
      </motion.div>
    );
  })}
</div>



      {/* 💫 Hero Section */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-5xl md:text-6xl font-bold text-[#8C5383] mb-6 drop-shadow-lg text-center mt-20"
      >
        About Us
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="max-w-3xl text-lg text-[#442D1C]/80 mb-16 text-center"
      >
        We're crafting this page to show what our website is about and the people behind it. Elegant, chaotic, and full of pixel magic 🌸
      </motion.p>

      {/* 🃏 Team Cards */}
      <div className="grid gap-12 md:grid-cols-2 w-full max-w-6xl mb-20">
        {team.map((member) => (
          <motion.div
            key={member.name}
            whileHover={{ scale: 1.07, rotate: 1, boxShadow: "0 20px 50px rgba(0,0,0,0.2)" }}
            className="bg-gradient-to-br from-[#FFF8F3] to-[#F4E8D4] rounded-3xl p-8 flex flex-col items-center text-center transition-all duration-300 border border-[#8A6674]/20 relative overflow-hidden"
          >
            {/* ✨ Tiny Sparkle Overlay */}
            <motion.div
              animate={{ opacity: [0.2, 0.7, 0.2], x: [-10, 10, -10, 0], y: [0, 10, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute w-1 h-1 bg-[#FAF9F6] rounded-full top-4 left-4 pointer-events-none"
            />
            <div className="w-40 h-40 mb-4 relative rounded-full overflow-hidden">
              <Image
                src={member.photo}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold text-[#743014] mb-1">{member.name}</h3>
            <p className="text-[#8C5383]/80 font-semibold mb-3">{member.role}</p>
            <p className="text-[#442D1C]/70 text-sm">{member.bio}</p>
          </motion.div>
        ))}
      </div>

      {/* 🌸 Floating Divider */}
      <motion.div
        animate={{ y: [0, -8, 0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="text-3xl md:text-4xl font-bold text-[#8C5383] mb-16 text-center"
      >
        ✿━━━━━━━━━━━━✿
      </motion.div>

      {/* 💖 What We Do Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="w-full max-w-5xl text-center mb-16"
      >
        <h2 className="text-4xl font-bold text-[#743014] mb-8">What We Do</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {skills.map((skill) => (
            <motion.div
              key={skill.title}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-[#FFF8F3] to-[#F4E8D4] rounded-2xl p-6 border border-[#8A6674]/20 shadow-lg relative overflow-hidden"
            >
              {/* ✨ Tiny floating sparkle */}
              <motion.div
                animate={{ opacity: [0.2, 0.8, 0.2], x: [-5, 5, -5, 0], y: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute w-1 h-1 bg-[#FAF9F6] rounded-full top-3 left-3 pointer-events-none"
              />
              <h3 className="text-2xl font-bold text-[#8C5383] mb-2">{skill.title}</h3>
              <p className="text-[#442D1C]/80 text-sm">{skill.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
