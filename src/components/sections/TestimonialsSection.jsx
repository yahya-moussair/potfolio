import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TESTIMONIALS } from "@/data/data";
import { clipReveal, staggerContainer } from "@/data/animations";
import SectionTitle from "@/components/SectionTitle";

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="py-32 px-6 relative"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="What People Say"
          subtitle="Kind words from colleagues and clients I've worked with"
          ghostWord="TRUST"
        />
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-7"
        >
          {TESTIMONIALS.map((t) => (
            <motion.div key={t.name} variants={clipReveal}>
              <Card
                className="p-7 h-full flex flex-col transition-all duration-500 relative overflow-hidden"
                style={{
                  background: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "var(--color-accent)";
                  e.currentTarget.style.boxShadow = "0 12px 30px var(--color-accent-glow)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl pointer-events-none"
                  style={{ background: "var(--color-accent-glow)", opacity: 0.05 }}
                />
                <Quote
                  size={32}
                  className="mb-5 shrink-0"
                  style={{ color: "var(--color-accent)", opacity: 0.3 }}
                />
                <p
                  className="text-sm leading-relaxed mb-8 flex-1 italic tracking-normal"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <Separator
                  className="mb-5"
                  style={{ background: "rgba(170, 255, 0, 0.08)" }}
                />
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                    style={{
                      background: "linear-gradient(135deg, rgba(170,255,0,0.12), rgba(0,255,170,0.12))",
                      color: "var(--color-accent)",
                      fontFamily: "var(--font-display)",
                      border: "1px solid rgba(170, 255, 0, 0.2)",
                    }}
                  >
                    {t.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {t.name}
                    </p>
                    <p
                      className="text-xs tracking-wide"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {t.role}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
