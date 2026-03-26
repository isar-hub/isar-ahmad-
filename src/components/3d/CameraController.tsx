/**
 * CameraController.tsx
 * Custom camera controller using useFrame.
 * - Scroll-driven position (lerp toward cameraTarget)
 * - Mouse parallax offset
 * - No OrbitControls
 */
import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useSceneStore } from '@/lib/3d/useSceneStore';
import { damp } from '@/lib/3d/mathUtils';

const PARALLAX_STRENGTH = 0.3;
const CAMERA_LERP       = 8;   // lambda for damp — higher = snappier

export function CameraController(): null {
  const { camera } = useThree();
  const isFirst    = useRef(true);

  useFrame((_, delta) => {
    const { cameraTarget, mouseNDC } = useSceneStore.getState();

    // Parallax offset from mouse
    const parallaxX = mouseNDC.x * PARALLAX_STRENGTH;
    const parallaxY = mouseNDC.y * PARALLAX_STRENGTH;

    const targetX = cameraTarget.x + parallaxX;
    const targetY = cameraTarget.y + parallaxY;
    const targetZ = cameraTarget.z;

    if (isFirst.current) {
      // Snap on first frame to avoid fly-in from origin
      camera.position.set(targetX, targetY, targetZ);
      isFirst.current = false;
      return;
    }

    camera.position.x = damp(camera.position.x, targetX, CAMERA_LERP, delta);
    camera.position.y = damp(camera.position.y, targetY, CAMERA_LERP, delta);
    camera.position.z = damp(camera.position.z, targetZ, CAMERA_LERP, delta);

    camera.lookAt(0, 0, 0);
  });

  return null;
}
