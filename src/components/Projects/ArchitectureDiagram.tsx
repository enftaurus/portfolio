import React from "react";
import { motion } from "framer-motion";

interface NodeItem {
  id: string;
  label: string;
  sub?: string;
  type?: "input" | "agent" | "engine" | "output";
}

interface ArchitectureDiagramProps {
  projectId: string;
  nodes: NodeItem[];
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ projectId, nodes }) => {
  return (
    <div style={{
      background: "rgba(10, 10, 10, 0.85)",
      border: "1px solid var(--border-color)",
      borderRadius: "6px",
      padding: "1.2rem",
      marginTop: "1rem"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: "0.7rem",
        color: "var(--text-dim)",
        marginBottom: "1rem",
        fontWeight: 600,
        fontFamily: "var(--font-mono)"
      }}>
        <span>&gt; SYSTEM ARCHITECTURE GRAPH</span>
        <span style={{ color: "var(--accent)" }}>LIVE_TOPOLOGY</span>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
        gap: "0.8rem"
      }}>
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid var(--border-color)",
              borderRadius: "6px",
              padding: "0.75rem 0.6rem",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              cursor: "pointer",
              fontFamily: "var(--font-mono)"
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.04, borderColor: "var(--accent)" }}
          >
            <div style={{ fontSize: "1.1rem" }}>
              {node.type === "agent" ? "🤖" : node.type === "engine" ? "⚡" : node.type === "input" ? "🔐" : "🎯"}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text)", lineHeight: 1.2 }}>
                {node.label}
              </span>
              {node.sub && (
                <span style={{ fontSize: "0.65rem", color: "var(--text-dim)", marginTop: "2px" }}>
                  {node.sub}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Flow Lines */}
      <svg width="100%" height="32" viewBox="0 0 400 32" style={{ marginTop: "0.5rem" }}>
        <line x1="10%" y1="16" x2="90%" y2="16" stroke="rgba(57, 255, 136, 0.3)" strokeDasharray="4 4" strokeWidth="1.5">
          <animate attributeName="stroke-dashoffset" from="8" to="0" dur="1s" repeatCount="indefinite" />
        </line>
      </svg>
    </div>
  );
};
