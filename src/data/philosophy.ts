import { PhilosophyItem, CurrentlyBuildingItem } from "../types/portfolio";

export const philosophyData: PhilosophyItem[] = [
  {
    id: "build",
    title: "FIRST-PRINCIPLES ENGINEERING",
    tagline: "Ship working production systems",
    description: "I prioritize shipping observable, resilient production software over endless abstract theory. Real-world workload feedback trumps pure theoretical elegance every single time."
  },
  {
    id: "understand",
    title: "UNDERSTAND THE MACHINERY",
    tagline: "Know the full metal stack",
    description: "When using a framework or model, I inspect what happens underneath—from memory allocation and socket IO to vector index traversal and SQL execution plans."
  },
  {
    id: "break",
    title: "STRESS TEST & REFACTOR",
    tagline: "Break early, fortify always",
    description: "Build the service, push it to its limits, and analyze failure points under load. Eliminate race conditions and latency bottlenecks long before production traffic hits."
  }
];

export const currentlyBuildingData: CurrentlyBuildingItem[] = [
  { 
    name: "Stay Up — Cloud Keepalive & Uptime Engine", 
    progress: 10, 
    status: "EARLY ACTIVE DEVELOPMENT" 
  },
  { 
    name: "Eterno — High-Performance DSA & Microservices Platform", 
    progress: 10, 
    status: "EARLY ACTIVE DEVELOPMENT" 
  }
];
