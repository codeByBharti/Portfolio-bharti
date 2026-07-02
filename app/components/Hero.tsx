"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Mail, Phone, MapPin, ArrowRight, ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";

// Custom inline SVG icons for GitHub and LinkedIn to bypass lucide-react build errors
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
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
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Dynamically import Scene3D with SSR disabled to prevent hydration mismatch errors
const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

// Magnetic Hover Component
function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
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

export default function Hero() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.matchMedia("(pointer: fine)").matches);
  }, []);

  const line1Words = ["Building", "Full-Stack"];
  const line2Words = ["AI-Powered", "Products."];

  // Motion variants for entrance animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const headlineContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com",
      icon: GithubIcon,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com",
      icon: LinkedinIcon,
    },
    {
      name: "Email",
      url: "mailto:bhartiambule156@gmail.com",
      icon: Mail,
      tooltip: "bhartiambule156@gmail.com",
    },
    {
      name: "Phone",
      url: "tel:+918149741148",
      icon: Phone,
      tooltip: "+91 8149741148",
    },
  ];

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center p-8 bg-background relative overflow-hidden">
      
      {/* 2-Column Responsive Layout Wrapper */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center z-10 relative">
        
        {/* Left Side: Copy and Links */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-xl text-center lg:text-left space-y-8 flex flex-col items-center lg:items-start order-2 lg:order-1 relative z-10 mx-auto lg:mx-0"
        >
          {/* 1. Pill Badge Top */}
          <motion.div variants={badgeVariants} className="mb-2">
            <div className="aurora-border rounded-full inline-block">
              <div className="px-5 py-2 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center text-xs font-bold uppercase tracking-wider">
                <span className="relative flex h-2.5 w-2.5 mr-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="bg-gradient-to-r from-aurora-violet via-aurora-magenta to-aurora-cyan bg-clip-text text-transparent">
                  Available for Opportunities
                </span>
              </div>
            </div>
          </motion.div>

          {/* Person's Identity & Location */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-text-primary uppercase font-heading">
              Bharti Ambule
            </h2>
            <p className="text-sm sm:text-base font-semibold tracking-wider text-aurora-cyan uppercase font-sans">
              Full Stack Developer &bull; MERN Stack Developer &bull; Software Developer
            </p>
            <p className="text-xs sm:text-sm text-text-muted flex items-center justify-center lg:justify-start gap-1.5 opacity-90 font-light font-sans">
              <MapPin className="w-4 h-4 text-aurora-magenta" /> Pune, Maharashtra, India
            </p>
          </motion.div>

          {/* 2. Headline with stagger-fade-up */}
          <motion.h1
            variants={headlineContainerVariants}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-text-primary tracking-tight leading-[1.08] font-heading flex flex-col items-center lg:items-start w-full"
          >
            {/* Line 1 */}
            <span className="flex flex-wrap justify-center lg:justify-start w-full py-1">
              {line1Words.map((word, idx) => (
                <motion.span
                  key={idx}
                  variants={wordVariants}
                  className="inline-block mr-3 sm:mr-4 text-white font-extrabold"
                >
                  {word}
                </motion.span>
              ))}
            </span>

            {/* Line 2 */}
            <span className="flex flex-wrap justify-center lg:justify-start w-full py-1">
              {line2Words.map((word, idx) => {
                const isGradient = word.includes("AI-Powered");
                return (
                  <motion.span
                    key={idx}
                    variants={wordVariants}
                    className={`inline-block mr-3 sm:mr-4 font-extrabold ${
                      isGradient ? "text-gradient-animate" : "text-white"
                    }`}
                  >
                    {word}
                  </motion.span>
                );
              })}
            </span>
          </motion.h1>

          {/* 3. Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-text-muted max-w-lg mx-auto lg:mx-0 font-light leading-relaxed font-sans"
          >
            MERN Stack &amp; AI Developer crafting scalable SaaS platforms, real-time systems, and AI-integrated web apps.
          </motion.p>

          {/* 4. Action Buttons (Two CTAs) */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 justify-center lg:justify-start items-center pt-2 w-full"
          >
            {/* CTA 1: View Projects */}
            <a
              href="#projects"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-aurora-violet via-aurora-magenta to-aurora-cyan hover:brightness-110 text-white font-semibold transition-all duration-300 shadow-lg glow-aurora-subtle hover:scale-[1.03] active:scale-[0.98] flex items-center gap-2 group font-sans"
            >
              View Projects
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            {/* CTA 2: Download Resume */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="aurora-border rounded-full p-[1px] inline-block transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] font-sans"
            >
              <span className="px-8 py-3.5 rounded-full bg-transparent text-text-primary font-semibold flex items-center justify-center transition-colors duration-300 hover:bg-white/5">
                Download Resume
              </span>
            </a>
          </motion.div>

          {/* 5. Social Icons Row */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center lg:justify-start gap-5 pt-4 w-full"
          >
            {socialLinks.map((social) => {
              const Icon = social.icon;
              const isEmailOrPhone = social.name === "Email" || social.name === "Phone";
              return (
                <Magnetic key={social.name}>
                  <a
                    href={social.url}
                    target={isEmailOrPhone ? undefined : "_blank"}
                    rel={isEmailOrPhone ? undefined : "noopener noreferrer"}
                    className="relative group w-11 h-11 glass-circle hover:glow-aurora flex items-center justify-center text-text-muted hover:text-white transition-all duration-300"
                    aria-label={social.name}
                    title={isEmailOrPhone ? social.tooltip : undefined}
                  >
                    <Icon className="w-4.5 h-4.5" />
                    
                    {"tooltip" in social && social.tooltip && !isEmailOrPhone && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3.5 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-out pointer-events-none z-50 origin-bottom">
                        <div className="aurora-border rounded-full inline-block">
                          <div className="px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-md text-[11px] font-medium text-white/90 whitespace-nowrap">
                            {social.tooltip}
                          </div>
                        </div>
                      </div>
                    )}
                  </a>
                </Magnetic>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Right Side / Behind Text (Responsive 3D or 2D Aurora) */}
        <div className="absolute inset-0 lg:relative lg:inset-auto w-full h-[550px] lg:h-[500px] order-1 lg:order-2 -z-10 lg:z-10 opacity-30 lg:opacity-100 pointer-events-none lg:pointer-events-auto flex items-center justify-center">
          {isDesktop ? (
            <Scene3D />
          ) : (
            <div className="w-[280px] h-[280px] rounded-full blur-[70px] opacity-[0.15] animate-blob-one bg-gradient-to-tr from-aurora-violet via-aurora-magenta to-aurora-cyan" />
          )}
        </div>

      </div>

      {/* Bouncing Scroll-down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer z-20"
        onClick={() => {
          const target = document.getElementById("about");
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          } else {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
          }
        }}
      >
        <span className="text-[9px] tracking-[0.25em] font-semibold text-text-muted/50 uppercase font-sans">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-9 h-9 rounded-full flex items-center justify-center glass-circle glow-aurora text-text-muted hover:text-white hover:border-white/30 transition-colors"
        >
          <ChevronDown className="w-4 h-4 text-aurora-cyan" />
        </motion.div>
      </motion.div>

    </section>
  );
}
