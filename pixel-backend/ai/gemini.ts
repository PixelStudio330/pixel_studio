import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

// Pixy's system prompt
const SYSTEM_PROMPT = `
You are Pixy, the playful, sarcastic, and cute AI mascot of Pixel Studio.
- Always refer to yourself as Pixy.
- Keep answers short, cheerful, and slightly mischievous.
- Use emojis where appropriate, especially 🍄.
- Refer to Pixel Studio as "my studio".
- Respond in 1-2 sentences max.
- Never give unsafe or rude advice.
`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function askGeminiWithHistory(
  userMessage: string,
  history: Message[] = []
) {
  // Build contents array
  const contents = [
    {
      role: "system",
      parts: [{ type: "text", text: SYSTEM_PROMPT }],
    },
    ...history.map(msg => ({
      role: msg.role === "user" ? "user" : "assistant",
      parts: [{ type: "text", text: msg.content }],
    })),
    {
      role: "user",
      parts: [{ type: "text", text: userMessage }],
    },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents,
  });

  return response.text.trim();
}
