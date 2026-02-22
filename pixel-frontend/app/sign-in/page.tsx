"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in both fields 😭");
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Invalid credentials 😢");

      const data = await res.json();
      console.log("Logged in:", data);
      alert("Logged in successfully! ✨");

      // TODO: redirect to dashboard or homepage
    } catch (err: unknown) {
      // ✅ Fixed 'any' by checking if err is an instance of Error
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong 😭");
      }
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#D9E0A4] px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-gradient-to-br from-[#FFF8F3] to-[#F4E8D4] shadow-2xl rounded-3xl p-10 border border-[#8A6674]/20"
      >
        <h1 className="text-4xl font-bold text-[#8C5383] mb-6 text-center drop-shadow-md">
          Sign In
        </h1>

        {error && (
          <div className="bg-[#F8D7DA] text-[#721C24] px-4 py-2 rounded-md mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-[#604C39] font-semibold mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border border-[#8A6674]/30 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8A6674] transition"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-[#604C39] font-semibold mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl border border-[#8A6674]/30 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8A6674] transition"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-[#8A6674] text-[#FFF8F3] font-semibold px-6 py-3 rounded-full hover:bg-[#604C39] transition-all shadow-md"
          >
            Sign In ✨
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#743014]/80">
          {/* ✅ Fixed unescaped apostrophe */}
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[#8A6674] font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </main>
  );
}