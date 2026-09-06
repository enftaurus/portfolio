import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Linkedin, Github, Briefcase, ArrowUpRight, Download } from "lucide-react";
import { profileData } from "../../data/profile";
import { MagicCard } from "../shared/MagicCard";
import styles from "./CTA.module.css";

export const CTASection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-linked parallax vertical transform for night sky background image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const skyY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section id="contact" ref={sectionRef} className={styles.ctaSection}>
      {/* Parallax Night Sky Background Image */}
      <motion.img
        src="/sky-bg.png"
        alt="Minecraft Night Sky Landscape"
        className={styles.skyBackground}
        style={{ y: skyY }}
      />

      {/* Top and Bottom Gradient Blends */}
      <div className={styles.topOverlay} />
      <div className={styles.bottomOverlay} />

      {/* Centered Card Container with Llama Mascot Perched on Top */}
      <div className={styles.ctaCardContainer}>
        <img
          src="/llama-nobg.png"
          alt="Llama Mascot"
          className={styles.llamaMascot}
        />

        <MagicCard>
          <div className={styles.ctaCardContent}>
            <div className={styles.eyebrow}>
              [ CONTACT & COLLABORATION ]
            </div>

            <h2 className={styles.headline}>
              Let's Build Something Extraordinary.
            </h2>

            <p className={styles.paragraph}>
              Whether you are looking to collaborate on multi-agent AI systems, high-throughput microservices, or building software from first principles—my inbox is open.
            </p>

            <div className={styles.contactLinksRow}>
              <a
                href="/rajababu.pdf"
                download="Raja_Babu_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
                style={{ color: "#38bdf8", fontWeight: 700 }}
              >
                <Download size={15} />
                <span>Resume PDF</span>
                <ArrowUpRight size={13} />
              </a>

              <span className={styles.bullet}>·</span>

              {profileData.socialLinks.email && (
                <a
                  href={profileData.socialLinks.email}
                  className={styles.contactLink}
                >
                  <Mail size={15} />
                  <span>Email</span>
                  <ArrowUpRight size={13} />
                </a>
              )}

              <span className={styles.bullet}>·</span>

              {profileData.socialLinks.linkedin && (
                <a
                  href={profileData.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  <Linkedin size={15} />
                  <span>LinkedIn</span>
                  <ArrowUpRight size={13} />
                </a>
              )}

              <span className={styles.bullet}>·</span>

              {profileData.socialLinks.github && (
                <a
                  href={profileData.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  <Github size={15} />
                  <span>GitHub</span>
                  <ArrowUpRight size={13} />
                </a>
              )}

              {profileData.socialLinks.upwork && (
                <>
                  <span className={styles.bullet}>·</span>
                  <a
                    href={profileData.socialLinks.upwork}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.contactLink}
                  >
                    <Briefcase size={15} />
                    <span>Upwork</span>
                    <ArrowUpRight size={13} />
                  </a>
                </>
              )}
            </div>
          </div>
        </MagicCard>
      </div>
    </section>
  );
};
