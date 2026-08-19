import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Briefcase, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AnimatedHeading } from "./AnimatedHeading";
import { profileData } from "../../data/profile";
import styles from "./HeroSection.module.css";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

const TICKER_ITEMS = [
  "LangGraph", "·", "Go", "·", "Python", "·", "FastAPI", "·",
  "PostgreSQL", "·", "Redis", "·", "pgvector", "·", "Docker", "·",
  "AWS Bedrock", "·", "LangChain", "·", "Distributed Systems", "·",
  "Agentic AI", "·", "Backend Engineering", "·", "Applied AI", "·",
];
const TAPE = TICKER_ITEMS.join("  ");

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className={styles.heroSection}>
      {/* Full-bleed network-nodes video */}
      <video
        className={styles.heroBgVideo}
        src="/videos/network-nodes.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Gradient overlay */}
      <div className={styles.heroOverlay} />

      {/* Main content */}
      <div className={`container ${styles.heroContent}`}>
        {/* Tag line */}
        <motion.div className={styles.heroTag} {...fadeUp(0)}>
          <span className={styles.tagBracket}>[</span>
          <span>CS UNDERGRAD</span>
          <span className={styles.tagSeparator}>·</span>
          <span>BACKEND ENGINEERING</span>
          <span className={styles.tagSeparator}>·</span>
          <span>APPLIED AI</span>
          <span className={styles.tagBracket}>]</span>
        </motion.div>

        {/* Animated word-by-word heading */}
        <AnimatedHeading
          text={profileData.name}
          className={styles.heroName}
        />

        {/* Bio */}
        <motion.p className={styles.heroBio} {...fadeUp(0.6)}>
          {profileData.subheading}
        </motion.p>

        {/* Action buttons */}
        <motion.div className={styles.heroActions} {...fadeUp(0.8)}>
          <a
            href={profileData.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnPrimary}
          >
            <Github size={16} />
            <span>GitHub</span>
            <ArrowUpRight size={14} />
          </a>

          <a
            href={profileData.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnOutline}
          >
            <Linkedin size={16} />
            <span>LinkedIn</span>
            <ArrowUpRight size={14} />
          </a>

          <a
            href={profileData.socialLinks.upwork}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnOutline}
          >
            <Briefcase size={16} />
            <span>Upwork</span>
            <ArrowUpRight size={14} />
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div className={styles.heroStats} {...fadeUp(1.0)}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>9.09</span>
            <span className={styles.statLabel}>B.E. CGPA</span>
          </div>
          <div className={styles.statDivider}>/</div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>RUNNER-UP</span>
            <span className={styles.statLabel}>GenAI Forge '26</span>
          </div>
          <div className={styles.statDivider}>/</div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>Go + Python</span>
            <span className={styles.statLabel}>Core Stack</span>
          </div>
          <div className={styles.statDivider}>/</div>
          <div className={styles.statItem}>
            <span className={styles.statValue} style={{ color: "var(--accent)" }}>98% ☕</span>
            <span className={styles.statLabel}>Caffeine Load</span>
          </div>
        </motion.div>
      </div>

      {/* ── Full-width centered tech ticker ─────────────────────────────── */}
      <motion.div
        className={styles.techTicker}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div className={styles.tickerTrack}>
          <motion.div
            className={styles.tickerInner}
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
          >
            <span>{TAPE}&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>{TAPE}&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <a href="#about" className={styles.scrollIndicator} aria-label="Scroll down to About section">
        <span>SCROLL DOWN</span>
        <ArrowDownRight size={14} />
      </a>
    </section>
  );
};
