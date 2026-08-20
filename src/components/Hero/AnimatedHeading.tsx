import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./AnimatedHeading.module.css";

interface AnimatedHeadingProps {
  text: string;
  className?: string;
}

/* ─── Entry animation ─────────────────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045 },
  },
};

const wordReveal = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

/* ─── Continuous float per word ───────────────────────────────────────────── */
// Each word floats on a slightly different timeline (wordIndex * 0.28 s offset)
// producing a smooth wave-like ripple across the name.
const floatTransition = (wordIndex: number) => ({
  duration: 3.2,
  ease: "easeInOut",
  repeat: Infinity,
  repeatType: "mirror" as const,
  delay: wordIndex * 0.28,
});

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  text,
  className,
}) => {
  const words = text.split(" ");
  const [revealed, setRevealed] = useState(false);

  // Once the staggered reveal finishes, activate the floating phase.
  // Total entry time ≈ stagger × words + 0.5 s word duration
  useEffect(() => {
    const totalRevealMs = words.length * 45 + 500 + 100; // small buffer
    const timer = setTimeout(() => setRevealed(true), totalRevealMs);
    return () => clearTimeout(timer);
  }, [words.length]);

  return (
    <motion.h1
      className={`${className ?? ""} ${styles.shimmerWrapper}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordReveal}
          style={{ display: "inline-block", marginRight: "0.28em" }}
          // Once revealed, start the continuous float
          animate={revealed ? { y: [0, -8, 0] } : undefined}
          transition={revealed ? floatTransition(i) : undefined}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
};
