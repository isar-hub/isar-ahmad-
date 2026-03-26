/**
 * ProjectsSection.tsx — Glass project cards on transparent background.
 */
import { motion } from 'framer-motion';
import { Cpu, Smartphone, Laptop, Github as GithubIcon, ExternalLink, Apple, Play } from 'lucide-react';
import type { ElementType } from 'react';

interface Project {
  title: string;
  type: string;
  description: string;
  accent: string;
  icon: ElementType;
  links: { github?: string; live?: string; appStore?: string; playStore?: string };
}

const projects: Project[] = [
  {
    title: 'Fractal Street Trading Tools',
    type: 'Quant Engineering',
    description: 'High-performance distributed platform for real-time market data. FastAPI, Kafka, and React for low-latency tick data streaming.',
    accent: '#F0C020',
    icon: Cpu,
    links: { github: 'https://github.com/isar-hub', live: 'https://journal.fractalstreet.com/signin' },
  },
  {
    title: 'MemeShare Social Platform',
    type: 'Mobile · Android',
    description: 'Comprehensive social platform for content generation and meme sharing. Advanced editing tools and cloud synchronization.',
    accent: '#1040C0',
    icon: Smartphone,
    links: { live: 'https://www.linkedin.com/in/isar-ahmad24/overlay/Project/1114274150/treasury?profileId=ACoAADS52PgBF9MKb8ql0UNvcLOr9RZxARA1bs8' },
  },
  {
    title: 'Inventory & Sales Management',
    type: 'Enterprise',
    description: 'Enterprise-grade system for refurbished mobile tracking. Barcode scanning, model management, automated warranty updates.',
    accent: '#D02020',
    icon: Laptop,
    links: { github: 'https://github.com/isar-hub' },
  },
  {
    title: 'HR & Geo Attendance System',
    type: 'Infrastructure',
    description: 'Location-based attendance tracking using geofencing. Accurate check-in/out boundaries for multi-office management.',
    accent: '#F0C020',
    icon: Smartphone,
    links: { github: 'https://github.com/isar-hub' },
  },
  {
    title: 'WALI-ENTERPRISES',
    type: 'E-Commerce',
    description: 'Modern retail platform built with Flutter and Express. Scale-ready architecture with Razorpay and Cloudinary.',
    accent: '#1040C0',
    icon: Laptop,
    links: { playStore: 'https://play.google.com/store/apps/details?id=com.isar.waliEnterprises&hl=en', appStore: 'https://apps.apple.com/us/app/wali-enterprises/id6743793702' },
  },
  {
    title: 'Ride Booking Application',
    type: 'Full-Stack Mobile',
    description: 'End-to-end ride-hailing solution with real-time GPS, driver-rider matching, and secure payments via Flutter.',
    accent: '#D02020',
    icon: Smartphone,
    links: {
      playStore: 'https://play.google.com/store/apps/details?id=com.isar.flashride_driver', live: 'https://play.google.com/store/apps/details?id=com.flashride.mightyrider'
    },
  },
  {
    title: 'Nashbud Social Media Platform',
    type: 'Platform',
    description: 'Core social features including video processing, uploads, and stories for a high-traffic production app.',
    accent: '#F0C020',
    icon: Smartphone,
    links: { github: 'https://play.google.com/store/apps/details?id=com.NashBud3.nashbud' },
  },
];

export function ProjectsSection(): React.ReactElement {
  return (
    <section
      id="projects"
      className="relative px-8 md:px-20 py-28"
      style={{ background: 'transparent' }}
    >
      <div className="flex items-center gap-5 mb-16">
        <div
          className="w-14 h-14 flex items-center justify-center font-black text-xl text-white"
          style={{ background: '#1040C0' }}
        >
          02
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white">Projects</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-6 flex flex-col gap-4"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {/* Top row */}
              <div className="flex justify-between items-start">
                <Icon size={28} color={p.accent} />
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: p.accent, opacity: 0.8 }}
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: p.accent }}>
                  {p.type}
                </p>
                <h3 className="text-lg font-black text-white mb-3">{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,245,245,0.55)' }}>
                  {p.description}
                </p>
              </div>

              {/* Links */}
              <div
                className="flex gap-4 pt-4"
                style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
              >
                {p.links.github && <a href={p.links.github} target="_blank" rel="noopener noreferrer"><GithubIcon size={18} color="rgba(245,245,245,0.5)" /></a>}
                {p.links.live && <a href={p.links.live} target="_blank" rel="noopener noreferrer"><ExternalLink size={18} color="rgba(245,245,245,0.5)" /></a>}
                {p.links.appStore && <a href={p.links.appStore} target="_blank" rel="noopener noreferrer"><Apple size={18} color="rgba(245,245,245,0.5)" /></a>}
                {p.links.playStore && <a href={p.links.playStore} target="_blank" rel="noopener noreferrer"><Play size={18} color="rgba(245,245,245,0.5)" /></a>}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
