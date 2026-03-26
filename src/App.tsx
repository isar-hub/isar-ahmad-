/**
 * App.tsx
 * Root application component.
 *
 * Layer architecture:
 *  ┌─────────────────────────────────────────────────────┐
 *  │  GlobalCanvas  (position: fixed, z-index: 0)        │ ← WebGL layer
 *  │  ┌─────────────────────────────────────────────┐    │
 *  │  │  SceneManager → HeroScene / SkillsScene /   │    │
 *  │  │               ContactScene                  │    │
 *  │  │  CameraController                           │    │
 *  │  └─────────────────────────────────────────────┘    │
 *  ├─────────────────────────────────────────────────────┤
 *  │  DOM UI  (position: relative, z-index: 1)           │ ← Tailwind DOM layer
 *  │  Nav → HeroSection → ExperienceSection → …          │
 *  └─────────────────────────────────────────────────────┘
 *
 *  ScrollSyncInit — mounts a scroll listener that updates the store.
 *  WebGLFallback  — renders CSS fallback when WebGL is unavailable.
 *  useWebGLDetection — probes canvas.getContext on mount.
 */
import { useEffect } from 'react';
import { useSceneStore } from '@/lib/3d/useSceneStore';
import { ScrollSyncInit } from '@/lib/3d/useScrollSync';
import { useWebGLDetection } from '@/lib/3d/usePerformance';
import { GlobalCanvas } from '@/components/3d/GlobalCanvas';
import { WebGLFallback } from '@/components/3d/WebGLFallback';
import { Nav } from '@/components/ui/Nav';
import { HeroSection } from '@/components/ui/sections/HeroSection';
import { ExperienceSection } from '@/components/ui/sections/ExperienceSection';
import { ProjectsSection } from '@/components/ui/sections/ProjectsSection';
import { SkillsSection } from '@/components/ui/sections/SkillsSection';
import { ContactSection } from '@/components/ui/sections/ContactSection';

/** Initialises WebGL detection and injects result into store */
function AppInit(): null {
  useWebGLDetection();
  return null;
}

function App(): React.ReactElement {
  const isWebGLSupported = useSceneStore((s) => s.isWebGLSupported);

  // Re-trigger canvas pointer events only on interactive 3D objects
  // (the canvas wrapper div has pointer-events:none; R3F event system
  // intercepts raycasting internally via its own canvas event listeners)
  useEffect(() => {
    document.title = 'Isar Ahmad — Senior Software Engineer';
  }, []);

  return (
    <>
      {/* Scroll listener — syncs window.scrollY → store */}
      <ScrollSyncInit />

      {/* WebGL probe */}
      <AppInit />

      {/* 3D rendering layer — fixed behind everything */}
      <WebGLFallback>
        {isWebGLSupported && <GlobalCanvas />}
      </WebGLFallback>

      {/* DOM UI layer — scrollable, sits above canvas */}
      <div
        className="relative min-h-screen dot-grid selection:bg-bauhaus-yellow selection:text-black"
        style={{ zIndex: 1 }}
      >
        <Nav />

        <main>
          <HeroSection />
          <ExperienceSection />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />
        </main>
      </div>
    </>
  );
}

export default App;
