"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please fill in both fields 😭");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Invalid credentials 😢");
      }

      router.push("/dashboard"); 
      router.refresh(); 
      
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong 😭");
    } finally {
      setLoading(false);
    }
  };

  // Guard against hydration flicker and background doodles
  if (!mounted) {
    return <div className="min-h-screen bg-[#D9E0A4]" />;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#D9E0A4] px-6">
      {/* If you still see doodles, they are likely in your layout.tsx. 
         Check 'app/layout.tsx' and remove any <Doodles /> or <SparkleTrail /> 
         components wrapping the {children}.
      */}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl rounded-3xl p-10 border border-[#8A6674]/10"
      >
        <h1 className="text-4xl font-bold text-[#604C39] mb-8 text-center tracking-tight">
          Welcome Back
        </h1>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm text-center border border-red-100"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[#604C39] text-sm font-bold ml-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-2xl border border-[#8A6674]/20 bg-white px-5 py-3.5 outline-none focus:ring-2 focus:ring-[#8A6674]/40 transition-all text-[#604C39] placeholder:text-stone-300"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" title="Password Label" className="text-[#604C39] text-sm font-bold ml-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-2xl border border-[#8A6674]/20 bg-white px-5 py-3.5 outline-none focus:ring-2 focus:ring-[#8A6674]/40 transition-all text-[#604C39] placeholder:text-stone-300"
              placeholder="••••••••"
              required
            />
          </div>

          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ y: 0, scale: 0.98 }}
            disabled={loading}
            type="submit"
            className="mt-4 bg-[#8A6674] text-white font-bold px-6 py-4 rounded-full hover:bg-[#604C39] transition-all shadow-lg shadow-[#8A6674]/20 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Sign In"}
          </motion.button>
        </form>

        <div className="mt-10 pt-6 border-t border-stone-100">
          <p className="text-center text-sm text-[#604C39]/70">
            New here?{" "}
            <Link href="/signup" className="text-[#8A6674] font-bold hover:text-[#604C39] transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}