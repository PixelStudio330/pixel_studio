"use client";

import React, { useState, useEffect } from "react"; 
import { motion } from "framer-motion";
import SparkleTrail from "../components/SparkleTrail";
import { Wallet, Landmark, Wrench, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PaymentPage() {
  const [mounted, setMounted] = useState(false);

  // ✅ SMOOTH MOUNT & INSTANT SCROLL
  useEffect(() => {
    setMounted(true);
    
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Prevents "Hydration" flickering and stalls
  if (!mounted) return <div className="min-h-screen bg-[#D9E0A4]" />;

  return (
    <main className="min-h-screen bg-[#D9E0A4] text-[#743014] flex flex-col items-center p-10 relative overflow-hidden">

      {/* ✨ Sparkle Cursor Trail */}
      <SparkleTrail />

      {/* ✨ Floating background emojis */}
      <div className="absolute inset-0 pointer-events-none">
        {["💸", "🌟", "✨"].map((icon, i) => {
          const style =
            icon === "💸"
              ? { top: "12%", left: "8%" }
              : icon === "🌟"
              ? { top: "78%", left: "15%" }
              : { top: "60%", left: "80%" };

          return (
            <motion.div
              key={i}
              animate={{
                x: [-15, 15, -10, 0],
                y: [0, -10, 5, 0],
                rotate: [0, 360, 180, 0],
              }}
              transition={{
                duration: 12 + i * 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute text-3xl opacity-40"
              style={style}
            >
              {icon}
            </motion.div>
          );
        })}
      </div>

      {/* 🌸 Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl md:text-7xl font-black drop-shadow-lg text-center mt-20 text-[#8C5383] tracking-tight"
      >
        Payment Info
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-3xl text-lg md:text-xl text-[#442D1C]/80 text-center mb-16 font-medium"
      >
        Transparent, secure, and stress-free. 💸✨ <br className="hidden md:block"/>
        Here&apos;s how our process works.
      </motion.p>

      {/* 🌸 50/50 Policy Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-[#FFF8F3] border border-[#8A6674]/20 rounded-3xl p-8 max-w-3xl text-center shadow-lg mb-16 z-10"
      >
        <h2 className="text-3xl font-bold mb-4 text-[#743014]">Our Payment Policy</h2>
        <p className="text-[#442D1C]/80 text-base leading-relaxed">
          To ensure total commitment and zero delays, we follow a simple 50/50 rule:
        </p>

        <div className="mt-6 space-y-4 text-[#743014] font-bold text-lg">
          <p className="flex items-center justify-center gap-2">
            <span className="text-[#8C5383]">01.</span> 50% Upfront Deposit
          </p>
          <p className="flex items-center justify-center gap-2">
            <span className="text-[#8C5383]">02.</span> 50% Upon Final Delivery
          </p>
        </div>

        <p className="mt-8 text-[#8C5383] font-medium italic">
          Keeping it fair, professional, and exciting! ✨
        </p>
      </motion.div>

      {/* 🌸 Divider */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="text-3xl text-[#8C5383] mb-16 opacity-50"
      >
        ✿━━━━━━━━━━━━✿
      </motion.div>

      {/* 🌸 Payment Methods */}
      <div className="grid gap-8 md:grid-cols-3 w-full max-w-6xl mb-20 z-10">

        {/* BKASH */}
        <motion.div
          whileHover={{ y: -10 }}
          className="bg-white/60 backdrop-blur-md rounded-3xl p-8 flex flex-col items-center border border-[#8A6674]/10 text-center shadow-sm"
        >
          <div className="bg-[#8C5383]/10 p-4 rounded-2xl mb-4">
             <Wallet className="w-8 h-8 text-[#8C5383]" />
          </div>
          <h3 className="text-2xl font-bold mb-2 text-[#743014]">bKash</h3>
          <p className="text-[#442D1C]/80 text-sm mb-4">Fast & secure mobile transfer.</p>
          <p className="font-bold text-[#8C5383] bg-white px-4 py-1 rounded-full text-sm">01XXXXXXXXX</p>
        </motion.div>

        {/* BANK */}
        <motion.div
          whileHover={{ y: -10 }}
          className="bg-white/60 backdrop-blur-md rounded-3xl p-8 flex flex-col items-center border border-[#8A6674]/10 text-center shadow-sm"
        >
          <div className="bg-[#8C5383]/10 p-4 rounded-2xl mb-4">
             <Landmark className="w-8 h-8 text-[#8C5383]" />
          </div>
          <h3 className="text-2xl font-bold mb-2 text-[#743014]">Bank Transfer</h3>
          <p className="text-[#442D1C]/80 text-sm mb-4">Official bank-to-bank wire.</p>
          <p className="font-bold text-[#8C5383] text-sm">BRAC BANK</p>
          <p className="font-medium text-[#442D1C]/60 text-xs">Acc: XXXX-XXXX-XXXX</p>
        </motion.div>

        {/* FUTURE METHODS */}
        <motion.div
          className="bg-[#EFE7DA]/50 border border-dashed border-[#8A6674]/30 rounded-3xl p-8 flex flex-col items-center text-center opacity-70"
        >
          <Wrench className="w-8 h-8 mb-4 text-[#743014]/40" />
          <h3 className="text-xl font-bold text-[#743014]/60">More Coming</h3>
          <p className="text-[#442D1C]/50 text-xs">Stripe & PayPal soon 🔧</p>
        </motion.div>

      </div>

      {/* 🌸 Final Note + CTA */}
      <div className="max-w-3xl text-center z-10 pb-20">
        <p className="text-[#442D1C]/80 mb-6 text-sm md:text-base">
          After payment, just drop us a <span className="font-bold text-[#743014]">screenshot</span> via email or WhatsApp. <br/>
          We&apos;ll verify it and get the magic started immediately! 💌
        </p>

        <Link href="/contact">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-[#8C5383] text-[#FFF8F3] rounded-full font-bold shadow-xl hover:bg-[#743014] transition-all flex items-center gap-3 mx-auto"
          >
            Ready to Start? <ArrowRight className="w-5 h-5" />
          </motion.button>
        </Link>
      </div>

    </main>
  );
}