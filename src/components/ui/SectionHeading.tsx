/**
 * SectionHeading.tsx
 * Reusable Bauhaus section heading. Extracted from App.tsx.
 */
import type { ReactNode } from 'react';

interface SectionHeadingProps {
  children: ReactNode;
  number: string;
  color?: 'red' | 'blue' | 'yellow' | 'black';
  className?: string;
}

export function SectionHeading({
  children,
  number,
  color = 'red',
  className = '',
}: SectionHeadingProps): React.ReactElement {
  return (
    <div className={`flex items-center gap-6 mb-12 ${className}`}>
      <div
        className={`w-16 h-16 bauhaus-border-sm flex items-center justify-center font-black text-2xl bg-bauhaus-${color} ${color === 'yellow' ? 'text-black' : 'text-white'}`}
      >
        {number}
      </div>
      <h2 className="text-4xl md:text-6xl font-black">{children}</h2>
    </div>
  );
}
