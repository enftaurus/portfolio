import React from "react";
import { motion } from "framer-motion";
import { profileData } from "../../data/profile";
import { ScrollReveal } from "../shared/ScrollReveal";
import styles from "./AboutSection.module.css";

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionNumber}>01 / ABOUT</span>
          <h2 className={styles.sectionTitle}>ENGINEERING PROFILE</h2>
          <div className={styles.sectionLine}></div>
        </div>

        <div className={styles.aboutGrid}>
          {/* Main Profile Statement */}
          <motion.div 
            className={styles.terminalCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.terminalHeader}>
              <span>~/raja/profile.md</span>
              <span>READ_ONLY</span>
            </div>
            <div className={styles.aboutContent}>
              <ScrollReveal text={profileData.bio} className={styles.aboutText} />

              <div className={styles.aboutHighlightBox}>
                <div className={styles.highlightTitle}>EDUCATION & ACADEMIC STANDING</div>
                <div className={styles.highlightDetail}>
                  <span>{profileData.education.institution} — {profileData.education.degree}</span>
                  <span className={styles.highlightCgpa}>CGPA: {profileData.cgpa}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Terminal Style Quick Facts */}
          <motion.div 
            className={styles.aboutFacts}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {profileData.facts.map((fact, idx) => (
              <div key={idx} className={styles.factCard}>
                <span className={styles.factLabel}>{fact.label}</span>
                <span className={styles.factValue}>{fact.value}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
