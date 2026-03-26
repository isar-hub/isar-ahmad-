/**
 * ContactSection.tsx — Minimal dark contact footer, transparent so 3D shows.
 */
import { motion } from 'framer-motion';
import { Mail, Smartphone, Github as GithubIcon, Linkedin } from 'lucide-react';

export function ContactSection(): React.ReactElement {
  return (
    <footer
      id="contact"
      className="relative px-8 md:px-20 py-28"
      style={{
        background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 40%)',
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <p className="text-xs font-bold uppercase tracking-[0.4em] mb-4" style={{ color: '#D02020' }}>
            04 / Contact
          </p>
          <h2 className="text-5xl md:text-8xl font-black text-white leading-none">
            LET'S<br />
            <span style={{ color: 'rgba(245,245,245,0.15)' }}>CONNECT</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Contact details */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5"
          >
            <a
              href="mailto:isar786ahmad@gmail.com"
              className="flex items-center gap-4 text-lg font-medium group"
              style={{ color: 'rgba(245,245,245,0.7)' }}
            >
              <div
                className="w-10 h-10 flex items-center justify-center"
                style={{ background: 'rgba(208,32,32,0.15)', border: '1px solid rgba(208,32,32,0.3)' }}
              >
                <Mail size={18} color="#D02020" />
              </div>
              <span className="group-hover:text-white transition-colors">isar786ahmad@gmail.com</span>
            </a>

            <div
              className="flex items-center gap-4 text-lg font-medium"
              style={{ color: 'rgba(245,245,245,0.7)' }}
            >
              <div
                className="w-10 h-10 flex items-center justify-center"
                style={{ background: 'rgba(16,64,192,0.15)', border: '1px solid rgba(16,64,192,0.3)' }}
              >
                <Smartphone size={18} color="#5570E8" />
              </div>
              <span>+91-62-995-50551</span>
            </div>
          </motion.div>

          {/* Bio + links */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-between gap-8"
          >
            <p
              className="text-base leading-relaxed"
              style={{
                color: 'rgba(245,245,245,0.45)',
                borderLeft: '3px solid #F0C020',
                paddingLeft: '1.25rem',
              }}
            >
              Currently based in West Bengal, India. Open to distributed systems,
              backend architecture, and quant engineering roles.
            </p>

            <div className="flex gap-4">
              {[
                { label: 'GitHub', href: 'https://github.com/isar-hub', Icon: GithubIcon, color: 'rgba(255,255,255,0.85)' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/isar-ahmad24/', Icon: Linkedin, color: 'rgba(255,255,255,0.85)' },
              ].map(({ label, href, Icon, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-3 text-sm font-bold uppercase tracking-widest"
                  style={{
                    background: label === 'GitHub' ? '#D02020' : 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color,
                  }}
                >
                  <Icon size={15} /> {label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer bar */}
        <div
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex gap-3 items-center opacity-30">
            <div className="w-6 h-6 bg-bauhaus-red rounded-full" />
            <div className="w-6 h-6 bg-bauhaus-blue" />
            <div
              className="w-0 h-0"
              style={{
                borderLeft: '12px solid transparent',
                borderRight: '12px solid transparent',
                borderBottom: '20px solid #F0C020',
              }}
            />
          </div>
          <p
            className="font-bold text-xs tracking-[0.4em]"
            style={{ color: 'rgba(245,245,245,0.2)' }}
          >
            © 2026 ISAR AHMAD
          </p>
        </div>
      </div>
    </footer>
  );
}
