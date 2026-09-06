import React, { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Briefcase, ArrowUpRight, ArrowDownRight, Download, Trophy } from "lucide-react";
import { profileData } from "../../data/profile";
import styles from "./HeroSection.module.css";

const HEADLINE_TEXT = "Hey, I'm a Software Engineer.";
const HEADLINE_WORDS = HEADLINE_TEXT.split(" ");

// Cache buster version query string to ensure browser loads latest image
const BASE_IMG_URL = "/transparent-base.png?v=3";
const FLAME_IMG_URL = "/transparent-flame.png?v=3";

export const HeroSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const flameRef = useRef<HTMLDivElement>(null);

  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const smoothPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetOpacityRef = useRef<number>(1);
  const smoothOpacityRef = useRef<number>(1);

  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafIdRef = useRef<number | null>(null);

  // Preload both images with cache-busting
  useEffect(() => {
    let isMounted = true;

    const preloadImage = (src: string) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = src;
        if (img.complete) resolve();
      });
    };

    Promise.all([
      preloadImage(BASE_IMG_URL),
      preloadImage(FLAME_IMG_URL),
    ]).then(() => {
      if (isMounted) {
        setIsLoaded(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Low latency cursor tracking + 100ms inactivity timeout loop
  useEffect(() => {
    const initX = window.innerWidth / 2;
    const initY = window.innerHeight / 2;

    mousePosRef.current = { x: initX, y: initY };
    smoothPosRef.current = { x: initX, y: initY };

    if (flameRef.current) {
      flameRef.current.style.setProperty("--x", `${initX}px`);
      flameRef.current.style.setProperty("--y", `${initY}px`);
      flameRef.current.style.setProperty("--flame-opacity", "1");
    }

    const resetInactivityTimer = () => {
      targetOpacityRef.current = 1;
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      // 100ms inactivity timeout as requested
      inactivityTimerRef.current = setTimeout(() => {
        targetOpacityRef.current = 0;
      }, 100);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current.x = e.clientX;
      mousePosRef.current.y = e.clientY;
      resetInactivityTimer();
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        mousePosRef.current.x = e.touches[0].clientX;
        mousePosRef.current.y = e.touches[0].clientY;
        resetInactivityTimer();
      }
    };

    resetInactivityTimer();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleTouch, { passive: true });
    window.addEventListener("touchmove", handleTouch, { passive: true });

    const animate = () => {
      const targetX = mousePosRef.current.x;
      const targetY = mousePosRef.current.y;
      const targetOpacity = targetOpacityRef.current;

      smoothPosRef.current.x += (targetX - smoothPosRef.current.x) * 0.25;
      smoothPosRef.current.y += (targetY - smoothPosRef.current.y) * 0.25;

      smoothOpacityRef.current += (targetOpacity - smoothOpacityRef.current) * 0.15;

      if (flameRef.current) {
        flameRef.current.style.setProperty("--x", `${smoothPosRef.current.x}px`);
        flameRef.current.style.setProperty("--y", `${smoothPosRef.current.y}px`);
        flameRef.current.style.setProperty(
          "--flame-opacity",
          `${smoothOpacityRef.current.toFixed(3)}`
        );
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("touchmove", handleTouch);
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <section id="hero" className={styles.heroSection}>
      {/* Background glow accent */}
      <div className={styles.bgGlow} />

      {/* Background Watermark Typography */}
      <div className={styles.bgWatermark} aria-hidden="true">
        SOFTWARE
      </div>

      {/* FULL SCREEN AVATAR STAGE (CENTERED FULL VIEWPORT) */}
      <div className={styles.heroAvatarStage}>
        {/* Base Voxel Avatar Image */}
        <img
          src={BASE_IMG_URL}
          className={styles.avatarBaseImg}
          alt="Software Engineer Voxel Avatar"
        />

        {/* Flame Reveal Layer with Radial Spotlight Mask */}
        <div
          ref={flameRef}
          className={styles.avatarFlameLayer}
          aria-hidden="true"
        />
      </div>

      {/* TEXT OVERLAY CONTENT (Overlaid ON TOP of full-screen avatar on left) */}
      <div
        className={`${styles.heroOverlayContent} ${
          isLoaded ? styles.heroOverlayContentLoaded : ""
        }`}
      >
        {!isLoaded ? (
          <div className={styles.skeletonLeft}>
            <div className={styles.skeletonBadge} />
            <div className={styles.skeletonHeading} />
            <div className={styles.skeletonSubheading} />
            <div className={styles.skeletonButtons} />
          </div>
        ) : (
          <div className={styles.heroTextCol}>
            <div className={styles.heroTag}>
              <span className={styles.tagBracket}>[</span>
              <span>DEVELOPER PORTFOLIO</span>
              <span className={styles.tagBracket}>]</span>
            </div>

            <h1 className={styles.heroHeading}>
              {HEADLINE_WORDS.map((word, index) => (
                <span key={index} className={styles.wordWrapper}>
                  <span
                    className={styles.wordReveal}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {word}
                  </span>
                  {index < HEADLINE_WORDS.length - 1 ? "\u00A0" : ""}
                </span>
              ))}
            </h1>

            <p className={styles.heroSubheading}>
              {profileData.subheading}
            </p>

            <div className={styles.heroActions}>
              <a
                href="/rajababu.pdf"
                download="Raja_Babu_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPrimary}
              >
                <Download size={18} />
                <span>Download Resume</span>
                <ArrowUpRight size={14} />
              </a>

              {profileData.socialLinks.github && (
                <a
                  href={profileData.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnOutline}
                >
                  <Github size={18} />
                  <span>GitHub</span>
                  <ArrowUpRight size={14} />
                </a>
              )}

              {profileData.socialLinks.linkedin && (
                <a
                  href={profileData.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnOutline}
                >
                  <Linkedin size={18} />
                  <span>LinkedIn</span>
                  <ArrowUpRight size={14} />
                </a>
              )}

              {profileData.socialLinks.upwork && (
                <a
                  href={profileData.socialLinks.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnOutline}
                >
                  <Briefcase size={16} />
                  <span>Upwork</span>
                  <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </div>
        )}

        {/* Hero Footer / Scroll Indicator */}
        <div className={styles.heroFooter}>
          <a
            href="#about"
            className={styles.scrollIndicator}
            aria-label="Scroll down to About section"
          >
            <span>SCROLL DOWN</span>
            <ArrowDownRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};
