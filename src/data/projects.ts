import { ProjectData } from "../types/portfolio";

export const projectsData: ProjectData[] = [
  {
    id: "intrvyuuu",
    name: "intrvyuuu",
    tagline: "AI-POWERED MOCK INTERVIEW & CAREER PLATFORM",
    description: "Multi-agent interview platform (LangGraph + LangChain) simulating 4 interview types: Coding, Technical, HR, and Managerial with shared conversational state across rounds. Features specialized agents for evaluation, resume analysis, job aggregation, career guidance, audio response evaluation, and MediaPipe/OpenCV-based proctoring.",
    technologies: [
      "LangGraph",
      "LangChain",
      "FastAPI",
      "OpenCV",
      "MediaPipe"
    ],
    // TODO: insert GitHub URL
    githubUrl: "https://github.com/enftaurus/intrvyuuu",
    // TODO: insert Live Demo URL
    demoUrl: "#TODO_INSERT_DEMO_URL",
    featured: true,
    architectureNodes: [
      { id: "resume", label: "Resume Agent", sub: "PDF / Skill Extractor", type: "agent" },
      { id: "interview", label: "Interview Agent", sub: "Adaptive Questioning", type: "agent" },
      { id: "proctor", label: "Proctor Agent", sub: "MediaPipe / OpenCV", type: "agent" },
      { id: "eval", label: "Evaluation Engine", sub: "Score & Feedback Matrix", type: "output" }
    ],
    metrics: [
      "4 Interview Types",
      "Multi-Agent Shared State",
      "Real-time Proctoring"
    ]
  },
  {
    id: "zeronet",
    name: "ZeroNet",
    tagline: "GOOGLE DRIVE MIGRATION PLATFORM",
    description: "Server-side migration platform enabling direct file transfers between Google Drive accounts without client bandwidth or local downloads. Integrates Google OAuth 2.0 and Drive API with scalable async migration workflows, preserving nested directory structures and cutting migration latency.",
    technologies: [
      "OAuth 2.0",
      "Google Drive API",
      "Async Workers",
      "PostgreSQL",
      "AWS / S3"
    ],
    // TODO: insert GitHub URL
    githubUrl: "https://github.com/enftaurus/ZeroNet",
    // TODO: insert Live Demo URL
    demoUrl: "#TODO_INSERT_DEMO_URL",
    featured: true,
    architectureNodes: [
      { id: "auth", label: "OAuth 2.0 Flow", sub: "Account Token Linking", type: "input" },
      { id: "engine", label: "Migration Engine", sub: "Async Stream & Chunks", type: "engine" },
      { id: "verify", label: "Hash Verifier", sub: "SHA-256 Integrity", type: "agent" },
      { id: "dest", label: "Destination Drive", sub: "Zero Local Download", type: "output" }
    ],
    metrics: [
      "OAuth Token Handshake",
      "Zero Local Disk Footprint",
      "Chunked Streaming"
    ]
  }
];
