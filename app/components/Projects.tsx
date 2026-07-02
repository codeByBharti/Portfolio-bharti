"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, ArrowUpRight, FileText, GraduationCap, Coins, MessageSquare, ShoppingCart } from "lucide-react";

// ─── SVG Icons ───────────────────────────────────────────────────────────────
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// ─── Types ───────────────────────────────────────────────────────────────────
interface ProjectData {
  title: string;
  points: string[];
  tags: string[];
  liveUrl?: string;
  githubUrl: string;
  glowColor: string;
  accentColor: string;
  borderColor: string;
  isFlagship?: boolean;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

// ─── Project Card Component ──────────────────────────────────────────────────
function ProjectCard({ project, idx }: { project: ProjectData; idx: number }) {
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
        delay: idx * 0.08,
      },
    },
  };

  const IconComponent = project.icon;

  return (
    <div ref={revealRef} className="h-full">
      <motion.div
        variants={revealVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-full h-full"
      >
        <div className="glass-card p-5 sm:p-6 rounded-xl flex flex-col justify-between h-full relative overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300 group">
          
          {/* Subtle static corner glow */}
          <div
            className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-[0.05] pointer-events-none z-0"
            style={{ backgroundColor: project.glowColor }}
            aria-hidden
          />

          {/* Card Content Container */}
          <div className="space-y-3.5 relative z-10">
            {/* Top row: Icon & Flagship Badge */}
            <div className="flex items-center justify-between">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center border"
                style={{
                  borderColor: `${project.accentColor}33`,
                  backgroundColor: `${project.accentColor}10`,
                }}
              >
                <IconComponent className="w-4.5 h-4.5" style={{ color: project.accentColor }} />
              </div>

              {/* Flagship SaaS Badge - ResumeAI Only */}
              {project.isFlagship && (
                <div>
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase border border-aurora-violet/30"
                    style={{
                      backgroundColor: "rgba(139, 92, 246, 0.1)",
                      color: "var(--color-aurora-violet)",
                    }}
                  >
                    <Sparkles className="w-2.5 h-2.5" />
                    Flagship SaaS
                  </span>
                </div>
              )}
            </div>

            {/* Title with Left Border Accent */}
            <h3 
              className="text-base sm:text-lg font-bold font-heading text-white leading-snug pl-3 border-l-2 group-hover:text-white/95 transition-colors"
              style={{ borderLeftColor: project.accentColor }}
            >
              {project.title}
            </h3>

            {/* Bullet Points */}
            <ul className="list-disc pl-4 space-y-1.5 text-xs text-text-muted font-sans font-light">
              {project.points.map((point, pIdx) => (
                <li key={pIdx}>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Card Footer Container */}
          <div className="relative z-10 mt-4 space-y-4">
            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] font-medium text-white/80 font-sans"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-3 border-t border-white/5">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-text-muted hover:text-white transition-colors duration-200"
                >
                  Live Demo
                  <ArrowUpRight className="w-3 h-3 text-aurora-cyan" />
                </a>
              )}

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-muted hover:text-white transition-colors duration-200"
              >
                <GithubIcon className="w-3.5 h-3.5 text-text-muted hover:text-white" />
                GitHub
              </a>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

// ─── Projects Section Component ──────────────────────────────────────────────
export default function Projects() {
  const projects: ProjectData[] = [
    {
      title: "ResumeAI — AI-Powered Resume Generator (SaaS)",
      points: [
        "Built a full-stack AI SaaS platform that generates ATS-optimized resumes using Gemini API with robust fallback handling for uninterrupted generation even during API failures.",
        "Implemented Supabase Auth for secure session management and PostgreSQL with row-level security (RLS) for complete multi-tenant data isolation.",
        "Developed end-to-end PDF export using html2canvas + jsPDF with premium feature gating, generation limits, and upgrade flow.",
        "Deployed on Vercel with CI/CD pipeline and environment-based configuration."
      ],
      tags: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Gemini API", "Vercel"],
      liveUrl: "https://resume-ai-nu-two.vercel.app/",
      githubUrl: "https://github.com/codeByBharti/Resume-ai",
      glowColor: "var(--color-aurora-violet)",
      accentColor: "#8B5CF6",
      borderColor: "rgba(139, 92, 246, 0.3)",
      isFlagship: true,
      icon: FileText,
    },
    {
      title: "Coaching Institute Management System",
      points: [
        "Production-grade full-stack platform managing 500+ student records across attendance, fees, and academics with clean MVC architecture.",
        "Implemented multi-role JWT access control across Admin, Teacher, Student, and Accountant roles with encrypted endpoint protection.",
        "Optimized MongoDB schema indexing for reduced query latency under real-world concurrent load.",
        "Zero-downtime CI/CD deployment on Vercel serving 500+ active users reliably."
      ],
      tags: ["React.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS", "Vercel"],
      liveUrl: "https://coaching-instistute.vercel.app/login",
      githubUrl: "https://github.com/codeByBharti/coaching_instistute",
      glowColor: "var(--color-aurora-cyan)",
      accentColor: "#22D3EE",
      borderColor: "rgba(34, 211, 238, 0.3)",
      icon: GraduationCap,
    },
    {
      title: "SalaryCoach — AI-Powered Salary Negotiation Platform",
      points: [
        "Built a full-stack MERN app that generates personalized salary benchmarks and negotiation scripts using Groq's LLaMA 3.3 70B API with structured JSON-output prompt engineering.",
        "Designed a MongoDB-backed benchmarking engine using rolling-average aggregation across role, city, and experience range.",
        "Implemented a robust JSON-sanitization and multi-layer parsing pipeline to handle malformed LLM output under real-world variance.",
        "Decoupled deployment: React frontend on Vercel, Express backend on Render with rate-limiting and CI/CD."
      ],
      tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Groq API (LLaMA 3.3 70B)", "Tailwind CSS", "Vercel", "Render"],
      liveUrl: "https://salary-coach-new.vercel.app/",
      githubUrl: "https://github.com/codeByBharti/salary-coach",
      glowColor: "var(--color-aurora-magenta)",
      accentColor: "#F43F9E",
      borderColor: "rgba(244, 63, 158, 0.3)",
      icon: Coins,
    },
    {
      title: "Real-Time Chat Application",
      points: [
        "Built real-time bidirectional messaging using Socket.IO and WebSockets with sub-100ms message delivery.",
        "Room-based chat architecture with live online/offline user presence tracking and instant status updates.",
        "JWT-based authentication with secure session handling and protected routes.",
        "Responsive UI with clean chat interface, message timestamps, and smooth real-time updates."
      ],
      tags: ["React.js", "Node.js", "Socket.IO", "Express.js", "MongoDB", "JWT"],
      liveUrl: "https://chat-app3-0-evg5.vercel.app/login",
      githubUrl: "https://github.com/codeByBharti/ChatApp3.0",
      glowColor: "var(--color-aurora-violet)",
      accentColor: "#8B5CF6",
      borderColor: "rgba(139, 92, 246, 0.3)",
      icon: MessageSquare,
    },
    {
      title: "Amazon Clone — Frontend",
      points: [
        "Pixel-accurate Amazon UI clone replicating the complete homepage, product listing, and cart pages.",
        "Fully responsive design across mobile, tablet, and desktop screen sizes.",
        "Cart functionality with add/remove items and dynamic total calculation.",
        "Clean component-based architecture using React.js with reusable UI elements."
      ],
      tags: ["React.js", "HTML5", "CSS3", "JavaScript"],
      liveUrl: "https://dapper-sprite-da90a1.netlify.app/",
      githubUrl: "https://github.com/codeByBharti/amazone-clone",
      glowColor: "var(--color-aurora-cyan)",
      accentColor: "#22D3EE",
      borderColor: "rgba(34, 211, 238, 0.3)",
      icon: ShoppingCart,
    },
  ];

  return (
    <section
      id="projects"
      className="py-16 px-6 sm:px-10 bg-background border-b border-border-glow/30 relative overflow-hidden"
    >
      {/* Decorative Blobs */}
      <div
        className="absolute top-1/4 left-0 w-[450px] h-[450px] rounded-full blur-[65px] opacity-[0.05] pointer-events-none -translate-x-1/3"
        style={{ background: "radial-gradient(circle, var(--color-aurora-cyan) 0%, rgba(34, 211, 238, 0) 70%)" }}
        aria-hidden
      />
      <div
        className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full blur-[55px] opacity-[0.05] pointer-events-none translate-x-1/3"
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
            Featured Projects
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
            A showcase of selected SaaS applications, enterprise systems, and AI-powered platforms built from scratch.
          </motion.p>
        </div>

        {/* Project Card Grid (2 columns on desktop, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
