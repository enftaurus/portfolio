import { PhilosophyItem, CurrentlyBuildingItem } from "../types/portfolio";

export const philosophyData: PhilosophyItem[] = [
  {
    id: "build",
    title: "BUILD",
    tagline: "Ship working systems",
    description: "I prefer shipping a working system over designing the perfect abstraction. Production feedback beats theoretical elegance every single time."
  },
  {
    id: "understand",
    title: "UNDERSTAND",
    tagline: "Know the machinery",
    description: "If I use a technology, I want to understand what happens underneath it — down to memory allocations, network packets, and database execution plans."
  },
  {
    id: "break",
    title: "BREAK & FIX",
    tagline: "Stress test early",
    description: "Build it. Stress it. Find out why it breaks under load. Fix the bottleneck before it reaches a user."
  }
];

export const currentlyBuildingData: CurrentlyBuildingItem[] = [
  { 
    name: "Stay Up — Cloud Keepalive", 
    progress: 10, 
    status: "EARLY BUILD" 
  },
  { 
    name: "Eterno — DSA & Dev Platform", 
    progress: 10, 
    status: "EARLY BUILD" 
  },
  { 
    name: "Portfolio v2 — Workstation", 
    progress: 95, 
    status: "STAGING" 
  }
];
