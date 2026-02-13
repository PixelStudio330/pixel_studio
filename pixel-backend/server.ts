import "dotenv/config";
import express from "express";
import cors from "cors";
import { config } from "./config/config.ts";
import nodemailer from "nodemailer";
import authRoutes from "./routes/authRoutes.ts";
import mascotRoutes from "./routes/mascotRoutes.ts";


const app = express();

app.use(cors());
app.use(express.json());

// ✅ Auth routes
app.use("/auth", authRoutes);

// 🍄 Pixy mascot (Gemini)
app.use("/mascot", mascotRoutes);


// 💌 Email route
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return res.status(400).json({ error: "All fields are required!" });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.user,
        pass: config.email.pass,
      },
    });

    await transporter.sendMail({
      from: `"Pixel Studio" <${config.email.user}>`,
      to: config.email.user,
      subject: `💌 New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <h3>New Inquiry from ${name}</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    console.log(`📬 Message sent from ${email}`);
    res.json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    console.error("❌ Email sending error:", err);
    res.status(500).json({ error: "Failed to send email." });
  }
});

// 🚀 Start server
app.listen(config.port, () => console.log(`Server running on port ${config.port}`));
