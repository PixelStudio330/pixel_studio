'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Pixy() {
  const pixyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [isFlipping, setIsFlipping] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<{from: 'user' | 'pixy', text: string}[]>([]);
  const [loading, setLoading] = useState(false);

  // 💭 Fetch Gemini thoughts from backend
  async function getPixyReply(message: string) {
    try {
      const res = await fetch("http://localhost:5000/mascot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      return data.reply || "…";
    } catch (err) {
      console.error("Pixy fetch error:", err);
      return "…";
    }
  }

  // 🔄 360° flip every 2 minutes
  useEffect(() => {
    const flipInterval = setInterval(() => {
      if (!pixyRef.current) return;
      setIsFlipping(true);

      pixyRef.current.style.transition = "transform 1s ease-in-out";
      pixyRef.current.style.transform = "rotateY(360deg)";

      setTimeout(() => {
        if (pixyRef.current) {
          pixyRef.current.style.transition = "none";
          pixyRef.current.style.transform = "rotateY(0deg)";
        }
        setIsFlipping(false);
      }, 1000);
    }, 2 * 60 * 1000);

    return () => clearInterval(flipInterval);
  }, []);

  // 🖱 Click Pixy → toggle chat panel
  const handleClick = () => {
    setShowChat(prev => !prev);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // 📝 Send message
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current?.value.trim()) {
      const userMessage = inputRef.current.value.trim();
      inputRef.current.value = "";

      // Add user message
      setMessages(prev => [...prev, { from: "user", text: userMessage }]);
      setLoading(true);

      // Get Pixy reply
      const reply = await getPixyReply(userMessage);
      setMessages(prev => [...prev, { from: "pixy", text: reply }]);
      setLoading(false);
    }
  };

  // Scroll to bottom when new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Persist messages in localStorage
  useEffect(() => {
    const saved = localStorage.getItem("pixyMessages");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("pixyMessages", JSON.stringify(messages));
  }, [messages]);

  return (
    <>
      {/* 🍄 Pixy mascot */}
      <div
        ref={pixyRef}
        onClick={handleClick}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          fontSize: "2.5rem",
          zIndex: 9999,
          cursor: "pointer",
          transformStyle: "preserve-3d",
        }}
      >
        <span style={{ position: "relative", display: "inline-block" }}>
          🍄
          <span style={{
            position: "absolute",
            top: "-5px",
            left: "0px",
            fontSize: "0.8rem"
          }}>👀</span>
        </span>
      </div>

      {/* 💬 Chat panel */}
      {showChat && (
        <div style={{
          position: "fixed",
          bottom: "20px",
          right: "70px",
          width: "280px",
          maxHeight: "420px",
          background: "#FFF8F3",
          border: "1px solid #ccc",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          zIndex: 9999,
        }}>
          {/* Messages */}
          <div style={{
            flex: 1,
            padding: "8px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}>
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
                    background: msg.from === "user" ? "#8A6674" : "#F3E8E6",
                    color: msg.from === "user" ? "#FFF" : "#8A6674",
                    padding: "6px 10px",
                    borderRadius: "12px",
                    maxWidth: "80%",
                    wordBreak: "break-word",
                    fontSize: "0.75rem",
                  }}
                >
                  {msg.text}
                </motion.div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    alignSelf: "flex-start",
                    fontSize: "0.65rem",
                    color: "#888",
                  }}
                >
                  Pixy is thinking… 🍄
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask me something..."
            onKeyDown={handleKeyDown}
            style={{
              border: "none",
              borderTop: "1px solid #ccc",
              outline: "none",
              padding: "6px 10px",
              fontSize: "0.75rem",
              background: "#FFF8F3",
              color: "#8A6674",
            }}
          />
        </div>
      )}
    </>
  );
}
