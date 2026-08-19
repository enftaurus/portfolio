import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import styles from "./CustomCursor.module.css";

const SPRING_CONFIG = { damping: 26, stiffness: 340, mass: 0.4 };
const MAGNETIC_LERP = 0.65;

type CursorMode = "" | "VIEW" | "↗" | "●";

function getMagneticTarget(
  el: Element | null
): HTMLElement | null {
  if (!el) return null;
  const a = el.closest("a");
  const btn = el.closest("button");
  const card = el.closest("[class*='projectCard']");
  if (a) return a as HTMLElement;
  if (btn) return btn as HTMLElement;
  if (card) return card as HTMLElement;
  return null;
}

export const CustomCursor: React.FC = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, SPRING_CONFIG);
  const springY = useSpring(cursorY, SPRING_CONFIG);

  const [cursorMode, setCursorMode] = useState<CursorMode>("");
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const magnetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const magTarget = getMagneticTarget(target);
      magnetRef.current = magTarget;

      if (magTarget) {
        const rect = magTarget.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        // Pull cursor 65% toward the element's centre
        cursorX.set(e.clientX + (cx - e.clientX) * MAGNETIC_LERP);
        cursorY.set(e.clientY + (cy - e.clientY) * MAGNETIC_LERP);
      } else {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const projectCard = target.closest("[class*='projectCard']");
      const heroVideo = target.closest(
        "[class*='heroBgVideo'], [class*='heroContent']"
      );
      const linkOrBtn = target.closest("a, button");

      if (projectCard) {
        setCursorMode("VIEW");
        setIsActive(true);
      } else if (heroVideo) {
        setCursorMode("●");
        setIsActive(true);
      } else if (linkOrBtn) {
        setCursorMode("↗");
        setIsActive(true);
      } else {
        setCursorMode("");
        setIsActive(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <motion.div
      className={`${styles.customCursor} ${isActive ? styles.isActive : ""}`}
      style={{
        x: springX,
        y: springY,
      }}
    >
      <div className={styles.cursorDot} />
      {cursorMode && (
        <span className={styles.cursorText}>{cursorMode}</span>
      )}
    </motion.div>
  );
};
