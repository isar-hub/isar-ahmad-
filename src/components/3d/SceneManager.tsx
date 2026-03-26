/**
 * SceneManager.tsx
 * Reads activeScene from the store and renders only the active scene.
 * Scenes are toggled via opacity + pointer-events to avoid mount/unmount
 * thrash, allowing GSAP transitions to run smoothly.
 */
import { useSceneStore } from '@/lib/3d/useSceneStore';
import { HeroScene }     from './scenes/HeroScene';
import { SkillsScene }   from './scenes/SkillsScene';
import { ContactScene }  from './scenes/ContactScene';

export function SceneManager(): React.ReactElement {
  // Keep all scenes mounted; each scene reads activeScene and self-manages visibility
  return (
    <>
      <HeroScene />
      <SkillsScene />
      <ContactScene />
    </>
  );
}

/** Hook scenes can use to check if they're active */
export function useIsActiveScene(sceneId: string): boolean {
  return useSceneStore((s) => s.activeScene === sceneId);
}
