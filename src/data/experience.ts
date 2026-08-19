import { ExperienceData } from "../types/portfolio";

export const experienceData: ExperienceData[] = [
  {
    id: "excellerate-global",
    company: "EXCELLERATE GLOBAL PVT LTD",
    role: "Software Engineering Intern",
    period: "05/2026 — 07/2026",
    year: "2026",
    description: "Built an AI-powered Applicant Tracking System (ATS), parsing resumes and job descriptions into structured data via LLM-based extraction pipelines.",
    highlights: [
      "Implemented semantic search & candidate ranking using AWS Bedrock, Cohere Embeddings, vector similarity search, skill clustering, and dynamic weighting.",
      "Improved matching accuracy by 40% over legacy rule-based filtering methods.",
      "Architected production backend services, REST APIs, and database optimizations using FastAPI and PostgreSQL."
    ],
    technologies: [
      "AWS Bedrock",
      "Cohere",
      "FastAPI",
      "PostgreSQL"
    ],
    metricPill: {
      label: "MATCHING ACCURACY",
      value: "+40%"
    }
  }
];
