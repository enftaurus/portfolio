import React, { useState } from "react";
import confetti from "canvas-confetti";
import styles from "./RunningCat.module.css";

interface RunningCatProps {
  className?: string;
}

export const RunningCat: React.FC<RunningCatProps> = ({ className = "" }) => {
  const [meowText, setMeowText] = useState<string | null>(null);

  const MEOWS = [
    "MEOW! 🐾",
    "PURRR... ⚡",
    "VOXEL CAT DETECTED! 🐱",
    "SHIPPING CODE! 🚀",
    "MEOW MEOW! ☕",
  ];

  const handleCatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const randomMeow = MEOWS[Math.floor(Math.random() * MEOWS.length)];
    setMeowText(randomMeow);

    confetti({
      particleCount: 30,
      spread: 50,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      },
    });

    setTimeout(() => {
      setMeowText(null);
    }, 2000);
  };

  return (
    <div className={`${styles.catTrack} ${className}`}>
      <div
        className={styles.catContainer}
        onClick={handleCatClick}
        title="Click the running voxel cat!"
      >
        <img
          src="/cat-nobg.png"
          alt="Running Voxel Cat"
          className={styles.catImg}
        />
        {meowText && <div className={styles.catBubble}>{meowText}</div>}
      </div>
    </div>
  );
};
