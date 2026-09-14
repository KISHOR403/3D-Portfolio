import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Mail, MapPin, Calendar, ExternalLink } from 'lucide-react'

const CORE_SKILLS = [
  'React', 'Node.js', 'Spring Boot', 'Java', 'JavaScript', 'PostgreSQL', 'MongoDB',
  'Selenium', 'Appium', 'TestNG', 'REST Assured', 'Postman',
  'Git', 'GitHub Actions', 'Docker', 'CI/CD',
]

const EXPERIENCE_BRIEF = [
  {
    role: 'Software Testing Intern',
    company: 'Prodigy InfoTech',
    period: 'May 2026 – Jul 2026',
    highlights: ['Selenium WebDriver + POM automation', '50% regression cycle reduction', '15+ defects tracked'],
  },
  {
    role: 'Full-Stack Developer & QA Engineer',
    company: 'Independent Projects',
    period: '2024 – Present',
    highlights: ['10+ shipped projects', 'CI/CD pipeline automation', 'Enterprise-grade applications'],
  },
]

const KEY_PROJECTS = [
  { name: 'Testnexa AI', desc: 'AI-powered test case generation SaaS' },
  { name: 'LogiConnect', desc: 'Enterprise logistics platform (Spring Boot)' },
  { name: 'RepoWiki AI', desc: 'AI repository documentation generator' },
]

const CERTIFICATIONS = [
  'Software Testing (NPTEL)',
  'Postman API Fundamentals',
  'Selenium WebDriver with Java',
]

function LinkedinIcon({ size = 13, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export default function RecruiterView({ isOpen, onClose, onOpenResume }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(6px)',
            padding: '2rem 1rem',
            overflowY: 'auto',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '640px',
              background: 'var(--color-bg-base)',
              border: '1px solid var(--color-border-hairline)',
              borderRadius: '16px',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              padding: '1.5rem',
              borderBottom: '1px solid var(--color-border-hairline)',
            }}>
              <div>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent-pass)',
                  marginBottom: '0.5rem',
                }}>
                  Recruiter Summary
                </p>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  marginBottom: '0.25rem',
                }}>
                  Kishor Gogoi
                </h2>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  color: 'var(--color-text-muted)',
                }}>
                  Full Stack Developer · QA Automation Engineer
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: '#6C7A89',
                  marginTop: '0.5rem',
                }}>
                  <MapPin size={12} /> Bengaluru, India
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close recruiter view"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--color-border-hairline)',
                  borderRadius: '8px',
                  padding: '6px',
                  cursor: 'pointer',
                  color: 'var(--color-text-muted)',
                  flexShrink: 0,
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '1.5rem' }}>
              {/* Quick Actions */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginBottom: '1.5rem',
              }}>
                <button
                  onClick={onOpenResume}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(74, 222, 154, 0.12)',
                    border: '1px solid rgba(74, 222, 154, 0.3)',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    color: '#4ADE9A',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                  }}
                >
                  <Download size={13} />
                  View Resume
                </button>
                <a
                  href="mailto:gogoi.kishor0@gmail.com"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--color-border-hairline)',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                  }}
                >
                  <Mail size={13} />
                  Email
                </a>
                <a
                  href="https://www.linkedin.com/in/kishorgogoi"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--color-border-hairline)',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                  }}
                >
                  <LinkedinIcon size={13} />
                  LinkedIn
                </a>
              </div>

              {/* Core Skills */}
              <Section title="Core Skills">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {CORE_SKILLS.map((skill, i) => (
                    <span key={i} style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      fontWeight: 500,
                      padding: '4px 10px',
                      borderRadius: '6px',
                      background: 'rgba(35, 44, 53, 0.4)',
                      border: '1px solid var(--color-border-hairline)',
                      color: 'var(--color-text-primary)',
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </Section>

              {/* Experience */}
              <Section title="Experience">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {EXPERIENCE_BRIEF.map((exp, i) => (
                    <div key={i}>
                      <div style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        marginBottom: '2px',
                      }}>
                        {exp.role}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.82rem',
                        color: 'var(--color-accent-pass)',
                        marginBottom: '4px',
                      }}>
                        {exp.company} · {exp.period}
                      </div>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {exp.highlights.map((h, j) => (
                          <li key={j} style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.82rem',
                            color: 'var(--color-text-muted)',
                            paddingLeft: '12px',
                            position: 'relative',
                            lineHeight: 1.6,
                          }}>
                            <span style={{
                              position: 'absolute', left: 0, top: '8px',
                              width: '3px', height: '3px', borderRadius: '50%',
                              background: 'var(--color-text-muted)',
                            }} />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Key Projects */}
              <Section title="Key Projects">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {KEY_PROJECTS.map((p, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '0.5rem',
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        flexShrink: 0,
                      }}>
                        {p.name}
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.82rem',
                        color: 'var(--color-text-muted)',
                      }}>
                        — {p.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Certifications */}
              <Section title="Certifications" last>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {CERTIFICATIONS.map((cert, i) => (
                    <div key={i} style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.82rem',
                      color: 'var(--color-text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}>
                      <span style={{ color: 'var(--color-accent-pass)', fontSize: '0.7rem' }}>✓</span>
                      {cert}
                    </div>
                  ))}
                </div>
              </Section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Section({ title, children, last = false }) {
  return (
    <div style={{
      marginBottom: last ? 0 : '1.5rem',
      paddingBottom: last ? 0 : '1.5rem',
      borderBottom: last ? 'none' : '1px solid var(--color-border-hairline)',
    }}>
      <h4 style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.68rem',
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: '#6C7A89',
        marginBottom: '0.75rem',
      }}>
        {title}
      </h4>
      {children}
    </div>
  )
}
