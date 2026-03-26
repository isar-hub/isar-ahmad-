/**
 * useSceneStore.ts
 * Global Zustand store — single source of truth for 3D state.
 * Shared between the Canvas layer and the DOM/UI layer.
 */
import { create } from 'zustand';

export type SceneId = 'hero' | 'skills' | 'contact';

interface CameraTarget {
  x: number;
  y: number;
  z: number;
}

interface MouseNDC {
  x: number; // -1 to 1
  y: number; // -1 to 1
}

interface SceneState {
  // Scroll & scene
  scrollProgress: number;       // 0–1 across full page
  activeScene: SceneId;

  // Camera
  cameraTarget: CameraTarget;

  // Mouse (Normalised Device Coordinates)
  mouseNDC: MouseNDC;

  // Performance flags
  isLowPerf: boolean;
  isWebGLSupported: boolean;

  // Hover
  hoveredObjectId: string | null;

  // Actions
  setScrollProgress: (p: number) => void;
  setActiveScene: (s: SceneId) => void;
  setCameraTarget: (t: CameraTarget) => void;
  setMouseNDC: (m: MouseNDC) => void;
  setIsLowPerf: (v: boolean) => void;
  setIsWebGLSupported: (v: boolean) => void;
  setHoveredObjectId: (id: string | null) => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  scrollProgress: 0,
  activeScene: 'hero',
  cameraTarget: { x: 0, y: 0, z: 6 },
  mouseNDC: { x: 0, y: 0 },
  isLowPerf: false,
  isWebGLSupported: true,
  hoveredObjectId: null,

  setScrollProgress: (scrollProgress) => set({ scrollProgress }),
  setActiveScene: (activeScene) => set({ activeScene }),
  setCameraTarget: (cameraTarget) => set({ cameraTarget }),
  setMouseNDC: (mouseNDC) => set({ mouseNDC }),
  setIsLowPerf: (isLowPerf) => set({ isLowPerf }),
  setIsWebGLSupported: (isWebGLSupported) => set({ isWebGLSupported }),
  setHoveredObjectId: (hoveredObjectId) => set({ hoveredObjectId }),
}));

/** Derived helper: get scene from scroll progress */
export function deriveSceneFromScroll(progress: number): SceneId {
  if (progress < 0.4) return 'hero';
  if (progress < 0.75) return 'skills';
  return 'contact';
}

/** Camera positions per scene */
export const SCENE_CAMERA_TARGETS: Record<SceneId, CameraTarget> = {
  hero:    { x: 0,    y: 0,   z: 6 },
  skills:  { x: 2,    y: -1,  z: 5 },
  contact: { x: -1.5, y: -2,  z: 5.5 },
};
