import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const QUICK_FACTS = [
  { icon: '📍', text: 'Based in Bengaluru' },
  { icon: '🎯', text: 'Open to relocation: Pune, Hyderabad, NCR, Mumbai' },
  { icon: '✓', text: 'Automation-first testing with Selenium, Appium & REST Assured' },
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

          {/* Right — Quick Facts */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}
          >
            {QUICK_FACTS.map((fact, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: 'rgba(22, 29, 36, 0.5)',
                  border: '1px solid var(--color-border-hairline)',
                  transition: 'border-color 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(74, 222, 154, 0.3)'
                  e.currentTarget.style.transform = 'translateX(4px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--color-border-hairline)'
                  e.currentTarget.style.transform = 'translateX(0)'
                }}
              >
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  borderRadius: '6px',
                  background: fact.icon === '✓' ? 'rgba(74, 222, 154, 0.12)' : 'rgba(35, 44, 53, 0.6)',
                  color: fact.icon === '✓' ? 'var(--color-accent-pass)' : 'inherit',
                  fontFamily: 'var(--font-mono)',
                  fontSize: fact.icon === '✓' ? '0.9rem' : '1.1rem',
                  fontWeight: 'bold',
                  flexShrink: 0,
                }}>
                  {fact.icon}
                </span>
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.875rem',
                  lineHeight: 1.5,
                  color: 'var(--color-text-primary)',
                }}>
                  {fact.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
