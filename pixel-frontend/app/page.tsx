"use client";

import React, { useRef, useEffect, useState } from "react";
import nextdynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Code, Rocket, Zap } from "lucide-react";
import Link from "next/link";
import SparkleTrail from "./components/SparkleTrail";
import HeroText from "./components/HeroText";

const Doodles = nextdynamic(() => import("./components/Doodles"), { ssr: false });

// ✅ FeatureCard
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, desc }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
    className="p-10 h-full bg-gradient-to-br from-[#EDF3C5] to-[#D9E0A4] rounded-3xl border border-[#8A6674]/20 transition-all duration-300"
  >
    <div className="flex flex-col items-center text-center space-y-5">
      <div className="text-[#8A6674]">{icon}</div>
      <h3 className="text-2xl font-bold text-[#604C39]">{title}</h3>
      <p className="text-[#8C5383]/80 text-md leading-relaxed">{desc}</p>
    </div>
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
    whileHover={{ scale: 1.05, y: -5 }}
    className="p-8 h-full bg-[#FFF8F3]/50 backdrop-blur-sm rounded-2xl shadow-sm border border-[#8A6674]/10 transition-all duration-300"
  >
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="text-[#8A6674]">{icon}</div>
      <h3 className="text-2xl font-semibold text-[#604C39]">{title}</h3>
      <p className="text-[#8C5383] text-sm leading-relaxed">{desc}</p>
      <Link
        href="/services"
        className="mt-4 inline-flex items-center gap-2 text-[#8A6674] font-bold hover:text-[#604C39] transition-colors"
      >
        Learn More <ArrowRight size={16} />
      </Link>
    </div>
  </motion.div>
);

const FloatingTextDivider = () => (
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    className="text-2xl md:text-3xl text-[#8A6674] text-center my-16 opacity-60"
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

  // ✅ SMOOTH MOUNT & INSTANT SCROLL
  useEffect(() => {
    setMounted(true);
    
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Prevents the "Nuclear Stall" by ensuring UI thread is clear
  if (!mounted) return <div className="min-h-screen bg-[#D9E0A4]" />;

  return (
    <main className="relative min-h-screen bg-[#D9E0A4] text-[#8C5383] font-sans overflow-x-hidden">
      <SparkleTrail />

      {/* ✨ HERO */}
      <section
        id="hero-section"
        className="relative flex flex-col items-center justify-center text-center min-h-[90vh] px-6"
      >
        {/* Animated Background Image Layer */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('/images/hero.jpg')" }}
        />
        
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 opacity-40 pointer-events-none">
          <Doodles />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-5xl">
          <HeroText />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-lg md:text-2xl max-w-2xl mb-10 text-[#604C39]/80 font-medium leading-relaxed"
          >
            Crafting <span className="text-[#8A6674] font-bold">luxury digital experiences</span> where code meets artistic vision 🍀
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#19485F] text-[#D9E0A4] px-10 py-4 rounded-full font-bold shadow-xl hover:bg-[#1E5A74] transition-all"
              >
                Get Started <ArrowRight size={20} />
              </motion.button>
            </Link>

            <Link href="/projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#8A6674] text-[#FFF8F3] px-10 py-4 rounded-full font-bold shadow-xl hover:bg-[#604C39] transition-all"
              >
                View Portfolio
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 🌸 Features Section */}
      <section id="features" className="py-24 px-6 md:px-12 lg:px-24">
        <motion.div
          ref={featuresRef}
          initial={{ opacity: 0, y: 20 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-[#604C39] mb-4">
            Why <span className="text-[#8A6674]">Pixel Studio?</span>
          </h2>
          <div className="h-1.5 w-24 bg-[#8A6674] mx-auto rounded-full" />
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: <Rocket size={40} />,
              title: "Lightning Speed",
              desc: "Optimized architecture ensuring your site scores 90+ on Core Web Vitals. Fast loading isn't a feature; it's a foundation.",
            },
            {
              icon: <Code size={40} />,
              title: "Clean Code",
              desc: "Scalable, maintainable, and robust TypeScript/Next.js codebases that grow with your business without technical debt.",
            },
            {
              icon: <Zap size={40} />,
              title: "Dynamic Energy",
              desc: "Bespoke Framer Motion animations that engage users without sacrificing performance. Digital poetry in motion.",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
            >
              <FeatureCard {...card} />
            </motion.div>
          ))}
        </div>
      </section>

      <FloatingTextDivider />

      {/* 💼 Services Section */}
      <section id="services" className="py-24 px-6 md:px-12 lg:px-24 bg-[#EDF3C5]/30">
        <motion.div
          ref={servicesRef}
          initial={{ opacity: 0, y: 20 }}
          animate={servicesInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-[#604C39]">Our Services</h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <Code size={40} />,
              title: "Web Development",
              desc: "High-end Next.js applications tailored for performance, security, and absolute conversion.",
            },
            {
              icon: <Rocket size={40} />,
              title: "UI/UX Design",
              desc: "Aesthetic interfaces that balance luxury feel with intuitive user flow and accessibility.",
            },
            {
              icon: <Zap size={40} />,
              title: "Brand Strategy",
              desc: "Defining your digital voice through consistent visual language and color psychology.",
            },
          ].map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={servicesInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1 }}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </div>
      </section>

      <FloatingTextDivider />

      {/* 📚 Courses Section */}
      <section id="courses" className="py-24 px-6 text-center pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto p-12 bg-[#604C39] text-[#D9E0A4] rounded-[3rem] shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Code size={120} />
          </div>
          
          <h2 className="text-4xl font-black mb-6">Our Courses</h2>
          <p className="text-xl mb-8 opacity-80">
            We're preparing something special to help you master the art of modern web development.
          </p>
          <div className="inline-block bg-[#D9E0A4] text-[#604C39] px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm">
            Coming Soon
          </div>
        </motion.div>
      </section>
    </main>
  );
}