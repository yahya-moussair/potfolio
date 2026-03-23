import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
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
