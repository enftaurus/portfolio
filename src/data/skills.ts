import { SkillCategory } from "../types/portfolio";

export const skillCategoriesData: SkillCategory[] = [
  {
    category: "BACKEND",
    color: "#39ff88",
    skills: [
      { name: "Go (Golang)", level: "Core", highlighted: true, description: "Scalable microservices, concurrency, & HTTP servers" },
      { name: "FastAPI", level: "Core", highlighted: true, description: "Async Python web APIs & LLM orchestration" },
      { name: "REST APIs", level: "Production", description: "Clean OpenAPI / Swagger system design" },
      { name: "JWT Authentication", level: "Production", description: "Stateless security & session management" }
    ]
  },
  {
    category: "DATABASES",
    color: "#39ff88",
    skills: [
      { name: "PostgreSQL", level: "Production", highlighted: true, description: "Relational schema design, indexing & query tuning" },
      { name: "Redis", level: "Production", highlighted: true, description: "Caching, pub/sub, & in-memory structures" },
      { name: "pgvector", level: "Advanced", highlighted: true, description: "Vector similarity search for AI embeddings" },
      { name: "FAISS", level: "Advanced", description: "Dense vector indexing for semantic search" },
      { name: "Microsoft SQL Server", level: "Intermediate", description: "Enterprise relational queries" }
    ]
  },
  {
    category: "AI / ML",
    color: "#39ff88",
    skills: [
      { name: "LangGraph", level: "Advanced", highlighted: true, description: "Stateful multi-agent workflows & cyclic graphs" },
      { name: "LangChain", level: "Advanced", highlighted: true, description: "RAG pipelines & LLM chaining" },
      { name: "OpenCV", level: "Intermediate", description: "Computer vision & real-time frame evaluation" },
      { name: "YOLO", level: "Intermediate", description: "Real-time object detection models" },
      { name: "XGBoost", level: "Intermediate", description: "Gradient boosted decision trees & tabular ML" }
    ]
  },
  {
    category: "INFRA / CLOUD",
    color: "#39ff88",
    skills: [
      { name: "AWS (Bedrock, S3)", level: "Production", highlighted: true, description: "Foundation models & cloud object storage" },
      { name: "Azure", level: "Intermediate", description: "Cloud computing & identity services" },
      { name: "Docker", level: "Production", highlighted: true, description: "Containerization & multi-stage builds" },
      { name: "Kubernetes", level: "Intermediate", description: "Cluster deployment & container orchestration" }
    ]
  },
  {
    category: "CORE CS & LANGUAGES",
    color: "#39ff88",
    skills: [
      { name: "Data Structures & Algorithms", level: "Core", highlighted: true, description: "Trees, graphs, dynamic programming, & optimization" },
      { name: "OOP & DBMS", level: "Core", description: "Object-oriented design patterns & relational theory" },
      { name: "Operating Systems & Networking", level: "Core", description: "Processes, threads, memory, TCP/IP, & sockets" },
      { name: "Go / Python / Java / C", level: "Languages", highlighted: true, description: "Primary programming languages" }
    ]
  }
];
