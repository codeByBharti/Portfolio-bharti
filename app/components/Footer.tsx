"use client";

import { ArrowUp, Mail } from "lucide-react";

// ─── SVG Icons ───────────────────────────────────────────────────────────────
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4.5 h-4.5"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4.5 h-4.5"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// ─── Footer Component ────────────────────────────────────────────────────────
export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="py-16 bg-[#07070a] border-t border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div
        className="absolute bottom-0 left-1/2 w-[300px] h-[300px] rounded-full blur-[50px] opacity-[0.03] pointer-events-none -translate-x-1/2 translate-y-1/2"
        style={{ background: "radial-gradient(circle, var(--color-aurora-cyan) 0%, rgba(34, 211, 238, 0) 70%)" }}
        aria-hidden
      />

      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 text-center md:text-left">
        
        {/* Left Column: Name, Tagline & Copyright */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold font-heading text-white tracking-wide">
            Bharti Ambule
          </h3>
          <p className="text-xs text-text-muted max-w-sm leading-relaxed">
            Full Stack &amp; MERN Developer. Designing highly scalable web applications, optimizing databases, and integrating smart AI models.
          </p>
          <p className="text-[11px] text-text-muted/50 pt-2 font-sans font-medium">
            &copy; {new Date().getFullYear()} Bharti Ambule. All rights reserved.
          </p>
        </div>

        {/* Center: Repeated Small Social Icons */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.15em] font-sans">
            Connect
          </span>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/bharti-ambule"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/3 border border-white/10 hover:border-aurora-violet text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:glow-aurora cursor-pointer"
              style={{ boxShadow: "0 0 10px rgba(139, 92, 246, 0.05)" }}
              aria-label="GitHub Profile"
            >
              <GithubIcon />
            </a>
            <a
              href="https://linkedin.com/in/bharti-ambule"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/3 border border-white/10 hover:border-aurora-cyan text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:glow-aurora cursor-pointer"
              style={{ boxShadow: "0 0 10px rgba(34, 211, 238, 0.05)" }}
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon />
            </a>
            <a
              href="mailto:bhartiambule156@gmail.com"
              className="w-10 h-10 rounded-xl bg-white/3 border border-white/10 hover:border-aurora-magenta text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:glow-aurora cursor-pointer"
              style={{ boxShadow: "0 0 10px rgba(244, 63, 158, 0.05)" }}
              aria-label="Email Me"
            >
              <Mail className="w-4.5 h-4.5" />
            </a>
          </div>
        </div>

        {/* Right Column: Scroll to Top Button */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.15em] font-sans">
            Back to Top
          </span>
          <button
            onClick={handleScrollToTop}
            className="w-11 h-11 rounded-xl bg-white/3 border border-white/10 hover:border-aurora-cyan text-white flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer shadow-[0_0_12px_rgba(34,211,238,0.15)] hover:glow-aurora"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 text-aurora-cyan" />
          </button>
        </div>

      </div>
    </footer>
  );
}
