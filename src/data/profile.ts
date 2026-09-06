import { ProfileData } from "../types/portfolio";

export const profileData: ProfileData = {
  name: "Raja Babu Kurra",
  handle: "raja@workstation",
  role: "CS UNDERGRAD · BACKEND ENGINEERING · APPLIED AI",
  subheading: "I explore technology by building it from the ground up.",
  bio: "2nd year CS student at Vasavi College who got way too deep into backend engineering and never looked back. I spend most of my time building things that actually work in production — Go microservices, Python agentic pipelines, distributed systems. I won a TCS cybersecurity hackathon by actually understanding how the attack worked, not just patching it. Currently obsessed with how LLMs can reason and act autonomously — reading through Karpathy's work when I'm not shipping code.",
  location: "Hyderabad, India",
  cgpa: "9.09 / 10.0",
  education: {
    institution: "Vasavi College of Engineering",
    degree: "B.E. Computer Science Engineering (2024–2028)",
    score: "CGPA: 9.09 / 10.0"
  },
  facts: [
    { label: "CYBER SECURITY HACKATHON", value: "🏆 Winner, TCS Technology Day Cyber Security Hackathon @ Vasavi College of Engineering" },
    { label: "AI HACKATHON RECOGNITION", value: "🥈 Runner-Up, NASSCOM GEN AI Forge 2026 Hackathon" },
    { label: "ENGINEERING ALMA MATER", value: "Vasavi College of Engineering — B.E. Computer Science" },
    { label: "ENGINEERING FOCUS", value: "High-Concurrency Go · Stateful AI Agents · Distributed Systems" },
    { label: "RESEARCH FOCUS", value: "Neural Network Architectures (Karpathy) & Low-Level CS" },
    { label: "PRODUCTION IMPACT", value: "⚡ Enhanced ATS Candidate Matching Precision by +40%" },
    { label: "CURRENT LOCATION", value: "Hyderabad, India" }
  ],
  status: "BUILDING",
  socialLinks: {
    github: "https://github.com/enftaurus",
    linkedin: "https://linkedin.com/in/raja-babu-968294353",
    email: "mailto:chowdhary.raja0607@gmail.com",
    upwork: "https://www.upwork.com/freelancers/~01847cf1e938058b91"
  }
};
