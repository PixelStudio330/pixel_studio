import express from "express";
import { askGeminiWithHistory } from "../ai/gemini.ts";

const router = express.Router();

let conversationHistory: { role: "user" | "assistant"; content: string }[] = [];

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const reply = await askGeminiWithHistory(message, conversationHistory);

    // Save both user message and Pixy's reply
    conversationHistory.push({ role: "user", content: message });
    conversationHistory.push({ role: "assistant", content: reply });

    res.json({ reply });
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: "Pixy's brain fried 😵‍💫" });
  }
});

export default router;
