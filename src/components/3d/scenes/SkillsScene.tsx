/**
 * SkillsScene.tsx
 * Skills section 3D scene — orbital rings of skill nodes.
 * Active when activeScene === 'skills'.
 */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Instances, Instance } from '@react-three/drei';
import * as THREE from 'three';
import { useIsActiveScene } from '../SceneManager';
import { damp } from '@/lib/3d/mathUtils';

const RING_CONFIGS = [
  { count: 8,  radius: 1.2, speed: 0.4,  color: '#D02020', y: 0,    size: 0.12 },
  { count: 12, radius: 2.0, speed: -0.3, color: '#1040C0', y: 0.3,  size: 0.09 },
  { count: 16, radius: 2.8, speed: 0.2,  color: '#F0C020', y: -0.2, size: 0.07 },
];

interface OrbitalRingProps {
  count: number;
  radius: number;
  speed: number;
  color: string;
  y: number;
  size: number;
  isActive: boolean;
}

function OrbitalRing({
  count, radius, speed, color, y, size, isActive,
}: OrbitalRingProps): React.ReactElement {
  const groupRef   = useRef<THREE.Group>(null!);
  const targetOpacity = useRef(0);

  const positions = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      return [
        Math.cos(angle) * radius,
        y + Math.sin(i * 0.7) * 0.15,
        Math.sin(angle) * radius,
      ] as [number, number, number];
    });
  }, [count, radius, y]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * speed;
    targetOpacity.current = damp(targetOpacity.current, isActive ? 1 : 0, 4, delta);
    groupRef.current.visible = targetOpacity.current > 0.01;
  });

  return (
    <group ref={groupRef}>
      <Instances limit={count}>
        <sphereGeometry args={[size, 12, 12]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.85}
        />
        {positions.map((pos, i) => (
          <Instance key={i} position={pos} />
        ))}
      </Instances>
    </group>
  );
}

/** Central nucleus */
function Nucleus({ isActive }: { isActive: boolean }): React.ReactElement {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.5;
    ref.current.rotation.y += delta * 0.7;
    const s = isActive ? 1 : 0;
    ref.current.scale.x = damp(ref.current.scale.x, s, 5, delta);
    ref.current.scale.y = damp(ref.current.scale.y, s, 5, delta);
    ref.current.scale.z = damp(ref.current.scale.z, s, 5, delta);
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.45, 1]} />
      <meshStandardMaterial
        color="#121212"
        emissive="#F0C020"
        emissiveIntensity={0.4}
        wireframe
      />
    </mesh>
  );
}

export function SkillsScene(): React.ReactElement {
  const isActive = useIsActiveScene('skills');

  return (
    <group position={[0, 0, 0]}>
      <ambientLight intensity={isActive ? 1.5 : 0.2} />
      <pointLight position={[3, 3, 3]} intensity={isActive ? 60 : 0} />

      <Nucleus isActive={isActive} />

      {RING_CONFIGS.map((cfg, i) => (
        <OrbitalRing key={i} {...cfg} isActive={isActive} />
      ))}
    </group>
  );
}
