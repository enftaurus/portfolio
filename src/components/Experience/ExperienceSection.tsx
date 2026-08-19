import React from "react";
import { motion } from "framer-motion";
import { experienceData } from "../../data/experience";
import { Calendar, Building, TrendingUp, CheckCircle2 } from "lucide-react";
import styles from "./ExperienceSection.module.css";

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className={styles.experienceSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionNumber}>02 / EXPERIENCE</span>
          <h2 className={styles.sectionTitle}>SYSTEM TIMELINE</h2>
          <div className={styles.sectionLine}></div>
        </div>

        <div className={styles.timelineContainer}>
          <div className={styles.timelineTree}>
            {experienceData.map((item, idx) => (
              <motion.div 
                key={item.id} 
                className={styles.timelineItem}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
              >
                {/* Year Marker */}
                <div className={styles.timelineYear}>{item.year}</div>

                {/* Branch Line */}
                <div className={styles.timelineConnector}>
                  <div className={styles.connectorDot}></div>
                  <div className={styles.connectorLine}></div>
                </div>

                {/* Content Card */}
                <div className={styles.timelineContent}>
                  <div className={styles.terminalHeader}>
                    <div className={styles.companyBadge}>
                      <Building size={14} />
                      <span>{item.company}</span>
                    </div>
                    <div className={styles.periodBadge}>
                      <Calendar size={12} />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  <div className={styles.timelineBody}>
                    <h3 className={styles.roleTitle}>{item.role}</h3>
                    <p className={styles.roleDesc}>{item.description}</p>

                    <div className={styles.highlightsList}>
                      {item.highlights.map((h, i) => (
                        <div key={i} className={styles.highlightItem}>
                          <CheckCircle2 size={14} className={styles.highlightIcon} />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className={styles.timelineFooter}>
                      <div className={styles.techTags}>
                        {item.technologies.map((tech, i) => (
                          <span key={i} className={styles.techTag}>{tech}</span>
                        ))}
                      </div>

                      {item.metricPill && (
                        <div className={styles.metricPill}>
                          <TrendingUp size={16} />
                          <div className={styles.metricText}>
                            <span className={styles.metricValue}>{item.metricPill.value}</span>
                            <span className={styles.metricLabel}>{item.metricPill.label}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
