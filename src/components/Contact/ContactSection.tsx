import React from "react";
import { motion } from "framer-motion";
import { profileData } from "../../data/profile";
import { Github, Linkedin, Briefcase, Mail, ArrowUpRight, Code, Zap } from "lucide-react";
import styles from "./Contact.module.css";

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className={styles.contactSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionNumber}>06 / CONTACT</span>
          <h2 className={styles.sectionTitle}>GET IN TOUCH</h2>
          <div className={styles.sectionLine}></div>
        </div>

        <motion.div
          className={styles.contactCard}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.terminalHeader}>
            <span>~/raja/contact.sh</span>
            <span>STATUS: UP_FOR_COLLABORATING</span>
          </div>

          <div className={styles.contactBody}>
            <div className={styles.collabBadge}>
              <Zap size={14} />
              <span>UP FOR COLLABORATING</span>
            </div>

            <h3 className={styles.contactHeading}>Have something interesting to build?</h3>
            <p className={styles.contactSubtext}>
              Whether you're building backend architecture, AI pipelines, distributed monitoring systems, or want to collaborate on research — my inbox is open!
            </p>

            <div className={styles.contactLinks}>
              <a
                href={profileData.socialLinks.email}
                className={styles.btnPrimary}
              >
                <Mail size={18} />
                <span>[ EMAIL ↗ ]</span>
                <ArrowUpRight size={16} />
              </a>

              <a
                href={profileData.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnOutline}
              >
                <Github size={18} />
                <span>[ GITHUB ↗ ]</span>
                <ArrowUpRight size={16} />
              </a>

              <a
                href={profileData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnOutline}
              >
                <Linkedin size={18} />
                <span>[ LINKEDIN ↗ ]</span>
                <ArrowUpRight size={16} />
              </a>

              <a
                href={profileData.socialLinks.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnOutline}
              >
                <Briefcase size={18} />
                <span>[ UPWORK ↗ ]</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className={styles.footerArea}>
          <div className={styles.footerContent}>
            <div className={styles.footerRowMain}>
              <div className={styles.footerBrand}>
                <span className={styles.brandName}>{profileData.name}</span>
                <span className={styles.brandCopy}>© 2026</span>
              </div>

              <div className={styles.footerNote}>
                <Code size={14} className={styles.codeIcon} />
                <span>built with React and questionable amounts of caffeine</span>
              </div>
            </div>


          </div>
        </footer>
      </div>
    </section>
  );
};
