/**
 * HeroSection.tsx — Full-viewport hero.
 * Text floats directly over the 3D canvas.
 * Left glass panel for legibility; right side is fully transparent.
 */
import { motion } from 'framer-motion';
import { Github as GithubIcon, Linkedin, ArrowDown } from 'lucide-react';


export function HeroSection(): React.ReactElement {
  return (
    <header
      id="hero"
      className="relative min-h-screen flex items-center"
      style={{ background: 'transparent' }}
    >
      {/* Left: floating glass text panel */}
      <div className="relative z-10 flex flex-col justify-center px-8 md:px-20 py-20 max-w-2xl">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="font-bold uppercase tracking-[0.3em] mb-6 text-sm"
            style={{ color: '#D02020' }}
          >
            Senior Software Engineer
          </p>

          <h1
            className="text-7xl md:text-9xl lg:text-[10rem] mb-8 leading-[0.85] font-black uppercase tracking-tighter"
            style={{ color: '#f5f5f5' }}
          >
            ISAR<br />
            <span style={{ color: 'rgba(245,245,245,0.25)' }}>AHMAD</span>
          </h1>

          <p
            className="text-lg md:text-xl font-medium max-w-md mb-10 leading-relaxed"
            style={{
              color: 'rgba(245,245,245,0.65)',
              borderLeft: '3px solid #1040C0',
              paddingLeft: '1.25rem',
            }}
          >
            Building systems at the intersection of engineering, market data, and research.
            Distributed systems expert focused on reliability and scale.
          </p>

          <div className="flex flex-wrap gap-4">
            {/* GitHub */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.open('https://github.com/isar-hub', '_blank')}
              className="flex items-center gap-2 px-6 py-3 font-bold uppercase tracking-widest text-white text-sm"
              style={{
                background: '#D02020',
                boxShadow: '0 0 30px rgba(208,32,32,0.35)',
              }}
            >
              <GithubIcon size={16} /> Github
            </motion.button>

            {/* LinkedIn */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.open('https://www.linkedin.com/in/isar-ahmad24/', '_blank')}
              className="flex items-center gap-2 px-6 py-3 font-bold uppercase tracking-widest text-sm"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.18)',
                color: 'rgba(245,245,245,0.85)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <Linkedin size={16} /> LinkedIn
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Right: portrait — glass frame */}
      {/* <div className="absolute right-8 md:right-20 top-1/2 -translate-y-1/2 hidden lg:block">
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-72 h-80"
        >
          {/* Bauhaus accent squares 
          <div
            className="absolute -top-4 -left-4 w-16 h-16"
            style={{ background: '#D02020', opacity: 0.7 }}
          />
          <div
            className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full"
            style={{ background: '#F0C020', opacity: 0.6 }}
          />
          {/* Portrait 
          <div
            className="relative w-full h-full overflow-hidden"
            style={{
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.04)',
            }}
          >
            <img
              src={isarImg}
              alt="Isar Ahmad"
              className="w-full h-full object-cover"
              style={{ filter: 'grayscale(0.2) contrast(1.05)' }}
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                t.style.display = 'none';
              }}
            />
          </div>
        </motion.div>
      </div> */}

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(245,245,245,0.3)' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} style={{ color: 'rgba(245,245,245,0.3)' }} />
        </motion.div>
      </motion.div>
    </header>
  );
}
