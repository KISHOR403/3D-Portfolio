import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, ExternalLink, Star } from 'lucide-react'

const PROJECTS = [
  {
    title: 'Testnexa AI',
    featured: true,
    description: 'AI-powered SaaS tool that generates enterprise-grade QA test cases using Google Gemini API, structured for direct export into TMS platforms like TestRail, Jira Zephyr, and Azure DevOps.',
    stack: ['React', 'Node.js', 'MongoDB', 'Google Gemini API', 'Docker', 'GitHub Actions CI/CD'],
    link: 'https://testnexa-ai.vercel.app',
    outcomes: [
      'Solo-built end-to-end SaaS product',
      'Automates manual test case authoring',
      'Deployed with CI/CD pipeline',
    ],
  },
  {
    title: 'Mobile App Testing — Weather App',
    period: 'April 2026 – May 2026',
    description: 'End-to-end scripted test execution of a Weather Forecast Android app.',
    stack: ['Appium', 'Java', 'TestNG', 'POM'],
    outcomes: [
      'Page Object Model for clean screen separation',
      'Tests run on Android Emulator and physical devices via ADB',
      'Gesture controls, adaptive waits, auto screenshot on failure',
    ],
  },
  {
    title: 'Web Automation Framework',
    period: 'January 2026 – February 2026',
    description: 'Scalable web automation framework aligned with POM design principles.',
    stack: ['Selenium WebDriver', 'Java', 'TestNG', 'POM'],
    outcomes: [
      'Dynamic environment variables and data-driven test collections',
      'Full CRUD workflow verification with schema checks',
      '95% functional scenario coverage; GitHub Actions pipeline',
    ],
  },
  {
    title: 'API Automation Testing',
    period: 'February 2026 – March 2026',
    description: 'Structured API test suite covering authentication, product discovery, cart, and order flows.',
    stack: ['Postman', 'REST Assured'],
    outcomes: [
      'Data-driven TestNG suites using Excel/JSON inputs',
      'GitHub Actions CI/CD regression pipeline on every push',
      'Complete end-to-end API workflow validation',
    ],
  },
]

function PipelineCard({ project, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [phase, setPhase] = useState('idle') // 'idle' | 'running' | 'passed'

  useEffect(() => {
    if (!isInView) return
    setPhase('running')
    const timer = setTimeout(() => setPhase('passed'), 1500)
    return () => clearTimeout(timer)
  }, [isInView])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        background: 'var(--color-bg-base)',
        border: '1px solid var(--color-border-hairline)',
        borderRadius: '12px',
        padding: '1.5rem',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: '1.5rem',
        alignItems: 'start',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        position: 'relative',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(74, 222, 154, 0.3)'
        e.currentTarget.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--color-border-hairline)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Left — Status badge area */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
        minWidth: '100px',
        paddingTop: '4px',
      }}>
        {/* Featured tag */}
        {project.featured && (
          <span className="status-badge status-badge--featured" style={{ marginBottom: '0.25rem' }}>
            <Star size={10} fill="currentColor" />
            Featured
          </span>
        )}

        {/* Status badge — animated transition */}
        {phase === 'running' && (
          <motion.span
            className="status-badge status-badge--running"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
          >
            <span className="pulse-dot" />
            Running...
          </motion.span>
        )}

        {phase === 'passed' && (
          <motion.span
            className="status-badge status-badge--passed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Check size={10} strokeWidth={3} />
            Passed
          </motion.span>
        )}

        {phase === 'idle' && (
          <span className="status-badge status-badge--passed" style={{ opacity: 0.3 }}>
            <Check size={10} strokeWidth={3} />
            Passed
          </span>
        )}
      </div>

      {/* Right — Content */}
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '0.5rem',
          flexWrap: 'wrap',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.15rem',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
          }}>
            {project.title}
          </h3>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              id={`project-link-${index}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--color-accent-pass)',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <ExternalLink size={10} />
              LIVE
            </a>
          )}
        </div>

        {project.period && (
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--color-text-muted)',
            marginBottom: '0.5rem',
            letterSpacing: '0.04em',
          }}>
            {project.period}
          </p>
        )}

        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.875rem',
          lineHeight: 1.6,
          color: 'var(--color-text-muted)',
          marginBottom: '1rem',
        }}>
          {project.description}
        </p>

        {/* Stack tags */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.375rem',
          marginBottom: '1rem',
        }}>
          {project.stack.map((tech, j) => (
            <span key={j} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              fontWeight: 500,
              padding: '3px 10px',
              borderRadius: '4px',
              background: 'rgba(35, 44, 53, 0.8)',
              border: '1px solid var(--color-border-hairline)',
              color: 'var(--color-text-muted)',
              letterSpacing: '0.03em',
            }}>
              {tech}
            </span>
          ))}
        </div>

        {/* Outcomes */}
        <ul style={{
          listStyle: 'none',
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.375rem',
        }}>
          {project.outcomes.map((outcome, j) => (
            <li key={j} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8rem',
              lineHeight: 1.5,
              color: 'var(--color-text-primary)',
            }}>
              <span style={{
                color: 'var(--color-accent-pass)',
                fontSize: '0.6rem',
                marginTop: '4px',
                flexShrink: 0,
              }}>▸</span>
              {outcome}
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        @media (max-width: 600px) {
          [style*="grid-template-columns: auto 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </motion.div>
  )
}

export default function PipelineRuns() {
  return (
    <section id="pipeline-runs" style={{ background: 'var(--color-bg-base)' }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-eyebrow">Pipeline Runs</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'var(--color-text-primary)',
            marginBottom: '3rem',
          }}>
            Projects
          </h2>
        </motion.div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}>
          {PROJECTS.map((project, i) => (
            <PipelineCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
