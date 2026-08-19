import React, { useState } from "react";
import { motion } from "framer-motion";
import { ProjectData } from "../../types/portfolio";
import { Github, ExternalLink, Terminal, Layers } from "lucide-react";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import styles from "./Projects.module.css";

interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [transformStyle, setTransformStyle] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Subtle 3-5 degrees tilt calculation
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -4;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 4;

    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg)");
  };

  return (
    <motion.div
      className={`${styles.projectCard} ${isHovered ? styles.isHovered : ""}`}
      style={{ transform: transformStyle }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <div className={styles.terminalHeader}>
        <div className={styles.projectIdBadge}>
          <Terminal size={14} />
          <span>PROJECT_0{index + 1} // {project.name.toLowerCase()}</span>
        </div>

        <div className={styles.statusReadout}>
          {isHovered ? (
            <span>&gt; repository accessed // status: operational</span>
          ) : (
            <span>STATUS: STABLE</span>
          )}
        </div>
      </div>

      <div className={styles.projectBody}>
        <div className={styles.projectTitleArea}>
          <h3 className={styles.projectName}>{project.name}</h3>
          <span className={styles.projectTagline}>{project.tagline}</span>
        </div>

        <p className={styles.projectDesc}>{project.description}</p>

        {/* Technologies Pills */}
        <div className={styles.projectTech}>
          {project.technologies.map((tech, i) => (
            <span key={i} className={styles.techPill}>{tech}</span>
          ))}
        </div>

        {/* Architecture Topology */}
        <ArchitectureDiagram projectId={project.id} nodes={project.architectureNodes} />

        {/* Action Buttons */}
        <div className={styles.projectActions}>
          <a
            href={project.githubUrl}
            target={project.githubUrl.startsWith("http") ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className={styles.btnPrimary}
          >
            <Github size={16} />
            <span>[ GITHUB ↗ ]</span>
          </a>

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target={project.demoUrl.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className={styles.btnOutline}
            >
              <Layers size={16} />
              <span>[ LIVE DEMO ↗ ]</span>
            </a>
          )}
        </div>
      </div>

      <div className={styles.cardHoverGrid}></div>
    </motion.div>
  );
};
