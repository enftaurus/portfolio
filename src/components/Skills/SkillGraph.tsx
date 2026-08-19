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
}

const CAT_COLORS: Record<Category, string> = {
  backend: "#39ff88",
  db:      "#22d3ee",
  ai:      "#a78bfa",
  infra:   "#fb923c",
  core:    "#fbbf24",
};

const CAT_LABELS: Record<Category, string> = {
  backend: "BACKEND",
  db:      "DATABASES",
  ai:      "AI / ML",
  infra:   "INFRA / CLOUD",
  core:    "CORE CS",
};

// Hub text lines (short, fits inside circle r=20)
const HUB_TEXT: Record<Category, string[]> = {
  backend: ["BACK", "END"],
  db:      ["DB"],
  ai:      ["AI/ML"],
  infra:   ["INFRA"],
  core:    ["CORE"],
};

const NODES: GraphNode[] = [
  // ── Hubs ───────────────────────────────────────────────────────────────────
  { id: "hub-backend", x: 155, y: 225, label: "BACKEND",   type: "hub", category: "backend" },
  { id: "hub-db",      x: 415, y: 108, label: "DATABASES", type: "hub", category: "db" },
  { id: "hub-ai",      x: 690, y: 225, label: "AI / ML",   type: "hub", category: "ai" },
  { id: "hub-infra",   x: 600, y: 435, label: "INFRA",     type: "hub", category: "infra" },
  { id: "hub-core",    x: 218, y: 435, label: "CORE CS",   type: "hub", category: "core" },

  // ── Backend ────────────────────────────────────────────────────────────────
  { id: "go",      x:  62, y: 148, label: "Go (Golang)", type: "skill", category: "backend", level: "Core" },
  { id: "fastapi", x:  58, y: 298, label: "FastAPI",     type: "skill", category: "backend", level: "Core" },
  { id: "rest",    x: 248, y: 152, label: "REST APIs",   type: "skill", category: "backend", level: "Production" },
  { id: "jwt",     x: 250, y: 300, label: "JWT Auth",    type: "skill", category: "backend", level: "Production" },

  // ── Databases ──────────────────────────────────────────────────────────────
  { id: "postgres", x: 318, y:  44, label: "PostgreSQL", type: "skill", category: "db", level: "Production" },
  { id: "redis",    x: 512, y:  44, label: "Redis",      type: "skill", category: "db", level: "Production" },
  { id: "pgvector", x: 316, y: 162, label: "pgvector",   type: "skill", category: "db", level: "Advanced" },
  { id: "faiss",    x: 514, y: 162, label: "FAISS",      type: "skill", category: "db", level: "Advanced" },
  { id: "mssql",    x: 415, y: 196, label: "MS SQL",     type: "skill", category: "db", level: "Intermediate" },

  // ── AI / ML ────────────────────────────────────────────────────────────────
  { id: "langgraph", x: 778, y: 148, label: "LangGraph", type: "skill", category: "ai", level: "Advanced" },
  { id: "langchain", x: 780, y: 308, label: "LangChain", type: "skill", category: "ai", level: "Advanced" },
  { id: "opencv",    x: 605, y: 148, label: "OpenCV",    type: "skill", category: "ai", level: "Intermediate" },
  { id: "yolo",      x: 602, y: 308, label: "YOLO",      type: "skill", category: "ai", level: "Intermediate" },
  { id: "xgboost",   x: 692, y: 326, label: "XGBoost",   type: "skill", category: "ai", level: "Intermediate" },

  // ── Infra ──────────────────────────────────────────────────────────────────
  { id: "aws",        x: 522, y: 376, label: "AWS Bedrock", type: "skill", category: "infra", level: "Production" },
  { id: "azure",      x: 516, y: 490, label: "Azure",       type: "skill", category: "infra", level: "Intermediate" },
  { id: "docker",     x: 678, y: 374, label: "Docker",      type: "skill", category: "infra", level: "Production" },
  { id: "kubernetes", x: 682, y: 490, label: "Kubernetes",  type: "skill", category: "infra", level: "Intermediate" },

  // ── Core CS ────────────────────────────────────────────────────────────────
  { id: "dsa",   x: 126, y: 374, label: "DSA",            type: "skill", category: "core", level: "Core" },
  { id: "oop",   x: 120, y: 492, label: "OOP & DBMS",     type: "skill", category: "core", level: "Core" },
  { id: "os",    x: 300, y: 492, label: "OS & Networks",  type: "skill", category: "core", level: "Core" },
  { id: "langs", x: 308, y: 374, label: "Go/Python/Java", type: "skill", category: "core", level: "Core" },
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

// Cross-category semantic connections
const CROSS_EDGES: GraphEdge[] = [
  { from: "pgvector", to: "langgraph" }, // vector DB powers agentic search
  { from: "pgvector", to: "langchain" }, // RAG pipeline
  { from: "fastapi",  to: "postgres"  }, // common backend pair
  { from: "go",       to: "dsa"       }, // algorithms in backend
];

const nodeMap = new Map<string, GraphNode>(NODES.map(n => [n.id, n]));

// Label anchor relative to hub center
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

  // Pre-compute skill IDs cross-connected to the active category
  const crossNodes = new Set<string>();
  if (activeCat) {
    CROSS_EDGES.forEach(e => {
      const fn = nodeMap.get(e.from)!;
      const tn = nodeMap.get(e.to)!;
      if (fn.category === activeCat) crossNodes.add(e.to);
      if (tn.category === activeCat) crossNodes.add(e.from);
    });
  }

  const nodeOpacity = (id: string, cat: Category, type: "hub" | "skill") => {
    if (!activeCat) return type === "hub" ? 1 : 0.82;
    if (cat === activeCat) return 1;
    if (type === "hub") {
      // Dim cross-connected hubs less than fully unrelated ones
      const hasCrossToActive = [...crossNodes].some(nid => nodeMap.get(nid)?.category === cat);
      return hasCrossToActive ? 0.35 : 0.14;
    }
    if (crossNodes.has(id)) return 0.62;
    return 0.1;
  };

  const hubEdgeOp = (cat: Category) => {
    if (!activeCat) return 0.32;
    return cat === activeCat ? 0.78 : 0.05;
  };

  const crossEdgeOp = (e: GraphEdge) => {
    const fn = nodeMap.get(e.from)!;
    const tn = nodeMap.get(e.to)!;
    if (!activeCat) return 0.18;
    return fn.category === activeCat || tn.category === activeCat ? 0.72 : 0.03;
  };

  return (
    <div className={styles.graphWrapper}>
      <svg
        viewBox="0 0 900 560"
        className={styles.graphSvg}
        onMouseLeave={() => { setActiveCat(null); setHoveredSkill(null); }}
        aria-label="Interactive skill node graph"
      >
        <defs>
          {(Object.keys(CAT_COLORS) as Category[]).map(cat => (
            <filter key={cat} id={`gf-${cat}`} x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="5" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          ))}
        </defs>

        {/* ── Cross-category dashed edges (render first / below) ─────────── */}
        {CROSS_EDGES.map((e, i) => {
          const f = nodeMap.get(e.from)!;
          const t = nodeMap.get(e.to)!;
          return (
            <line key={`cx-${i}`}
              x1={f.x} y1={f.y} x2={t.x} y2={t.y}
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="1"
              strokeDasharray="5 9"
              className={styles.edgeLine}
              style={{ opacity: crossEdgeOp(e), transition: "opacity 0.22s ease" }}
            />
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
                animationDelay: `${i * 0.045}s`,
              }}
            />
          );
        })}

        {/* ── Skill nodes ───────────────────────────────────────────────── */}
        {NODES.filter(n => n.type === "skill").map(node => {
          const color = CAT_COLORS[node.category];
          const isActive = activeCat === node.category;
          const isHov = hoveredSkill === node.id;
          const lp = labelProps(node);
          const op = nodeOpacity(node.id, node.category, "skill");

          return (
            <g key={node.id}
              style={{ opacity: op, transition: "opacity 0.22s ease", cursor: "default" }}
              onMouseEnter={() => setHoveredSkill(node.id)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <circle
                cx={node.x} cy={node.y}
                r={isHov || isActive ? 9 : 6}
                fill={isActive ? `${color}2e` : "rgba(255,255,255,0.04)"}
                stroke={color}
                strokeWidth={isActive ? 2 : 1}
                filter={isActive ? `url(#gf-${node.category})` : undefined}
                style={{ transition: "r 0.18s ease, fill 0.18s ease, stroke-width 0.18s ease" }}
              />
              <text x={node.x + lp.dx} y={node.y + lp.dy}
                textAnchor={lp.anchor}
                fill={isActive ? "#ffffff" : "rgba(255,255,255,0.62)"}
                fontSize="9"
                fontFamily="JetBrains Mono, monospace"
                style={{ userSelect: "none", pointerEvents: "none", transition: "fill 0.18s ease" }}
              >
                {node.label}
              </text>
              {/* Level badge shown on hover */}
              {isHov && node.level && (
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
          const r = isActive ? 23 : 18;
          const lines = HUB_TEXT[node.category];

          return (
            <g key={node.id}
              style={{ opacity: op, transition: "opacity 0.22s ease", cursor: "pointer" }}
              onMouseEnter={() => setActiveCat(node.category)}
            >
              {/* Animated outer ring when active */}
              {isActive && (
                <circle cx={node.x} cy={node.y} r={34}
                  fill="none" stroke={color} strokeWidth="1"
                  opacity="0.25" className={styles.hubPulse}
                />
              )}
              {/* Dashed orbit ring */}
              <circle cx={node.x} cy={node.y} r={isActive ? 31 : 25}
                fill="none" stroke={color} strokeWidth="1"
                strokeDasharray={isActive ? "none" : "4 5"}
                opacity={isActive ? 0.65 : 0.38}
                style={{ transition: "all 0.22s ease" }}
              />
              {/* Filled hub */}
              <circle cx={node.x} cy={node.y} r={r}
                fill={`${color}16`}
                stroke={color}
                strokeWidth={isActive ? 2 : 1.5}
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
