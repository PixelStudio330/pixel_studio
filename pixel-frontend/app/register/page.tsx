'use client';

import { useState, useEffect } from "react"; // Added useEffect
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, LogIn, ArrowRight } from "lucide-react";
import nextDynamic from "next/dynamic"; // Renamed to avoid conflict with 'export const dynamic'
import SparkleTrail from "../components/SparkleTrail";

// ✅ Next.js 15 Config: Ensure fresh data on refresh
export const dynamic = 'force-dynamic';

// Load Doodles only on client side
const Doodles = nextDynamic(() => import("../components/Doodles"), { ssr: false });

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ✅ Force scroll to top on refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        // Redirect to the login page after successful registration
        router.push("/api/auth/signin"); 
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong 😭");
      }
    } catch (err) {
      setError("Server unreachable 💀");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#D9E0A4] flex items-center justify-center px-4 overflow-hidden">
      {/* Background Decor */}
      <SparkleTrail />
      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-30 pointer-events-none z-0">
        <Doodles />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md bg-gradient-to-br from-[#EDF3C5] to-[#D9E0A4] p-10 rounded-[2.5rem] shadow-2xl border border-[#8A6674]/30"
      >
        <div className="text-center mb-8">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-extrabold text-[#604C39] mb-2"
          >
            Join Pixel Studio ✨
          </motion.h2>
          <p className="text-[#8A6674] font-medium">Create your creative sanctuary</p>
        </div>

        {/* Google Auth */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => signIn("google")}
          className="w-full flex items-center justify-center gap-3 bg-white/80 backdrop-blur-sm border-2 border-[#19485F]/10 p-3.5 rounded-2xl hover:bg-white transition-all font-bold text-[#19485F] mb-8 shadow-sm"
        >
          <img src="https://authjs.dev/img/providers/google.svg" className="w-5 h-5" alt="Google" />
          Continue with Google
        </motion.button>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-[#8A6674]/20"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#EBF1C2] px-3 text-[#8A6674] font-bold">Or use email</span>
          </div>
        </div>

        {/* Manual Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <AnimatePresence>
            {error && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-500 text-sm text-center font-bold bg-red-50 p-2 rounded-lg"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <div>
            <label className="block text-left text-[#604C39] font-bold mb-2 ml-1 text-sm">Email Address</label>
            <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-inner border border-[#8A6674]/10 focus-within:ring-2 focus-within:ring-[#19485F]/20 transition-all">
              <Mail className="text-[#8A6674]" size={20} />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full outline-none bg-transparent text-[#604C39] placeholder:text-gray-400"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-left text-[#604C39] font-bold mb-2 ml-1 text-sm">Password</label>
            <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-inner border border-[#8A6674]/10 focus-within:ring-2 focus-within:ring-[#19485F]/20 transition-all">
              <Lock className="text-[#8A6674]" size={20} />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full outline-none bg-transparent text-[#604C39] placeholder:text-gray-400"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03, rotate: -1 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full bg-[#19485F] text-[#F9F7F1] p-4 rounded-2xl font-extrabold hover:bg-[#19485F]/90 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 mt-4"
          >
            {loading ? "Creating Magic..." : "Create Account"} 
            <ArrowRight size={20} />
          </motion.button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[#8A6674] font-medium">
            Already a member?{" "}
            <Link href="/api/auth/signin" className="text-[#19485F] font-bold hover:underline decoration-2">
              Log In here 💌
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Decorative Bottom Divider */}
      <div className="absolute bottom-10 left-0 w-full text-center text-[#8A6674] text-2xl opacity-50 pointer-events-none">
        ︵‿︵‿୨♡୧‿︵‿︵
      </div>
    </main>
  );
}