import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const CHECKLIST = [
  'B.Tech in Computer Science & Engineering — Lovely Professional University (2022–2026)',
  'Senior Secondary (Science) — Resolution Academy, Assam',
  'Automation-first testing with Selenium, Appium & REST Assured',
  'CI/CD pipeline integration — GitHub Actions & Jenkins',
  'Open to relocation across major Indian tech hubs',
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function TestPlan() {
  return (
    <section id="test-plan" style={{ background: 'transparent' }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-eyebrow">Test Plan</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'var(--color-text-primary)',
            marginBottom: '3rem',
          }}>
            About me
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
          gap: '3rem',
          alignItems: 'start',
        }}>
          {/* Left — Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              lineHeight: 1.8,
              color: 'var(--color-text-muted)',
            }}>
              Results-driven QA Engineer with hands-on experience in manual and automation testing. 
              I specialize in building scalable test frameworks using Selenium, Appium, and REST Assured, 
              and have a strong foundation in SDLC/STLC, test case design, and defect lifecycle management.
            </p>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              lineHeight: 1.8,
              color: 'var(--color-text-muted)',
              marginTop: '1.25rem',
            }}>
              As a recent Computer Science graduate, I've built data-driven frameworks with Page Object Model 
              patterns, validated SQL data integrity, and integrated CI/CD pipelines via GitHub Actions and Jenkins — 
              ensuring every build ships with confidence.
            </p>
          </motion.div>

          {/* Right — Checklist */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}
          >
            {CHECKLIST.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: 'rgba(22, 29, 36, 0.5)',
                  border: '1px solid var(--color-border-hairline)',
                  transition: 'border-color 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(74, 222, 154, 0.3)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border-hairline)'}
              >
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'rgba(74, 222, 154, 0.12)',
                  color: 'var(--color-accent-pass)',
                  flexShrink: 0,
                  marginTop: '2px',
                }}>
                  <Check size={12} strokeWidth={3} />
                </span>
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.875rem',
                  lineHeight: 1.5,
                  color: 'var(--color-text-primary)',
                }}>
                  {item}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
