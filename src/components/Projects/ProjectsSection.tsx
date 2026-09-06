import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Github, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { projectsData } from "../../data/projects";
import { MagicCard } from "../shared/MagicCard";
import { AnimatedHeading } from "../shared/AnimatedHeading";
import styles from "./Projects.module.css";

export const ProjectsSection: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax scroll for clouds tied to section scroll progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const cloudTopY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const cloudBottomY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const visibleProjects = expanded ? projectsData : projectsData.slice(0, 2);

  const toggleExpand = () => {
    if (expanded && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
    setExpanded((prev) => !prev);
  };

  return (
    <section id="projects" ref={sectionRef} className={styles.projectsSection}>
      {/* Floating Parallax Cloud Images */}
      <motion.img
        src="/cloud-nobg.png"
        alt=""
        className={styles.cloudTopRight}
        style={{ y: cloudTopY }}
      />
      <motion.img
        src="/cloud-nobg.png"
        alt=""
        className={styles.cloudBottomLeft}
        style={{ y: cloudBottomY }}
      />

      <div className="container">
        {/* Header Row with Enchanted Book & Stone Pyramid Framing */}
        <div className={styles.headerRow}>
          <div className={styles.titleContainer}>
            <img
              src="/enchantedbook.png"
              alt="Enchanted Book"
              className={styles.enchantedBook}
            />
            <AnimatedHeading
              tag="03 / PROJECTS"
              title="FEATURED PROJECTS"
              subtitle="Production systems, multi-agent AI ecosystems, and high-throughput cloud migration engines."
            />
            <img
              src="/stone-pyramid-nobg.png"
              alt="Stone Pyramid"
              className={styles.stonePyramid}
            />
          </div>
        </div>

        {/* 2-Column Responsive Project Grid with Breathing Animations */}
        <div className={styles.projectsGrid}>
          <AnimatePresence initial={false}>
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                exit={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Looping Breathing Animation Container */}
                <motion.div
                  animate={{
                    y: [0, -6, 0],
                    scale: [1, 1.005, 1],
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.7,
                  }}
                  style={{ height: "100%" }}
                >
                  <MagicCard>
                    <div className={styles.cardInner}>
                      <div>
                        <div className={styles.cardTagline}>
                          {project.tagline}
                        </div>
                        <h3 className={styles.cardTitle}>{project.name}</h3>
                        <p className={styles.cardDesc}>
                          {project.description}
                        </p>

                        <div className={styles.techStack}>
                          {project.technologies.map((tech, tIdx) => (
                            <span key={tIdx} className={styles.techBadge}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className={styles.cardFooter}>
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.cardLink}
                          >
                            <Github size={16} />
                            <span>Code Repository</span>
                          </a>
                        )}

                        {project.demoUrl &&
                          project.demoUrl !== "#TODO_INSERT_DEMO_URL" && (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.cardLink}
                            >
                              <ExternalLink size={16} />
                              <span>Live Demo</span>
                            </a>
                          )}
                      </div>
                    </div>
                  </MagicCard>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View More / View Less Pill Button */}
        {projectsData.length > 2 && (
          <div className={styles.toggleRow}>
            <button
              onClick={toggleExpand}
              className={styles.toggleBtn}
              aria-label={expanded ? "View Less Projects" : "View More Projects"}
            >
              <span>{expanded ? "View Less" : "View More Projects"}</span>
              {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
