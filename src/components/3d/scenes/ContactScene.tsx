/**
 * ContactScene.tsx
 * Contact section 3D scene — abstract wireframe icosahedron + grid helper.
 * Active when activeScene === 'contact'.
 */
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Grid } from '@react-three/drei';
import * as THREE from 'three';
import { useIsActiveScene } from '../SceneManager';
import { damp } from '@/lib/3d/mathUtils';

function RotatingIcosahedron({ isActive }: { isActive: boolean }): React.ReactElement {
  const outerRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (!outerRef.current || !innerRef.current) return;
    outerRef.current.rotation.y += delta * 0.18;
    outerRef.current.rotation.x += delta * 0.09;
    innerRef.current.rotation.y -= delta * 0.24;
    innerRef.current.rotation.z += delta * 0.12;

    const targetScale = isActive ? 1 : 0;
    outerRef.current.scale.setScalar(
      damp(outerRef.current.scale.x, targetScale, 4, delta),
    );
    innerRef.current.scale.setScalar(
      damp(innerRef.current.scale.x, targetScale * 0.65, 4, delta),
    );
  });

  return (
    <>
      {/* Outer wireframe */}
      <mesh ref={outerRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshBasicMaterial color="#1040C0" wireframe transparent opacity={0.4} />
      </mesh>
      {/* Inner solid */}
      <mesh ref={innerRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color="#D02020"
          emissive="#D02020"
          emissiveIntensity={0.3}
          roughness={0.4}
          metalness={0.2}
          transparent
          opacity={0.7}
        />
      </mesh>
    </>
  );
}

/** Floating bauhaus squares */
function FloatingSquares({ isActive }: { isActive: boolean }): React.ReactElement {
  const configs = [
    { pos: [-2.5,  0.8, -1] as [number, number, number], color: '#F0C020', rot: 0.4 },
    { pos: [ 2.3, -0.9, -2] as [number, number, number], color: '#121212', rot: -0.3 },
  ];

  return (
    <>
      {configs.map(({ pos, color, rot }, i) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const ref = useRef<THREE.Mesh>(null!);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useFrame((_, delta) => {
          if (!ref.current) return;
          ref.current.rotation.z += delta * rot;
          const s = isActive ? 1 : 0;
          ref.current.scale.setScalar(damp(ref.current.scale.x, s, 4, delta));
        });
        return (
          <mesh key={i} ref={ref} position={pos}>
            <planeGeometry args={[0.6, 0.6]} />
            <meshBasicMaterial color={color} side={THREE.DoubleSide} />
          </mesh>
        );
      })}
    </>
  );
}

export function ContactScene(): React.ReactElement {
  const isActive = useIsActiveScene('contact');

  return (
    <group>
      <ambientLight intensity={isActive ? 1.2 : 0.2} />
      <pointLight position={[-3, 3, 2]} intensity={isActive ? 40 : 0} color="#F0C020" />
      <pointLight position={[3, -2, 2]} intensity={isActive ? 30 : 0} color="#1040C0" />

      <RotatingIcosahedron isActive={isActive} />
      <FloatingSquares isActive={isActive} />

      {/* Bauhaus grid floor */}
      {isActive && (
        <Grid
          position={[0, -2.5, 0]}
          args={[12, 12]}
          cellSize={0.5}
          cellThickness={0.5}
          cellColor="#121212"
          sectionSize={2}
          sectionThickness={1}
          sectionColor="#D02020"
          fadeDistance={8}
          fadeStrength={1}
          infiniteGrid={false}
        />
      )}
    </group>
  );
}
