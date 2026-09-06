import React from "react";
import styles from "./Marquee.module.css";

interface MarqueeProps {
  direction?: "left" | "right";
  keywordsRow1?: string[];
  keywordsRow2?: string[];
  className?: string;
}

const ROW1_KEYWORDS = [
  "Prompt Engineering",
  "Vector Databases",
  "Generative AI",
  "Agentic Workflows",
  "Large Language Models (LLMs)",
  "FastAPI",
  "LangGraph",
  "Go",
];

const ROW2_KEYWORDS = [
  "Model Fine-tuning",
  "Deep Learning",
  "Generative AI",
  "Agentic Workflows",
  "Backend Engineering",
  "PostgreSQL",
  "AWS Bedrock",
  "Redis",
];

export const Marquee: React.FC<MarqueeProps> = ({
  direction = "left",
  keywordsRow1 = ROW1_KEYWORDS,
  keywordsRow2 = ROW2_KEYWORDS,
  className = "",
}) => {
  const isReversed = direction === "right";

  return (
    <div className={`${styles.marqueeContainer} ${className}`}>
      {/* Nether Portal Framing Graphics */}
      <img
        src="/nether-portal-nobg.png"
        alt="Nether Portal"
        className={styles.portalLeft}
      />
      <img
        src="/nether-portal-nobg.png"
        alt="Nether Portal"
        className={styles.portalRight}
      />

      {/* Slanted Marquee Ribbon Row 1 */}
      <div className={styles.marqueeRow1}>
        <div
          className={`${styles.marqueeTextwrapperHold} ${
            isReversed ? styles.reverse : ""
          }`}
        >
          <div className={styles.marqueeTrack}>
            {keywordsRow1.map((kw, i) => (
              <span key={`r1-1-${i}`} className={styles.marqueeItem}>
                <span>{kw}</span>
                <span className={styles.bullet}>•</span>
              </span>
            ))}
          </div>

          <div className={styles.marqueeTrack}>
            {keywordsRow1.map((kw, i) => (
              <span key={`r1-2-${i}`} className={styles.marqueeItem}>
                <span>{kw}</span>
                <span className={styles.bullet}>•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Slanted Marquee Ribbon Row 2 (Reversed direction) */}
      <div className={styles.marqueeRow2}>
        <div
          className={`${styles.marqueeTextwrapperHold} ${
            !isReversed ? styles.reverse : ""
          }`}
        >
          <div className={styles.marqueeTrack}>
            {keywordsRow2.map((kw, i) => (
              <span key={`r2-1-${i}`} className={styles.marqueeItem}>
                <span>{kw}</span>
                <span className={styles.bullet}>•</span>
              </span>
            ))}
          </div>

          <div className={styles.marqueeTrack}>
            {keywordsRow2.map((kw, i) => (
              <span key={`r2-2-${i}`} className={styles.marqueeItem}>
                <span>{kw}</span>
                <span className={styles.bullet}>•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
