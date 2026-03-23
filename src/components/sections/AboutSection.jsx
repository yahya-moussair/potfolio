import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { STATS, VALUES } from "@/data/data";
import { clipReveal, fadeUp, scaleIn } from "@/data/animations";
import { useCountUp } from "@/hooks/hooks";
import SectionTitle from "@/components/SectionTitle";
import meImage from "@/assets/me/me.jpg";

export default function AboutSection() {
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
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={clipReveal}
          >
            <p
              className="text-base md:text-lg leading-relaxed mb-6 tracking-normal"
              style={{ color: "var(--color-text-muted)" }}
            >
              I&apos;m a passionate software developer with over a year of experience
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
              I believe great software comes from empathy, understanding the people who
              will use what you build.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-10">
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

            {/* <div className="space-y-3">
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
            </div> */}
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
              <img
                src={meImage}
                alt="Yahya Dev"
                className="w-full h-full object-cover relative z-10"
              />
              <div
                className="absolute inset-0 rounded-2xl z-20 pointer-events-none"
                style={{
                  background: "conic-gradient(from 180deg, var(--color-accent), var(--color-accent-2), transparent, var(--color-accent))",
                  opacity: 0.06,
                }}
              />
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
