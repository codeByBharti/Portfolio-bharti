"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { Trophy, Award, BookOpen, Code, Cloud, Shield, Cpu, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface AchievementData {
  title: string;
  subtitle: string;
  description: string;
  color: string;
  borderColor: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  delay: number;
}

interface CertificationData {
  name: string;
  issuer: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

// ─── Achievements Component ──────────────────────────────────────────────────
export default function Achievements() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollAmount = direction === "left" ? -280 : 280;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const achievements: AchievementData[] = [
    {
      title: "1st Place",
      subtitle: "Mindspark Project Expo",
      description: "Awarded top honors at the national Mindspark Project Expo. Recognized for building and presenting high-performance full-stack architectures integrated with AI services.",
      color: "var(--color-aurora-magenta)",
      borderColor: "rgba(244, 63, 158, 0.3)",
      icon: Trophy,
      delay: 0,
    },
    {
      title: "Selected",
      subtitle: "Smart India Hackathon 2025",
      description: "Cleared the highly competitive college-level internal evaluation round for Smart India Hackathon 2025. Devised MERN full-stack solutions mapping public sector needs.",
      color: "var(--color-aurora-cyan)",
      borderColor: "rgba(34, 211, 238, 0.3)",
      icon: Award,
      delay: 2,
    },
    {
      title: "Research Published",
      subtitle: "IEEE AIC 2025 Conference",
      description: "Co-authored and published a peer-reviewed research paper detailing machine learning models for real-time emergency pressure predictions.",
      color: "var(--color-aurora-violet)",
      borderColor: "rgba(139, 92, 246, 0.3)",
      icon: BookOpen,
      delay: 4,
    },
  ];

  const certifications: CertificationData[] = [
    { name: "MERN Stack Internship", issuer: "Heal Bharat (2026)", icon: Code },
    { name: "AWS Solutions Architecture", issuer: "Forage", icon: Cloud },
    { name: "Cybersecurity", issuer: "Deloitte (Forage)", icon: Shield },
    { name: "AI Agents", issuer: "Google (Kaggle)", icon: Cpu },
    { name: "Hackathon Certification", issuer: "Kaggle", icon: Award },
  ];

  return (
    <>
      <style>{`
        @keyframes sheen-sweep {
          0% {
            left: -150%;
          }
          50% {
            left: 250%;
          }
          100% {
            left: 250%;
          }
        }
        .sheen-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: -150%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.04) 20%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0.04) 80%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-25deg);
          animation: sheen-sweep 7s ease-in-out infinite;
          animation-delay: var(--sheen-delay, 0s);
          pointer-events: none;
          z-index: 5;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }

        @keyframes border-cycle {
          0% {
            border-color: rgba(139, 92, 246, 0.25); /* violet */
          }
          33% {
            border-color: rgba(244, 63, 158, 0.25); /* magenta */
          }
          66% {
            border-color: rgba(34, 211, 238, 0.25); /* cyan */
          }
          100% {
            border-color: rgba(139, 92, 246, 0.25);
          }
        }
        .cert-pill {
          animation: border-cycle 6s linear infinite;
          border-width: 1px;
          border-style: solid;
        }
      `}</style>

      <section
        id="achievements"
        className="py-16 px-6 sm:px-10 bg-background border-b border-border-glow/30 relative overflow-hidden"
      >
        {/* Decorative Blobs */}
        <div
          className="absolute top-1/4 right-0 w-[380px] h-[380px] rounded-full blur-[60px] opacity-[0.04] pointer-events-none translate-x-1/2"
          style={{ background: "radial-gradient(circle, var(--color-aurora-violet) 0%, rgba(139, 92, 246, 0) 70%)" }}
          aria-hidden
        />
        <div
          className="absolute bottom-1/4 left-0 w-[420px] h-[420px] rounded-full blur-[60px] opacity-[0.04] pointer-events-none -translate-x-1/2"
          style={{ background: "radial-gradient(circle, var(--color-aurora-magenta) 0%, rgba(244, 63, 158, 0) 70%)" }}
          aria-hidden
        />

        <div className="max-w-6xl mx-auto w-full space-y-10 relative z-10">
          
          {/* Section Heading */}
          <div className="flex flex-col items-start">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight relative pb-5 inline-block font-heading"
            >
              Achievements &amp; Certifications
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
                className="absolute bottom-0 left-0 h-[3px] w-full origin-left rounded-full"
                style={{
                  background:
                    "linear-gradient(to right, var(--color-aurora-violet), var(--color-aurora-magenta), var(--color-aurora-cyan))",
                }}
              />
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              className="mt-5 text-base text-text-muted max-w-xl font-light font-sans leading-relaxed"
            >
              Milestones, published scientific papers, and honors earned at national hackathons and expositions.
            </motion.p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((item, idx) => {
              const Icon = item.icon;

              return (
                <Reveal key={idx} delay={idx * 0.15}>
                  <div
                    className="glass-card sheen-card p-8 sm:p-10 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[340px]"
                    style={{
                      borderColor: item.borderColor,
                      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)",
                      "--sheen-delay": `${item.delay}s`,
                    } as React.CSSProperties}
                  >
                    {/* Glow Blob Inside Card — static */}
                    <div
                      className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-3xl opacity-[0.06] pointer-events-none"
                      style={{ backgroundColor: item.color }}
                      aria-hidden
                    />

                    {/* Trophy/Award Glowing Icon Container */}
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-6 relative border"
                      style={{
                        borderColor: `${item.color}44`,
                        backgroundColor: `${item.color}10`,
                        boxShadow: `0 0 15px ${item.color}15`,
                      }}
                    >
                      {/* Pulsing ring */}
                      <div
                        className="absolute inset-0 rounded-full animate-ping opacity-15 pointer-events-none"
                        style={{ backgroundColor: item.color }}
                      />
                      <Icon className="w-7 h-7" style={{ color: item.color }} />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                      {item.title}
                    </h3>

                    {/* Subtitle */}
                    <h4
                      className="text-xs font-bold uppercase tracking-[0.16em] font-sans mt-2"
                      style={{ color: item.color }}
                    >
                      {item.subtitle}
                    </h4>

                    {/* Description */}
                    <p className="text-sm text-text-muted mt-4 font-sans font-light leading-relaxed max-w-[280px]">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Certifications Subheading */}
          <div className="pt-10 text-center relative z-10">
            <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-text-muted/80 font-sans">
              Professional Certifications
            </h3>
          </div>

          {/* Scrollable Slider with Arrow Navigation */}
          <div className="flex items-center gap-4 mt-4 relative z-10 w-full">
            {/* Left navigation arrow */}
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full glass-circle shrink-0 flex items-center justify-center border border-white/10 text-text-muted hover:text-white transition-all duration-300 hover:glow-aurora focus:outline-none cursor-pointer"
              aria-label="Previous Certification"
            >
              <ChevronLeft className="w-5 h-5 text-aurora-cyan" />
            </button>

            {/* Scrollable window */}
            <div
              ref={scrollRef}
              className="flex-1 flex gap-5 overflow-x-auto scroll-smooth py-4 no-scrollbar select-none relative"
            >
              {certifications.map((cert, idx) => {
                const CertIcon = cert.icon;
                return (
                  <div
                    key={idx}
                    className="cert-pill flex items-center gap-3 px-6 py-3.5 rounded-full shrink-0 bg-[#13121A]/40 backdrop-blur-md"
                    style={{
                      animationDelay: `${idx * 0.8}s`,
                    }}
                  >
                    <CertIcon className="w-4 h-4 text-text-primary/80" />
                    <div className="flex flex-col text-left min-w-[150px]">
                      <span className="text-xs font-bold text-white font-sans leading-tight">
                        {cert.name}
                      </span>
                      <span className="text-[10px] text-text-muted font-sans font-medium mt-0.5">
                        {cert.issuer}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right navigation arrow */}
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full glass-circle shrink-0 flex items-center justify-center border border-white/10 text-text-muted hover:text-white transition-all duration-300 hover:glow-aurora focus:outline-none cursor-pointer"
              aria-label="Next Certification"
            >
              <ChevronRight className="w-5 h-5 text-aurora-cyan" />
            </button>
          </div>

        </div>
      </section>
    </>
  );
}
