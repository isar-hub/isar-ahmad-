/**
 * ExperienceSection.tsx — Glass cards on transparent background.
 */
import { motion } from 'framer-motion';

const experiences = [
  {
    role: 'Senior Software Engineer (Quant Engineer)',
    company: 'Fractal Street',
    period: "Apr '25 – Present",
    description:
      'Architected and maintained distributed backend systems for financial products. Built event-driven services for real-time market data using FastAPI, Kafka, and AWS.',
    accent: '#D02020',
  },
  {
    role: 'Android Developer',
    company: 'REDCAT HOSPITALITY PVT. LTD.',
    period: "Jul '16 – Mar '25",
    description:
      'Developed MemeShare and attendance management apps using Kotlin, MVVM, and Node.js. Optimized inventory systems and automated warranty updates.',
    accent: '#1040C0',
  },
  {
    role: 'Android Developer',
    company: 'NASHBUD PVT. LTD.',
    period: "Apr '23 – Jul '24",
    description:
      'Built social media features including video uploads and stories. Used AWS S3, MongoDB, and Express.js.',
    accent: '#F0C020',
  },
];

export function ExperienceSection(): React.ReactElement {
  return (
    <section
      id="work"
      className="relative px-8 md:px-20 py-28"
      style={{ background: 'transparent' }}
    >
      {/* Section label */}
      <div className="flex items-center gap-5 mb-16">
        <div
          className="w-14 h-14 flex items-center justify-center font-black text-xl text-white"
          style={{ background: '#D02020' }}
        >
          01
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white">Experience</h2>
      </div>

      <div className="grid gap-6 max-w-4xl">
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="p-8"
            style={{
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderLeft: `3px solid ${exp.accent}`,
            }}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
              <h3 className="text-xl font-black text-white">{exp.role}</h3>
              <span
                className="text-xs font-bold uppercase tracking-widest whitespace-nowrap"
                style={{ color: 'rgba(245,245,245,0.4)' }}
              >
                {exp.period}
              </span>
            </div>
            <p
              className="text-sm font-bold uppercase tracking-widest mb-4"
              style={{ color: exp.accent }}
            >
              {exp.company}
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'rgba(245,245,245,0.65)' }}>
              {exp.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
