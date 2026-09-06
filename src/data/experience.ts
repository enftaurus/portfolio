import { ExperienceData } from "../types/portfolio";

export const experienceData: ExperienceData[] = [
  {
    id: "excellerate-global",
    company: "EXCELLERATE GLOBAL PVT LTD",
    role: "Software Engineering Intern",
    period: "05/2026 — 07/2026",
    year: "2026",
    description: "Engineered an enterprise AI-powered Applicant Tracking System (ATS), parsing unstructured resumes and complex job descriptions into structured vectors via LLM extraction pipelines.",
    highlights: [
      "Architected semantic candidate search and skill ranking engine using AWS Bedrock, Cohere Embeddings, vector similarity search, skill clustering, and dynamic experience weighting.",
      "Outperformed legacy keyword-matching algorithms by +40% in candidate relevance precision.",
      "Optimized production REST API endpoints with FastAPI and PostgreSQL query indexing to ensure sub-100ms vector lookup speeds."
    ],
    technologies: [
      "AWS Bedrock",
      "Cohere Embeddings",
      "FastAPI",
      "PostgreSQL",
      "pgvector"
    ],
    metricPill: {
      label: "MATCHING ACCURACY",
      value: "+40% BOOST"
    }
  }
];
