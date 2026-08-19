import React from "react";
import { motion } from "framer-motion";
import styles from "./GlitchBadge.module.css";

/**
 * GlitchBadge — floats in the bottom-right of the hero section.
 * Covers the Gemini watermark on the hero video with a moving-text marquee
 * styled as a retro terminal status strip.
 */
export const GlitchBadge: React.FC = () => {
  const tape =
    "RAJA@WORKSTATION · GO · PYTHON · LANGGRAPH · DISTRIBUTED SYSTEMS · APPLIED AI · BACKEND ENGINEERING · CS UNDERGRAD · ";

  return (
    <div className={styles.badge}>
      {/* Scrolling marquee text */}
      <div className={styles.marqueeTrack} aria-hidden="true">
        <motion.div
          className={styles.marqueeInner}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
        >
          {/* Duplicate so it loops seamlessly */}
          <span>{tape}</span>
          <span>{tape}</span>
        </motion.div>
      </div>

      {/* Glitch overlay scanline */}
      <div className={styles.scanline} />
    </div>
  );
};
