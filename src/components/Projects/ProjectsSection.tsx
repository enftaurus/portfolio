import React from "react";
import { projectsData } from "../../data/projects";
import { ProjectCard } from "./ProjectCard";
import styles from "./Projects.module.css";

export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className={styles.projectsSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionNumber}>03 / SELECTED WORK</span>
          <h2 className={styles.sectionTitle}>ENGINEERED SYSTEMS</h2>
          <div className={styles.sectionLine}></div>
        </div>

        <div className={styles.projectsList}>
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
