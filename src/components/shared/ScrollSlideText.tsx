import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollSlideTextProps {
  text: string;
  className?: string;
  direction?: "left" | "right"; // which side it enters FROM
  distance?: number; // how far it travels, in px
}

export const ScrollSlideText: React.FC<ScrollSlideTextProps> = ({
  text,
  className,
  direction = "left",
  distance = 400,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Track this element's position through the ENTIRE viewport pass —
  // starts when it enters from bottom, ends when it exits top.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // covers full enter-to-exit journey
  });

  const startX = direction === "left" ? -distance : distance;
  const endX = direction === "left" ? distance : -distance;

  // 0 -> enters from side, 0.5 -> dead center, 1 -> exits opposite side
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [startX, 0, endX]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.5, 0.85, 1],
    [0, 1, 1, 1, 0]
  );

  return (
    <div ref={ref} style={{ overflow: "hidden" }}>
      <motion.div className={className} style={{ x, opacity }}>
        {text}
      </motion.div>
    </div>
  );
};
