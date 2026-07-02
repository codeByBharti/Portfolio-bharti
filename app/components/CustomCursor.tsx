"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring configuration for the lag effect
  const springConfig = { damping: 30, stiffness: 300, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Smooth spring configuration for the background glow (slower lag for fluid feel)
  const glowSpringConfig = { damping: 45, stiffness: 140, mass: 1.2 };
  const glowXSpring = useSpring(cursorX, glowSpringConfig);
  const glowYSpring = useSpring(cursorY, glowSpringConfig);

  useEffect(() => {
    // Only enable cursor on desktop devices with mouse/pointer capabilities
    if (typeof window !== "undefined") {
      setIsDesktop(window.matchMedia("(pointer: fine)").matches);
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("clickable") ||
        target.getAttribute("role") === "button"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", () => setIsVisible(true));

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isDesktop || !isVisible) return null;

  return (
    <>
      {/* Global Background Spotlight (follows cursor at low opacity behind content) */}
      <motion.div
        className="fixed top-0 left-0 w-[450px] h-[450px] rounded-full pointer-events-none z-[1] -translate-x-1/2 -translate-y-1/2 opacity-25 filter blur-[90px]"
        style={{
          x: glowXSpring,
          y: glowYSpring,
          background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(244,63,158,0.1) 40%, rgba(34,211,238,0.05) 75%, transparent 100%)",
        }}
      />

      {/* Main Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-50 mix-blend-screen -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          background: "linear-gradient(135deg, var(--color-aurora-violet), var(--color-aurora-magenta), var(--color-aurora-cyan))",
          boxShadow: "0 0 10px var(--color-aurora-violet), 0 0 20px rgba(244, 63, 158, 0.2)",
        }}
      />
    </>
  );
}
