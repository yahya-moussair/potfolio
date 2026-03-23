import { useState, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { HiEye } from "react-icons/hi";
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
import projects from "@/data/data";
import { clipReveal, fadeUp, staggerContainer } from "@/data/animations";
import SectionTitle from "@/components/SectionTitle";

const CATEGORIES = ["All", "fullstack", "frontend", "tools"];

const CATEGORY_LABELS = {
  All: "All",
  fullstack: "Full Stack",
  frontend: "Frontend",
  tools: "Other",
};

function handleImageError(e) {
  e.currentTarget.style.display = "none";
  e.currentTarget.parentElement.classList.add("shimmer");
}

export default function ProjectsSection() {
  const [filter, setFilter] = useState("All");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  const handleCardEnter = useCallback((e) => {
    e.currentTarget.style.transform = "translateY(-8px)";
    e.currentTarget.classList.add("border-glow");
  }, []);

  const handleCardLeave = useCallback((e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.classList.remove("border-glow");
    e.currentTarget.style.borderColor = "var(--color-border)";
    e.currentTarget.style.boxShadow = "none";
  }, []);

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
              {CATEGORIES.map((cat) => (
                <TabsTrigger key={cat} value={cat}>
                  {CATEGORY_LABELS[cat]}
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
                key={project.id}
                variants={clipReveal}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 30 }}
              >
                <Card
                  className="project-card group overflow-hidden h-full flex flex-col relative"
                  style={{
                    background: "var(--color-surface)",
                    borderColor: "var(--color-border)",
                    transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease, border-color 0.3s ease",
                  }}
                  onMouseEnter={handleCardEnter}
                  onMouseLeave={handleCardLeave}
                >
                  <div
                    className="relative overflow-hidden"
                    style={{ height: 200 }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      onError={handleImageError}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
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

                  {(project.github || project.demo) && (
                    <CardFooter className="gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                        >
                          <Button variant="outline" size="sm" className="w-full text-xs">
                            <SiGithub size={14} className="mr-1.5" />
                            Code
                          </Button>
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                        >
                          <Button size="sm" className="w-full btn-shimmer text-xs">
                            <HiEye size={14} className="mr-1.5" />
                            Live Demo
                          </Button>
                        </a>
                      )}
                    </CardFooter>
                  )}
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
