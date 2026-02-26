"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Send, MessageSquare, User, Image as ImageIcon } from "lucide-react";
import SparkleTrail from "../components/SparkleTrail";
import nextDynamic from "next/dynamic"; 
import Toast from "../components/Toast";

const Doodles = nextDynamic(() => import("../components/Doodles"), { ssr: false });

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type?: "success" | "error" } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
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

  // 🛡️ THE BALANCED GATEKEEPER
  const verifyEmailExists = async (email: string) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_ABSTRACT_API_KEY; 
      
      if (!apiKey) {
        console.warn("API Key missing! Skipping verification.");
        return true; 
      }

      const response = await fetch(
        `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${email}`
      );
      
      const data = await response.json();
      
      // 🧠 CORPORATE LOGIC UPDATE:
      // We look at three key 'Success' signals from your JSON:
      const isFormatValid = data.email_deliverability?.is_format_valid;
      const isSmtpValid = data.email_deliverability?.is_smtp_valid;
      const qualityScore = data.email_quality?.score || 0;

      // 🛑 BLOCK IF: Format is wrong OR (Smtp is invalid AND score is trash)
      // This allows 'unknown' SMTPs to pass IF the quality score is high (like 0.95)
      if (!isFormatValid) return false;
      if (isSmtpValid === false && qualityScore < 0.5) return false;
      
      return true;

    } catch (error) {
      console.error("Verification Service Error:", error);
      return true; // Fallback: Don't block users if the API is down
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setToast({ message: "Fill all fields, you cute clown 😭", type: "error" });
      return;
    }

    setLoading(true);

    // 🕵️‍♂️ SMART REPUTATION CHECK
    const isValid = await verifyEmailExists(form.email);
    
    if (!isValid) {
      setLoading(false);
      setToast({ 
        message: "That email looks suspicious or doesn't exist. Please check for typos! 💌", 
        type: "error" 
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("message", form.message);
      if (image) formData.append("image", image);

      const res = await fetch("/api/send-email", { method: "POST", body: formData });
      const data = await res.json();

      if (res.ok && data.success) {
        setToast({ message: "Message sent! Talk soon! 💌✨", type: "success" });
        setForm({ name: "", email: "", message: "" });
        setImage(null);
        setPreview(null);
      } else {
        setToast({ message: data.error || "Error sending message 💀", type: "error" });
      }
    } catch (error) {
      setToast({ message: "Server unreachable 😭", type: "error" });
    } finally {
      setLoading(false);
    }
  };

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
          className="text-4xl md:text-6xl font-extrabold text-[#604C39] mb-6"
        >
          Get In Touch 🌿
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-xl bg-gradient-to-br from-[#EDF3C5] to-[#D9E0A4] rounded-3xl shadow-xl p-10 border border-[#8A6674]/30"
        >
          <div className="space-y-6">
            <div className="text-left">
              <label className="block text-[#604C39] font-semibold mb-2 ml-1">Name</label>
              <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-[#8A6674]/20 focus-within:border-[#8A6674] transition-all shadow-sm">
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

            <div className="text-left">
              <label className="block text-[#604C39] font-semibold mb-2 ml-1">Email Address</label>
              <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-[#8A6674]/20 focus-within:border-[#8A6674] transition-all shadow-sm">
                <Mail className="text-[#8A6674]" size={20} />
                <input 
                  type="email" 
                  name="email" 
                  placeholder="realuser@gmail.com" 
                  value={form.email} 
                  onChange={handleChange} 
                  className="w-full outline-none bg-transparent text-[#604C39]" 
                />
              </div>
            </div>

            <div className="text-left">
              <label className="block text-[#604C39] font-semibold mb-2 ml-1">Message</label>
              <div className="flex items-start gap-3 bg-white rounded-xl px-4 py-3 border border-[#8A6674]/20 focus-within:border-[#8A6674] transition-all shadow-sm">
                <MessageSquare className="text-[#8A6674] mt-1" size={20} />
                <textarea 
                  name="message" 
                  placeholder="Let's build something amazing..." 
                  value={form.message} 
                  onChange={handleChange} 
                  className="w-full h-28 outline-none bg-transparent text-[#604C39] resize-none" 
                />
              </div>
            </div>

            <div className="text-left">
              <label className="block text-[#604C39] font-semibold mb-2 ml-1">Attachment (optional)</label>
              <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-[#8A6674]/20">
                <ImageIcon className="text-[#8A6674]" size={20} />
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImage} 
                  className="text-[#604C39] text-xs file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:bg-[#8A6674] file:text-white cursor-pointer" 
                />
              </div>
            </div>

            {preview && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2">
                <img src={preview} alt="Preview" className="w-full rounded-2xl shadow-md border border-[#8A6674]/20" />
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              onClick={handleSubmit}
              className="w-full bg-[#8A6674] text-[#FFF8F3] px-6 py-4 rounded-full font-semibold hover:bg-[#604C39] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed mt-4"
            >
              {loading ? "Verifying..." : "Send Message"} <Send size={20} />
            </motion.button>
          </div>
        </motion.div>
      </section>

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