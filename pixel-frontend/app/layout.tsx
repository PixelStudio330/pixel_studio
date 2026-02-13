import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Pixy from "./components/Pixy"; // client component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pixel Studio",
  description: "Modern web experiences built with style and speed 💫",
};

// RootLayout must be a **Server Component** (do NOT put 'use client' here)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FFF8F3] text-[#442D1C]`}
      >
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
        {/* Client Component Pixy is fine here */}
        <Pixy />
      </body>
    </html>
  );
}
