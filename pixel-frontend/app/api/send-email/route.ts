import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    // ✅ Since frontend uses FormData, we use req.formData()
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    // const image = formData.get("image"); // For future use if you want to attach files!

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required!" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Pixel Studio" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `💌 New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
          <h3 style="color: #8A6674;">New Inquiry from ${name}</h3>
          <p><strong>Email:</strong> ${email}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Email sent successfully!" });

  } catch (err) {
    console.error("❌ Email sending error:", err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}