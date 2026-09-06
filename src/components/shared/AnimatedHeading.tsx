import React from "react";
import styles from "./AnimatedHeading.module.css";

interface AnimatedHeadingProps {
  title: string;
  subtitle?: string;
  tag?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  title,
  subtitle,
  tag,
  align = "left",
  className = "",
}) => {
  const words = title.split(" ");

  const alignClass =
    align === "center"
      ? styles.alignCenter
      : align === "right"
      ? styles.alignRight
      : styles.alignLeft;

  let totalCharCount = 0;

  return (
    <div className={`${styles.headingContainer} ${alignClass} ${className}`}>
      {tag && (
        <div className={styles.headingTag}>
          <span className={styles.tagBracket}>[</span>
          <span>{tag}</span>
          <span className={styles.tagBracket}>]</span>
        </div>
      )}

      <h2 className={styles.mainTitle}>
        {words.map((word, wIdx) => (
          <span key={wIdx} className={styles.wordBlock}>
            {word.split("").map((char, cIdx) => {
              const charDelay = (totalCharCount++) * 0.08;
              return (
                <span
                  key={cIdx}
                  className={styles.charSpan}
                  style={{ animationDelay: `${charDelay}s` }}
                >
                  {char}
                </span>
              );
            })}
          </span>
        ))}
      </h2>

      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

      <div className={styles.accentBar}>
        <div className={styles.accentBeam} />
      </div>
    </div>
  );
};
