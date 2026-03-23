import React, { useState, useEffect, useCallback, useRef, memo, Suspense } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  ArrowUp,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Send,
  Loader2,
  Code2,
  Server,
  Wrench,
  Palette,
  Quote,
  Calendar,
  MapPin,
  Star,
  Heart,
  Zap,
  Globe,
  Twitter,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* ═══════════════════════════════════════════
   GLOBAL STYLES — CSS Variables + Fonts + Keyframes
   ═══════════════════════════════════════════ */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');

    :root {
      --color-bg: #0e0b0a;
--color-surface: #1a1412;
--color-border: #2a1f1b;
--color-text-primary: #f8f5f2;
--color-text-muted: #a89f98;
--color-accent: #ff7a18;
--color-accent-glow: rgba(255,122,24,0.25);
--color-accent-2: #ffd166;
--font-display: 'Space Mono', monospace;
--font-body: 'DM Sans', sans-serif;
      --gradient-hero: radial-gradient(ellipse at 20% 50%, rgba(170,255,0,0.08) 0%, transparent 60%),
                       radial-gradient(ellipse at 80% 20%, rgba(0,255,170,0.06) 0%, transparent 50%),
                       #0a0a0a;
      --font-display: 'Space Mono', monospace;
      --font-body: 'DM Sans', sans-serif;
    }

    .accent-glow {
      color: var(--color-accent);
      text-shadow: 0 0 20px var(--color-accent-glow),
                   0 0 40px var(--color-accent-glow);
    }

    .border-glow {
      border-color: var(--color-accent);
      box-shadow: 0 0 12px var(--color-accent-glow),
                  inset 0 0 12px rgba(170,255,0,0.03);
    }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--color-bg); }
    ::-webkit-scrollbar-thumb { background: var(--color-accent); border-radius: 2px; }

    ::selection { background: var(--color-accent); color: #0a0a0a; }

    @keyframes aurora {
      0%, 100% {
        background-position: 0% 50%;
        opacity: 0.3;
      }
      25% {
        background-position: 50% 100%;
        opacity: 0.5;
      }
      50% {
        background-position: 100% 50%;
        opacity: 0.35;
      }
      75% {
        background-position: 50% 0%;
        opacity: 0.45;
      }
    }

    @keyframes btn-shimmer-sweep {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

    @keyframes shimmer {
      0%   { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    .shimmer {
      background: linear-gradient(
        90deg,
        var(--color-surface) 25%,
        var(--color-border) 50%,
        var(--color-surface) 75%
      );
      background-size: 200% 100%;
      animation: shimmer 1.8s infinite;
    }

    @keyframes sonar {
      0% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0.6;
      }
      100% {
        transform: translate(-50%, -50%) scale(2.8);
        opacity: 0;
      }
    }

    @keyframes float-slow {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(5deg); }
    }

    @keyframes blink-caret {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }

    @keyframes grain-shift {
      0%, 100% { transform: translate(0, 0); }
      10% { transform: translate(-2%, -2%); }
      30% { transform: translate(1%, -1%); }
      50% { transform: translate(-1%, 2%); }
      70% { transform: translate(2%, 1%); }
      90% { transform: translate(-1%, -1%); }
    }

    .btn-shimmer {
      position: relative;
      overflow: hidden;
    }
    .btn-shimmer::after {
      content: '';
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: linear-gradient(
        105deg,
        transparent 30%,
        rgba(255,255,255,0.15) 45%,
        rgba(255,255,255,0.25) 50%,
        rgba(255,255,255,0.15) 55%,
        transparent 70%
      );
      transform: translateX(-100%);
    }
    .btn-shimmer:hover::after {
      animation: btn-shimmer-sweep 0.8s ease-in-out;
    }

    .nav-link-underline {
      position: relative;
    }
    .nav-link-underline::after {
      content: '';
      position: absolute;
      bottom: -2px; left: 0;
      width: 0%; height: 2px;
      background: var(--color-accent);
      border-radius: 1px;
      transition: width 0.3s ease;
    }
    .nav-link-underline:hover::after {
      width: 100%;
    }

    .floating-label-group {
      position: relative;
    }
    .floating-label-group label {
      position: absolute;
      left: 12px; top: 50%;
      transform: translateY(-50%);
      font-size: 14px;
      color: var(--color-text-muted);
      pointer-events: none;
      transition: all 0.2s ease;
      background: transparent;
      padding: 0 4px;
    }
    .floating-label-group.is-textarea label {
      top: 16px;
      transform: translateY(0);
    }
    .floating-label-group input:focus ~ label,
    .floating-label-group input:not(:placeholder-shown) ~ label,
    .floating-label-group textarea:focus ~ label,
    .floating-label-group textarea:not(:placeholder-shown) ~ label {
      top: -8px;
      transform: translateY(0);
      font-size: 11px;
      color: var(--color-accent);
      background: var(--color-bg);
      letter-spacing: 0.05em;
      text-transform: uppercase;
      font-weight: 600;
    }

    .timeline-node::before {
      content: '';
      position: absolute;
      top: 50%; left: 50%;
      width: 100%; height: 100%;
      border-radius: 50%;
      border: 2px solid var(--color-accent);
      animation: sonar 2s ease-out infinite;
    }
    .timeline-node::after {
      content: '';
      position: absolute;
      top: 50%; left: 50%;
      width: 100%; height: 100%;
      border-radius: 50%;
      border: 2px solid var(--color-accent);
      animation: sonar 2s ease-out 0.6s infinite;
    }
  `}</style>
);

/* ═══════════════════════════════════════════
   NOISE TEXTURE OVERLAY
   ═══════════════════════════════════════════ */
const NoiseOverlay = memo(function NoiseOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-40" style={{ opacity: 0.03 }}>
      <svg width="100%" height="100%">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" style={{ animation: "grain-shift 4s steps(6) infinite" }} />
      </svg>
    </div>
  );
});

/* ═══════════════════════════════════════════
   SVG WAVE DIVIDER
   ═══════════════════════════════════════════ */
function WaveDivider({ flip = false, fillColor = "var(--color-surface)" }) {
  return (
    <div
      className="w-full overflow-hidden leading-none relative -mt-px"
      style={{ transform: flip ? "rotate(180deg)" : undefined }}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full"
        style={{ height: "clamp(40px, 6vw, 80px)", display: "block" }}
      >
        <path
          d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */
const NAV_LINKS = ["About", "Skills", "Projects", "Experience", "Contact"];

const JOB_TITLES = [
  "Full Stack Developer",
  "React Engineer",
  "UI Craftsman",
  "Problem Solver",
];

const STATS = [
  { label: "Years Experience", value: 3, suffix: "+" },
  { label: "Projects Completed", value: 40, suffix: "+" },
  { label: "Happy Clients", value: 15, suffix: "+" },
];

const VALUES = [
  {
    icon: Zap,
    title: "Performance-First",
    desc: "Every millisecond matters. I build apps that are fast, lean, and optimized.",
  },
  {
    icon: Heart,
    title: "User-Centered Design",
    desc: "Beautiful interfaces are meaningless without great usability and accessibility.",
  },
  {
    icon: Code2,
    title: "Clean Code Advocate",
    desc: "Readable, maintainable, tested — code should be a joy to work with.",
  },
];

const SKILLS = {
  Frontend: [
    { name: "React", level: 95 },
    { name: "TypeScript", level: 88 },
    { name: "Next.js", level: 85 },
    { name: "Tailwind CSS", level: 92 },
    { name: "Framer Motion", level: 80 },
    { name: "Vue.js", level: 70 },
  ],
  Backend: [
    { name: "Node.js", level: 90 },
    { name: "Python", level: 82 },
    { name: "PostgreSQL", level: 85 },
    { name: "GraphQL", level: 78 },
    { name: "REST APIs", level: 92 },
    { name: "Redis", level: 72 },
  ],
  DevOps: [
    { name: "Docker", level: 80 },
    { name: "AWS", level: 75 },
    { name: "CI/CD", level: 82 },
    { name: "Git", level: 95 },
    { name: "Linux", level: 78 },
    { name: "Nginx", level: 70 },
  ],
  Design: [
    { name: "Figma", level: 85 },
    { name: "UI/UX", level: 80 },
    { name: "Responsive", level: 92 },
    { name: "Accessibility", level: 78 },
    { name: "Prototyping", level: 75 },
    { name: "Design Systems", level: 82 },
  ],
};

const SKILL_CATEGORY_ICONS = {
  Frontend: Code2,
  Backend: Server,
  DevOps: Wrench,
  Design: Palette,
};

const PROJECTS = [
  {
    title: "CloudSync Dashboard",
    description:
      "Real-time analytics dashboard with live data streams, interactive charts, and team collaboration features.",
    tags: ["React", "D3.js", "WebSocket", "Node.js"],
    category: "Full Stack",
    gradient: "from-[var(--color-accent)] to-[var(--color-accent-2)]",
    featured: true,
  },
  {
    title: "ShopFlow",
    description:
      "Modern e-commerce platform with AI-powered recommendations, stripe payments, and inventory management.",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Redis"],
    category: "Full Stack",
    gradient: "from-[var(--color-accent-2)] to-[var(--color-border)]",
    featured: true,
  },
  {
    title: "PixelForge UI",
    description:
      "A design system and component library with 50+ components, Storybook docs, and theme customization.",
    tags: ["React", "Storybook", "Tailwind", "TypeScript"],
    category: "Frontend",
    gradient: "from-[var(--color-border)] to-[var(--color-accent)]",
    featured: false,
  },
  {
    title: "DevTerminal",
    description:
      "Browser-based terminal emulator with SSH support, session recording, and collaborative sharing.",
    tags: ["Electron", "Node.js", "xterm.js", "Docker"],
    category: "Tools",
    gradient: "from-[var(--color-accent)] to-[var(--color-border)]",
    featured: false,
  },
  {
    title: "HealthTrack",
    description:
      "Health and fitness tracking app with workout plans, nutrition logging, and progress visualization.",
    tags: ["React Native", "Firebase", "Charts", "Auth"],
    category: "Frontend",
    gradient: "from-[var(--color-accent-2)] to-[var(--color-accent)]",
    featured: false,
  },
  {
    title: "TaskForge CLI",
    description:
      "A powerful CLI tool for project scaffolding, code generation, and automated deployment workflows.",
    tags: ["Node.js", "Commander", "Inquirer", "Shell"],
    category: "Tools",
    gradient: "from-[var(--color-border)] to-[var(--color-accent-2)]",
    featured: false,
  },
];

const EXPERIENCE = [
  {
    company: "TechNova Inc.",
    role: "Senior Frontend Engineer",
    date: "2024 — Present",
    location: "Remote",
    points: [
      "Leading the frontend architecture migration from Vue to React with TypeScript",
      "Reduced bundle size by 42% through code splitting and lazy loading strategies",
      "Mentoring a team of 4 junior developers with weekly code reviews",
    ],
  },
  {
    company: "DataBridge Solutions",
    role: "Full Stack Developer",
    date: "2023 — 2024",
    location: "New York, NY",
    points: [
      "Built a real-time data pipeline dashboard serving 10K+ daily active users",
      "Designed and implemented RESTful APIs handling 2M+ requests per day",
      "Introduced CI/CD pipelines that cut deployment time from 2 hours to 12 minutes",
    ],
  },
  {
    company: "PixelCraft Studio",
    role: "Frontend Developer",
    date: "2022 — 2023",
    location: "San Francisco, CA",
    points: [
      "Developed interactive landing pages that increased conversion rates by 28%",
      "Created a reusable component library adopted across 5 internal projects",
      "Collaborated with UX designers to implement pixel-perfect responsive layouts",
    ],
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Product Manager, TechNova",
    quote:
      "An exceptional engineer who doesn't just write code — they solve problems. The attention to detail and user experience is remarkable.",
  },
  {
    name: "Marcus Wright",
    role: "CTO, DataBridge Solutions",
    quote:
      "One of the most talented developers I've worked with. Their ability to translate complex requirements into elegant solutions is unmatched.",
  },
  {
    name: "Elena Rodriguez",
    role: "Lead Designer, PixelCraft",
    quote:
      "A rare developer who truly understands design. Working together felt seamless — they brought our vision to life pixel by pixel.",
  },
];

const HERO_FLOAT_ICONS = [
  { svg: "M12 1.27l10.17 7.85H1.83L12 1.27zm-10 9.73h20v2H2v-2zm1.5 4h17v2h-17v-2zm3 4h11v2H6.5v-2z", x: 8, y: 15, size: 40, duration: 18 },
  { svg: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z", x: 85, y: 20, size: 35, duration: 22 },
  { svg: "M20 3H4a1 1 0 00-1 1v16a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z", x: 15, y: 70, size: 32, duration: 20 },
  { svg: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5", x: 78, y: 75, size: 38, duration: 24 },
  { svg: "M12 2a10 10 0 110 20 10 10 0 010-20zm0 4a1 1 0 00-1 1v4l-3 2a1 1 0 001 1.73l3.5-2.1A1 1 0 0013 12V7a1 1 0 00-1-1z", x: 92, y: 50, size: 30, duration: 16 },
  { svg: "M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z", x: 5, y: 45, size: 28, duration: 19 },
];

/* ═══════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════ */
const clipReveal = {
  hidden: { clipPath: "inset(100% 0 0 0)", opacity: 0 },
  visible: (i = 0) => ({
    clipPath: "inset(0% 0 0 0)",
    opacity: 1,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
  },
};

/* ═══════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════ */
function useTypewriter(words, typingSpeed = 80, deletingSpeed = 50, pauseTime = 2000) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout;

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setText(
            isDeleting
              ? currentWord.substring(0, text.length - 1)
              : currentWord.substring(0, text.length + 1)
          );
        },
        isDeleting ? deletingSpeed : typingSpeed
      );
    }
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return text;
}

function useCountUp(target, duration = 2000, startOnView = false) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (startOnView && !isInView) return;
    if (hasStarted) return;
    setHasStarted(true);

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const linear = Math.min((timestamp - startTime) / duration, 1);
      const eased = easeOutQuart(linear);
      setCount(Math.floor(eased * target));
      if (linear < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration, startOnView, hasStarted]);

  return { count, ref };
}

function useActiveSection() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.getElementById(link.toLowerCase())
    ).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return active;
}

/* ═══════════════════════════════════════════
   LAZY SECTION INFRASTRUCTURE
   ═══════════════════════════════════════════ */
const useLazySection = (threshold = 0.05) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold, rootMargin: "200px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

const SectionSkeleton = () => (
  <div className="w-full py-32 flex items-center justify-center">
    <div className="flex flex-col gap-4 w-full max-w-2xl px-8 animate-pulse">
      <div
        className="h-4 rounded-full w-1/4"
        style={{ background: "var(--color-border)" }}
      />
      <div
        className="h-8 rounded-full w-2/3"
        style={{ background: "var(--color-border)" }}
      />
      <div
        className="h-4 rounded-full w-full"
        style={{ background: "var(--color-border)" }}
      />
      <div
        className="h-4 rounded-full w-5/6"
        style={{ background: "var(--color-border)" }}
      />
    </div>
  </div>
);

const LazySection = ({ children, minHeight = "100vh" }) => {
  const { ref, isVisible } = useLazySection();
  return (
    <div ref={ref} style={{ minHeight: isVisible ? "auto" : minHeight }}>
      {isVisible ? (
        <Suspense fallback={<SectionSkeleton />}>
          {children}
        </Suspense>
      ) : (
        <SectionSkeleton />
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════
   SCROLL PROGRESS BAR
   ═══════════════════════════════════════════ */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-9999 origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, var(--color-accent), var(--color-accent-2))",
        boxShadow: "0 0 10px var(--color-accent-glow), 0 0 30px var(--color-accent-glow)",
      }}
    />
  );
}

/* ═══════════════════════════════════════════
   SECTION TITLE WITH GHOST WORD
   ═══════════════════════════════════════════ */
function SectionTitle({ title, subtitle, ghostWord }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={clipReveal}
      className="text-center mb-20 relative"
    >
      <span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl md:text-8xl lg:text-9xl font-bold uppercase pointer-events-none select-none whitespace-nowrap"
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--color-accent)",
          opacity: 0.04,
          letterSpacing: "0.1em",
        }}
      >
        {ghostWord || title}
      </span>
      <h2
        className="text-3xl md:text-5xl font-bold mb-4 tracking-tight relative"
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--color-text-primary)",
        }}
      >
        {title}
      </h2>
      <p
        className="text-base md:text-lg max-w-2xl mx-auto tracking-normal relative"
        style={{ color: "var(--color-text-muted)" }}
      >
        {subtitle}
      </p>
      <div
        className="w-16 h-1 mx-auto mt-8 rounded-full relative"
        style={{
          background: "linear-gradient(90deg, var(--color-accent), var(--color-accent-2))",
          boxShadow: "0 0 20px var(--color-accent-glow)",
        }}
      />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   CURSOR GLOW
   ═══════════════════════════════════════════ */
const CursorGlow = memo(function CursorGlow() {
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 25 });

  useEffect(() => {
    const handler = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed z-50 hidden md:block"
      style={{
        x: springX,
        y: springY,
        width: 500,
        height: 500,
        borderRadius: "50%",
        background: "radial-gradient(circle, var(--color-accent-glow) 0%, transparent 65%)",
        transform: "translate(-50%, -50%)",
        filter: "blur(1px)",
      }}
    />
  );
});

/* ═══════════════════════════════════════════
   FLOATING PARTICLES + AURORA (Hero Background)
   ═══════════════════════════════════════════ */
const HeroBackground = memo(function HeroBackground() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 25 + 15,
    delay: Math.random() * 12,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(170,255,0,0.06) 0%, transparent 60%), " +
            "radial-gradient(ellipse 60% 80% at 30% 60%, rgba(0,255,170,0.05) 0%, transparent 50%), " +
            "radial-gradient(ellipse 70% 50% at 80% 30%, rgba(170,255,0,0.04) 0%, transparent 50%)",
          backgroundSize: "200% 200%",
          animation: "aurora 10s ease-in-out infinite",
        }}
      />
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: p.id % 3 === 0 ? "var(--color-accent-2)" : "var(--color-accent)",
            opacity: 0.12,
          }}
          animate={{
            y: [-30, 30, -30],
            x: [-15, 15, -15],
            opacity: [0.08, 0.25, 0.08],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--color-accent) 0.5px, transparent 0)",
          backgroundSize: "50px 50px",
          opacity: 0.04,
        }}
      />

      {HERO_FLOAT_ICONS.map((icon, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            animation: `float-slow ${icon.duration}s ease-in-out infinite`,
            animationDelay: `${i * 2}s`,
            opacity: 0.06,
          }}
        >
          <svg
            width={icon.size}
            height={icon.size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={icon.svg} />
          </svg>
        </div>
      ))}
    </div>
  );
});

/* ═══════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = useCallback((link) => {
    setMobileOpen(false);
    document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10, 10, 10, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(1.5)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(170, 255, 0, 0.08)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
        <motion.a
          href="#"
          className="text-xl font-bold tracking-tight accent-glow"
          style={{ fontFamily: "var(--font-display)" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          {"<YD />"}
        </motion.a>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.toLowerCase();
            return (
              <button
                key={link}
                type="button"
                onClick={() => handleNavClick(link)}
                className={`nav-link-underline px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${isActive ? "accent-glow" : ""}`}
                style={{
                  color: isActive
                    ? "var(--color-accent)"
                    : "var(--color-text-muted)",
                  background: isActive
                    ? "rgba(170, 255, 0, 0.06)"
                    : "transparent",
                }}
              >
                {link}
              </button>
            );
          })}

          <div
            className="ml-4 flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ border: "1px solid var(--color-border)" }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{
                background: "var(--color-success)",
                boxShadow: "0 0 8px var(--color-success)",
              }}
            />
            <span
              className="text-xs font-medium tracking-wider uppercase"
              style={{ color: "var(--color-success)" }}
            >
              Available
            </span>
          </div>
        </div>

        <button
          type="button"
          className="md:hidden p-2 cursor-pointer"
          style={{ color: "var(--color-text-primary)" }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
            style={{
              background: "rgba(10, 10, 10, 0.97)",
              backdropFilter: "blur(24px)",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => {
                const isActive = active === link.toLowerCase();
                return (
                  <motion.button
                    key={link}
                    type="button"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleNavClick(link)}
                    className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${isActive ? "accent-glow" : ""}`}
                    style={{
                      color: isActive
                        ? "var(--color-accent)"
                        : "var(--color-text-muted)",
                      background: isActive
                        ? "rgba(170, 255, 0, 0.06)"
                        : "transparent",
                    }}
                  >
                    {link}
                  </motion.button>
                );
              })}
              <div className="flex items-center gap-2 px-4 py-3">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{
                    background: "var(--color-success)",
                    boxShadow: "0 0 8px var(--color-success)",
                  }}
                />
                <span
                  className="text-xs font-medium tracking-wider uppercase"
                  style={{ color: "var(--color-success)" }}
                >
                  Available for hire
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ═══════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════ */
function HeroSectionComponent() {
  const typedTitle = useTypewriter(JOB_TITLES);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback(
    (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set((clientX - centerX) / centerX);
      mouseY.set((clientY - centerY) / centerY);
    },
    [mouseX, mouseY]
  );

  const parallaxX = useSpring(useTransform(mouseX, [-1, 1], [-15, 15]), {
    stiffness: 100,
    damping: 30,
  });
  const parallaxY = useSpring(useTransform(mouseY, [-1, 1], [-15, 15]), {
    stiffness: 100,
    damping: 30,
  });

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
      onMouseMove={handleMouseMove}
    >
      <HeroBackground />

      <motion.div style={{ x: parallaxX, y: parallaxY }} className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs md:text-sm font-semibold mb-6 tracking-[0.25em] uppercase accent-glow"
        >
          Hello, I&apos;m
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-bold mb-6 leading-[1.05] tracking-tight accent-glow"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 10vw, 8rem)",
          }}
        >
          Yahya Dev
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-2xl font-medium mb-2 h-9 flex items-center justify-center gap-1"
          style={{ color: "var(--color-accent-2)" }}
        >
          <span>{typedTitle}</span>
          <span
            className="inline-block w-[3px] h-7"
            style={{
              background: "var(--color-accent)",
              animation: "blink-caret 0.8s step-end infinite",
            }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-sm md:text-base mb-12 max-w-lg mx-auto leading-relaxed tracking-normal"
          style={{ color: "var(--color-text-muted)" }}
        >
          I craft digital experiences that are fast, accessible, and visually
          striking — pixel by pixel, line by line.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            className="btn-shimmer"
            onClick={() =>
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View My Work
            <ExternalLink className="ml-2" size={18} />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              Download CV
              <ChevronDown className="ml-2 transition-transform group-hover:translate-y-0.5" size={18} />
            </span>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="w-6 h-10 rounded-full border-2 flex justify-center pt-2"
          style={{ borderColor: "var(--color-accent)" }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--color-accent)" }}
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   ABOUT SECTION
   ═══════════════════════════════════════════ */
function AboutSectionComponent() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 px-6 relative"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="About Me"
          subtitle="A quick glimpse into who I am and what drives me"
          ghostWord="ABOUT"
        />
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={clipReveal}
          >
            <p
              className="text-base md:text-lg leading-relaxed mb-6 tracking-normal"
              style={{ color: "var(--color-text-muted)" }}
            >
              I&apos;m a passionate software developer with over 3 years of experience
              building web applications that people actually enjoy using. I specialize in
              React ecosystems, modern JavaScript, and crafting interfaces that balance
              aesthetics with performance.
            </p>
            <p
              className="text-base md:text-lg leading-relaxed mb-10 tracking-normal"
              style={{ color: "var(--color-text-muted)" }}
            >
              When I&apos;m not coding, you&apos;ll find me exploring new frameworks,
              contributing to open-source projects, or experimenting with generative art.
              I believe great software comes from empathy — understanding the people who
              will use what you build.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-10">
              {STATS.map((stat, i) => {
                const { count, ref } = useCountUp(stat.value, 1800, true);
                return (
                  <motion.div
                    key={stat.label}
                    ref={ref}
                    custom={i}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeUp}
                    className="text-center p-4 rounded-xl"
                    style={{
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    <p
                      className="text-3xl md:text-4xl font-bold tabular-nums accent-glow"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {count}
                      {stat.suffix}
                    </p>
                    <p
                      className="text-xs mt-2 tracking-wider uppercase font-medium"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {stat.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <div className="space-y-3">
              {VALUES.map((val, i) => (
                <motion.div
                  key={val.title}
                  custom={i + 3}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={fadeUp}
                  className="flex items-start gap-4 p-4 rounded-xl transition-all duration-300 group"
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-accent)";
                    e.currentTarget.style.boxShadow = "0 4px 20px var(--color-accent-glow)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-border)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    className="p-2.5 rounded-lg shrink-0"
                    style={{ background: "rgba(170, 255, 0, 0.06)" }}
                  >
                    <val.icon size={18} style={{ color: "var(--color-accent)" }} />
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold mb-0.5"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {val.title}
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                      {val.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={scaleIn}
            className="relative"
          >
            <div
              className="aspect-square rounded-2xl relative overflow-hidden"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: "conic-gradient(from 180deg, var(--color-accent), var(--color-accent-2), transparent, var(--color-accent))",
                  opacity: 0.06,
                }}
              />
              <svg viewBox="0 0 400 400" className="w-full h-full p-8 relative z-10">
                <defs>
                  <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="var(--color-accent-2)" stopOpacity="0.8" />
                  </linearGradient>
                  <radialGradient id="haloGrad">
                    <stop offset="60%" stopColor="transparent" />
                    <stop offset="80%" stopColor="var(--color-accent)" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                </defs>
                <circle cx="200" cy="200" r="150" fill="url(#haloGrad)">
                  <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="20s" repeatCount="indefinite" />
                </circle>
                <circle cx="200" cy="200" r="120" fill="none" stroke="var(--color-accent)" strokeWidth="0.5" strokeDasharray="8 6" opacity="0.2">
                  <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="-360 200 200" dur="30s" repeatCount="indefinite" />
                </circle>
                <circle cx="200" cy="140" r="55" fill="url(#avatarGrad)" opacity="0.6" />
                <ellipse cx="200" cy="300" rx="90" ry="60" fill="url(#avatarGrad)" opacity="0.35" />
                <circle cx="85" cy="85" r="18" fill="var(--color-accent)" opacity="0.1" />
                <circle cx="330" cy="100" r="12" fill="var(--color-accent-2)" opacity="0.12" />
                <rect x="65" y="270" width="35" height="35" rx="8" fill="var(--color-accent)" opacity="0.07" />
                <rect x="310" y="260" width="40" height="40" rx="10" fill="var(--color-accent-2)" opacity="0.07" />
                <text x="200" y="370" textAnchor="middle" fill="var(--color-accent)" fontSize="13" fontFamily="var(--font-display)" opacity="0.5">
                  {"<Developer />"}
                </text>
              </svg>
              <div
                className="absolute -top-8 -right-8 w-40 h-40 rounded-full blur-3xl"
                style={{ background: "var(--color-accent-glow)", opacity: 0.4 }}
              />
              <div
                className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full blur-3xl"
                style={{ background: "rgba(0, 255, 170, 0.15)" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SKILLS SECTION
   ═══════════════════════════════════════════ */
function SkillsSectionComponent() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-32 px-6 relative"
      style={{ background: "var(--color-surface)" }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="Skills & Expertise"
          subtitle="Technologies I work with to bring ideas to life"
          ghostWord="SKILLS"
        />
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8"
        >
          {Object.entries(SKILLS).map(([category, skills]) => {
            const Icon = SKILL_CATEGORY_ICONS[category];
            return (
              <motion.div key={category} variants={clipReveal}>
                <Card
                  className="overflow-hidden transition-all duration-500 group"
                  style={{
                    background: "var(--color-bg)",
                    borderColor: "var(--color-border)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-accent)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 40px var(--color-accent-glow), inset 0 1px 0 rgba(170, 255, 0, 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-border)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <CardHeader>
                    <CardTitle
                      className="flex items-center gap-3 text-lg"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      <div
                        className="p-2.5 rounded-xl transition-all duration-300"
                        style={{
                          background: "rgba(170, 255, 0, 0.06)",
                          border: "1px solid rgba(170, 255, 0, 0.1)",
                        }}
                      >
                        <Icon size={20} style={{ color: "var(--color-accent)" }} />
                      </div>
                      {category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {skills.map((skill, idx) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-1.5">
                          <span
                            className="text-sm font-medium"
                            style={{ color: "var(--color-text-primary)" }}
                          >
                            {skill.name}
                          </span>
                          <span
                            className="text-xs font-mono"
                            style={{ color: "var(--color-text-muted)" }}
                          >
                            {skill.level}%
                          </span>
                        </div>
                        <div
                          className="h-1.5 rounded-full overflow-hidden"
                          style={{ background: "var(--color-border)" }}
                        >
                          <motion.div
                            className="h-full rounded-full"
                            style={{
                              background:
                                "linear-gradient(90deg, var(--color-accent), var(--color-accent-2))",
                              boxShadow: "0 0 10px var(--color-accent-glow)",
                            }}
                            initial={{ width: 0 }}
                            animate={
                              isInView ? { width: `${skill.level}%` } : { width: 0 }
                            }
                            transition={{
                              duration: 1.2,
                              delay: 0.3 + idx * 0.08,
                              ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                          />
                        </div>
                      </div>
                    ))}
                    <motion.div
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      variants={staggerContainer}
                      className="flex flex-wrap gap-2 pt-3"
                    >
                      {skills.map((skill, idx) => (
                        <motion.div
                          key={skill.name}
                          variants={{
                            hidden: { opacity: 0, x: -10 },
                            visible: {
                              opacity: 1,
                              x: 0,
                              transition: { delay: idx * 0.05, duration: 0.4 },
                            },
                          }}
                        >
                          <Badge
                            variant="secondary"
                            className="text-xs tracking-wide transition-all duration-300 hover:scale-105"
                            style={{ cursor: "default" }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = "var(--color-accent)";
                              e.currentTarget.style.boxShadow =
                                "0 0 12px var(--color-accent-glow)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = "var(--color-border)";
                              e.currentTarget.style.boxShadow = "none";
                            }}
                          >
                            {skill.name}
                          </Badge>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PROJECTS SECTION
   ═══════════════════════════════════════════ */
function ProjectsSectionComponent() {
  const [filter, setFilter] = useState("All");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const categories = ["All", "Frontend", "Full Stack", "Tools"];

  const filtered =
    filter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-32 px-6 relative"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="Featured Projects"
          subtitle="A selection of my recent work across different domains"
          ghostWord="WORK"
        />

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="flex justify-center mb-14"
        >
          <Tabs defaultValue="All" onValueChange={setFilter}>
            <TabsList>
              {categories.map((cat) => (
                <TabsTrigger key={cat} value={cat}>
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.title}
                variants={clipReveal}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 30 }}
              >
                <Card
                  className="group overflow-hidden h-full flex flex-col relative"
                  style={{
                    background: "var(--color-surface)",
                    borderColor: "var(--color-border)",
                    transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease, border-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.classList.add("border-glow");
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.classList.remove("border-glow");
                    e.currentTarget.style.borderColor = "var(--color-border)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {project.featured && (
                    <div
                      className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border-glow"
                      style={{
                        background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-2))",
                        color: "var(--color-bg)",
                      }}
                    >
                      Featured
                    </div>
                  )}

                  <div
                    className={`h-48 bg-linear-to-br ${project.gradient} relative overflow-hidden shimmer`}
                  >
                    <div
                      className="absolute inset-0 opacity-15"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.12) 1px, transparent 0)",
                        backgroundSize: "20px 20px",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="text-white/20 font-bold"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(3rem, 5vw, 5rem)",
                        }}
                        whileHover={{ scale: 1.1, rotate: 3 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        {project.title
                          .split(" ")
                          .map((w) => w[0])
                          .join("")}
                      </motion.div>
                    </div>
                    <div
                      className="absolute bottom-0 left-0 right-0 h-16"
                      style={{
                        background:
                          "linear-gradient(to top, var(--color-surface), transparent)",
                      }}
                    />
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle
                      className="text-base"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-xs leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1 pt-0">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-[10px] tracking-wider uppercase"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="gap-3">
                    <Button size="sm" className="flex-1 btn-shimmer text-xs">
                      <Globe size={13} className="mr-1.5" />
                      Live Demo
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 text-xs">
                      <Github size={13} className="mr-1.5" />
                      GitHub
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   EXPERIENCE / TIMELINE
   ═══════════════════════════════════════════ */
function ExperienceSectionComponent() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-32 px-6 relative"
      style={{ background: "var(--color-surface)" }}
    >
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          title="Experience"
          subtitle="My professional journey and the impact I've made along the way"
          ghostWord="CAREER"
        />
        <div className="relative">
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{
              background: "linear-gradient(to bottom, var(--color-accent), var(--color-accent-2), var(--color-border))",
            }}
            initial={{ scaleY: 0, transformOrigin: "top" }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          <div className="space-y-16">
            {EXPERIENCE.map((exp, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={exp.company}
                  custom={index}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={clipReveal}
                  className={`relative flex flex-col md:flex-row items-start gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                >
                  <div
                    className="timeline-node absolute left-4 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 z-10 accent-glow"
                    style={{
                      background: "var(--color-accent)",
                      boxShadow: "0 0 20px var(--color-accent-glow), 0 0 0 4px var(--color-surface)",
                    }}
                  />

                  <div
                    className={`md:w-1/2 ${isLeft ? "md:pr-14 md:text-right" : "md:pl-14"
                      } pl-12 md:pl-0`}
                  >
                    <Card
                      className="p-6 transition-all duration-500"
                      style={{
                        background: "var(--color-bg)",
                        borderColor: "var(--color-border)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--color-accent)";
                        e.currentTarget.style.boxShadow =
                          "0 8px 30px var(--color-accent-glow)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--color-border)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <Badge variant="secondary" className="text-[10px] tracking-wider uppercase">
                          <Calendar size={10} className="mr-1" />
                          {exp.date}
                        </Badge>
                        <Badge variant="outline" className="text-[10px] tracking-wider uppercase">
                          <MapPin size={10} className="mr-1" />
                          {exp.location}
                        </Badge>
                      </div>
                      <h3
                        className="text-lg font-bold mb-1 tracking-tight"
                        style={{
                          fontFamily: "var(--font-display)",
                          color: "var(--color-text-primary)",
                        }}
                      >
                        {exp.role}
                      </h3>
                      <p
                        className="text-sm font-semibold mb-4 accent-glow"
                      >
                        {exp.company}
                      </p>
                      <ul className="space-y-2.5 text-left">
                        {exp.points.map((point) => (
                          <li
                            key={point}
                            className="text-sm flex items-start gap-2.5 leading-relaxed"
                            style={{ color: "var(--color-text-muted)" }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                              style={{
                                background: "var(--color-accent)",
                                boxShadow: "0 0 6px var(--color-accent-glow)",
                              }}
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </div>

                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   TESTIMONIALS
   ═══════════════════════════════════════════ */
function TestimonialsSectionComponent() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="py-32 px-6 relative"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="What People Say"
          subtitle="Kind words from colleagues and clients I've worked with"
          ghostWord="TRUST"
        />
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-7"
        >
          {TESTIMONIALS.map((t) => (
            <motion.div key={t.name} variants={clipReveal}>
              <Card
                className="p-7 h-full flex flex-col transition-all duration-500 relative overflow-hidden"
                style={{
                  background: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "var(--color-accent)";
                  e.currentTarget.style.boxShadow = "0 12px 30px var(--color-accent-glow)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl pointer-events-none"
                  style={{ background: "var(--color-accent-glow)", opacity: 0.05 }}
                />
                <Quote
                  size={32}
                  className="mb-5 shrink-0"
                  style={{ color: "var(--color-accent)", opacity: 0.3 }}
                />
                <p
                  className="text-sm leading-relaxed mb-8 flex-1 italic tracking-normal"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <Separator
                  className="mb-5"
                  style={{ background: "rgba(170, 255, 0, 0.08)" }}
                />
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                    style={{
                      background: "linear-gradient(135deg, rgba(170,255,0,0.12), rgba(0,255,170,0.12))",
                      color: "var(--color-accent)",
                      fontFamily: "var(--font-display)",
                      border: "1px solid rgba(170, 255, 0, 0.2)",
                    }}
                  >
                    {t.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {t.name}
                    </p>
                    <p
                      className="text-xs tracking-wide"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {t.role}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FLOATING LABEL INPUT / TEXTAREA
   ═══════════════════════════════════════════ */
function FloatingInput({ label, type = "text", ...props }) {
  return (
    <div className="floating-label-group">
      <Input type={type} placeholder=" " {...props} />
      <label>{label}</label>
    </div>
  );
}

function FloatingTextarea({ label, ...props }) {
  return (
    <div className="floating-label-group is-textarea">
      <Textarea placeholder=" " {...props} />
      <label>{label}</label>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CONTACT SECTION
   ═══════════════════════════════════════════ */
function ContactSectionComponent() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    }, 2000);
  };

  const contactLinks = [
    { icon: Mail, label: "yahya@example.com", href: "mailto:yahya@example.com" },
    { icon: Github, label: "github.com/yahya-dev", href: "https://github.com" },
    { icon: Linkedin, label: "linkedin.com/in/yahya", href: "https://linkedin.com" },
    { icon: Twitter, label: "@yahya_dev", href: "https://twitter.com" },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 px-6 relative"
      style={{ background: "var(--color-surface)" }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="Get In Touch"
          subtitle="Have a project in mind or just want to chat? I'd love to hear from you."
          ghostWord="CONTACT"
        />
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-14"
        >
          <motion.div variants={clipReveal}>
            <h3
              className="text-xl font-bold mb-6 tracking-tight"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-text-primary)",
              }}
            >
              Let&apos;s connect
            </h3>
            <p
              className="text-sm leading-relaxed mb-10 tracking-normal"
              style={{ color: "var(--color-text-muted)" }}
            >
              I&apos;m always open to new opportunities, collaborations, and
              interesting conversations. Whether you have a project idea or just
              want to say hello — my inbox is always open.
            </p>

            <div className="space-y-4">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group"
                  style={{
                    background: "var(--color-bg)",
                    border: "1px solid var(--color-border)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-accent)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 20px var(--color-accent-glow)";
                    e.currentTarget.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-border)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  <div
                    className="p-2.5 rounded-lg"
                    style={{
                      background: "rgba(170, 255, 0, 0.06)",
                      border: "1px solid rgba(170, 255, 0, 0.1)",
                    }}
                  >
                    <link.icon size={18} style={{ color: "var(--color-accent)" }} />
                  </div>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {link.label}
                  </span>
                  <ExternalLink
                    size={14}
                    className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: "var(--color-accent)" }}
                  />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={clipReveal}>
            <Card
              className="p-7 border-glow"
              style={{ background: "var(--color-bg)" }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FloatingInput label="Name" required />
                  <FloatingInput label="Email" type="email" required />
                </div>
                <FloatingInput label="Subject" required />
                <FloatingTextarea label="Message" rows={5} required />
                <Button
                  type="submit"
                  size="lg"
                  className="w-full btn-shimmer"
                  disabled={sending}
                >
                  {sending ? (
                    <>
                      <Loader2 size={18} className="mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : sent ? (
                    <>
                      <CheckCircle2 size={18} className="mr-2" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */
function Footer() {
  return (
    <footer
      className="py-12 px-6 relative overflow-hidden"
      style={{
        background: "var(--color-bg)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold uppercase pointer-events-none select-none whitespace-nowrap"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(4rem, 15vw, 12rem)",
          color: "var(--color-accent)",
          opacity: 0.02,
          letterSpacing: "0.15em",
        }}
      >
        YAHYA
      </span>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex flex-col items-center md:items-start gap-1">
          <p
            className="text-sm font-medium"
            style={{ color: "var(--color-text-muted)" }}
          >
            &copy; {new Date().getFullYear()} Yahya Dev
          </p>
          <p
            className="text-xs"
            style={{ color: "var(--color-text-muted)", opacity: 0.6 }}
          >
            Built with React & ☕
          </p>
        </div>

        <div className="flex items-center gap-3">
          {[
            { icon: Github, href: "https://github.com", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
            { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
            { icon: Mail, href: "mailto:yahya@example.com", label: "Email" },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl transition-all duration-300"
              style={{
                color: "var(--color-text-muted)",
                border: "1px solid transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-accent)";
                e.currentTarget.style.background = "rgba(170, 255, 0, 0.06)";
                e.currentTarget.style.borderColor = "rgba(170, 255, 0, 0.15)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px var(--color-accent-glow)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-text-muted)";
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
              aria-label={social.label}
            >
              <social.icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   BACK TO TOP
   ═══════════════════════════════════════════ */
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 p-3.5 rounded-full transition-all cursor-pointer"
          style={{
            background: "var(--color-accent)",
            color: "var(--color-bg)",
            boxShadow:
              "0 8px 30px var(--color-accent-glow), 0 0 0 1px var(--color-accent)",
          }}
          whileHover={{ scale: 1.1, boxShadow: "0 12px 40px var(--color-accent-glow)" }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════
   APP — MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <GlobalStyles />
      <NoiseOverlay />
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main>
        <HeroSectionComponent />
        <WaveDivider fillColor="var(--color-bg)" />
        <LazySection minHeight="80vh">
          <AboutSectionComponent />
        </LazySection>
        <WaveDivider fillColor="var(--color-surface)" />
        <LazySection minHeight="80vh">
          <SkillsSectionComponent />
        </LazySection>
        <WaveDivider flip fillColor="var(--color-surface)" />
        <LazySection minHeight="80vh">
          <ProjectsSectionComponent />
        </LazySection>
        <WaveDivider fillColor="var(--color-surface)" />
        <LazySection minHeight="80vh">
          <ExperienceSectionComponent />
        </LazySection>
        <WaveDivider flip fillColor="var(--color-surface)" />
        <LazySection minHeight="60vh">
          <TestimonialsSectionComponent />
        </LazySection>
        <WaveDivider fillColor="var(--color-surface)" />
        <LazySection minHeight="70vh">
          <ContactSectionComponent />
        </LazySection>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
