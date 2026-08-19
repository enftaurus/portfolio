import React from "react";
import { motion } from "framer-motion";
import { SkillGraph } from "./SkillGraph";
import styles from "./Skills.module.css";

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className={styles.skillsSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionNumber}>04 / STACK</span>
          <h2 className={styles.sectionTitle}>SYSTEM TOPOLOGY</h2>
          <div className={styles.sectionLine} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Terminal chrome wrapper */}
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
      </div>
    </section>
  );
};
