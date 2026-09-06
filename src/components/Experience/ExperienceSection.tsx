import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { experienceData } from "../../data/experience";
import { Calendar, Building, TrendingUp, CheckCircle2 } from "lucide-react";
import { AnimatedHeading } from "../shared/AnimatedHeading";
import styles from "./ExperienceSection.module.css";

export const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bookY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const pyramidY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="experience" ref={sectionRef} className={styles.experienceSection}>
      {/* Floating Parallax Decorative Shapes */}
      <motion.img
        src="/enchantedbook-nobg.png"
        alt="Floating Enchanted Book"
        className={styles.floatingBook}
        style={{ y: bookY }}
      />
      <motion.img
        src="/stone-pyramid-nobg.png"
        alt="Floating Voxel Pyramid"
        className={styles.floatingPyramid}
        style={{ y: pyramidY }}
      />

      <div className="container">
        <AnimatedHeading
          tag="02 / EXPERIENCE"
          title="SYSTEM TIMELINE"
          subtitle="Production engineering internships, high-impact milestones, and enterprise deliverables."
        />

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

                {/* Branch Line with Glowing Energy Pulse */}
                <div className={styles.timelineConnector}>
                  <div className={styles.connectorDot}></div>
                  <div className={styles.connectorLine}>
                    <div className={styles.energyPulse} />
                  </div>
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
                    <h3 className={styles.roleRole}>{item.role}</h3>
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
