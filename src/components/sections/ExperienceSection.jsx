import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EXPERIENCE } from "@/data/data";
import { clipReveal } from "@/data/animations";
import SectionTitle from "@/components/SectionTitle";

export default function ExperienceSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-32 px-6 relative"
      style={{ background: "var(--color-surface)" }}
    >
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          title="Experience"
          subtitle="My professional journey and the impact I've made along the way"
          ghostWord="CAREER"
        />
        <div className="relative">
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{
              background: "linear-gradient(to bottom, var(--color-accent), var(--color-accent-2), var(--color-border))",
            }}
            initial={{ scaleY: 0, transformOrigin: "top" }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          <div className="space-y-16">
            {EXPERIENCE.map((exp, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={exp.company}
                  custom={index}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={clipReveal}
                  className={`relative flex flex-col md:flex-row items-start gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                >
                  <div
                    className="timeline-node absolute left-4 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 z-10 accent-glow"
                    style={{
                      background: "var(--color-accent)",
                      boxShadow: "0 0 20px var(--color-accent-glow), 0 0 0 4px var(--color-surface)",
                    }}
                  />

                  <div
                    className={`md:w-1/2 ${isLeft ? "md:pr-14 md:text-right" : "md:pl-14"
                      } pl-12 md:pl-0`}
                  >
                    <Card
                      className="p-6 transition-all duration-500"
                      style={{
                        background: "var(--color-bg)",
                        borderColor: "var(--color-border)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--color-accent)";
                        e.currentTarget.style.boxShadow =
                          "0 8px 30px var(--color-accent-glow)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--color-border)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <Badge variant="secondary" className="text-[10px] tracking-wider uppercase">
                          <Calendar size={10} className="mr-1" />
                          {exp.date}
                        </Badge>
                        <Badge variant="outline" className="text-[10px] tracking-wider uppercase">
                          <MapPin size={10} className="mr-1" />
                          {exp.location}
                        </Badge>
                      </div>
                      <h3
                        className="text-lg font-bold mb-1 tracking-tight"
                        style={{
                          fontFamily: "var(--font-display)",
                          color: "var(--color-text-primary)",
                        }}
                      >
                        {exp.role}
                      </h3>
                      <p
                        className="text-sm font-semibold mb-4 accent-glow"
                      >
                        {exp.company}
                      </p>
                      <ul className="space-y-2.5 text-left">
                        {exp.points.map((point) => (
                          <li
                            key={point}
                            className="text-sm flex items-start gap-2.5 leading-relaxed"
                            style={{ color: "var(--color-text-muted)" }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                              style={{
                                background: "var(--color-accent)",
                                boxShadow: "0 0 6px var(--color-accent-glow)",
                              }}
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </div>

                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
