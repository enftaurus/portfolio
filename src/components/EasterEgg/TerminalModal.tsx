import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal as TerminalIcon, CornerDownLeft } from "lucide-react";
import confetti from "canvas-confetti";
import styles from "./TerminalModal.module.css";

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandLog {
  command: string;
  output: string | React.ReactNode;
}

const COMMAND_REGISTRY = [
  "help",
  "about",
  "resume",
  "projects",
  "skills",
  "contact",
  "coffee",
  "sudo hire-raja",
  "clear",
  "exit",
];

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {
  const [inputVal, setInputVal] = useState("");
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      command: "welcome",
      output: (
        <div>
          <div>RAJA BABU KURRA INTERACTIVE TERMINAL v2.0</div>
          <div>Type <span style={{ color: "var(--accent)" }}>help</span> or tap quick actions below. Press <kbd style={{ background: "rgba(255,255,255,0.1)", padding: "1px 4px", borderRadius: "3px" }}>Tab</kbd> to autofill.</div>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const runCommandStr = (cmdRaw: string) => {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    let output: React.ReactNode = "";

    switch (cmd) {
      case "help":
        output = (
          <div>
            <div style={{ color: "var(--accent)", marginBottom: "4px" }}>AVAILABLE COMMANDS:</div>
            <div>• <span style={{ color: "#00e5ff" }}>about</span>       : Print engineering background & research interest</div>
            <div>• <span style={{ color: "#00e5ff" }}>resume</span>      : Download official PDF resume (Raja_Babu_Resume.pdf)</div>
            <div>• <span style={{ color: "#00e5ff" }}>projects</span>    : List open-source platforms (intrvyuuu, ZeroNet, Stay Up, Eterno)</div>
            <div>• <span style={{ color: "#00e5ff" }}>skills</span>      : Display backend & AI tech stack</div>
            <div>• <span style={{ color: "#00e5ff" }}>contact</span>     : Print direct email & collaboration info</div>
            <div>• <span style={{ color: "#00e5ff" }}>coffee</span>      : Brew virtual espresso</div>
            <div>• <span style={{ color: "var(--accent)", fontWeight: "bold" }}>sudo hire-raja</span> : Authorize engineering hire offer</div>
            <div>• <span style={{ color: "#00e5ff" }}>clear</span>       : Clear terminal history</div>
            <div>• <span style={{ color: "#00e5ff" }}>exit</span>        : Close terminal window</div>
          </div>
        );
        break;

      case "resume":
      case "download":
      case "download-resume":
        {
          const link = document.createElement("a");
          link.href = "/rajababu.pdf";
          link.download = "Raja_Babu_Resume.pdf";
          link.target = "_blank";
          link.click();
          output = (
            <div style={{ color: "var(--accent)", fontWeight: "bold" }}>
              📄 Initiated automatic download for <span>Raja_Babu_Resume.pdf</span>...
            </div>
          );
        }
        break;

      case "about":
        output = "CS Undergrad (Vasavi CSE, CGPA 9.09/10.0). Interested in Andrej Karpathy's research on neural networks & systems from first principles. Open for collaborating!";
        break;

      case "projects":
        output = (
          <div>
            <div>1. intrvyuuu — Multi-Agent AI Mock Interview Platform (LangGraph, OpenCV)</div>
            <div>2. ZeroNet — Google Drive Migration Platform (OAuth 2.0, PostgreSQL)</div>
            <div>3. Stay Up — Distributed cloud monitoring service for vibe coders</div>
            <div>4. Eterno — One-stop DSA & Software Dev Platform</div>
          </div>
        );
        break;

      case "contact":
        output = "Email: chowdhary.raja0607@gmail.com | GitHub: github.com/enftaurus | Up for collaborating!";
        break;

      case "skills":
        output = "Backend: Go, FastAPI, REST APIs, JWT | Databases: PostgreSQL, Redis, pgvector | AI: LangGraph, LangChain, OpenCV";
        break;

      case "coffee":
        output = "☕ [ESPRESSO_BREWED] Caffeine status = optimal. Ready to ship systems.";
        break;

      case "sudo hire-raja":
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
        });
        output = (
          <div style={{ color: "var(--accent)", fontWeight: "bold" }}>
            <div>&gt; checking credentials...</div>
            <div>&gt; authorization granted.</div>
            <div>&gt; CONGRATULATIONS! Offer confirmed. Email chowdhary.raja0607@gmail.com to proceed! 🎉</div>
          </div>
        );
        break;

      case "clear":
        setLogs([]);
        setInputVal("");
        return;

      case "exit":
        onClose();
        setInputVal("");
        return;

      default:
        output = `command not found: '${cmd}'. Type 'help' for command registry.`;
        break;
    }

    setLogs((prev) => [...prev, { command: cmd, output }]);
    setInputVal("");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCommandStr(inputVal);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const current = inputVal.trim().toLowerCase();
      if (!current) return;
      // Match prefix in COMMAND_REGISTRY
      const matched = COMMAND_REGISTRY.find((cmd) => cmd.startsWith(current));
      if (matched) {
        setInputVal(matched);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className={styles.modalOverlay} onClick={onClose}>
        <motion.div
          className={styles.terminalModalWindow}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          <div className={styles.terminalHeader}>
            <div className={styles.headerTitle}>
              <TerminalIcon size={14} />
              <span>RAJA@PORTFOLIO:~$</span>
            </div>
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close terminal">
              <X size={16} />
            </button>
          </div>

          <div className={styles.modalBody} onClick={() => inputRef.current?.focus()}>
            {logs.map((log, i) => (
              <div key={i} className={styles.logBlock}>
                {log.command !== "welcome" && (
                  <div className={styles.promptLine}>
                    <span className={styles.userText}>raja@portfolio:~$</span> <span>{log.command}</span>
                  </div>
                )}
                <div className={styles.outputLine}>{log.output}</div>
              </div>
            ))}

            <form onSubmit={handleFormSubmit} className={styles.promptForm}>
              <span className={styles.userText}>raja@portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                className={styles.modalInput}
                autoFocus
                spellCheck={false}
                autoCapitalize="off"
                placeholder="Type command or press Tab..."
              />
              <button type="submit" className={styles.mobileSubmitBtn} aria-label="Submit command">
                <CornerDownLeft size={14} />
              </button>
            </form>
            <div ref={bottomRef} />
          </div>

          {/* Quick command buttons for mobile and touch screens */}
          <div className={styles.quickBar}>
            <span className={styles.quickLabel}>QUICK:</span>
            {COMMAND_REGISTRY.map((cmd) => (
              <button
                key={cmd}
                type="button"
                className={styles.chipBtn}
                onClick={() => runCommandStr(cmd)}
              >
                {cmd}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
