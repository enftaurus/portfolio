import React from "react";
import { motion } from "framer-motion";
import { SkillGraph } from "./SkillGraph";
import { skillCategoriesData } from "../../data/skills";
import styles from "./Skills.module.css";

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className={styles.skillsSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionNumber}>04 / STACK</span>
          <h2 className={styles.sectionTitle}>SYSTEM TOPOLOGY & TECH STACK</h2>
          <div className={styles.sectionLine} />
        </div>

        {/* 1. Interactive Node Graph */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.graphFrame}>
            <div className={styles.graphFrameHeader}>
              <span>RAJA_WORKSTATION // SYSTEM_TOPOLOGY</span>
              <span>HOVER NODE TO FOCUS</span>
            </div>
            <div className={styles.graphFrameBody}>
              <SkillGraph />
            </div>
          </div>

          <p className={styles.graphHint}>
            Dashed lines = cross-domain connections&nbsp;&nbsp;·&nbsp;&nbsp;
            Hover a category hub or legend to isolate its skill cluster
          </p>
        </motion.div>

        {/* 2. Structured Stack Cards Layout */}
        <div className={styles.stackCardsGrid}>
          {skillCategoriesData.map((cat, idx) => (
            <motion.div
              key={cat.category}
              className={styles.stackCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className={styles.cardCategoryHeader}>
                <span className={styles.categoryTitle}>{cat.category}</span>
                <span className={styles.skillCount}>{cat.skills.length} MODULES</span>
              </div>

              <div className={styles.skillList}>
                {cat.skills.map((skill) => (
                  <div key={skill.name} className={styles.skillItem}>
                    <div className={styles.skillItemTop}>
                      <span className={`${styles.skillName} ${skill.highlighted ? styles.highlightedName : ""}`}>
                        {skill.name}
                      </span>
                      {skill.level && (
                        <span className={styles.skillBadge}>[{skill.level}]</span>
                      )}
                    </div>
                    {skill.description && (
                      <span className={styles.skillDesc}>{skill.description}</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
