import React, { useState, useEffect } from "react";
import { Terminal } from "lucide-react";
import styles from "./Navbar.module.css";

interface NavbarProps {
  onOpenTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ""}`}>
      <div className={`container ${styles.navContent}`}>
        <a href="#hero" className={styles.navLogo}>
          <span className={styles.logoAccent}>RAJA</span>.BABU
        </a>

        <nav className={styles.navLinks}>
          <a href="#about" className={styles.navLink}>ABOUT</a>
          <a href="#experience" className={styles.navLink}>WORK</a>
          <a href="#projects" className={styles.navLink}>PROJECTS</a>
          <a href="#skills" className={styles.navLink}>STACK</a>
          <a href="#contact" className={styles.navLink}>CONTACT</a>
        </nav>

        <div className={styles.navActions}>
          <button 
            onClick={onOpenTerminal}
            className={styles.terminalBtn}
            title="Press ~ to toggle terminal"
          >
            <Terminal size={14} />
            <span className={styles.terminalBtnText}>TERMINAL</span>
            <kbd className={styles.terminalKbd}>~</kbd>
          </button>

          <div className={styles.statusPill}>
            <span className={styles.pulseDot}></span>
            <span>BUILDING</span>
          </div>
        </div>
      </div>
    </header>
  );
};
