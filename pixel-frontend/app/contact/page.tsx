"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Send, MessageSquare, User, Image as ImageIcon } from "lucide-react";
import SparkleTrail from "../components/SparkleTrail";
import nextDynamic from "next/dynamic"; 
import Toast from "../components/Toast";

// Load Doodles only on client side to keep initial load light
const Doodles = nextDynamic(() => import("../components/Doodles"), { ssr: false });

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type?: "success" | "error" } | null>(null);
  const [mounted, setMounted] = useState(false);

  // ✅ SMOOTH MOUNT & SCROLL RESET
  useEffect(() => {
    setMounted(true);
    
    // Disable the browser's "sticky" scroll memory
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Jump to top instantly without blocking the UI thread
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setToast({ message: "Fill all fields, you cute clown 😭", type: "error" });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("message", form.message);
      
      if (image) {
        formData.append("image", image);
      }

      const res = await fetch("/api/send-email", {
        method: "POST",
        body: formData, 
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setToast({ message: "Message sent successfully! 💌✨", type: "success" });
        setForm({ name: "", email: "", message: "" });
        setImage(null);
        setPreview(null);
      } else {
        setToast({ message: data.error || "Error sending message 💀", type: "error" });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setToast({ message: "Server unreachable 😭", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Prevents stalling by ensuring the layout is ready before rendering heavy elements
  if (!mounted) return <div className="min-h-screen bg-[#D9E0A4]" />;

  return (
    <main className="relative min-h-screen bg-[#D9E0A4] text-[#8C5383] overflow-hidden">
      <SparkleTrail />

      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-40 pointer-events-none z-0">
        <Doodles />
      </div>

      <section className="relative z-10 flex flex-col items-center justify-center text-center pt-32 px-6 md:px-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-extrabold text-[#604C39] mb-6"
        >
          Get In Touch 🌿
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl max-w-2xl mb-12 text-[#8A6674]"
        >
          Looking for a customized website? Fill out the form — let’s create something beautiful,
          fast and unforgettable ✨
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="w-full max-w-xl bg-gradient-to-br from-[#EDF3C5] to-[#D9E0A4] rounded-3xl shadow-xl p-10 border border-[#8A6674]/30"
        >
          {/* Form Fields */}
          <div className="space-y-6">
            <div>
              <label className="block text-left text-[#604C39] font-semibold mb-2">Name</label>
              <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-[#8A6674]/20">
                <User className="text-[#8A6674]" size={20} />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full outline-none bg-transparent text-[#604C39]"
                />
              </div>
            </div>

            <div>
              <label className="block text-left text-[#604C39] font-semibold mb-2">Email</label>
              <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-[#8A6674]/20">
                <Mail className="text-[#8A6674]" size={20} />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full outline-none bg-transparent text-[#604C39]"
                />
              </div>
            </div>

            <div>
              <label className="block text-left text-[#604C39] font-semibold mb-2">Message</label>
              <div className="flex items-start gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-[#8A6674]/20">
                <MessageSquare className="text-[#8A6674] mt-1" size={20} />
                <textarea
                  name="message"
                  placeholder="Tell me about your dream project..."
                  value={form.message}
                  onChange={handleChange}
                  className="w-full h-28 outline-none bg-transparent text-[#604C39] resize-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-left text-[#604C39] font-semibold mb-2">
                Attachment (optional)
              </label>
              <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-[#8A6674]/20">
                <ImageIcon className="text-[#8A6674]" size={20} />
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImage} 
                  className="text-[#604C39] text-xs file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:bg-[#8A6674] file:text-white hover:file:bg-[#604C39] transition-colors" 
                />
              </div>
            </div>

            {preview && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full rounded-2xl shadow-md border border-[#8A6674]/20"
                />
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              onClick={handleSubmit}
              className="w-full bg-[#8A6674] text-[#FFF8F3] px-6 py-4 rounded-full font-semibold hover:bg-[#604C39] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed mt-4"
            >
              {loading ? "Sending..." : "Send Message"} <Send size={20} />
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Aesthetic Divider */}
      <motion.div
        animate={{ y: [0, -5, 0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="text-center text-[#8A6674] text-3xl my-20"
      >
        ︵‿︵‿୨♡୧‿︵‿︵
      </motion.div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </main>
  );
}