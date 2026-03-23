import { memo, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

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

export default CursorGlow;
