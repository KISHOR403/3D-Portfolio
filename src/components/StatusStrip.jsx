import { motion } from 'framer-motion'

const STATS = [
  { label: '4 PROJECTS SHIPPED', icon: '●' },
  { label: '95% AVG COVERAGE', icon: '●' },
  { label: '4 QUALITY GATES PASSED', icon: '●' },
  { label: 'CI/CD INTEGRATED', icon: '●' },
]

export default function StatusStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      id="status-strip"
      style={{
        borderTop: '1px solid var(--color-border-hairline)',
        borderBottom: '1px solid var(--color-border-hairline)',
        background: 'var(--color-bg-surface)',
        padding: '1rem 1.5rem',
        overflow: 'hidden',
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem 2.5rem',
      }}>
        {STATS.map((stat, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{
              color: 'var(--color-accent-pass)',
              fontSize: '0.5rem',
            }}>
              {stat.icon}
            </span>
            {stat.label}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
