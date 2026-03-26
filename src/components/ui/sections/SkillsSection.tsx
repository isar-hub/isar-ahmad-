/**
 * SkillsSection.tsx — Glass skill cards on transparent background.
 */
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const skills = [
  { category: 'Backend',   items: ['FastAPI', 'Node.js', 'Express', 'Kafka', 'Redis'],                  accent: '#D02020' },
  { category: 'Databases', items: ['PostgreSQL', 'MongoDB', 'Firebase', 'TimeSeries'],                   accent: '#1040C0' },
  { category: 'Frontend',  items: ['React.js', 'TypeScript', 'Tailwind CSS', 'Streamlit'],               accent: '#F0C020' },
  { category: 'Mobile',    items: ['Kotlin', 'Java', 'Flutter', 'MVVM', 'GetX'],                         accent: '#D02020' },
  { category: 'DevOps',    items: ['Docker', 'AWS (EC2, S3, RDS)', 'Nginx', 'CI/CD'],                    accent: '#1040C0' },
  { category: 'Quant',     items: ['Pandas', 'NumPy', 'Backtesting', 'Market Data'],                     accent: '#F0C020' },
];

export function SkillsSection(): React.ReactElement {
  return (
    <section
      id="skills"
      className="relative px-8 md:px-20 py-28"
      style={{ background: 'transparent' }}
    >
      <div className="flex items-center gap-5 mb-16">
        <div
          className="w-14 h-14 flex items-center justify-center font-black text-xl text-white"
          style={{ background: '#F0C020', color: '#000' }}
        >
          03
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white">Expertise</h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {skills.map((skill, i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 flex flex-col"
            style={{
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div
              className="flex justify-between items-center pb-3 mb-5"
              style={{ borderBottom: `2px solid ${skill.accent}` }}
            >
              <h4 className="text-base font-black text-white uppercase tracking-widest">
                {skill.category}
              </h4>
              <ChevronRight size={16} color={skill.accent} />
            </div>
            <div className="flex flex-wrap gap-2">
              {skill.items.map((item, j) => (
                <span
                  key={j}
                  className="text-xs font-bold uppercase tracking-widest px-3 py-1.5"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    color: 'rgba(245,245,245,0.7)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
