/**
 * usePerformance.ts
 * Adaptive quality system — samples FPS and sets isLowPerf flag in store.
 * Also detects WebGL support once at startup.
 */
import { useEffect, useRef } from 'react';
import { useSceneStore } from './useSceneStore';

const FPS_SAMPLE_WINDOW = 2000; // ms — measure over 2 seconds
const FPS_LOW_THRESHOLD = 30;   // fps

/** Call inside a Canvas child (has access to useFrame via drei) */
export function useAdaptivePerformance(): void {
  const setIsLowPerf = useSceneStore((s) => s.setIsLowPerf);
  const frameCount   = useRef(0);
  const startTime    = useRef(performance.now());

  useEffect(() => {
    let animId: number;

    const tick = (): void => {
      frameCount.current += 1;
      const elapsed = performance.now() - startTime.current;

      if (elapsed >= FPS_SAMPLE_WINDOW) {
        const fps = (frameCount.current / elapsed) * 1000;
        if (fps < FPS_LOW_THRESHOLD) {
          setIsLowPerf(true);
        }
        // Only sample once — no need to keep throttling after decision
        return;
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [setIsLowPerf]);
}

/** Detect WebGL once at startup — call outside Canvas */
export function useWebGLDetection(): void {
  const setIsWebGLSupported = useSceneStore((s) => s.setIsWebGLSupported);

  useEffect(() => {
    try {
      const canvas  = document.createElement('canvas');
      const ctx     = canvas.getContext('webgl') ?? canvas.getContext('experimental-webgl');
      const supported = !!ctx;
      setIsWebGLSupported(supported);
    } catch {
      setIsWebGLSupported(false);
    }
  }, [setIsWebGLSupported]);
}

/** Detect mobile/tablet by pointer type or screen width */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(pointer: coarse)').matches ||
    window.innerWidth < 768
  );
}
