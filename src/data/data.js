import {
  Code2,
  Server,
  Wrench,
  Palette,
  Zap,
  Heart,
} from "lucide-react";

export const NAV_LINKS = ["About", "Skills", "Projects", "Experience", "Contact"];

export const JOB_TITLES = [
  "Full Stack Developer",
  "React Engineer",
  "UI Craftsman",
  "Problem Solver",
];

export const STATS = [
  { label: "Years Experience", value: 3, suffix: "+" },
  { label: "Projects Completed", value: 40, suffix: "+" },
  { label: "Happy Clients", value: 15, suffix: "+" },
];

export const VALUES = [
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

export const SKILLS = {
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

export const SKILL_CATEGORY_ICONS = {
  Frontend: Code2,
  Backend: Server,
  DevOps: Wrench,
  Design: Palette,
};

export const PROJECTS = [
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

export const EXPERIENCE = [
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

export const TESTIMONIALS = [
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

export const HERO_FLOAT_ICONS = [
  { svg: "M12 1.27l10.17 7.85H1.83L12 1.27zm-10 9.73h20v2H2v-2zm1.5 4h17v2h-17v-2zm3 4h11v2H6.5v-2z", x: 8, y: 15, size: 40, duration: 18 },
  { svg: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z", x: 85, y: 20, size: 35, duration: 22 },
  { svg: "M20 3H4a1 1 0 00-1 1v16a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z", x: 15, y: 70, size: 32, duration: 20 },
  { svg: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5", x: 78, y: 75, size: 38, duration: 24 },
  { svg: "M12 2a10 10 0 110 20 10 10 0 010-20zm0 4a1 1 0 00-1 1v4l-3 2a1 1 0 001 1.73l3.5-2.1A1 1 0 0013 12V7a1 1 0 00-1-1z", x: 92, y: 50, size: 30, duration: 16 },
  { svg: "M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z", x: 5, y: 45, size: 28, duration: 19 },
];
