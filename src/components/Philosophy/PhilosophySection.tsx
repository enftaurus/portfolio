import React from "react";
import { ScrollSlideText } from "../shared/ScrollSlideText";
import { AnimatedHeading } from "../shared/AnimatedHeading";
import styles from "./Philosophy.module.css";

// System-timeline statements — each slides across the full width as you scroll
const SLIDES = [
  {
    label:  "SYSTEM_01",
    sub:    "Architecture",
    text:   "ENGINEERED SYSTEMS THAT SCALE",
    dir:    "left"  as const,
  },
  {
    label:  "SYSTEM_02",
    sub:    "Philosophy",
    text:   "PRODUCTION FEEDBACK BEATS THEORY",
    dir:    "right" as const,
  },
  {
    label:  "SYSTEM_03",
    sub:    "AI Engineering",
    text:   "AGENTIC PIPELINES THAT ACTUALLY SHIP",
    dir:    "left"  as const,
  },
  {
    label:  "SYSTEM_04",
    sub:    "Reliability",
    text:   "BUILD IT · STRESS IT · FIX THE BOTTLENECK",
    dir:    "right" as const,
  },
];

export const PhilosophySection: React.FC = () => {
  return (
    <section id="philosophy" className={styles.philosophySection}>
      {/* Network-nodes ambient background */}
      <video
        className={styles.nodesBgVideo}
        src="/videos/network-nodes.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className={styles.nodesOverlay} />

      {/* Section label — inside container */}
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <AnimatedHeading
          tag="05 / HOW I BUILD"
          title="ENGINEERING PHILOSOPHY"
          subtitle="First-principles development, low-level mechanics, and stress-tested architectures."
        />
      </div>

      {/* Full-width slide tracks */}
      <div className={styles.slidesWrapper}>
        {SLIDES.map((slide) => (
          <div key={slide.label} className={styles.slideRow}>
            <ScrollSlideText
              text={slide.text}
              className={styles.slideHeadline}
              direction={slide.dir}
              distance={560}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
