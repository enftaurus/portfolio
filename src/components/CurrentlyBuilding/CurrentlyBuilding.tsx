import React from "react";
import { motion } from "framer-motion";
import { currentlyBuildingData } from "../../data/philosophy";
import { Activity } from "lucide-react";
import styles from "./CurrentlyBuilding.module.css";

export const CurrentlyBuilding: React.FC = () => {
  const getSubtext = (name: string) => {
    if (name.includes("Stay Up")) {
      return "Distributed cloud monitoring service for vibe coders to keep free instances spinning 24/7";
    }
    if (name.includes("Eterno")) {
      return "One-stop platform for students to master DSA & become exceptional software engineers";
    }
    return "Backend engineering workstation & interactive system portfolio";
  };

  return (
    <section className={styles.currentlySection}>
      <div className="container">
        <motion.div
          className={styles.currentlyCard}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.terminalHeader}>
            <div className={styles.headerLeft}>
              <Activity size={14} className={styles.pulseIcon} />
              <span>~/raja/currently</span>
            </div>
            <span className={styles.statusLive}>&gt; project --active --list</span>
          </div>

          <div className={styles.currentlyBody}>
            <div className={styles.projectsProgressList}>
              {currentlyBuildingData.map((item, idx) => {
                const barLength = 20;
                const filledLength = Math.round((item.progress / 100) * barLength);
                const progressBarStr = "█".repeat(filledLength) + "░".repeat(barLength - filledLength);

                return (
                  <div key={idx} className={styles.progressItemBlock}>
                    <div className={styles.progressItemTop}>
                      <span className={styles.progressBarAscii}>[{progressBarStr}]</span>
                      <span className={styles.projectName}>{item.name}</span>
                      <span className={styles.projectPercent}>{item.progress}%</span>
                    </div>
                    <span className={styles.projectSubtext}>&gt; {getSubtext(item.name)}</span>
                  </div>
                );
              })}
            </div>

            <div className={styles.currentlyStatusFooter}>
              <span className={styles.statusLabel}>&gt; SYSTEM STATUS: ACTIVE DEVELOPMENT</span>
              <div className={styles.statusPill}>
                <span className={styles.pulseDot}></span>
                <span>OPEN FOR COLLABORATION</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
