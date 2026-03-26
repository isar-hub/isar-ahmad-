/**
 * HeroScene.tsx
 *
 * CONCEPT: Mouse-reactive particle field.
 *
 * Thousands of particles in a 3D grid.
 * Your mouse PHYSICALLY PUSHES them apart — they spring back.
 * Scroll pulls the camera forward through the field.
 *
 * No rotating object. The USER creates the animation.
 * Interaction = motion.
 */
import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneStore } from '@/lib/3d/useSceneStore';
import { damp, lerp } from '@/lib/3d/mathUtils';

// ─── Config ──────────────────────────────────────────────────────────────────
const COLS          = 48;
const ROWS          = 28;
const SPACING       = 0.28;
const REPEL_RADIUS  = 2.8;   // world units around cursor
const REPEL_FORCE   = 4.5;
const SPRING        = 3.5;   // slower return = longer displacement
const PARTICLE_SIZE = 0.024;

// Colour gradient by row (top → bottom: blue → yellow → red)
function rowColor(row: number, total: number): THREE.Color {
  const t = row / (total - 1);
  if (t < 0.5) return new THREE.Color().lerpColors(
    new THREE.Color('#2255ff'),
    new THREE.Color('#F0C020'),
    t * 2,
  );
  return new THREE.Color().lerpColors(
    new THREE.Color('#F0C020'),
    new THREE.Color('#D02020'),
    (t - 0.5) * 2,
  );
}

// ─── Particle field ───────────────────────────────────────────────────────────
export function HeroScene(): React.ReactElement {
  const { camera } = useThree();

  // Home positions
  const homePos = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    const ox = ((COLS - 1) * SPACING) / 2;
    const oy = ((ROWS - 1) * SPACING) / 2;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        arr.push(new THREE.Vector3(c * SPACING - ox, r * SPACING - oy, 0));
      }
    }
    return arr;
  }, []);

  const COUNT = homePos.length;

  // Current positions (live, written to buffer every frame)
  const currentPos = useMemo(
    () => homePos.map((p) => p.clone()),
    [homePos],
  );

  // Velocities for spring physics
  const velocities = useMemo(
    () => Array.from({ length: COUNT }, () => new THREE.Vector3()),
    [COUNT],
  );

  // Buffer geometry
  const geoRef        = useRef<THREE.BufferGeometry>(null!);
  const posAttr       = useRef<THREE.BufferAttribute>(null!);

  // Initialise flat Float32Array
  const posArray = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    homePos.forEach((p, i) => {
      arr[i * 3]     = p.x;
      arr[i * 3 + 1] = p.y;
      arr[i * 3 + 2] = p.z;
    });
    return arr;
  }, [homePos, COUNT]);

  // Per-particle colours
  const colArray = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let r = 0; r < ROWS; r++) {
      const col = rowColor(r, ROWS);
      for (let c = 0; c < COLS; c++) {
        const i = r * COLS + c;
        arr[i * 3]     = col.r;
        arr[i * 3 + 1] = col.g;
        arr[i * 3 + 2] = col.b;
      }
    }
    return arr;
  }, [COUNT]);

  // Camera target Z (scroll-driven)
  const camTargetZ = useRef(6);

  // Reusable vectors
  const _cursor  = useMemo(() => new THREE.Vector3(), []);
  const _diff    = useMemo(() => new THREE.Vector3(), []);
  const _repel   = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    const { mouseNDC, scrollProgress } = useSceneStore.getState();

    // ── Camera glides forward as user scrolls
    camTargetZ.current = lerp(6, 1.5, scrollProgress * 1.8);
    // eslint-disable-next-line
    camera.position.z = damp(camera.position.z, camTargetZ.current, 4, delta);
    camera.position.x  = damp(camera.position.x, mouseNDC.x * 0.4, 3, delta);
    camera.position.y  = damp(camera.position.y, mouseNDC.y * 0.25, 3, delta);
    camera.lookAt(0, 0, 0);

    // ── Mouse in world space (unproject onto z=0 plane)
    _cursor.set(mouseNDC.x, mouseNDC.y, 0.5).unproject(camera);
    // Flatten to z=0 plane (our particle plane)
    const dir = _cursor.sub(camera.position).normalize();
    const dist = -camera.position.z / dir.z;
    _cursor.copy(camera.position).addScaledVector(dir, dist);

    // ── Spring physics per particle
    const dt = Math.min(delta, 0.04); // cap dt for stability

    for (let i = 0; i < COUNT; i++) {
      const cur  = currentPos[i];
      const home = homePos[i];
      const vel  = velocities[i];

      // Repel from cursor
      _diff.subVectors(cur, _cursor);
      const dist2D = Math.sqrt(_diff.x * _diff.x + _diff.y * _diff.y);

      if (dist2D < REPEL_RADIUS && dist2D > 0.001) {
        const strength = (1 - dist2D / REPEL_RADIUS) * REPEL_FORCE;
        _repel.copy(_diff).normalize().multiplyScalar(strength);
        vel.add(_repel);
      }

      // Spring back toward home
      _diff.subVectors(home, cur);
      vel.addScaledVector(_diff, SPRING * dt);

      // Dampen — lower value = particles drift longer before settling
      vel.multiplyScalar(1 - 3.5 * dt);

      // Integrate
      cur.addScaledVector(vel, dt);

      // Write to buffer
      // eslint-disable-next-line
      posArray[i * 3]     = cur.x;
      posArray[i * 3 + 1] = cur.y;
      posArray[i * 3 + 2] = cur.z;
    }

    // ── Push to GPU
    if (posAttr.current) {
      posAttr.current.needsUpdate = true;
    }
  });

  return (
    <>
      {/* Subtle ambient only — particles glow from their own colour */}
      <ambientLight intensity={0.05} />

      <points>
        <bufferGeometry ref={geoRef}>
          <bufferAttribute
            ref={posAttr}
            attach="attributes-position"
            array={posArray}
            count={COUNT}
            itemSize={3}
            args={[posArray, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            array={colArray}
            count={COUNT}
            itemSize={3}
            args={[colArray, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={PARTICLE_SIZE}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.9}
        />
      </points>
    </>
  );
}
