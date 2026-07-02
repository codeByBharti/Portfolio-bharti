"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, MapPin, Terminal, Monitor } from "lucide-react";

// ─── Type Definitions ────────────────────────────────────────────────────────
interface ExperienceData {
  role: string;
  company: string;
  location: string;
  date: string;
  accentColor: string;
  borderColor: string;
  points: string[];
  tags: string[];
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

// ─── Experience Card Component ───────────────────────────────────────────────
function ExperienceCard({ exp, idx }: { exp: ExperienceData; idx: number }) {
  const revealRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(revealRef, { once: true, margin: "-40px" });

  const revealVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay: idx * 0.1,
      },
    },
  };

  const IconComponent = exp.icon;

  return (
    <div ref={revealRef} className="h-full">
      <motion.div
        variants={revealVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-full h-full"
      >
        <div
          className="glass-card p-5 sm:p-6 rounded-xl flex flex-col justify-between h-full relative overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300 group"
          style={{
            borderColor: exp.borderColor,
            background: `linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)`,
          }}
        >
          {/* Subtle static corner glow */}
          <div
            className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-[0.05] pointer-events-none z-0"
            style={{ backgroundColor: exp.accentColor }}
            aria-hidden
          />

          {/* Card Content Container */}
          <div className="space-y-3.5 relative z-10">
            {/* Top row: Icon */}
            <div className="flex items-center justify-between">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center border"
                style={{
                  borderColor: `${exp.accentColor}33`,
                  backgroundColor: `${exp.accentColor}10`,
                }}
              >
                <IconComponent className="w-4.5 h-4.5" style={{ color: exp.accentColor }} />
              </div>
            </div>

            {/* Header info */}
            <div>
              {/* Job Title with Left Border Accent */}
              <h3 
                className="text-base sm:text-lg font-bold font-heading text-white leading-snug pl-3 border-l-2"
                style={{ borderLeftColor: exp.accentColor }}
              >
                {exp.role}
              </h3>
              {/* Company + Year Subtitle */}
              <div className="text-xs text-text-muted mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 font-sans pl-3">
                <span className="font-semibold flex items-center gap-1" style={{ color: exp.accentColor }}>
                  <Briefcase className="w-3.5 h-3.5" />
                  {exp.company}
                </span>
                <span>•</span>
                <span>{exp.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {exp.location}
                </span>
              </div>
            </div>

            {/* Bullet Points */}
            <ul className="list-disc pl-4 space-y-1.5 text-xs text-text-muted font-sans font-light">
              {exp.points.map((point, pIdx) => (
                <li key={pIdx}>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack chips */}
          <div className="relative z-10 mt-4 space-y-4 pt-3 border-t border-white/5">
            <div className="flex flex-wrap gap-1.5">
              {exp.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] font-medium text-white/80 font-sans"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Experience Component ───────────────────────────────────────────────
export default function Experience() {
  const experiences: ExperienceData[] = [
    {
      role: "MERN Stack & AI Developer Intern",
      company: "Heal Bharat (CareerPlus)",
      location: "Remote",
      date: "2026",
      accentColor: "var(--color-aurora-violet)",
      borderColor: "rgba(139, 92, 246, 0.3)",
      points: [
        "Architected and deployed a production-grade full-stack Coaching Management System serving 500+ users with React.js, Node.js, Express.js, MongoDB, and CI/CD deployment on Vercel.",
        "Designed and optimized RESTful APIs with efficient middleware and MongoDB schema indexing, achieving measurable reductions in API response time under concurrent load.",
        "Integrated AI/ML models for real-time emergency pressure prediction with JWT authentication and RBAC across Admin, Teacher, Student, and Accountant roles.",
        "Wrote clean TypeScript across the full stack enforcing strict type safety and improving file download performance via backend streaming optimization."
      ],
      tags: ["React.js", "Node.js", "Express.js", "MongoDB", "TypeScript", "JWT", "Vercel"],
      icon: Terminal,
    },
    {
      role: "Frontend Developer Intern",
      company: "CODETECH IT Solutions",
      location: "Remote",
      date: "2025",
      accentColor: "var(--color-aurora-cyan)",
      borderColor: "rgba(34, 211, 238, 0.3)",
      points: [
        "Built responsive, accessible UI components using React.js, TypeScript, and Tailwind CSS following component-driven architecture and cross-browser compatibility standards.",
        "Integrated RESTful APIs for dynamic real-time data rendering and collaborated on API contract design aligning frontend with backend requirements.",
        "Contributed to agile sprint cycles through code reviews, on-time feature delivery, and iterative UI/UX improvements while maintaining high code quality."
      ],
      tags: ["React.js", "TypeScript", "Tailwind CSS", "REST APIs"],
      icon: Monitor,
    }
  ];

  return (
    <section
      id="experience"
      className="py-16 px-6 sm:px-10 bg-background border-b border-border-glow/30 relative overflow-hidden"
    >
      {/* Decorative Blobs */}
      <div
        className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full blur-[70px] opacity-[0.05] pointer-events-none translate-x-1/3"
        style={{ background: "radial-gradient(circle, var(--color-aurora-magenta) 0%, rgba(244, 63, 158, 0) 70%)" }}
        aria-hidden
      />
      <div
        className="absolute bottom-1/4 left-0 w-[350px] h-[350px] rounded-full blur-[60px] opacity-[0.05] pointer-events-none -translate-x-1/3"
        style={{ background: "radial-gradient(circle, var(--color-aurora-violet) 0%, rgba(139, 92, 246, 0) 70%)" }}
        aria-hidden
      />

      <div className="max-w-6xl mx-auto w-full space-y-10 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-start">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight relative pb-5 inline-block font-heading"
          >
            Experience
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
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
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 text-base text-text-muted max-w-xl font-light font-sans leading-relaxed"
          >
            My professional journey – building full-stack applications, optimizing APIs, and designing interactive user interfaces.
          </motion.p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiences.map((exp, idx) => (
            <ExperienceCard key={idx} exp={exp} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
