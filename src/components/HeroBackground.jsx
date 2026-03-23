import { memo } from "react";
import { motion } from "framer-motion";
import { HERO_FLOAT_ICONS } from "@/data/data";

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

export default HeroBackground;
