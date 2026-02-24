"use client";

import React, { useRef, useEffect, useState } from "react";
import nextdynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Code, Rocket, Zap } from "lucide-react";
import Link from "next/link";
import SparkleTrail from "./components/SparkleTrail";
import HeroText from "./components/HeroText";

// ✅ Next.js 15 Config: Ensure the page is always fresh
export const dynamic = 'force-dynamic';

const Doodles = nextdynamic(() => import("./components/Doodles"), { ssr: false });

// ✅ FeatureCard
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, desc }) => (
  <motion.div
    whileHover={{ scale: 1.07, rotate: 1, boxShadow: "0 25px 40px rgba(0,0,0,0.2)" }}
    className="p-10 bg-gradient-to-br from-[#D9E0A4] to-[#EDF3C5] shadow-lg rounded-3xl border border-[#8A6674]/30 hover:border-[#604C39]/50 transition-all duration-300 h-full"
  >
    <motion.div whileHover={{ y: -5 }} className="flex flex-col items-center text-center space-y-5">
      <div className="text-[#8A6674] w-12 h-12 mb-2">{icon}</div>
      <h3 className="text-2xl font-bold text-[#604C39]">{title}</h3>
      <p className="text-[#8C5383]/80 text-md">{desc}</p>
    </motion.div>
  </motion.div>
);

// ✅ ServiceCard
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, desc }) => (
  <motion.div
    whileHover={{ scale: 1.07, rotate: 1, boxShadow: "0 25px 40px rgba(0,0,0,0.2)" }}
    className="p-8 bg-gradient-to-br from-[#D9E0A4] to-[#EDF3C5] rounded-2xl shadow-lg border border-[#8A6674]/20 transition-all duration-300 h-full"
  >
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="text-[#8A6674] w-12 h-12 mb-2">{icon}</div>
      <h3 className="text-2xl font-semibold text-[#604C39]">{title}</h3>
      <p className="text-[#8C5383] text-sm">{desc}</p>
      <Link
        href="/services"
        className="mt-4 inline-block bg-[#8A6674] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#604C39] transition-all"
      >
        Learn More
      </Link>
    </div>
  </motion.div>
);

// 💫 Floating Text Divider
const FloatingTextDivider = () => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [0, -10, 0, 10, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    className="text-2xl md:text-3xl text-[#8A6674] text-center my-12"
  >
    ︵‿︵‿୨♡୧‿︵‿︵
  </motion.div>
);

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const featuresRef = useRef(null);
  const servicesRef = useRef(null);

  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" });
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" });

  // ✅ FORCED SCROLL RESET & HYDRATION FIX
  useEffect(() => {
    setMounted(true);
    
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Prevent stalling by not rendering heavy logic until mounted
  if (!mounted) {
    return <div className="min-h-screen bg-[#D9E0A4]" />;
  }

  return (
    <main className="relative min-h-screen bg-[#D9E0A4] text-[#8C5383] font-sans overflow-x-hidden">
      <SparkleTrail />

      {/* ✨ HERO */}
      <section
        id="hero-section"
        className="relative flex flex-col items-center justify-center text-center h-[80vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#604C39]/20 z-0"></div>
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 opacity-40 pointer-events-none">
          <Doodles />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <HeroText />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-lg md:text-xl max-w-2xl mb-10 text-[#C8D5A2]/90"
          >
            Crafting <strong>luxury digital experiences</strong> with code and color 🍀
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#19485F] text-[#D9E0A4] px-8 py-3 rounded-full font-semibold shadow-xl hover:bg-[#1E5A74] transition-all transform hover:scale-105"
            >
              Get Started <ArrowRight size={22} />
            </Link>

            <Link 
              href="/projects"
              className="inline-flex items-center gap-2 bg-[#8A6674] text-[#FFF8F3] px-8 py-3 rounded-full font-semibold shadow-xl hover:bg-[#604C39] transition-all transform hover:scale-105"
            >
              View Projects <ArrowRight size={22} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 🌸 Features Section */}
      <section id="features" className="py-24 px-6 md:px-12 lg:px-24 text-center">
        <motion.h2
          ref={featuresRef}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={featuresInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl font-bold text-[#604C39] mb-14"
        >
          Why Choose <span className="text-[#8A6674]">Pixel Studio?</span>
        </motion.h2>

        <div className="grid gap-12 md:grid-cols-3">
          {[
            {
              icon: <Rocket className="w-10 h-10" />,
              title: "Lightning Speed",
              desc: "Every millisecond matters. Our websites are optimized with cutting-edge frameworks and efficient architecture — delivering fast, seamless, and high-performing digital experiences.",
            },
            {
              icon: <Code className="w-10 h-10" />,
              title: "Clean Code",
              desc: "We believe elegance starts in the codebase. Built with scalability, clarity, and long-term stability in mind, our code ensures effortless maintenance and flawless performance.",
            },
            {
              icon: <Zap className="w-10 h-10" />,
              title: "Dynamic Energy",
              desc: "From subtle animations to immersive interactivity, we inject personality into every pixel. Expect digital experiences that move, react, and engage — because static websites belong to the past.",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={featuresInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 12,
                delay: i * 0.2,
              }}
            >
              <FeatureCard icon={card.icon} title={card.title} desc={card.desc} />
            </motion.div>
          ))}
        </div>
      </section>

      <FloatingTextDivider />

      {/* 💼 Services Section */}
      <section id="services" className="py-24 px-6 md:px-12 lg:px-24 text-center">
        <motion.h2
          ref={servicesRef}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={servicesInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl font-bold text-[#604C39] mb-14"
        >
          Our <span className="text-[#8A6674]">Services</span>
        </motion.h2>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <Rocket className="w-10 h-10" />,
              title: "Web Design",
              desc: "Stunning, responsive websites built with modern UI/UX principles — designed to captivate your audience and elevate your brand presence.",
            },
            {
              icon: <Code className="w-10 h-10" />,
              title: "Backend Work",
              desc: "We create sleek, secure, and scalable digital websites that work as good as they look.",
            },
            {
              icon: <Zap className="w-10 h-10" />,
              title: "Brand Strategy",
              desc: "We craft your brand’s digital identity — from logo to color psychology — ensuring every pixel tells your story with impact.",
            },
          ].map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={servicesInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 12,
                delay: i * 0.2,
              }}
            >
              <ServiceCard icon={service.icon} title={service.title} desc={service.desc} />
            </motion.div>
          ))}
        </div>
      </section>

      <FloatingTextDivider />

      {/* 📚 Courses Section */}
      <section id="courses" className="py-24 px-6 md:px-12 lg:px-24 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl font-bold text-[#604C39] mb-14"
        >
          Our Courses <span className="text-[#8A6674]">(Coming Soon!)</span>
        </motion.h2>

        <div className="flex justify-center">
          {[{
            title: "Stay tuned for updates!",
            icon: <Code className="w-10 h-10" />,
          }].map((course, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 12,
                delay: i * 0.15,
              }}
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 1, boxShadow: "0 25px 40px rgba(0,0,0,0.2)" }}
                className="p-8 bg-gradient-to-br from-[#D9E0A4] to-[#EDF3C5] rounded-2xl shadow-lg border border-[#8A6674]/30 transition-all duration-300 flex flex-col items-center text-center space-y-4"
              >
                <div className="text-[#8A6674] w-12 h-12">{course.icon}</div>
                <h3 className="text-2xl font-bold text-[#604C39]">{course.title}</h3>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}