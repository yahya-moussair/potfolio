import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiHtml5,
  SiCss3,
  SiSass,
  SiBootstrap,
  SiTailwindcss,
  SiJavascript,
  SiReact,
  SiFramer,
  SiPhp,
  SiLaravel,
  SiInertia,
  SiWordpress,
  SiMysql,
  SiMicrosoftsqlserver,
  SiGit,
  SiGithub,
  SiGnubash,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import SectionTitle from "@/components/SectionTitle";

const SKILL_CATEGORIES = [
  {
    label: "Frontend",
    tag: "FRONTEND",
    skills: [
      { name: "HTML", icon: SiHtml5 },
      { name: "CSS", icon: SiCss3 },
      { name: "Sass", icon: SiSass },
      { name: "Bootstrap", icon: SiBootstrap },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "JavaScript", icon: SiJavascript },
      { name: "React JS", icon: SiReact },
      { name: "React Native", icon: SiReact },
      { name: "Framer Motion", icon: SiFramer },
    ],
  },
  {
    label: "Backend",
    tag: "BACKEND",
    skills: [
      { name: "PHP", icon: SiPhp },
      { name: "Laravel", icon: SiLaravel },
      { name: "Inertia JS", icon: SiInertia },
      { name: "REST API", icon: TbApi },
      { name: "WordPress", icon: SiWordpress },
    ],
  },
  {
    label: "Database & Version Control",
    tag: "DATABASE",
    skills: [
      { name: "MySQL", icon: SiMysql },
      { name: "SQL Server", icon: SiMicrosoftsqlserver },
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
    ],
  },
  {
    label: "Tools & Shell",
    tag: "TOOLS",
    skills: [{ name: "Bash", icon: SiGnubash }],
  },
];

const cardTransition = "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)";

function SkillCard({ name, icon: Icon, index }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay: index * 0.05,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
      className="group flex flex-col items-center gap-3 rounded-xl cursor-default"
      style={{
        background: "var(--color-surface)",
        border: "0.5px solid var(--color-border)",
        borderRadius: 12,
        padding: "24px 16px",
        transition: cardTransition,
      }}
      onMouseEnter={(e) => {
        const card = e.currentTarget;
        card.style.transform = "translateY(-6px)";
        card.style.borderColor = "var(--color-accent)";
        card.style.boxShadow = "0 0 20px var(--color-accent-glow)";
        const iconEl = card.querySelector(".skill-icon");
        if (iconEl) iconEl.style.color = "var(--color-accent)";
        const nameEl = card.querySelector(".skill-name");
        if (nameEl) nameEl.style.color = "var(--color-text-primary)";
      }}
      onMouseLeave={(e) => {
        const card = e.currentTarget;
        card.style.transform = "translateY(0)";
        card.style.borderColor = "var(--color-border)";
        card.style.boxShadow = "none";
        const iconEl = card.querySelector(".skill-icon");
        if (iconEl) iconEl.style.color = "var(--color-text-muted)";
        const nameEl = card.querySelector(".skill-name");
        if (nameEl) nameEl.style.color = "var(--color-text-muted)";
      }}
    >
      <div
        className="skill-icon"
        style={{
          color: "var(--color-text-muted)",
          transition: cardTransition,
        }}
      >
        <Icon size={32} />
      </div>
      <span
        className="skill-name"
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: "var(--color-text-muted)",
          transition: cardTransition,
        }}
      >
        {name}
      </span>
    </motion.div>
  );
}

function CategorySection({ label, tag, skills }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative mb-20 last:mb-0">
      <span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold uppercase pointer-events-none select-none whitespace-nowrap"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(4rem, 10vw, 8rem)",
          color: "var(--color-accent)",
          opacity: 0.04,
          letterSpacing: "0.1em",
        }}
      >
        {tag}
      </span>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mb-8 relative"
      >
        <span
          className="block uppercase mb-2"
          style={{
            color: "var(--color-accent)",
            letterSpacing: "0.15em",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {tag.replace("DATABASE", "DATABASE & VCS")}
        </span>
        <h3
          style={{
            color: "var(--color-text-primary)",
            fontFamily: "var(--font-display)",
            fontSize: 28,
            fontWeight: 700,
            margin: 0,
          }}
        >
          {label}
        </h3>
        <div
          style={{
            width: 40,
            height: 2,
            background: "var(--color-accent)",
            marginTop: 12,
            borderRadius: 1,
          }}
        />
      </motion.div>

      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.1 },
          },
        }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 relative"
      >
        {skills.map((skill, idx) => (
          <SkillCard
            key={skill.name}
            name={skill.name}
            icon={skill.icon}
            index={idx}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="py-32 px-6 relative"
      style={{ background: "var(--color-surface)" }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="Skills & Expertise"
          subtitle="Technologies I work with to bring ideas to life"
          ghostWord="SKILLS"
        />

        {SKILL_CATEGORIES.map((category) => (
          <CategorySection key={category.label} {...category} />
        ))}
      </div>
    </section>
  );
}
