"use client";

import React, { useEffect } from "react"; // Added useEffect
import { motion } from "framer-motion";
import SparkleTrail from "../components/SparkleTrail";
import { Wallet, Landmark, Wrench, ArrowRight } from "lucide-react";
import Link from "next/link";

// ✅ Next.js 15 Config: Ensure the page is always fresh
export const dynamic = 'force-dynamic';

export default function PaymentPage() {
  // ✅ Force scroll to top on refresh/load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
              className="absolute text-3xl"
              style={style}
            >
              {icon}
            </motion.div>
          );
        })}
      </div>

      {/* 🌸 Title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-6xl font-bold drop-shadow-lg text-center mt-20 text-[#8C5383]"
      >
        Payment Method & Information
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="max-w-3xl text-lg text-[#442D1C]/80 text-center mb-16"
      >
        Transparent, secure, and stress-free, just how payments should be 💸✨  
        Here&apos;s how our process works and the options we support.
      </motion.p>

      {/* 🌸 50/50 Policy Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-[#FFF8F3] border border-[#8A6674]/20 rounded-3xl p-8 max-w-3xl text-center shadow-lg mb-16"
      >
        <h2 className="text-3xl font-bold mb-4 text-[#743014]">Our Payment Policy</h2>
        <p className="text-[#442D1C]/80 text-base leading-relaxed">
          To avoid wasted time and last-minute cancellations, we follow a simple rule:
        </p>

        <div className="mt-6 space-y-3 text-[#743014] font-semibold">
          <p>📌 <span className="font-bold">50% upfront</span> before the project starts.</p>
          <p>📌 <span className="font-bold">50% after delivery</span> once you receive the project fully.</p>
        </div>

        <p className="mt-6 text-[#8C5383]/80">
          This keeps everything fair for both sides and ensures we can give you our best work ✨
        </p>
      </motion.div>

      {/* 🌸 Divider */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="text-3xl md:text-4xl font-bold text-[#8C5383] mb-16"
      >
        ✿━━━━━━━━━━━━✿
      </motion.div>

      {/* 🌸 Payment Methods */}
      <div className="grid gap-12 md:grid-cols-3 w-full max-w-6xl mb-20">

        {/* BKASH (Active) */}
        <motion.div
          whileHover={{ scale: 1.06, boxShadow: "0 20px 40px rgba(0,0,0,0.25)" }}
          className="bg-gradient-to-br from-[#FFF8F3] to-[#F4E8D4] rounded-3xl p-8 flex flex-col items-center border border-[#8A6674]/20 text-center"
        >
          <Wallet className="w-12 h-12 mb-4 text-[#743014]" />
          <h3 className="text-2xl font-bold mb-2">Bkash</h3>
          <p className="text-[#442D1C]/80 text-sm mb-4">Fast, secure, and available anytime.</p>
          <p className="font-semibold text-[#8C5383]">Account: 01XXXXXXXXX</p>
        </motion.div>

        {/* BANK (Active) */}
        <motion.div
          whileHover={{ scale: 1.06, boxShadow: "0 20px 40px rgba(0,0,0,0.25)" }}
          className="bg-gradient-to-br from-[#FFF8F3] to-[#F4E8D4] rounded-3xl p-8 flex flex-col items-center border border-[#8A6674]/20 text-center"
        >
          <Landmark className="w-12 h-12 mb-4 text-[#743014]" />
          <h3 className="text-2xl font-bold mb-2">Bank Transfer</h3>
          <p className="text-[#442D1C]/80 text-sm mb-4">Best for clients who prefer official documentation.</p>
          <p className="font-semibold text-[#8C5383]">Bank: BRAC Bank</p>
          <p className="font-semibold text-[#8C5383]">Acc No: XXXX-XXXX</p>
        </motion.div>

        {/* FUTURE METHODS – Under Construction */}
        <motion.div
          whileHover={{ scale: 1.04 }}
          className="bg-[#EFE7DA] border border-[#8A6674]/20 rounded-3xl p-8 flex flex-col items-center text-center opacity-60"
        >
          <Wrench className="w-12 h-12 mb-4 text-[#743014]" />
          <h3 className="text-2xl font-bold">More Coming Soon</h3>
          <p className="text-[#442D1C]/70 text-sm">New payment options in development 🔧</p>
        </motion.div>

      </div>

      {/* 🌸 Divider */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="text-3xl md:text-4xl font-bold text-[#8C5383] mb-16"
      >
        ✿━━━━━━━━━━━━✿
      </motion.div>

      {/* 🌸 Notes + CTA */}
      <div className="max-w-3xl text-center">
        <p className="text-[#442D1C]/80 mb-6">
          After completing a payment, please send a <span className="font-bold text-[#743014]">screenshot </span>  
          to our email so we can verify everything smoothly 💌
        </p>

        <p className="text-[#743014] font-semibold mb-8">
          ✨ Regular customers get <strong>special discounts </strong>  
          depending on how many projects they&apos;ve done with us.
        </p>

        <Link href="/contact" className="inline-block">
          <button className="px-8 py-3 bg-[#8C5383] text-white rounded-full font-semibold shadow-md hover:scale-105 transition flex items-center gap-2 mx-auto">
            Contact Us <ArrowRight className="w-5 h-5" />
          </button>
        </Link>
      </div>

    </main>
  );
}