export interface ProfileData {
  name: string;
  handle: string;
  role: string;
  subheading: string;
  bio: string;
  location: string;
  cgpa: string;
  education: {
    institution: string;
    degree: string;
    score: string;
  };
  facts: Array<{ label: string; value: string }>;
  status: "AVAILABLE" | "BUILDING";
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
    upwork: string;
  };
}

export interface ProjectData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
  featured: boolean;
  architectureNodes: Array<{ id: string; label: string; sub?: string; type?: "input" | "agent" | "engine" | "output" }>;
  metrics?: string[];
}

export interface ExperienceData {
  id: string;
  company: string;
  role: string;
  period: string;
  year: string;
  description: string;
  highlights: string[];
  technologies: string[];
  metricPill?: {
    label: string;
    value: string;
  };
}

export interface SkillCategory {
  category: string;
  color: string;
  skills: Array<{
    name: string;
    level?: string;
    highlighted?: boolean;
    description?: string;
  }>;
}

export interface PhilosophyItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
}

export interface CurrentlyBuildingItem {
  name: string;
  progress: number; // 0 - 100
  status: string;
}
