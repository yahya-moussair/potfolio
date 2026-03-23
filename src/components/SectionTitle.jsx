import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { clipReveal } from "@/data/animations";

export default function SectionTitle({ title, subtitle, ghostWord }) {
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
