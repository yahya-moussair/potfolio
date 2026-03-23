import { HiLightningBolt, HiHeart } from "react-icons/hi";
import { VscCode } from "react-icons/vsc";

export const NAV_LINKS = ["About", "Skills", "Projects", "Experience", "Contact"];

export const JOB_TITLES = [
  "Full Stack Developer",
  "Mobile Developer",
  "Backend Developer",
  "Frontend Developer",
  "UI Craftsman",
  "Problem Solver",
];

export const STATS = [
  { label: "Years Experience", value: 1, suffix: "+" },
  { label: "Projects Completed", value: 10, suffix: "+" },
  // { label: "Happy Clients", value: 15, suffix: "+" },
];

export const VALUES = [
  {
    icon: HiLightningBolt,
    title: "Performance-First",
    desc: "Every millisecond matters. I build apps that are fast, lean, and optimized.",
  },
  {
    icon: HiHeart,
    title: "User-Centered Design",
    desc: "Beautiful interfaces are meaningless without great usability and accessibility.",
  },
  {
    icon: VscCode,
    title: "Clean Code Advocate",
    desc: "Readable, maintainable, tested — code should be a joy to work with.",
  },
];


export const PROJECTS = [
  {
    title: "Lionsgeek",
    description: "Developed a comprehensive web platform to automate the entire participant lifecycle for Morocco’s leading tech community. The application digitizes the journey from initial inquiry to final enrollment, replacing manual processes with a streamlined, data-driven pipeline.",
    tags: ["React", "Laravel", "Sqlite", "Inertia.js", "Tailwind", "Typescript"],
    category: "Full Stack",
    gradient: "from-[var(--color-accent)] to-[var(--color-accent-2)]",
    image: "../assets/projects/lionsgeek.png",
  },
  {
    title: "My Lionsgeek",
    description:
      "An all-in-one digital learning platform for LionsGeek that simplifies class scheduling, tracks attendance and performance, and enables seamless communication through real-time notifications. Designed to improve efficiency, collaboration, and the overall learning experience.",
    tags: ["React", "Laravel", "Sqlite", "Inertia.js", "Tailwind", "Typescript"],
    category: "Full Stack",
    gradient: "from-[var(--color-accent-2)] to-[var(--color-border)]",
    image: "../assets/projects/mylionsgeek.png",
  },
  {
    title: "Clb-Klb",
    description:
      "A web platform for managing a professional alumni network, featuring event management and blog publishing to share updates, organize activities, and enhance community engagement through a clean and responsive user experience.",
    tags: ["React", "Laravel", "Sqlite", "Inertia.js", "Tailwind", "Typescript"],
    category: "Full Stack",
    gradient: "from-[var(--color-border)] to-[var(--color-accent)]",
    image: "../assets/projects/clb-klb.png",
  },
  {
    title: "Casamemoire",
    description:
      "high-performance website for Casamemoire, a leading NGO focused on architectural preservation in Morocco. I transformed their digital presence by creating a custom WordPress architecture that manages over 30 years of historical data while maintaining a clean, contemporary aesthetic.",
    tags: ["Wordpress", "PHP", "MySQL", "CSS", "JavaScript"],
    category: "Tools",
    gradient: "from-[var(--color-accent)] to-[var(--color-border)]",
    image: "../assets/projects/casamemoire.png",
  },
  {
    title: "Portfolio Website",
    description:
      "My personal portfolio website built with React, Tailwind CSS, and Framer Motion. It showcases my projects, skills, and experience in a clean and modern design.",
    tags: ["React", "Tailwind", "Framer Motion"],
    category: "Frontend",
    gradient: "from-[var(--color-accent)] to-[var(--color-border)]",
    image: "../assets/projects/portfolio.png",
  },
  {
    title: "Tivro Web",
    description: "responsive frontend for an e-commerce platform. The project focuses on creating a frictionless 'Buy & Sell' experience through a modern, component-based architecture.",
    tags: ["React", "Tailwind"],
    category: "Frontend",
    gradient: "from-[var(--color-accent)] to-[var(--color-border)]",
    image: "../assets/projects/tivro-web.png",
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
