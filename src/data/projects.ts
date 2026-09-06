import { ProjectData } from "../types/portfolio";

export const projectsData: ProjectData[] = [
  {
    id: "intrvyuuu",
    name: "intrvyuuu",
    tagline: "MULTI-AGENT AUTONOMOUS INTERVIEW & PROCTORING ENGINE",
    description: "Stateful multi-agent interview platform (LangGraph + LangChain) simulating 4 full-loop interview tracks: Live Coding, Technical Architecture, HR Culture, and Managerial Strategy. Features persistent stateful memory, resume skill extraction, audio response diagnostics, and real-time computer vision proctoring via MediaPipe & OpenCV.",
    technologies: [
      "LangGraph",
      "LangChain",
      "FastAPI",
      "OpenCV",
      "MediaPipe",
      "pgvector",
      "PostgreSQL"
    ],
    githubUrl: "https://github.com/enftaurus/intrvyuuu",
    demoUrl: "#TODO_INSERT_DEMO_URL",
    featured: true,
    architectureNodes: [
      { id: "resume", label: "Resume Engine", sub: "Deep PDF & Skill Matrix", type: "agent" },
      { id: "interview", label: "Stateful Agent", sub: "Adaptive Dynamic Queries", type: "agent" },
      { id: "proctor", label: "Vision Proctor", sub: "MediaPipe / Frame Analysis", type: "agent" },
      { id: "eval", label: "Evaluation Matrix", sub: "Automated Feedback Loop", type: "output" }
    ],
    metrics: [
      "4 Stateful Cyclic Agent Tracks",
      "Real-Time OpenCV Vision Proctoring",
      "Multi-Agent Shared Memory Graph"
    ]
  },
  {
    id: "zeronet",
    name: "ZeroNet",
    tagline: "ZERO-BANDWIDTH CLOUD-TO-CLOUD MIGRATION SYSTEM",
    description: "Server-side high-throughput file migration engine enabling rapid cross-account Google Drive sync without consuming local user bandwidth. Built with chunked async stream workers, OAuth 2.0 token handshakes, SHA-256 checksum verification, and structured relational job logs.",
    technologies: [
      "OAuth 2.0",
      "Google Drive API",
      "Async Streaming Workers",
      "PostgreSQL",
      "AWS S3"
    ],
    githubUrl: "https://github.com/enftaurus/ZeroNet",
    demoUrl: "#TODO_INSERT_DEMO_URL",
    featured: true,
    architectureNodes: [
      { id: "auth", label: "OAuth 2.0 Vault", sub: "Dual-Token Security Handshake", type: "input" },
      { id: "engine", label: "Stream Engine", sub: "Direct Memory Pipe Chunking", type: "engine" },
      { id: "verify", label: "SHA-256 Verifier", sub: "Cryptographic Data Integrity", type: "agent" },
      { id: "dest", label: "Cloud Receiver", sub: "Zero Local Footprint Transfer", type: "output" }
    ],
    metrics: [
      "Zero Local Client Disk Footprint",
      "Chunked Parallel Stream Transfer",
      "Cryptographic SHA-256 Locks"
    ]
  }
];
