import { motion } from 'framer-motion'

const ACCENT_COLORS = ['var(--color-accent-pass)', 'var(--color-accent-pending)', 'var(--color-accent-fail)']

const SKILL_CATEGORIES = [
  {
    title: 'Languages & Querying',
    skills: ['Java', 'SQL'],
  },
  {
    title: 'Automation Tools & Frameworks',
    skills: ['Selenium WebDriver', 'Appium', 'TestNG', 'JUnit', 'REST Assured', 'Postman'],
  },
  {
    title: 'Testing Skills & Methodologies',
    skills: [
      'Manual Testing', 'Agile (Scrum)', 'SDLC', 'STLC',
      'API Testing & Automation', 'Mobile Testing', 'Test Case Design',
      'Bug Tracking & Debugging', 'Defect Life Cycle', 'Regression Testing',
    ],
  },
  {
    title: 'Developer Tools',
    skills: ['Git', 'GitHub', 'Jira', 'TestRail', 'Jenkins', 'GitHub Actions'],
  },
  {
    title: 'Design Patterns',
    skills: ['Page Object Model (POM)', 'Data-Driven Testing', 'CI/CD Integration'],
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function CoverageReport() {
  return (
    <section id="coverage-report" style={{ background: 'var(--color-bg-surface)' }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-eyebrow">Coverage Report</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'var(--color-text-primary)',
            marginBottom: '3rem',
          }}>
            Skills & technologies
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            gap: '1.25rem',
          }}
        >
          {SKILL_CATEGORIES.map((category, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              style={{
                background: 'var(--color-bg-base)',
                border: '1px solid var(--color-border-hairline)',
                borderRadius: '12px',
                padding: '1.5rem',
                borderTop: `2px solid ${ACCENT_COLORS[i % ACCENT_COLORS.length]}`,
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = `0 4px 24px rgba(0,0,0,0.3)`
                e.currentTarget.style.borderColor = ACCENT_COLORS[i % ACCENT_COLORS.length]
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = 'var(--color-border-hairline)'
              }}
            >
              <h3 style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: ACCENT_COLORS[i % ACCENT_COLORS.length],
                marginBottom: '1rem',
              }}>
                {category.title}
              </h3>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}>
                {category.skills.map((skill, j) => (
                  <span key={j} className="skill-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
