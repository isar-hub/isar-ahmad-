/**
 * GlobalCanvas.tsx
 * The single global <Canvas> for the entire application.
 * Mounted at app root, position: fixed, behind all DOM content.
 * All scenes and the camera controller render inside here.
 */
import { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import { useSceneStore } from '@/lib/3d/useSceneStore';
import { isMobileDevice } from '@/lib/3d/usePerformance';
import { SceneManager } from './SceneManager';
import { CameraController } from './CameraController';

export function GlobalCanvas(): React.ReactElement {
  const isLowPerf = useSceneStore((s) => s.isLowPerf);
  const mobile    = useMemo(() => isMobileDevice(), []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        dpr={isLowPerf || mobile ? 1 : [1, 2]}
        frameloop="always"
        camera={{ position: [0, 0, 6], fov: 60, near: 0.1, far: 100 }}
        gl={{
          antialias: !mobile,
          powerPreference: 'high-performance',
        }}
        shadows={!mobile && !isLowPerf}
        aria-label="3D background scene"
      >
        {/* Adaptive DPR — drops pixel ratio if frame time increases */}
        <AdaptiveDpr pixelated />

        <Suspense fallback={null}>
          <CameraController />
          <SceneManager />
        </Suspense>
      </Canvas>
    </div>
  );
}
