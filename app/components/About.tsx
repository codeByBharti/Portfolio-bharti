"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import Reveal from "./Reveal";
import { GraduationCap, Calendar, Award, MapPin } from "lucide-react";

// CountUp Component for Scroll-triggered value counting
function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration: 2,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    return rounded.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = latest.toString() + suffix;
      }
    });
  }, [rounded, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}


export default function About() {
  const techTerms = [
    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "TypeScript",
    "Socket.IO",
    "WebSockets",
    "Gemini, OpenAI & Groq",
    "JWT & RBAC",
    "CI/CD (Vercel/Render)",
  ];

  const stats = [
    { value: 500, suffix: "+", description: "Active Users Served" },
    { value: 3, suffix: "", description: "Production SaaS Projects" },
    { value: 2, suffix: "", description: "Internships Completed" },
    { value: 1, suffix: "", description: "IEEE Research Paper" },
  ];

  // Motion variants for stagger card entry
  const statsContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const statCardVariants = {
    hidden: { 
      opacity: 0, 
      x: 80, 
      rotate: 8,
      scale: 0.95 
    },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 18,
        mass: 0.8,
      },
    },
  };

  return (
    <section
      id="about"
      className="min-h-screen py-16 px-8 bg-background border-b border-border-glow/30 flex flex-col justify-center relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full space-y-10 z-10 relative">
        
        {/* Section Heading with scroll-animated underline */}
        <div className="flex flex-col items-start">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight relative pb-5 inline-block font-heading">
            About Me
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-aurora-violet via-aurora-magenta to-aurora-cyan origin-left rounded-full"
            />
          </h2>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Biography, Tech Chips & Education */}
          <div className="lg:col-span-3 space-y-8 text-left">
            <Reveal delay={0.1}>
              <p className="text-lg sm:text-xl text-text-primary leading-relaxed font-light font-sans">
                I am a passionate <strong className="font-semibold text-aurora-cyan font-sans">Full Stack Developer</strong> and <strong className="font-semibold text-aurora-violet font-sans">MERN Stack Developer</strong> focused on building highly scalable, production-ready web applications. I love solving complex technical challenges and crafting seamless user experiences from database design to frontend animations.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-base sm:text-lg text-text-muted leading-relaxed font-light font-sans">
                My hands-on experience spans building real-time systems utilizing <strong className="text-white font-medium font-sans">Socket.IO &amp; WebSockets</strong>, implementing custom authentication frameworks using <strong className="text-white font-medium font-sans">JWT &amp; RBAC</strong> (Role-Based Access Control), and deploying apps through continuous integration on platform services like <strong className="text-white font-medium font-sans">Vercel &amp; Render</strong>. I specialize in integrating cutting-edge generative AI models (including <strong className="text-aurora-magenta font-medium font-sans">Gemini, OpenAI, and Groq</strong>) to create smart, next-generation platforms.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="text-base sm:text-lg text-text-muted leading-relaxed font-light font-sans">
                I take pride in having built and deployed scalable SaaS products that serve <strong className="text-white font-medium font-sans">500+ active users</strong>, consistently achieving measurable performance improvements, secure routes, and robust structures.
              </p>
            </Reveal>

            {/* Key Technologies glass chips */}
            <div className="space-y-4 pt-4">
              <Reveal delay={0.4}>
                <h4 className="text-xs font-bold text-text-primary/70 uppercase tracking-widest font-sans">
                  Core Technologies
                </h4>
              </Reveal>
              
              <Reveal delay={0.5} className="flex flex-wrap gap-3">
                {techTerms.map((term, i) => (
                  <div
                    key={i}
                    className="aurora-border rounded-xl p-[1px] inline-block"
                  >
                    <span className="px-4 py-2 rounded-xl bg-background text-xs font-semibold text-white/90 font-sans block">
                      {term}
                    </span>
                  </div>
                ))}
              </Reveal>
            </div>

            {/* Education block */}
            <div className="space-y-4 pt-6 border-t border-white/5">
              <Reveal delay={0.4}>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-aurora-cyan" />
                  <h4 className="text-xs font-bold text-text-primary/70 uppercase tracking-widest font-sans">
                    Education
                  </h4>
                </div>
              </Reveal>
              <Reveal delay={0.5}>
                <div className="glass-card p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <h5 className="text-base sm:text-lg font-bold text-white font-sans leading-snug">
                      Ajeenkya DY Patil School of Engineering, Pune
                    </h5>
                    <p className="text-sm text-aurora-cyan font-sans font-medium flex items-center gap-1.5">
                      <Award className="w-4.5 h-4.5 text-aurora-violet" />
                      B.E. Computer Engineering
                    </p>
                  </div>
                  <div className="flex flex-col md:items-end text-xs sm:text-sm text-text-muted font-sans font-light space-y-1">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-aurora-magenta" />
                      2023 &mdash; 2027
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-aurora-cyan" />
                      Pune, Maharashtra, India
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right Column: 2x2 stats grid with staggered entrance, 3D tilt, and count-up */}
          <div className="lg:col-span-2 w-full lg:pt-2">
            <motion.div
              variants={statsContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-2 gap-4 w-full"
            >
              {stats.map((stat, i) => (
                <motion.div key={i} variants={statCardVariants} className="w-full h-full">
                  <div className="glass-card p-6 flex flex-col items-center justify-center text-center space-y-2 h-full min-h-[140px] sm:min-h-[160px]">
                    <span className="text-3xl sm:text-4xl font-extrabold text-gradient-animate font-heading">
                      <CountUp value={stat.value} suffix={stat.suffix} />
                    </span>
                    <span className="text-[10px] sm:text-xs text-text-muted leading-tight font-sans font-semibold max-w-[120px] mx-auto uppercase tracking-wider">
                      {stat.description}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
