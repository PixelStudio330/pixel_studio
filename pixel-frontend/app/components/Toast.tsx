// components/Toast.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

export default function Toast({ message, type = "success", onClose }: ToastProps) {
  // Auto-close after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "success" ? "#D9E0A4" : "#F4C7C3"; // soft green / muted pink
  const textColor = "#8C5383"; // your theme text

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.8 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl shadow-xl z-50`}
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        {message}
      </motion.div>
    </AnimatePresence>
  );
}
