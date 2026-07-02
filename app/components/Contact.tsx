"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import Reveal from "./Reveal";
import { Mail, Phone, MapPin, Send, Loader2, Check } from "lucide-react";

// ─── Magnetic Hover Component ───────────────────────────────────────────────
function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.15 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (ref.current) {
      const { width, height, left, top } = ref.current.getBoundingClientRect();
      const targetX = e.clientX - (left + width / 2);
      const targetY = e.clientY - (top + height / 2);
      x.set(targetX * 0.35);
      y.set(targetY * 0.35);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}

// ─── Contact Component ───────────────────────────────────────────────────────
export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setStatus("loading");
    
    // Simulate API Submission
    setTimeout(() => {
      setStatus("success");
      setFormState({ name: "", email: "", message: "" });
      
      // Reset status to idle after a delay
      setTimeout(() => {
        setStatus("idle");
      }, 3500);
    }, 1800);
  };

  return (
    <section
      id="contact"
      className="py-16 px-6 sm:px-10 bg-background border-b border-border-glow/30 relative overflow-hidden"
    >
      {/* Decorative Aurora Blobs */}
      <div
        className="absolute top-1/4 left-0 w-[420px] h-[420px] rounded-full blur-[65px] opacity-[0.05] pointer-events-none -translate-x-1/2"
        style={{ background: "radial-gradient(circle, var(--color-aurora-cyan) 0%, rgba(34, 211, 238, 0) 70%)" }}
        aria-hidden
      />
      <div
        className="absolute bottom-1/4 right-0 w-[380px] h-[380px] rounded-full blur-[55px] opacity-[0.05] pointer-events-none translate-x-1/2"
        style={{ background: "radial-gradient(circle, var(--color-aurora-magenta) 0%, rgba(244, 63, 158, 0) 70%)" }}
        aria-hidden
      />

      <div className="max-w-6xl mx-auto w-full space-y-10 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-start text-left">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight relative pb-5 inline-block font-heading"
          >
            Let's Build Something <span className="text-gradient-animate">Great</span>
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
            Open to full-stack and MERN developer roles, freelance projects, and collaborations.
          </motion.p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Column 1: Glassmorphism Contact Form */}
          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="glass-card p-8 sm:p-10 rounded-2xl border border-white/5 flex flex-col gap-6 relative overflow-hidden group hover:glow-aurora transition-all duration-500"
              style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)",
              }}
            >
              {/* Inner Glow Blob */}
              <div
                className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-3xl opacity-5 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                style={{ backgroundColor: "var(--color-aurora-cyan)" }}
                aria-hidden
              />

              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="name" className="text-xs font-bold text-text-muted uppercase tracking-wider font-sans">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  disabled={status === "loading" || status === "success"}
                  placeholder="Enter your name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="bg-white/3 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-text-muted/40 focus:outline-none focus:border-transparent transition-all duration-300 focus:ring-1 focus:ring-aurora-cyan focus:shadow-[0_0_15px_rgba(34,211,238,0.25)] font-sans"
                />
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="email" className="text-xs font-bold text-text-muted uppercase tracking-wider font-sans">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  disabled={status === "loading" || status === "success"}
                  placeholder="name@example.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="bg-white/3 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-text-muted/40 focus:outline-none focus:border-transparent transition-all duration-300 focus:ring-1 focus:ring-aurora-cyan focus:shadow-[0_0_15px_rgba(34,211,238,0.25)] font-sans"
                />
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="message" className="text-xs font-bold text-text-muted uppercase tracking-wider font-sans">
                  Your Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  disabled={status === "loading" || status === "success"}
                  placeholder="Briefly detail your project or role requirements..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="bg-white/3 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-text-muted/40 focus:outline-none focus:border-transparent transition-all duration-300 focus:ring-1 focus:ring-aurora-cyan focus:shadow-[0_0_15px_rgba(34,211,238,0.25)] resize-none font-sans"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-300 active:scale-[0.98] select-none
                  ${
                    status === "success"
                      ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                      : "bg-gradient-to-r from-aurora-violet via-aurora-magenta to-aurora-cyan hover:scale-[1.015] hover:shadow-[0_0_20px_rgba(244,63,158,0.35)] cursor-pointer"
                  }`}
              >
                {status === "idle" && (
                  <>
                    Send Message
                    <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </>
                )}
                {status === "loading" && (
                  <>
                    Sending...
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                )}
                {status === "success" && (
                  <>
                    Message Sent!
                    <Check className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </Reveal>

          {/* Column 2: Contact Info & Social Links */}
          <div className="space-y-8">
            
            {/* Contact Details Cards */}
            <div className="space-y-4">
              
              {/* Email */}
              <Reveal delay={0.15}>
                <a
                  href="mailto:bhartiambule156@gmail.com"
                  className="glass-card p-5 rounded-2xl border border-white/5 flex items-center gap-4 hover:scale-[1.015] hover:glow-aurora transition-all duration-300 relative overflow-hidden group/card block"
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.01) 100%)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center border border-aurora-violet/20"
                    style={{ backgroundColor: "rgba(139, 92, 246, 0.08)" }}
                  >
                    <Mail className="w-5 h-5 text-aurora-violet" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider font-sans">
                      Email Address
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-white font-sans mt-0.5 break-all">
                      bhartiambule156@gmail.com
                    </span>
                  </div>
                </a>
              </Reveal>

              {/* Phone */}
              <Reveal delay={0.25}>
                <a
                  href="tel:+918149741148"
                  className="glass-card p-5 rounded-2xl border border-white/5 flex items-center gap-4 hover:scale-[1.015] hover:glow-aurora transition-all duration-300 relative overflow-hidden group/card block"
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.01) 100%)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center border border-aurora-magenta/20"
                    style={{ backgroundColor: "rgba(244, 63, 158, 0.08)" }}
                  >
                    <Phone className="w-5 h-5 text-aurora-magenta" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider font-sans">
                      Call / WhatsApp
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-white font-sans mt-0.5">
                      +91 8149741148
                    </span>
                  </div>
                </a>
              </Reveal>

              {/* Location */}
              <Reveal delay={0.35}>
                <div
                  className="glass-card p-5 rounded-2xl border border-white/5 flex items-center gap-4 hover:scale-[1.015] hover:glow-aurora transition-all duration-300 relative overflow-hidden group/card"
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.01) 100%)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center border border-aurora-cyan/20"
                    style={{ backgroundColor: "rgba(34, 211, 238, 0.08)" }}
                  >
                    <MapPin className="w-5 h-5 text-aurora-cyan" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider font-sans">
                      Location
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-white font-sans mt-0.5">
                      Pune, Maharashtra, India
                    </span>
                  </div>
                </div>
              </Reveal>

            </div>

            {/* No socials here - removed as requested */}

          </div>

        </div>

      </div>
    </section>
  );
}
