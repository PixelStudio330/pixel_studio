import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Pixy from "./components/Pixy"; 
import { Providers } from "./components/Providers"; // Import the provider wrapper

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
        {/* Wrap everything in Providers so Auth works everywhere! */}
        <Providers>
          <Header />
          <main className="pt-20">{children}</main>
          <Footer />
          <Pixy />
        </Providers>
      </body>
    </html>
  );
}