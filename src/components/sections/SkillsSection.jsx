import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SKILLS, SKILL_CATEGORY_ICONS } from "@/data/data";
import { clipReveal, staggerContainer } from "@/data/animations";
import SectionTitle from "@/components/SectionTitle";

export default function SkillsSection() {
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
