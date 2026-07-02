import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import BackgroundAurora from "./components/BackgroundAurora";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import { MotionConfig } from "framer-motion";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bharti Ambule | Full Stack Developer",
  description: "Professional portfolio of Bharti Ambule, MERN Stack & AI Developer specializing in Next.js, React, Node.js, and MongoDB.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-text-primary relative selection:bg-aurora-violet/30 selection:text-white">
        
        
        {/* Loading Screen Overlay (max 1.5s) */}
        <LoadingScreen />
        
        {/* Floating Glass Navbar */}
        <Navbar />
        
        {/* Drifting Aurora Gradient Blobs */}
        <BackgroundAurora />

        {/* MotionConfig to respect prefers-reduced-motion */}
        <MotionConfig reducedMotion="user">
          {/* Lenis Smooth Scroll Wrapper */}
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </MotionConfig>
      </body>
    </html>
  );
}
