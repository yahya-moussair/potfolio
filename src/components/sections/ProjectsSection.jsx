import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { HiGlobe } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PROJECTS } from "@/data/data";
import { clipReveal, fadeUp, staggerContainer } from "@/data/animations";
import SectionTitle from "@/components/SectionTitle";

export default function ProjectsSection() {
  const [filter, setFilter] = useState("All");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const categories = ["All", "Frontend", "Full Stack", "Other"];

  const filtered =
    filter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-32 px-6 relative"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="Featured Projects"
          subtitle="A selection of my recent work across different domains"
          ghostWord="WORK"
        />

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="flex justify-center mb-14"
        >
          <Tabs defaultValue="All" onValueChange={setFilter}>
            <TabsList>
              {categories.map((cat) => (
                <TabsTrigger key={cat} value={cat}>
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.title}
                variants={clipReveal}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 30 }}
              >
                <Card
                  className="group overflow-hidden h-full flex flex-col relative"
                  style={{
                    background: "var(--color-surface)",
                    borderColor: "var(--color-border)",
                    transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease, border-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.classList.add("border-glow");
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.classList.remove("border-glow");
                    e.currentTarget.style.borderColor = "var(--color-border)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {project.featured && (
                    <div
                      className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border-glow"
                      style={{
                        background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-2))",
                        color: "var(--color-bg)",
                      }}
                    >
                      Featured
                    </div>
                  )}

                  <div
                    className={`h-48 bg-linear-to-br ${project.gradient} relative overflow-hidden shimmer`}
                  >
                    <div
                      className="absolute inset-0 opacity-15"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.12) 1px, transparent 0)",
                        backgroundSize: "20px 20px",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="text-white/20 font-bold"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(3rem, 5vw, 5rem)",
                        }}
                        whileHover={{ scale: 1.1, rotate: 3 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        {project.title
                          .split(" ")
                          .map((w) => w[0])
                          .join("")}
                      </motion.div>
                    </div>
                    <div
                      className="absolute bottom-0 left-0 right-0 h-16"
                      style={{
                        background:
                          "linear-gradient(to top, var(--color-surface), transparent)",
                      }}
                    />
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle
                      className="text-base"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-xs leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1 pt-0">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-[10px] tracking-wider uppercase"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="gap-3">
                    <Button size="sm" className="flex-1 btn-shimmer text-xs">
                      <HiGlobe size={13} className="mr-1.5" />
                      Live Demo
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 text-xs">
                      <FaGithub size={13} className="mr-1.5" />
                      GitHub
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
