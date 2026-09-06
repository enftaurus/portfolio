import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profileData } from "../../data/profile";
import { ScrollReveal } from "../shared/ScrollReveal";
import { AnimatedHeading } from "../shared/AnimatedHeading";
import styles from "./AboutSection.module.css";

// Pixel-art GIF URLs (open, no-auth CDN links)
const PIXEL_TYPING_GIF = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGJ1aDVxMGR3b2N3cHdkbW94aTBkamhscHJsMHBhcGx6Z2hwZ2lndyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZVik7pBtu9dNS/giphy.gif"; // Kermit typing fast
const PIXEL_COFFEE_GIF  = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnI3Y3BmbHV1amJrZWI2d2Q4NHMyeHN4ajdwaWN3azV6M3Y1YXRlMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/o0vwzuFwCGAFO/giphy.gif"; // Coffee cup pixel art

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax decorative elements
  const pyramidY = useTransform(scrollYProgress, [0, 1], [-40, 50]);
  const cloudY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const rotatePyramid = useTransform(scrollYProgress, [0, 1], [0, 15]);

  // LEFT PANEL: starts far off-screen left, slides to center, exits left
  // -200% on a ~60% wide panel ≈ 120vw off left edge (well past screen boundary)
  const leftX = useTransform(
    scrollYProgress,
    [0.0, 0.05, 0.35, 0.58, 0.82, 1.0],
    ["-200%", "-200%", "0%", "0%", "-200%", "-200%"]
  );
  const leftOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.07, 0.30, 0.62, 0.82, 1.0],
    [0, 0, 1, 1, 0, 0]
  );

  // RIGHT PANEL: starts far off-screen right, slides to center, exits right
  const rightX = useTransform(
    scrollYProgress,
    [0.0, 0.05, 0.35, 0.58, 0.82, 1.0],
    ["200%", "200%", "0%", "0%", "200%", "200%"]
  );
  const rightOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.07, 0.30, 0.62, 0.82, 1.0],
    [0, 0, 1, 1, 0, 0]
  );

  return (
    <section id="about" ref={sectionRef} className={styles.aboutSection}>
      {/* Floating Parallax Decorative Voxel Assets */}
      <motion.img
        src="/stone-pyramid-nobg.png"
        alt="Floating Voxel Stone Pyramid"
        className={styles.floatingPyramid}
        style={{ y: pyramidY, rotate: rotatePyramid }}
      />
      <motion.img
        src="/cloud-nobg.png"
        alt="Floating Voxel Cloud"
        className={styles.floatingCloud}
        style={{ y: cloudY }}
      />

      <div className="container">
        <AnimatedHeading
          tag="01 / ABOUT"
          title="ENGINEERING PROFILE"
          subtitle="Bridging high-performance backend microservices and stateful autonomous AI systems."
        />

        {/* slideWrapper clips overflow so off-screen panels don't cause horizontal scrollbars */}
        <div className={styles.slideWrapper}>
          <div className={styles.aboutGrid}>

            {/* LEFT: Main Profile Statement — slides in from FAR LEFT */}
            <motion.div
              className={styles.terminalCard}
              style={{ x: leftX, opacity: leftOpacity }}
            >
              <div className={styles.terminalHeader}>
                <span>~/raja/profile.md</span>
                <span>READ_ONLY</span>
              </div>
              <div className={styles.aboutContent}>
                {/* Animated GIF accent — pixel art typing */}
                <div className={styles.gifAccent}>
                  <img
                    src={PIXEL_TYPING_GIF}
                    alt="Typing fast"
                    className={styles.gifImg}
                    loading="lazy"
                  />
                  <span className={styles.gifCaption}>// current_state: coding</span>
                </div>

                <ScrollReveal text={profileData.bio} className={styles.aboutText} />

                <div className={styles.aboutHighlightBox}>
                  <div className={styles.highlightTitle}>EDUCATION &amp; ACADEMIC STANDING</div>
                  <div className={styles.highlightDetail}>
                    <span>{profileData.education.institution} — {profileData.education.degree}</span>
                    <span className={styles.highlightCgpa}>CGPA: {profileData.cgpa}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Quick Facts + GIF — slides in from FAR RIGHT */}
            <motion.div
              className={styles.aboutFacts}
              style={{ x: rightX, opacity: rightOpacity }}
            >
              {/* Coffee GIF badge at top of facts */}
              <div className={styles.coffeeGifBadge}>
                <img
                  src={PIXEL_COFFEE_GIF}
                  alt="Coffee"
                  className={styles.coffeeGif}
                  loading="lazy"
                />
                <div className={styles.coffeeMeta}>
                  <span className={styles.coffeeLabel}>FUEL_LEVEL</span>
                  <span className={styles.coffeeValue}>☕ CRITICAL — ALWAYS</span>
                </div>
              </div>

              {profileData.facts.map((fact, idx) => (
                <div key={idx} className={styles.factCard}>
                  <span className={styles.factLabel}>{fact.label}</span>
                  <span className={styles.factValue}>{fact.value}</span>
                </div>
              ))}

              {/* Mini nether portal decoration */}
              <div className={styles.netherPortalAccent}>
                <motion.img
                  src="/nether-portal-nobg.png"
                  alt="Nether Portal"
                  className={styles.netherPortal}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className={styles.netherLabel}>// portal to production</span>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};
