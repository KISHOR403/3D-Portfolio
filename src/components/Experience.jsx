import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MapPin, Calendar, ExternalLink } from 'lucide-react'

const EXPERIENCES = [
  {
    id: 'prodigy',
    company: 'Prodigy InfoTech',
    role: 'Software Testing Intern',
    period: 'May 2026 – July 2026',
    location: 'Remote',
    summary: 'Manual and automated testing across web and mobile applications, collaborating with cross-functional engineering teams.',
    responsibilities: [
      'Designed and executed manual test cases following STLC methodology',
      'Built Selenium WebDriver automation framework with Page Object Model',
      'Performed API testing with Postman and REST Assured',
      'Tracked and managed 15+ defects through complete defect lifecycle',
      'Executed smoke, sanity, and regression test cycles',
      'Collaborated with developers to reduce regression cycle time by 50%',
    ],
    testingTypes: ['Manual STLC', 'Web Automation', 'API Testing', 'Smoke & Regression', 'Mobile Testing'],
    tools: ['Selenium WebDriver', 'Appium', 'TestNG', 'Postman', 'REST Assured', 'Jira', 'Git'],
    results: [
      '50% reduction in regression cycle time',
      '15+ defects tracked and resolved through complete lifecycle',
      '95% functional scenario coverage on web automation framework',
    ],
  },
  {
    id: 'qa-initiatives',
    company: 'Independent Projects',
    role: 'Full-Stack Developer & QA Engineer',
    period: '2024 – Present',
    location: 'Bengaluru, India',
    summary: 'Architecting full-stack applications and building QA automation solutions across web and mobile platforms.',
    responsibilities: [
      'Built Testnexa AI — AI-powered SaaS for automated test case generation',
      'Developed LogiConnect — enterprise logistics platform with Spring Boot & Next.js',
      'Created comprehensive automation frameworks for web (Selenium) and mobile (Appium)',
      'Implemented CI/CD pipelines with GitHub Actions for automated testing and deployment',
      'Designed API test suites with data-driven approaches using REST Assured',
    ],
    testingTypes: ['End-to-End Web', 'Mobile Automation', 'API Automation', 'CI/CD Integration'],
    tools: ['React', 'Node.js', 'Spring Boot', 'Java', 'Selenium', 'Appium', 'GitHub Actions', 'Docker'],
    results: [
      '10+ full-stack projects shipped',
      'Complete CI/CD pipeline automation',
      'Scalable Page Object Model frameworks',
    ],
    relatedProjects: [
      { name: 'Testnexa AI', href: '#pipeline-runs' },
      { name: 'LogiConnect', href: '#pipeline-runs' },
      { name: 'Web Automation Framework', href: '#pipeline-runs' },
    ],
  },
]

export default function Experience() {
  const [expandedId, setExpandedId] = useState(null)

  const toggle = (id) => {
    setExpandedId(prev => prev === id ? null : id)
  }

  return (
    <section id="experience" style={{ background: 'transparent' }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-eyebrow">Experience</p>
          <h2
            className="section-headline-editorial"
            style={{ marginBottom: '3rem' }}
          >
            <span className="shading-word">Work</span>
            <span className="shading-word">history</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div style={{
          position: 'relative',
          paddingLeft: '24px',
        }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: '5px',
            top: 0,
            bottom: 0,
            width: '1px',
            background: 'var(--color-border-hairline)',
          }} />

          {EXPERIENCES.map((exp, i) => {
            const isExpanded = expandedId === exp.id
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.12 }}
                style={{
                  position: 'relative',
                  marginBottom: i < EXPERIENCES.length - 1 ? '2rem' : 0,
                }}
              >
                {/* Timeline dot */}
                <div style={{
                  position: 'absolute',
                  left: '-24px',
                  top: '24px',
                  width: '11px',
                  height: '11px',
                  borderRadius: '50%',
                  background: isExpanded ? 'var(--color-accent-pass)' : 'var(--color-bg-surface)',
                  border: `2px solid ${isExpanded ? 'var(--color-accent-pass)' : 'var(--color-border-hairline)'}`,
                  transition: 'all 0.25s ease',
                  zIndex: 1,
                }} />

                {/* Card */}
                <button
                  onClick={() => toggle(exp.id)}
                  aria-expanded={isExpanded}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    background: 'var(--color-bg-surface)',
                    border: `1px solid ${isExpanded ? 'rgba(74, 222, 154, 0.2)' : 'var(--color-border-hairline)'}`,
                    borderRadius: '12px',
                    padding: '1.5rem',
                    cursor: 'pointer',
                    transition: 'border-color 0.25s ease',
                  }}
                >
                  {/* Header row */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '1rem',
                  }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        marginBottom: '0.25rem',
                      }}>
                        {exp.role}
                      </h3>
                      <p style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.9rem',
                        color: 'var(--color-accent-pass)',
                        fontWeight: 500,
                        marginBottom: '0.5rem',
                      }}>
                        {exp.company}
                      </p>
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: 'var(--color-text-muted)',
                      }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Calendar size={12} /> {exp.period}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <MapPin size={12} /> {exp.location}
                        </span>
                      </div>
                    </div>

                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ flexShrink: 0, marginTop: '4px' }}
                    >
                      <ChevronDown size={18} style={{ color: 'var(--color-text-muted)' }} />
                    </motion.div>
                  </div>

                  {/* Summary (always visible) */}
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.88rem',
                    lineHeight: 1.6,
                    color: 'var(--color-text-muted)',
                    marginTop: '0.75rem',
                  }}>
                    {exp.summary}
                  </p>
                </button>

                {/* Expanded detail */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        overflow: 'hidden',
                        background: 'var(--color-bg-surface)',
                        borderLeft: '1px solid var(--color-border-hairline)',
                        borderRight: '1px solid var(--color-border-hairline)',
                        borderBottom: '1px solid var(--color-border-hairline)',
                        borderRadius: '0 0 12px 12px',
                        marginTop: '-1px',
                      }}
                    >
                      <div style={{ padding: '1.25rem 1.5rem 1.5rem' }}>
                        {/* Responsibilities */}
                        <div style={{ marginBottom: '1.25rem' }}>
                          <h4 style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'var(--color-text-muted)',
                            marginBottom: '0.75rem',
                          }}>
                            Key Responsibilities
                          </h4>
                          <ul style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.4rem',
                          }}>
                            {exp.responsibilities.map((item, j) => (
                              <li key={j} style={{
                                fontFamily: 'var(--font-sans)',
                                fontSize: '0.85rem',
                                lineHeight: 1.5,
                                color: 'var(--color-text-primary)',
                                paddingLeft: '16px',
                                position: 'relative',
                              }}>
                                <span style={{
                                  position: 'absolute',
                                  left: 0,
                                  top: '8px',
                                  width: '4px',
                                  height: '4px',
                                  borderRadius: '50%',
                                  background: 'var(--color-accent-pass)',
                                }} />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Testing Types */}
                        <div style={{ marginBottom: '1.25rem' }}>
                          <h4 style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'var(--color-text-muted)',
                            marginBottom: '0.5rem',
                          }}>
                            Testing Types
                          </h4>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {exp.testingTypes.map((type, j) => (
                              <span key={j} style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.72rem',
                                fontWeight: 500,
                                padding: '4px 10px',
                                borderRadius: '6px',
                                background: 'rgba(74, 222, 154, 0.08)',
                                border: '1px solid rgba(74, 222, 154, 0.15)',
                                color: 'var(--color-accent-pass)',
                              }}>
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Tools */}
                        <div style={{ marginBottom: '1.25rem' }}>
                          <h4 style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'var(--color-text-muted)',
                            marginBottom: '0.5rem',
                          }}>
                            Tools & Technologies
                          </h4>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {exp.tools.map((tool, j) => (
                              <span key={j} style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.72rem',
                                fontWeight: 500,
                                padding: '4px 10px',
                                borderRadius: '6px',
                                background: 'rgba(35, 44, 53, 0.4)',
                                border: '1px solid var(--color-border-hairline)',
                                color: 'var(--color-text-primary)',
                              }}>
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Results */}
                        <div style={{ marginBottom: exp.relatedProjects ? '1.25rem' : 0 }}>
                          <h4 style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'var(--color-text-muted)',
                            marginBottom: '0.5rem',
                          }}>
                            Results
                          </h4>
                          <ul style={{
                            listStyle: 'none', padding: 0, margin: 0,
                            display: 'flex', flexDirection: 'column', gap: '0.3rem',
                          }}>
                            {exp.results.map((r, j) => (
                              <li key={j} style={{
                                fontFamily: 'var(--font-sans)',
                                fontSize: '0.85rem',
                                color: 'var(--color-text-primary)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                              }}>
                                <span style={{ color: 'var(--color-accent-pass)', fontWeight: 600 }}>✓</span>
                                {r}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Related Projects */}
                        {exp.relatedProjects && (
                          <div>
                            <h4 style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.72rem',
                              fontWeight: 600,
                              letterSpacing: '0.1em',
                              textTransform: 'uppercase',
                              color: 'var(--color-text-muted)',
                              marginBottom: '0.5rem',
                            }}>
                              Related Projects
                            </h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                              {exp.relatedProjects.map((p, j) => (
                                <a
                                  key={j}
                                  href={p.href}
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.72rem',
                                    fontWeight: 500,
                                    color: 'var(--color-accent-pass)',
                                    textDecoration: 'none',
                                    padding: '4px 10px',
                                    borderRadius: '6px',
                                    background: 'rgba(74, 222, 154, 0.06)',
                                    border: '1px solid rgba(74, 222, 154, 0.12)',
                                    transition: 'all 0.2s ease',
                                  }}
                                  onMouseEnter={e => {
                                    e.currentTarget.style.background = 'rgba(74, 222, 154, 0.12)'
                                    e.currentTarget.style.borderColor = 'rgba(74, 222, 154, 0.25)'
                                  }}
                                  onMouseLeave={e => {
                                    e.currentTarget.style.background = 'rgba(74, 222, 154, 0.06)'
                                    e.currentTarget.style.borderColor = 'rgba(74, 222, 154, 0.12)'
                                  }}
                                >
                                  {p.name}
                                  <ExternalLink size={10} />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
