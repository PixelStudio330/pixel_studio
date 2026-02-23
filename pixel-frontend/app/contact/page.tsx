"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, MessageSquare, User, Image as ImageIcon } from "lucide-react";
import SparkleTrail from "../components/SparkleTrail";
import dynamic from "next/dynamic";
import Toast from "../components/Toast";

const Doodles = dynamic(() => import("../components/Doodles"), { ssr: false });

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type?: "success" | "error" } | null>(null);

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
    // 1. Client-side validation
    if (!form.name || !form.email || !form.message) {
      setToast({ message: "Fill all fields, you cute clown 😭", type: "error" });
      return;
    }

    setLoading(true);

    try {
      // 2. Prepare FormData (Matches your route.ts req.formData() expectation)
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("message", form.message);
      
      if (image) {
        formData.append("image", image);
      }

      // 3. Post to the internal Next.js API route
      const res = await fetch("/api/send-email", {
        method: "POST",
        // Note: Do NOT add headers here. The browser sets the multipart boundary automatically.
        body: formData, 
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setToast({ message: "Message sent successfully! 💌✨", type: "success" });
        // Reset form
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

  return (
    <main className="relative min-h-screen bg-[#D9E0A4] text-[#8C5383] overflow-hidden">
      <SparkleTrail />

      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-40 pointer-events-none z-0">
        <Doodles />
      </div>

      <section className="relative z-10 flex flex-col items-center justify-center text-center pt-32 px-6 md:px-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-extrabold text-[#604C39] mb-6"
        >
          Get In Touch 🌿
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl max-w-2xl mb-12 text-[#8A6674]"
        >
          Looking for a customized website? Fill out the form — let’s create something beautiful,
          fast and unforgettable ✨
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="w-full max-w-xl bg-gradient-to-br from-[#EDF3C5] to-[#D9E0A4] rounded-3xl shadow-xl p-10 border border-[#8A6674]/30"
        >
          {/* Name */}
          <label className="block text-left text-[#604C39] font-semibold mb-2">Name</label>
          <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm mb-6 border border-[#8A6674]/20">
            <User className="text-[#8A6674]" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full outline-none bg-transparent text-[#604C39]"
            />
          </div>

          {/* Email */}
          <label className="block text-left text-[#604C39] font-semibold mb-2">Email</label>
          <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm mb-6 border border-[#8A6674]/20">
            <Mail className="text-[#8A6674]" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="w-full outline-none bg-transparent text-[#604C39]"
            />
          </div>

          {/* Message */}
          <label className="block text-left text-[#604C39] font-semibold mb-2">Message</label>
          <div className="flex items-start gap-3 bg-white rounded-xl px-4 py-3 shadow-sm mb-8 border border-[#8A6674]/20">
            <MessageSquare className="text-[#8A6674] mt-1" />
            <textarea
              name="message"
              placeholder="Tell me about your dream project..."
              value={form.message}
              onChange={handleChange}
              className="w-full h-28 outline-none bg-transparent text-[#604C39] resize-none"
            />
          </div>

          {/* Image Upload */}
          <label className="block text-left text-[#604C39] font-semibold mb-2">
            Attachment (optional)
          </label>

          <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm mb-6 border border-[#8A6674]/20">
            <ImageIcon className="text-[#8A6674]" />
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImage} 
              className="text-[#604C39] text-xs file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:bg-[#8A6674] file:text-white hover:file:bg-[#604C39]" 
            />
          </div>

          {/* Preview */}
          {preview && (
            <div className="mb-6">
              <img
                src={preview}
                alt="Preview"
                className="w-full rounded-2xl shadow-md border border-[#8A6674]/20"
              />
            </div>
          )}

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.05, rotate: -1 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            onClick={handleSubmit}
            className="w-full bg-[#8A6674] text-[#FFF8F3] px-6 py-3 rounded-full font-semibold hover:bg-[#604C39] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Message"} <Send size={20} />
          </motion.button>
        </motion.div>
      </section>

      {/* Divider */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="text-center text-[#8A6674] text-3xl my-16"
      >
        ︵‿︵‿୨♡୧‿︵‿︵
      </motion.div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </main>
  );
}