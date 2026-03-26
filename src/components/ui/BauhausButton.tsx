/**
 * BauhausButton.tsx
 * Reusable Bauhaus-styled button. Extracted from App.tsx.
 */
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface BauhausButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'red' | 'blue' | 'yellow' | 'white' | 'black';
  className?: string;
}

export function BauhausButton({
  children,
  variant = 'red',
  className = '',
  ...props
}: BauhausButtonProps): React.ReactElement {
  const bgMap: Record<string, string> = {
    red:    'bg-bauhaus-red text-white',
    blue:   'bg-bauhaus-blue text-white',
    yellow: 'bg-bauhaus-yellow text-bauhaus-black',
    white:  'bg-white text-bauhaus-black',
    black:  'bg-bauhaus-black text-white',
  };

  return (
    <button
      className={`bauhaus-border-sm bauhaus-shadow-sm bauhaus-btn-press px-6 py-3 font-bold uppercase tracking-widest ${bgMap[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
