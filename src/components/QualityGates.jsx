import { motion } from 'framer-motion'
import { Check, Award } from 'lucide-react'

const CERTIFICATIONS = [
  {
    name: 'SAP Certified Project Manager — SAP Activate & Agile Implementation',
    issuer: 'SAP',
    year: '2026',
  },
  {
    name: 'Software Testing and Automation Specialization',
    issuer: 'Coursera',
    year: '2025',
  },
  {
    name: 'Oracle Cloud Infrastructure 2025 Certified DevOps Professional',
    issuer: 'Oracle',
    year: '2025',
  },
  {
    name: 'Web and Mobile Testing with Selenium',
    issuer: 'Coursera',
    year: '2025',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function QualityGates() {
  return (
    <section id="quality-gates" style={{ background: 'var(--color-bg-surface)' }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-eyebrow">Quality Gates Passed</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'var(--color-text-primary)',
            marginBottom: '3rem',
          }}>
            Certifications
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            maxWidth: '800px',
          }}
        >
          {CERTIFICATIONS.map((cert, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 1.25rem',
                borderRadius: '10px',
                background: 'var(--color-bg-base)',
                border: '1px solid var(--color-border-hairline)',
                transition: 'border-color 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(74, 222, 154, 0.3)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border-hairline)'}
            >
              {/* Check icon */}
              <span style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'rgba(74, 222, 154, 0.1)',
                color: 'var(--color-accent-pass)',
                flexShrink: 0,
              }}>
                <Check size={14} strokeWidth={3} />
              </span>

              {/* Cert info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  lineHeight: 1.4,
                }}>
                  {cert.name}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--color-text-muted)',
                  marginTop: '2px',
                  letterSpacing: '0.04em',
                }}>
                  {cert.issuer}
                </p>
              </div>

              {/* Year */}
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                fontWeight: 600,
                color: 'var(--color-text-muted)',
                letterSpacing: '0.04em',
                flexShrink: 0,
              }}>
                {cert.year}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
