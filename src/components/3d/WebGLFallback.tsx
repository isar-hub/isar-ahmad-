/**
 * WebGLFallback.tsx
 * Wraps children and renders them normally.
 * If WebGL is not supported, shows a decorative Bauhaus CSS fallback
 * instead of the 3D canvas.
 */
import type { ReactNode } from 'react';
import { useSceneStore } from '@/lib/3d/useSceneStore';

interface WebGLFallbackProps {
  children: ReactNode;
}

function BauhausFallbackBg(): React.ReactElement {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Decorative bauhaus geometric shapes as CSS fallback */}
      <div style={{
        position: 'absolute', top: '10%', right: '8%',
        width: 200, height: 200, borderRadius: '50%',
        border: '8px solid #D02020', opacity: 0.15,
      }} />
      <div style={{
        position: 'absolute', bottom: '15%', left: '5%',
        width: 160, height: 160,
        backgroundColor: '#1040C0', opacity: 0.08,
      }} />
      <div style={{
        position: 'absolute', top: '45%', left: '60%',
        width: 0, height: 0,
        borderLeft: '80px solid transparent',
        borderRight: '80px solid transparent',
        borderBottom: '140px solid #F0C020',
        opacity: 0.1,
      }} />
      <div style={{
        position: 'absolute', top: '20%', left: '20%',
        width: 120, height: 120,
        border: '6px solid #121212', opacity: 0.06,
      }} />
    </div>
  );
}

export function WebGLFallback({ children }: WebGLFallbackProps): React.ReactElement {
  const isWebGLSupported = useSceneStore((s) => s.isWebGLSupported);

  return (
    <>
      {!isWebGLSupported && <BauhausFallbackBg />}
      {children}
    </>
  );
}
