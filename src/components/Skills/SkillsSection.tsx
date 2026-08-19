import React, { useState } from "react";
import { motion } from "framer-motion";
import { skillCategoriesData } from "../../data/skills";
import { Cpu, Database, Server, Cloud, Code2 } from "lucide-react";
import styles from "./Skills.module.css";

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const getCategoryIcon = (category: string) => {
    if (category.includes("BACKEND")) return <Server size={18} />;
    if (category.includes("DATABASES")) return <Database size={18} />;
    if (category.includes("AI")) return <Cpu size={18} />;
    if (category.includes("INFRA")) return <Cloud size={18} />;
    return <Code2 size={18} />;
  };

  return (
    <section id="skills" className={styles.skillsSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionNumber}>04 / STACK</span>
          <h2 className={styles.sectionTitle}>INTERACTIVE SYSTEM MAP</h2>
          <div className={styles.sectionLine}></div>
        </div>

        {/* Central Core Topology Visualizer */}
        <div className={styles.systemMapMatrix}>
          <div className={styles.terminalHeader}>
            <span>RAJA_WORKSTATION // SYSTEM_TOPOLOGY</span>
            <span>STATUS: ACTIVE_NODES</span>
          </div>

          <div className={styles.matrixContent}>
            <div className={styles.categoriesGrid}>
              {skillCategoriesData.map((cat, idx) => {
                const isSelected = activeCategory === cat.category;
                return (
                  <motion.div
                    key={cat.category}
                    className={`${styles.categoryBlock} ${isSelected ? styles.isActive : ""}`}
                    onMouseEnter={() => setActiveCategory(cat.category)}
                    onMouseLeave={() => setActiveCategory(null)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                  >
                    <div className={styles.categoryHeader}>
                      <div className={styles.categoryIconTitle}>
                        <span style={{ color: "var(--accent)" }}>
                          {getCategoryIcon(cat.category)}
                        </span>
                        <h3 className={styles.categoryName}>{cat.category}</h3>
                      </div>
                      <span className={styles.skillCount}>{cat.skills.length} NODES</span>
                    </div>

                    <div className={styles.skillsNodesList}>
                      {cat.skills.map((skill, sIdx) => (
                        <div 
                          key={sIdx} 
                          className={`${styles.skillNode} ${skill.highlighted ? styles.isHighlighted : ""}`}
                        >
                          <div className={styles.skillMain}>
                            <span className={styles.skillName}>{skill.name}</span>
                            {skill.level && <span className={styles.skillLevel}>{skill.level}</span>}
                          </div>
                          {skill.description && (
                            <span className={styles.skillDesc}>{skill.description}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
