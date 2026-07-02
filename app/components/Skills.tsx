"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";

const SkillsScene3D = dynamic(() => import("./SkillsScene3D"), { ssr: false });

// ─── Data ────────────────────────────────────────────────────────────────────

const categories = [
  {
    id: "languages",
    label: "Languages",
    accent: "from-aurora-magenta/20 to-aurora-violet/10",
    accentBorder: "rgba(244, 63, 158, 0.3)",
    accentColor: "#F43F9E",
    skills: ["JavaScript (ES6+)", "TypeScript", "Python", "C++", "OOP (Object-Oriented Programming)"],
  },
  {
    id: "frontend",
    label: "Frontend",
    accent: "from-aurora-violet/20 to-aurora-cyan/10",
    accentBorder: "rgba(139, 92, 246, 0.3)",
    accentColor: "#8B5CF6",
    skills: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    id: "backend",
    label: "Backend",
    accent: "from-aurora-cyan/20 to-aurora-violet/10",
    accentBorder: "rgba(34, 211, 238, 0.3)",
    accentColor: "#22D3EE",
    skills: ["Node.js", "Express.js", "REST APIs", "Socket.IO", "WebSockets"],
  },
  {
    id: "databases",
    label: "Databases",
    accent: "from-aurora-magenta/15 to-aurora-cyan/10",
    accentBorder: "rgba(244, 63, 158, 0.25)",
    accentColor: "#F43F9E",
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Supabase"],
  },
  {
    id: "auth-ai",
    label: "Auth & AI",
    accent: "from-aurora-violet/20 to-aurora-magenta/10",
    accentBorder: "rgba(139, 92, 246, 0.28)",
    accentColor: "#8B5CF6",
    skills: ["JWT", "OAuth", "RBAC", "OpenAI API", "Gemini API", "Groq API (LLaMA 3.3)", "Prompt Engineering"],
  },
  {
    id: "tools",
    label: "Tools & DevOps",
    accent: "from-aurora-cyan/15 to-aurora-magenta/10",
    accentBorder: "rgba(34, 211, 238, 0.25)",
    accentColor: "#22D3EE",
    skills: ["Git", "GitHub", "Postman", "Vercel", "Render", "CI/CD"],
  },
];

// ─── Skill Pill ───────────────────────────────────────────────────────────────

function SkillPill({
  label,
  delay,
}: {
  label: string;
  delay: number;
  accentColor: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 12 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className="skill-pill"
    >
      <span
        className="block px-4 py-2 rounded-xl text-sm font-bold font-sans text-text-primary
          border border-white/15 backdrop-blur-sm"
        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)" }}
      >
        {label}
      </span>
    </motion.div>
  );
}

// ─── Category Panel ───────────────────────────────────────────────────────────

function CategoryPanel({
  category,
  index,
}: {
  category: (typeof categories)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.75, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card p-6 sm:p-7 flex flex-col gap-5 relative overflow-hidden h-full"
      style={{ borderColor: category.accentBorder }}
    >
      {/* Static inner corner glow */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: category.accentColor }}
        aria-hidden
      />

      {/* Category label */}
      <div className="flex items-center gap-2.5">
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0 ring-2 ring-white/10"
          style={{ background: category.accentColor }}
        />
        <h3
          className="text-xs font-extrabold uppercase tracking-[0.18em] font-sans"
          style={{ color: category.accentColor }}
        >
          {category.label}
        </h3>
      </div>

      {/* Pills */}
      <div className="flex flex-wrap gap-2.5">
        {category.skills.map((skill, i) => (
          <SkillPill
            key={skill}
            label={skill}
            delay={index * 0.08 + i * 0.05}
            accentColor={category.accentColor}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function Skills() {
  return (
    <>
      <style>{`
        @keyframes skill-bob {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-5px); }
        }
        .skill-pill {
          animation: skill-bob 4s ease-in-out infinite;
          animation-delay: var(--bob-delay, 0s);
        }
        .skill-pill:hover {
          animation-play-state: paused;
        }
      `}</style>

      <section
        id="skills"
        className="py-16 px-6 sm:px-10 bg-background border-b border-border-glow/30 relative overflow-hidden"
      >
        {/* Decorative blobs */}
        <div
          className="absolute top-1/4 left-0 w-[420px] h-[420px] rounded-full blur-[60px] opacity-[0.06] pointer-events-none -translate-x-1/2"
          style={{ background: "radial-gradient(circle, var(--color-aurora-violet) 0%, rgba(139, 92, 246, 0) 70%)" }}
          aria-hidden
        />
        <div
          className="absolute bottom-0 right-0 w-[360px] h-[360px] rounded-full blur-[50px] opacity-[0.06] pointer-events-none translate-x-1/3"
          style={{ background: "radial-gradient(circle, var(--color-aurora-cyan) 0%, rgba(34, 211, 238, 0) 70%)" }}
          aria-hidden
        />

        {/* Orbiting 3D background visual */}
        <SkillsScene3D />

        <div className="max-w-6xl mx-auto w-full space-y-10 relative z-10">

          {/* Heading */}
          <div className="flex flex-col items-start">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight relative pb-5 inline-block font-heading"
            >
              Tech Stack
              {/* Animated aurora underline */}
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
              A curated toolkit I reach for — from architecting backends to shipping polished UIs and integrating LLMs.
            </motion.p>
          </div>

          {/* Asymmetric grid
              Row 1: Languages (1 col) | Frontend (2 cols) | Backend (2 cols)
              Row 2: Databases (2 cols) | Auth & AI (3 cols)
              Row 3: Tools (5 cols full)
          */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-5">

            {/* Languages — 1 col */}
            <div className="md:col-span-1">
              <CategoryPanel category={categories[0]} index={0} />
            </div>

            {/* Frontend — 2 cols (bigger) */}
            <div className="md:col-span-2">
              <CategoryPanel category={categories[1]} index={1} />
            </div>

            {/* Backend — 2 cols (bigger) */}
            <div className="md:col-span-2">
              <CategoryPanel category={categories[2]} index={2} />
            </div>

            {/* Databases — 2 cols */}
            <div className="md:col-span-2">
              <CategoryPanel category={categories[3]} index={3} />
            </div>

            {/* Auth & AI — 3 cols */}
            <div className="md:col-span-3">
              <CategoryPanel category={categories[4]} index={4} />
            </div>

            {/* Tools — full width */}
            <div className="md:col-span-5">
              <CategoryPanel category={categories[5]} index={5} />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
