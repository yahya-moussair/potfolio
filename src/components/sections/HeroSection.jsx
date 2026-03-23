import { useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { HiExternalLink, HiChevronDown } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { JOB_TITLES } from "@/data/data";
import { useTypewriter } from "@/hooks/hooks";
import HeroBackground from "@/components/HeroBackground";

export default function HeroSection() {
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
          Yahya Moussair
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
            <HiExternalLink className="ml-2" size={18} />
          </Button>
          {/* <Button
            variant="outline"
            size="lg"
            className="group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              Download CV
              <HiChevronDown className="ml-2 transition-transform group-hover:translate-y-0.5" size={18} />
            </span>
          </Button> */}
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
