import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollRevealProps {
  text: string;
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  text,
  className,
}) => {
  const ref = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.35"],
  });

  const words = text.split(" ");
  const total = words.length;

  return (
    <p
      ref={ref}
      className={className}
      style={{ display: "flex", flexWrap: "wrap", gap: "0 0.3em" }}
    >
      {words.map((word, i) => {
        // Each word occupies a slice of [0, 1] scrollYProgress
        // so words brighten sequentially as the section scrolls in
        const start = i / total;
        const end = Math.min((i + 1.5) / total, 1);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(
          scrollYProgress,
          [start, end],
          [0.15, 1]
        );

        return (
          <motion.span key={i} style={{ opacity }}>
            {word}
          </motion.span>
        );
      })}
    </p>
  );
};
