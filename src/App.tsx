import React, { useState, useEffect } from "react";
import { PageLoader } from "./components/PageLoader/PageLoader";
import { Navbar } from "./components/Navbar/Navbar";
import { HeroSection } from "./components/Hero/HeroSection";
import { AboutSection } from "./components/About/AboutSection";
import { ExperienceSection } from "./components/Experience/ExperienceSection";
import { ProjectsSection } from "./components/Projects/ProjectsSection";
import { SkillsSection } from "./components/Skills/SkillsSection";
import { CurrentlyBuilding } from "./components/CurrentlyBuilding/CurrentlyBuilding";
import { ContactSection } from "./components/Contact/ContactSection";
import { TerminalModal } from "./components/EasterEgg/TerminalModal";
import { CustomCursor } from "./components/Cursor/CustomCursor";
import { WarpDivider } from "./components/shared/WarpDivider";

export function App() {
  const [loading, setLoading] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Global keydown listener for `~` key to trigger Terminal Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" || e.key === "~") {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="app-root">
      {loading && <PageLoader onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <>
          <div className="scanline"></div>
          <CustomCursor />
          
          <Navbar onOpenTerminal={() => setTerminalOpen(true)} />

          <main>
            <HeroSection />
            <WarpDivider />
            <AboutSection />
            <ExperienceSection />
            <ProjectsSection />
            <SkillsSection />

            <CurrentlyBuilding />
            <ContactSection />
          </main>

          <TerminalModal 
            isOpen={terminalOpen} 
            onClose={() => setTerminalOpen(false)} 
          />
        </>
      )}
    </div>
  );
}

export default App;
