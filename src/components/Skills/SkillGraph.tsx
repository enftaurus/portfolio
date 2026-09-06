import React, { useState } from "react";
import styles from "./Skills.module.css";

type Category = "backend" | "db" | "ai" | "infra" | "core";

interface GraphNode {
  id: string;
  x: number;
  y: number;
  label: string;
  type: "hub" | "skill";
  category: Category;
  level?: string;
}

interface GraphEdge {
  from: string;
  to: string;
  label?: string;
}

const CAT_COLORS: Record<Category, string> = {
  backend: "#38bdf8", // Electric Cyan
  db:      "#22d3ee", // Vibrant Turquoise
  ai:      "#a78bfa", // Soft Purple
  infra:   "#fb923c", // Warm Orange
  core:    "#f5ebe0", // Warm Sand
};

const CAT_LABELS: Record<Category, string> = {
  backend: "BACKEND",
  db:      "DATABASES",
  ai:      "AI / ML",
  infra:   "INFRA / CLOUD",
  core:    "CORE CS",
};

const HUB_TEXT: Record<Category, string[]> = {
  backend: ["BACK", "END"],
  db:      ["DB"],
  ai:      ["AI/ML"],
  infra:   ["INFRA"],
  core:    ["CORE"],
};

const NODES: GraphNode[] = [
  // ── Hubs ───────────────────────────────────────────────────────────────────
  { id: "hub-backend", x: 160, y: 220, label: "BACKEND",   type: "hub", category: "backend" },
  { id: "hub-db",      x: 415, y: 110, label: "DATABASES", type: "hub", category: "db" },
  { id: "hub-ai",      x: 680, y: 220, label: "AI / ML",   type: "hub", category: "ai" },
  { id: "hub-infra",   x: 600, y: 430, label: "INFRA",     type: "hub", category: "infra" },
  { id: "hub-core",    x: 230, y: 430, label: "CORE CS",   type: "hub", category: "core" },

  // ── Backend ────────────────────────────────────────────────────────────────
  { id: "go",      x:  65, y: 145, label: "Go (Golang)", type: "skill", category: "backend", level: "Core Stack" },
  { id: "fastapi", x:  60, y: 295, label: "FastAPI",     type: "skill", category: "backend", level: "Production" },
  { id: "rest",    x: 245, y: 145, label: "REST APIs",   type: "skill", category: "backend", level: "Production" },
  { id: "jwt",     x: 250, y: 295, label: "JWT Auth",    type: "skill", category: "backend", level: "Production" },

  // ── Databases ──────────────────────────────────────────────────────────────
  { id: "postgres", x: 315, y:  45, label: "PostgreSQL", type: "skill", category: "db", level: "Production" },
  { id: "redis",    x: 515, y:  45, label: "Redis",      type: "skill", category: "db", level: "Production" },
  { id: "pgvector", x: 315, y: 165, label: "pgvector",   type: "skill", category: "db", level: "Advanced" },
  { id: "faiss",    x: 515, y: 165, label: "FAISS",      type: "skill", category: "db", level: "Advanced" },
  { id: "mssql",    x: 415, y: 195, label: "MS SQL",     type: "skill", category: "db", level: "Intermediate" },

  // ── AI / ML ────────────────────────────────────────────────────────────────
  { id: "langgraph", x: 775, y: 145, label: "LangGraph", type: "skill", category: "ai", level: "Advanced Agentic" },
  { id: "langchain", x: 775, y: 305, label: "LangChain", type: "skill", category: "ai", level: "Advanced RAG" },
  { id: "opencv",    x: 600, y: 145, label: "OpenCV",    type: "skill", category: "ai", level: "Intermediate" },
  { id: "yolo",      x: 595, y: 305, label: "YOLO",      type: "skill", category: "ai", level: "Intermediate" },
  { id: "xgboost",   x: 685, y: 325, label: "XGBoost",   type: "skill", category: "ai", level: "Intermediate" },

  // ── Infra ──────────────────────────────────────────────────────────────────
  { id: "aws",        x: 520, y: 375, label: "AWS Bedrock", type: "skill", category: "infra", level: "Production" },
  { id: "azure",      x: 515, y: 490, label: "Azure",       type: "skill", category: "infra", level: "Intermediate" },
  { id: "docker",     x: 675, y: 370, label: "Docker",      type: "skill", category: "infra", level: "Production" },
  { id: "kubernetes", x: 680, y: 490, label: "Kubernetes",  type: "skill", category: "infra", level: "Intermediate" },

  // ── Core CS ────────────────────────────────────────────────────────────────
  { id: "dsa",   x: 130, y: 370, label: "DSA",            type: "skill", category: "core", level: "First Principles" },
  { id: "oop",   x: 125, y: 490, label: "OOP & DBMS",     type: "skill", category: "core", level: "Core Architecture" },
  { id: "os",    x: 305, y: 490, label: "OS & Networks",  type: "skill", category: "core", level: "Low-Level" },
  { id: "langs", x: 310, y: 370, label: "Go/Python/C",   type: "skill", category: "core", level: "Polyglot" },
];

const HUB_EDGES: GraphEdge[] = [
  { from: "hub-backend", to: "go"        },
  { from: "hub-backend", to: "fastapi"   },
  { from: "hub-backend", to: "rest"      },
  { from: "hub-backend", to: "jwt"       },
  { from: "hub-db",      to: "postgres"  },
  { from: "hub-db",      to: "redis"     },
  { from: "hub-db",      to: "pgvector"  },
  { from: "hub-db",      to: "faiss"     },
  { from: "hub-db",      to: "mssql"     },
  { from: "hub-ai",      to: "langgraph" },
  { from: "hub-ai",      to: "langchain" },
  { from: "hub-ai",      to: "opencv"    },
  { from: "hub-ai",      to: "yolo"      },
  { from: "hub-ai",      to: "xgboost"   },
  { from: "hub-infra",   to: "aws"       },
  { from: "hub-infra",   to: "azure"     },
  { from: "hub-infra",   to: "docker"    },
  { from: "hub-infra",   to: "kubernetes"},
  { from: "hub-core",    to: "dsa"       },
  { from: "hub-core",    to: "oop"       },
  { from: "hub-core",    to: "os"        },
  { from: "hub-core",    to: "langs"     },
];

// Rich production cross-category connections
const CROSS_EDGES: GraphEdge[] = [
  // AI <-> DB & Vector Memory
  { from: "pgvector", to: "langgraph", label: "Vector Memory Store" },
  { from: "pgvector", to: "langchain", label: "RAG Retrieval Index" },
  { from: "faiss",    to: "langchain", label: "Dense Vector Search" },
  { from: "redis",    to: "langgraph", label: "State Checkpoint Saver" },
  { from: "postgres", to: "pgvector",  label: "Relational Vector Extension" },

  // AI <-> Backend APIs
  { from: "fastapi",  to: "langgraph", label: "Agentic REST API" },
  { from: "fastapi",  to: "langchain", label: "Async LLM Pipeline" },
  { from: "fastapi",  to: "opencv",    label: "Vision Frame Endpoint" },

  // AI & Backend <-> Cloud Infra
  { from: "aws",      to: "langgraph", label: "Bedrock Foundation LLM" },
  { from: "aws",      to: "langchain", label: "Bedrock Embedding API" },
  { from: "docker",   to: "langgraph", label: "Agent Microservice Container" },
  { from: "docker",   to: "fastapi",   label: "Multi-Stage Python Build" },
  { from: "docker",   to: "go",        label: "Minimal Static Binary Image" },
  { from: "docker",   to: "kubernetes",label: "Cluster Orchestration" },

  // Backend <-> Databases
  { from: "fastapi",  to: "postgres",  label: "Relational Queries & ORM" },
  { from: "fastapi",  to: "redis",     label: "Pub/Sub & Cache Layer" },
  { from: "go",       to: "postgres",  label: "High-Concurrency SQL Pool" },
  { from: "go",       to: "redis",     label: "In-Memory Lock Engine" },
  { from: "jwt",      to: "fastapi",   label: "Stateless Session Security" },

  // Core CS <-> Languages & Algorithms
  { from: "dsa",      to: "go",        label: "Concurrent Algorithms" },
  { from: "langs",    to: "fastapi",   label: "Async Python Engine" },
  { from: "opencv",   to: "yolo",      label: "Real-Time Object Detection Pipeline" },
];

const nodeMap = new Map<string, GraphNode>(NODES.map(n => [n.id, n]));

function labelProps(node: GraphNode) {
  const hub = nodeMap.get(`hub-${node.category}`)!;
  const dX = node.x - hub.x;
  if (Math.abs(dX) < 15) {
    return { anchor: "middle" as const, dx: 0, dy: node.y > hub.y ? 22 : -16 };
  }
  return { anchor: dX > 0 ? ("start" as const) : ("end" as const), dx: dX > 0 ? 18 : -18, dy: 4 };
}

export const SkillGraph: React.FC = () => {
  const [activeCat, setActiveCat] = useState<Category | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [hoveredEdge, setHoveredEdge] = useState<GraphEdge | null>(null);

  // Pre-compute skill IDs cross-connected to the active or hovered category/skill
  const crossNodes = new Set<string>();
  if (activeCat) {
    CROSS_EDGES.forEach(e => {
      const fn = nodeMap.get(e.from)!;
      const tn = nodeMap.get(e.to)!;
      if (fn.category === activeCat) crossNodes.add(e.to);
      if (tn.category === activeCat) crossNodes.add(e.from);
    });
  }
  if (hoveredSkill) {
    CROSS_EDGES.forEach(e => {
      if (e.from === hoveredSkill) crossNodes.add(e.to);
      if (e.to === hoveredSkill) crossNodes.add(e.from);
    });
  }

  const nodeOpacity = (id: string, cat: Category, type: "hub" | "skill") => {
    if (hoveredSkill) {
      if (id === hoveredSkill) return 1;
      if (crossNodes.has(id)) return 0.95;
      return 0.15;
    }
    if (!activeCat) return type === "hub" ? 1 : 0.85;
    if (cat === activeCat) return 1;
    if (type === "hub") {
      const hasCrossToActive = [...crossNodes].some(nid => nodeMap.get(nid)?.category === cat);
      return hasCrossToActive ? 0.45 : 0.15;
    }
    if (crossNodes.has(id)) return 0.75;
    return 0.12;
  };

  const hubEdgeOp = (cat: Category) => {
    if (hoveredSkill) {
      const targetNode = nodeMap.get(hoveredSkill);
      if (targetNode && targetNode.category === cat) return 0.85;
      return 0.1;
    }
    if (!activeCat) return 0.38;
    return cat === activeCat ? 0.85 : 0.08;
  };

  const crossEdgeOp = (e: GraphEdge) => {
    if (hoveredSkill) {
      return e.from === hoveredSkill || e.to === hoveredSkill ? 0.95 : 0.05;
    }
    const fn = nodeMap.get(e.from)!;
    const tn = nodeMap.get(e.to)!;
    if (!activeCat) return 0.3;
    return fn.category === activeCat || tn.category === activeCat ? 0.85 : 0.05;
  };

  // Active relationship highlight label
  const activeRelationshipLabel = hoveredEdge?.label
    ? hoveredEdge.label
    : hoveredSkill
    ? (() => {
        const edge = CROSS_EDGES.find(e => e.from === hoveredSkill || e.to === hoveredSkill);
        return edge ? `${nodeMap.get(edge.from)?.label} ↔ ${nodeMap.get(edge.to)?.label}: ${edge.label}` : null;
      })()
    : null;

  return (
    <div className={styles.graphWrapper}>
      <svg
        viewBox="0 0 900 560"
        className={styles.graphSvg}
        onMouseLeave={() => { setActiveCat(null); setHoveredSkill(null); setHoveredEdge(null); }}
        aria-label="Interactive modern technology connection graph"
      >
        <defs>
          {(Object.keys(CAT_COLORS) as Category[]).map(cat => (
            <filter key={cat} id={`gf-${cat}`} x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          ))}
        </defs>

        {/* ── Cross-category production connections (dashed energy beams) ─────────── */}
        {CROSS_EDGES.map((e, i) => {
          const f = nodeMap.get(e.from)!;
          const t = nodeMap.get(e.to)!;
          const isHovEdge = hoveredEdge === e || (hoveredSkill && (e.from === hoveredSkill || e.to === hoveredSkill));
          const color = isHovEdge ? "#38bdf8" : "rgba(245, 235, 224, 0.4)";

          return (
            <g key={`cx-${i}`} onMouseEnter={() => setHoveredEdge(e)} onMouseLeave={() => setHoveredEdge(null)}>
              <line
                x1={f.x} y1={f.y} x2={t.x} y2={t.y}
                stroke={color}
                strokeWidth={isHovEdge ? "2" : "1"}
                strokeDasharray="6 8"
                className={styles.edgeLine}
                style={{
                  opacity: crossEdgeOp(e),
                  transition: "all 0.25s ease",
                  cursor: "pointer"
                }}
              />
            </g>
          );
        })}

        {/* ── Hub → skill edges ─────────────────────────────────────────── */}
        {HUB_EDGES.map((e, i) => {
          const f = nodeMap.get(e.from)!;
          const t = nodeMap.get(e.to)!;
          const color = CAT_COLORS[f.category];
          return (
            <line key={`he-${i}`}
              x1={f.x} y1={f.y} x2={t.x} y2={t.y}
              stroke={color}
              strokeWidth="1.5"
              className={styles.edgeLine}
              style={{
                opacity: hubEdgeOp(f.category),
                transition: "opacity 0.22s ease",
                animationDelay: `${i * 0.03}s`,
              }}
            />
          );
        })}

        {/* ── Skill nodes ───────────────────────────────────────────────── */}
        {NODES.filter(n => n.type === "skill").map(node => {
          const color = CAT_COLORS[node.category];
          const isActive = activeCat === node.category || hoveredSkill === node.id || crossNodes.has(node.id);
          const isDirectHov = hoveredSkill === node.id;
          const lp = labelProps(node);
          const op = nodeOpacity(node.id, node.category, "skill");

          return (
            <g key={node.id}
              style={{ opacity: op, transition: "opacity 0.22s ease", cursor: "pointer" }}
              onMouseEnter={() => setHoveredSkill(node.id)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <circle
                cx={node.x} cy={node.y}
                r={isDirectHov ? 10 : isActive ? 7.5 : 5.5}
                fill={isActive ? `${color}35` : "rgba(245,235,224,0.06)"}
                stroke={color}
                strokeWidth={isDirectHov ? 2.5 : isActive ? 1.8 : 1}
                filter={isActive ? `url(#gf-${node.category})` : undefined}
                style={{ transition: "r 0.2s ease, fill 0.2s ease, stroke-width 0.2s ease" }}
              />
              <text x={node.x + lp.dx} y={node.y + lp.dy}
                textAnchor={lp.anchor}
                fill={isActive ? "#ffffff" : "rgba(245,235,224,0.65)"}
                fontSize={isDirectHov ? "10" : "9"}
                fontFamily="JetBrains Mono, monospace"
                fontWeight={isActive ? "700" : "500"}
                style={{ userSelect: "none", pointerEvents: "none", transition: "fill 0.18s ease" }}
              >
                {node.label}
              </text>
              {/* Level badge shown on hover */}
              {isDirectHov && node.level && (
                <text x={node.x + lp.dx} y={node.y + lp.dy + 13}
                  textAnchor={lp.anchor}
                  fill={color}
                  fontSize="7.5"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="700"
                  style={{ userSelect: "none", pointerEvents: "none" }}
                >
                  [{node.level}]
                </text>
              )}
            </g>
          );
        })}

        {/* ── Hub nodes (on top) ─────────────────────────────────────────── */}
        {NODES.filter(n => n.type === "hub").map(node => {
          const color = CAT_COLORS[node.category];
          const isActive = activeCat === node.category;
          const op = nodeOpacity(node.id, node.category, "hub");
          const r = isActive ? 24 : 19;
          const lines = HUB_TEXT[node.category];

          return (
            <g key={node.id}
              style={{ opacity: op, transition: "opacity 0.22s ease", cursor: "pointer" }}
              onMouseEnter={() => setActiveCat(node.category)}
            >
              {/* Animated outer ring when active */}
              {isActive && (
                <circle cx={node.x} cy={node.y} r={36}
                  fill="none" stroke={color} strokeWidth="1"
                  opacity="0.3" className={styles.hubPulse}
                />
              )}
              {/* Orbit ring */}
              <circle cx={node.x} cy={node.y} r={isActive ? 32 : 26}
                fill="none" stroke={color} strokeWidth="1"
                strokeDasharray={isActive ? "none" : "4 5"}
                opacity={isActive ? 0.7 : 0.4}
                style={{ transition: "all 0.22s ease" }}
              />
              {/* Filled hub */}
              <circle cx={node.x} cy={node.y} r={r}
                fill={`${color}22`}
                stroke={color}
                strokeWidth={isActive ? 2.2 : 1.5}
                filter={`url(#gf-${node.category})`}
                style={{ transition: "all 0.22s ease" }}
              />
              {/* Hub label */}
              {lines.map((line, li) => (
                <text key={li}
                  x={node.x}
                  y={node.y + (li - (lines.length - 1) / 2) * 10 + 3.5}
                  textAnchor="middle"
                  fill={color}
                  fontSize="7.5"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="800"
                  letterSpacing="0.6"
                  style={{ userSelect: "none", pointerEvents: "none" }}
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}
      </svg>

      {/* Relationship telemetry status bar */}
      <div className={styles.graphTelemetryBar}>
        <span className={styles.telemetryTag}>SYSTEM PIPELINE:</span>
        <span className={styles.telemetryText}>
          {activeRelationshipLabel || "Hover over any node or edge connection to inspect live data flow"}
        </span>
      </div>

      {/* Category legend / filter buttons */}
      <div className={styles.graphLegend}>
        {(Object.keys(CAT_COLORS) as Category[]).map(cat => (
          <button
            key={cat}
            className={`${styles.legendBtn} ${activeCat === cat ? styles.legendActive : ""}`}
            style={{ "--cc": CAT_COLORS[cat] } as React.CSSProperties}
            onMouseEnter={() => setActiveCat(cat)}
            onMouseLeave={() => setActiveCat(null)}
          >
            <span className={styles.legendDot} style={{ background: CAT_COLORS[cat] }} />
            {CAT_LABELS[cat]}
          </button>
        ))}
      </div>
    </div>
  );
};
