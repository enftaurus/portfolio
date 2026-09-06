import React, { useState, useEffect } from "react";
import { PageLoader } from "./components/PageLoader/PageLoader";
import { Navbar } from "./components/Navbar/Navbar";
import { HeroSection } from "./components/Hero/HeroSection";
import { Marquee } from "./components/Marquee/Marquee";
import { AboutSection } from "./components/About/AboutSection";
import { ExperienceSection } from "./components/Experience/ExperienceSection";
import { ProjectsSection } from "./components/Projects/ProjectsSection";
import { SkillsSection } from "./components/Skills/SkillsSection";
import { CurrentlyBuilding } from "./components/CurrentlyBuilding/CurrentlyBuilding";
import { CTASection } from "./components/CTA/CTASection";
import { TerminalModal } from "./components/EasterEgg/TerminalModal";
import { CommandPalette } from "./components/CommandPalette/CommandPalette";
import { CustomCursor } from "./components/Cursor/CustomCursor";
import { WarpDivider } from "./components/shared/WarpDivider";
import { RunningCat } from "./components/shared/RunningCat";

export function App() {
  const [loading, setLoading]         = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [paletteOpen, setPaletteOpen]   = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ~ or ` → toggle terminal
      if ((e.key === "`" || e.key === "~") && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
        return;
      }
      // Ctrl+K or Cmd+K → toggle command palette
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
        return;
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
          <div className="scanline" />
          <CustomCursor />

          <Navbar onOpenTerminal={() => setTerminalOpen(true)} />

          <main>
            <HeroSection />
            <RunningCat />
            <Marquee direction="left" />
            <WarpDivider />
            <AboutSection />
            <ExperienceSection />
            <ProjectsSection />
            <Marquee direction="right" />
            <SkillsSection />
            <CurrentlyBuilding />
            <RunningCat />
            <CTASection />
          </main>

          <TerminalModal
            isOpen={terminalOpen}
            onClose={() => setTerminalOpen(false)}
          />

          <CommandPalette
            isOpen={paletteOpen}
            onClose={() => setPaletteOpen(false)}
            onOpenTerminal={() => setTerminalOpen(true)}
          />
        </>
      )}
    </div>
  );
}

export default App;
