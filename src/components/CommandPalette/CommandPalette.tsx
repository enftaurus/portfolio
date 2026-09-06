import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Briefcase, Code2, Cpu, Mail, Copy, Github,
  Linkedin, Terminal, ArrowRight, Check, Download,
} from "lucide-react";
import { profileData } from "../../data/profile";
import styles from "./CommandPalette.module.css";

interface PaletteCmd {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  keywords: string[];
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenTerminal,
}) => {
  const [query, setQuery]           = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [emailCopied, setEmailCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef  = useRef<HTMLDivElement>(null);

  const scrollTo = (hash: string) => {
    onClose();
    setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }), 160);
  };

  const openUrl = (url: string) => {
    onClose();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText("chowdhary.raja0607@gmail.com");
    setEmailCopied(true);
    setTimeout(() => { setEmailCopied(false); onClose(); }, 1200);
  };

  const COMMANDS: PaletteCmd[] = [
    {
      id: "download-resume",
      label: "Download Official Resume (PDF)",
      description: "Raja_Babu_Resume.pdf",
      icon: <Download size={14} />,
      action: () => {
        onClose();
        const link = document.createElement("a");
        link.href = "/rajababu.pdf";
        link.download = "Raja_Babu_Resume.pdf";
        link.target = "_blank";
        link.click();
      },
      keywords: ["resume", "cv", "pdf", "download", "bio"],
    },
    {
      id: "about", label: "Jump to About", description: "Engineering profile",
      icon: <User size={14} />,
      action: () => scrollTo("#about"),
      keywords: ["about", "profile", "who", "me"],
    },
    {
      id: "experience", label: "Jump to Experience", description: "Work & internship history",
      icon: <Briefcase size={14} />,
      action: () => scrollTo("#experience"),
      keywords: ["work", "experience", "job", "intern", "history"],
    },
    {
      id: "projects", label: "Jump to Projects", description: "Open-source builds",
      icon: <Code2 size={14} />,
      action: () => scrollTo("#projects"),
      keywords: ["projects", "builds", "code", "open source"],
    },
    {
      id: "skills", label: "Jump to Skills", description: "System topology graph",
      icon: <Cpu size={14} />,
      action: () => scrollTo("#skills"),
      keywords: ["skills", "stack", "tech", "graph", "nodes"],
    },
    {
      id: "contact", label: "Jump to Contact", description: "Get in touch",
      icon: <Mail size={14} />,
      action: () => scrollTo("#contact"),
      keywords: ["contact", "hire", "reach", "email"],
    },
    {
      id: "copy-email", label: "Copy Email Address",
      description: "chowdhary.raja0607@gmail.com",
      icon: emailCopied ? <Check size={14} /> : <Copy size={14} />,
      action: copyEmail,
      keywords: ["copy", "email", "clipboard", "mail"],
    },
    {
      id: "github", label: "View GitHub", description: "github.com/enftaurus",
      icon: <Github size={14} />,
      action: () => openUrl(profileData.socialLinks.github),
      keywords: ["github", "repos", "code", "source"],
    },
    {
      id: "linkedin", label: "View LinkedIn", description: "Connect professionally",
      icon: <Linkedin size={14} />,
      action: () => openUrl(profileData.socialLinks.linkedin),
      keywords: ["linkedin", "connect", "network", "professional"],
    },
    {
      id: "upwork", label: "View Upwork", description: "Hire for freelance projects",
      icon: <Briefcase size={14} />,
      action: () => openUrl(profileData.socialLinks.upwork),
      keywords: ["upwork", "freelance", "hire", "work", "contract"],
    },
    {
      id: "terminal", label: "Open Terminal", description: "Interactive CLI (press ~)",
      icon: <Terminal size={14} />,
      action: () => { onClose(); setTimeout(onOpenTerminal, 160); },
      keywords: ["terminal", "cli", "shell", "command", "repl"],
    },
  ];

  const filtered =
    query.trim() === ""
      ? COMMANDS
      : COMMANDS.filter(
          c =>
            c.label.toLowerCase().includes(query.toLowerCase()) ||
            c.description.toLowerCase().includes(query.toLowerCase()) ||
            c.keywords.some(k => k.toLowerCase().includes(query.toLowerCase()))
        );

  // Reset selected index when query changes
  useEffect(() => { setSelectedIdx(0); }, [query]);

  // Focus + reset on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIdx(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [isOpen]);

  // Scroll selected item into view
  useEffect(() => {
    const el = listRef.current?.children[selectedIdx] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [selectedIdx]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIdx(i => Math.min(i + 1, filtered.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIdx(i => Math.max(i - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        filtered[selectedIdx]?.action();
        break;
      case "Escape":
        onClose();
        break;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.overlay} onClick={onClose} onKeyDown={handleKeyDown}>
          <motion.div
            className={styles.palette}
            role="dialog"
            aria-label="Command palette"
            onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* ── Input header ──────────────────────────────────────────── */}
            <div className={styles.header}>
              <span className={styles.prompt}>⌘</span>
              <input
                ref={inputRef}
                className={styles.input}
                type="text"
                placeholder="Type a command or search…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
              />
              <kbd className={styles.escKey} onClick={onClose}>ESC</kbd>
            </div>

            {/* ── Results ───────────────────────────────────────────────── */}
            <div className={styles.results} ref={listRef}>
              {filtered.length === 0 ? (
                <p className={styles.empty}>No commands matched "{query}"</p>
              ) : (
                filtered.map((cmd, i) => (
                  <button
                    key={cmd.id}
                    className={`${styles.item} ${i === selectedIdx ? styles.selected : ""}`}
                    onClick={cmd.action}
                    onMouseEnter={() => setSelectedIdx(i)}
                  >
                    <span className={styles.itemIcon}>{cmd.icon}</span>
                    <span className={styles.itemText}>
                      <span className={styles.itemLabel}>{cmd.label}</span>
                      <span className={styles.itemDesc}>{cmd.description}</span>
                    </span>
                    <ArrowRight size={12} className={styles.itemArrow} />
                  </button>
                ))
              )}
            </div>

            {/* ── Footer hints ──────────────────────────────────────────── */}
            <div className={styles.footer}>
              <span><kbd>↑↓</kbd> navigate</span>
              <span><kbd>↵</kbd> execute</span>
              <span><kbd>Esc</kbd> close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
