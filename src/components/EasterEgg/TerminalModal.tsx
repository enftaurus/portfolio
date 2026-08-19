import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal } from "lucide-react";
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

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {
  const [inputVal, setInputVal] = useState("");
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      command: "welcome",
      output: (
        <div>
          <div>RAJA BABU KURRA INTERACTIVE TERMINAL v2.0</div>
          <div>Type <span style={{ color: "var(--accent)" }}>help</span> to view available commands.</div>
        </div>
      )
    }
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

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    let output: React.ReactNode = "";

    switch (cmd) {
      case "help":
        output = (
          <div>
            <div style={{ color: "var(--accent)", marginBottom: "4px" }}>AVAILABLE COMMANDS:</div>
            <div>• <span style={{ color: "#00e5ff" }}>about</span>       : Print engineering background & research interest</div>
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
          origin: { y: 0.6 }
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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className={styles.modalOverlay} onClick={onClose}>
        <motion.div
          className={styles.terminalModalWindow}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <div className={styles.terminalHeader}>
            <div className={styles.headerTitle}>
              <Terminal size={14} />
              <span>RAJA@PORTFOLIO:~$</span>
            </div>
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close terminal">
              <X size={16} />
            </button>
          </div>

          <div className={styles.modalBody} onClick={() => inputRef.current?.focus()}>
            {logs.map((log, i) => (
              <div key={i} className="log-block">
                {log.command !== "welcome" && (
                  <div className={styles.promptLine}>
                    <span className={styles.userText}>raja@portfolio:~$</span> <span>{log.command}</span>
                  </div>
                )}
                <div className={styles.outputLine}>{log.output}</div>
              </div>
            ))}

            <form onSubmit={handleCommand} className={styles.promptForm}>
              <span className={styles.userText}>raja@portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className={styles.modalInput}
                autoFocus
                spellCheck={false}
              />
            </form>
            <div ref={bottomRef} />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
