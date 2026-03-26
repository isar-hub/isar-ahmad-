/**
 * BauhausCard.tsx
 * Reusable Bauhaus-styled card. Extracted from App.tsx.
 */
import type { ElementType } from 'react';
import { motion } from 'framer-motion';
import {
  Github as GithubIcon,
  ExternalLink,
  Apple,
  Play,
} from 'lucide-react';

interface BauhausCardProps {
  title: string;
  subtitle?: string;
  content: string;
  color?: 'white' | 'red' | 'blue' | 'yellow';
  icon?: ElementType;
  geometricShape?: 'circle' | 'square' | 'triangle';
  className?: string;
  links?: {
    github?: string;
    live?: string;
    appStore?: string;
    playStore?: string;
  };
  screenshot?: string;
}

export function BauhausCard({
  title,
  subtitle,
  content,
  color = 'white',
  icon: Icon,
  geometricShape = 'circle',
  className = '',
  links,
  screenshot,
}: BauhausCardProps): React.ReactElement {
  const shapes: Record<string, string> = {
    circle:   'rounded-full',
    square:   'rounded-none',
    triangle: 'clip-triangle',
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`bauhaus-border bauhaus-shadow p-8 relative flex flex-col gap-4 h-full ${className} ${color === 'white' ? 'bg-white' : `bg-bauhaus-${color}`}`}
    >
      <div className="flex justify-between items-start">
        {Icon && <Icon size={32} className="text-bauhaus-black" />}
        <div className={`w-4 h-4 bg-bauhaus-black ${shapes[geometricShape]}`} />
      </div>

      {screenshot && (
        <div className="bauhaus-border-sm overflow-hidden aspect-video bg-bauhaus-muted mb-4">
          <img
            src={screenshot}
            alt={title}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>
      )}

      <div className="flex-grow">
        <h3 className="text-2xl font-black mb-1">{title}</h3>
        {subtitle && (
          <p className="text-sm font-bold uppercase tracking-widest text-bauhaus-black/60 mb-4">
            {subtitle}
          </p>
        )}
        <div className="text-lg font-medium leading-relaxed mb-6">{content}</div>
      </div>

      {links && (
        <div className="flex flex-wrap gap-4 pt-4 border-t-2 border-bauhaus-black/10">
          {links.github && (
            <a href={links.github} target="_blank" rel="noopener noreferrer" className="hover:text-bauhaus-red transition-colors">
              <GithubIcon size={20} />
            </a>
          )}
          {links.live && (
            <a href={links.live} target="_blank" rel="noopener noreferrer" className="hover:text-bauhaus-blue transition-colors">
              <ExternalLink size={20} />
            </a>
          )}
          {links.appStore && (
            <a href={links.appStore} target="_blank" rel="noopener noreferrer" className="hover:text-bauhaus-red transition-colors">
              <Apple size={20} />
            </a>
          )}
          {links.playStore && (
            <a href={links.playStore} target="_blank" rel="noopener noreferrer" className="hover:text-bauhaus-blue transition-colors">
              <Play size={20} />
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}
