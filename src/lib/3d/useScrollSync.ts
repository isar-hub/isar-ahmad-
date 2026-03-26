/**
 * useScrollSync.ts
 * Listens to window scroll, updates scrollProgress and activeScene in store.
 * Mount this once at app root via <ScrollSyncInit />.
 */
import { useEffect } from 'react';
import {
  useSceneStore,
  deriveSceneFromScroll,
  SCENE_CAMERA_TARGETS,
} from './useSceneStore';

export function useScrollSync(): void {
  const setScrollProgress = useSceneStore((s) => s.setScrollProgress);
  const setActiveScene    = useSceneStore((s) => s.setActiveScene);
  const setCameraTarget   = useSceneStore((s) => s.setCameraTarget);

  useEffect(() => {
    const onScroll = (): void => {
      const scrollTop    = window.scrollY;
      const maxScroll    = document.body.scrollHeight - window.innerHeight;
      const progress     = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;
      const scene        = deriveSceneFromScroll(progress);

      setScrollProgress(progress);
      setActiveScene(scene);
      setCameraTarget(SCENE_CAMERA_TARGETS[scene]);
    };

    // Passive listener — no scroll blocking
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initialise
    return () => window.removeEventListener('scroll', onScroll);
  }, [setScrollProgress, setActiveScene, setCameraTarget]);
}

/** Thin component wrapper so we can mount the hook without a wrapping element */
export function ScrollSyncInit(): null {
  useScrollSync();
  return null;
}
