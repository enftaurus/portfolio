import React, { useRef } from "react";
import styles from "./MagicCard.module.css";

interface MagicCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const MagicCard: React.FC<MagicCardProps> = ({
  children,
  className = "",
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
    cardRef.current.style.setProperty("--mouse-opacity", "1");
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--mouse-opacity", "0");
  };

  return (
    <div
      ref={cardRef}
      className={`${styles.magicCardWrapper} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className={styles.magicCardGlow} />
      <div className={styles.magicCardContent}>{children}</div>
    </div>
  );
};
