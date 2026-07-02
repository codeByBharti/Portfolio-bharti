"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface NavItem {
  label: string;
  href: string;
}

// ─── Navbar Component ────────────────────────────────────────────────────────
export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  const navItems: NavItem[] = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Achievements", href: "#achievements" },
    { label: "Contact", href: "#contact" },
  ];

  // 1. Detect scroll past Hero (approx 100vh) to show/hide floating navbar
  useEffect(() => {
    const handleScroll = () => {
      const heroThreshold = window.innerHeight * 0.85;
      if (window.scrollY > heroThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    // Check initially
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Scroll-spy to track screen position of sections and update active section
  useEffect(() => {
    const handleScrollSpy = () => {
      const sectionIds = ["home", "about", "skills", "experience", "projects", "achievements", "contact"];
      
      let currentSection = "#home";
      let minDistance = Infinity;

      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Offset of 120px to account for the sticky header
          const distance = Math.abs(rect.top - 120);
          
          // If the section is currently visible inside the viewport bounds
          if (rect.top <= 220 && rect.bottom >= 120) {
            if (distance < minDistance) {
              minDistance = distance;
              currentSection = `#${id}`;
            }
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScrollSpy);
    // Trigger scroll-spy immediately on mount
    handleScrollSpy();

    return () => {
      window.removeEventListener("scroll", handleScrollSpy);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // height of navbar + gap spacing
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(href);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -100, x: "-50%", opacity: 0 }}
          animate={{ y: 0, x: "-50%", opacity: 1 }}
          exit={{ y: -100, x: "-50%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-6 left-1/2 w-[90%] max-w-4xl h-16 rounded-2xl glass-card z-[100] flex items-center justify-between px-6 sm:px-8 border border-white/8 backdrop-blur-lg select-none"
          style={{
            backgroundColor: "rgba(19, 18, 26, 0.45)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 15px rgba(139, 92, 246, 0.05)",
          }}
        >
          {/* Logo Brand Initials */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="text-lg font-bold font-heading text-gradient-animate tracking-wider cursor-pointer"
          >
            BA
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="relative text-xs font-semibold tracking-widest uppercase transition-colors duration-300 font-sans hover:text-white py-1.5 cursor-pointer"
                  style={{
                    color: isActive ? "#ffffff" : "var(--color-text-muted)",
                  }}
                >
                  {item.label}
                  
                  {/* Sliding Underline Indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                      style={{
                        background:
                          "linear-gradient(to right, var(--color-aurora-violet), var(--color-aurora-magenta), var(--color-aurora-cyan))",
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Resume Download Action Button */}
          <div>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl border border-aurora-cyan/35 text-white font-bold text-xs hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-[0_0_12px_rgba(34,211,238,0.12)] hover:glow-aurora bg-transparent font-sans"
            >
              Resume
            </a>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
