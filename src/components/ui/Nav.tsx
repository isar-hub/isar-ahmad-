/**
 * Nav.tsx — Glass morphism navigation on dark background.
 * Tracks mouse → store for camera parallax.
 */
import { useEffect } from 'react';
import { useSceneStore } from '@/lib/3d/useSceneStore';

export function Nav(): React.ReactElement {
  const setMouseNDC = useSceneStore((s) => s.setMouseNDC);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent): void => {
      setMouseNDC({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [setMouseNDC]);

  return (
    <nav
      className="sticky top-0 z-50 px-8 py-4 flex justify-between items-center"
      style={{
        background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Logo */}
      <div className="flex gap-2 items-center">
        <div className="w-5 h-5 bg-bauhaus-red rounded-full" />
        <div className="w-5 h-5 bg-bauhaus-blue" />
        <div
          className="w-0 h-0"
          style={{
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderBottom: '17px solid #F0C020',
          }}
        />
        <span className="font-black text-xl ml-2 tracking-tighter text-white">ISAR.HUB</span>
      </div>

      {/* Links */}
      <div className="hidden md:flex gap-8 font-bold uppercase text-sm tracking-widest">
        {[
          { href: '#work', label: 'Work', color: 'hover:text-bauhaus-red' },
          { href: '#projects', label: 'Projects', color: 'hover:text-bauhaus-blue' },
          { href: '#skills', label: 'Skills', color: 'hover:text-bauhaus-yellow' },
          { href: '#contact', label: 'Contact', color: 'hover:text-bauhaus-red' },
        ].map(({ href, label, color }) => (
          <a
            key={href}
            href={href}
            className={`text-white/70 transition-colors duration-200 ${color}`}
          >
            {label}
          </a>
        ))}
      </div>

      {/* CTA */}
      <button
        className="hidden sm:block px-5 py-2 text-sm font-bold uppercase tracking-widest text-white transition-all duration-200"
        style={{
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          backdropFilter: 'blur(8px)',
        }}
        onClick={() => window.open('https://drive.google.com/drive/folders/1lEp1kh1hv68sh5woHtPgJN8HMkQxOPI9', '_blank', 'noopener,noreferrer')}
      >
        Resume
      </button>
    </nav>
  );
}
