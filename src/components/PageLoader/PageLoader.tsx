import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./PageLoader.module.css";

interface PageLoaderProps {
  onComplete: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "loading assets...",
    "loading projects...",
    "loading 3d scene...",
    "SYSTEM READY"
  ];

  useEffect(() => {
    const duration = 800; // Sub-1-second initialization
    const interval = 40;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 180);
          return 100;
        }
        
        const stepIdx = Math.min(Math.floor((next / 100) * steps.length), steps.length - 1);
        setCurrentStep(stepIdx);

        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  const barLength = 20;
  const filledLength = Math.round((progress / 100) * barLength);
  const progressBarStr = "█".repeat(filledLength) + "░".repeat(barLength - filledLength);

  return (
    <AnimatePresence>
      <motion.div
        className={styles.loaderOverlay}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.35 } }}
      >
        <div className={styles.loaderBox}>
          <div className={styles.loaderTitle}>INITIALIZING PORTFOLIO</div>
          <div className={styles.loaderBar}>[{progressBarStr}] {Math.round(progress)}%</div>
          <div className={styles.loaderStatus}>&gt; {steps[currentStep]}</div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
