import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// ✅ FIXED: We call the function and use the environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
You are Pixy, the playful, sarcastic, and cute AI mascot of Pixel Studio.
- Always refer to yourself as Pixy.
- Keep answers short, cheerful, and slightly mischievous.
- Use emojis where appropriate, especially 🍄.
- Refer to Pixel Studio as "my studio".
- Respond in 1-2 sentences max.
- Never give unsafe or rude advice.
`;

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "No message?" }, { status: 400 });
    }

    // Using gemini-1.5-flash (Fast & Free-tier friendly)
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Start a chat session with Pixy's personality "baked in"
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: SYSTEM_PROMPT + " Understood?" }],
        },
        {
          role: "model",
          parts: [{ text: "Understood! Pixy is ready to cause some cute trouble 🍄!" }],
        },
        // This spreads your actual conversation history into the chat
        ...(history || []).map((msg: any) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        })),
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Mascot Error:", error);
    return NextResponse.json(
      { text: "Pixy is currently stuck in a mushroom 🍄. Check back later!" }, 
      { status: 500 }
    );
  }
}