import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SkillGraph } from "./SkillGraph";
import { skillCategoriesData } from "../../data/skills";
import { AnimatedHeading } from "../shared/AnimatedHeading";
import styles from "./Skills.module.css";

// Pixel art / animated GIF accents
const MATRIX_GIF  = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnRsemJ5NnFuYjQ3ZzM3OWgzdHlxMGNxY29ob3ZkZjB0b3N4a2VkbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YQitE4YNQNahy/giphy.gif";
const LLAMA_GIF   = "/llama-nobg.png";

export const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const cloudY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const bookY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  // Slide animation — whole content block slides in from left, exits left
  const contentX = useTransform(
    scrollYProgress,
    [0.0, 0.05, 0.30, 0.70, 0.90, 1.0],
    ["-120%", "-120%", "0%", "0%", "-120%", "-120%"]
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.07, 0.28, 0.72, 0.90, 1.0],
    [0, 0, 1, 1, 0, 0]
  );

  return (
    <section id="skills" ref={sectionRef} className={styles.skillsSection}>
      {/* Floating Parallax Decorative Shapes */}
      <motion.img
        src="/cloud-nobg.png"
        alt="Floating Cloud"
        className={styles.floatingCloud}
        style={{ y: cloudY }}
      />
      <motion.img
        src="/enchantedbook-nobg.png"
        alt="Floating Enchanted Book"
        className={styles.floatingBook}
        style={{ y: bookY }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <AnimatedHeading
          tag="04 / STACK"
          title="SYSTEM TOPOLOGY & TECH STACK"
          subtitle="Interactive graph of core technologies, production AI frameworks, and distributed system microservices."
        />

        {/* Slide wrapper — whole section content slides in together */}
        <div className={styles.slideWrapper}>
          <motion.div style={{ x: contentX, opacity: contentOpacity }}>

            {/* 1. Interactive Node Graph */}
            <div className={styles.graphFrame}>
              <div className={styles.graphFrameHeader}>
                <div className={styles.headerLeft}>
                  <img src={MATRIX_GIF} alt="matrix" className={styles.matrixGif} />
                  <span>RAJA_WORKSTATION // SYSTEM_TOPOLOGY</span>
                </div>
                <span>HOVER NODE TO FOCUS</span>
              </div>
              <div className={styles.graphFrameBody}>
                <SkillGraph />
              </div>
            </div>

            {/* Graph hint row with bouncing llama */}
            <div className={styles.graphHintRow}>
              <p className={styles.graphHint}>
                Dashed lines = production system pipelines&nbsp;&nbsp;·&nbsp;&nbsp;
                Hover a category hub or legend to isolate its skill cluster
              </p>
              <motion.img
                src={LLAMA_GIF}
                alt="Minecraft Llama"
                className={styles.llamaAccent}
                animate={{ y: [0, -6, 0], rotate: [0, 3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* 2. Structured Stack Cards Grid — same original layout */}
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

          </motion.div>
        </div>
      </div>
    </section>
  );
};
