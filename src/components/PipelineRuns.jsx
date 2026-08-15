import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Check, ExternalLink, Star, Lock, Box, Cpu } from 'lucide-react'

const PROJECTS = [
  {
    num: '01',
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
    num: '02',
    title: 'RepoWiki AI',
    featured: true,
    description: 'AI-powered repository documentation & wiki generator that automatically analyzes codebase structures, extracts architecture insights, and produces comprehensive interactive markdown documentation.',
    stack: ['React', 'Node.js', 'Google Gemini API', 'Express', 'Tailwind CSS'],
    link: 'https://github.com/KISHOR403/repowiki-ai',
    outcomes: [
      'Automates multi-file codebase analysis and architecture mapping',
      'Generates hierarchical wiki documentation with interactive diagrams',
      'Integrates Gemini AI context management for fast and structured repo insights',
    ],
  },
  {
    num: '03',
    title: 'Doorkit Marketplace',
    featured: true,
    description: 'A smart home security device marketplace web & mobile ecosystem, featuring a Node.js backend API and a React Native mobile application with state management, product catalogs, and cart checkout.',
    stack: ['React Native', 'Redux', 'Node.js', 'Express', 'MongoDB'],
    link: 'https://github.com/KISHOR403/Doorkit',
    outcomes: [
      'Built Node.js & Express REST API for product seeding, dynamic searching, and category filtering',
      'Designed React Native mobile UI with custom navigation, search bar, animated product cards, and details screen',
      'Integrated Redux state management for shopping cart controls and secure API integration',
    ],
  },
  {
    num: '04',
    title: 'Asom Bazaar',
    featured: true,
    description: 'A localized e-commerce marketplace tailored for local sellers in Assam and Northeast India, featuring comprehensive multi-step seller onboarding, a seller dashboard with sales analytics, and automated testing.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Framer Motion'],
    link: 'https://github.com/KISHOR403/Asom-Bazaar',
    outcomes: [
      'Built multi-step seller onboarding with business registration and verification',
      'Designed responsive dashboard with real-time sales reporting and inventory controls',
      'Implemented robust form validation, automated unit tests, and security regression checks',
    ],
  },
  {
    num: '05',
    title: 'AI-Powered MERN E-Commerce',
    featured: true,
    description: 'Full-featured e-commerce platform integrated with AI-driven product recommendations, secure Stripe payment gateway, and an administrative dashboard.',
    stack: ['MERN Stack', 'Redux Toolkit', 'Stripe API', 'Tailwind CSS', 'JWT Auth'],
    link: 'https://github.com/KISHOR403/AI-Powered-E-Commerce-Website-built-using-MERN-Stack',
    outcomes: [
      'Built multi-tier user registration and admin management modules',
      'Integrated Stripe API for seamless payment workflows and checkout logic',
      'Configured responsive storefront design with dynamic Redux state synchronization',
    ],
  },
  {
    num: '06',
    title: 'ASTROTALK Platform',
    featured: true,
    description: 'Astrology consultation web platform facilitating real-time planetary position calculations, birth chart reports, and consultant scheduling.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Astro API', 'Tailwind CSS'],
    link: 'https://github.com/KISHOR403/ASTROTALK',
    outcomes: [
      'Engineered interactive planetary position analysis tools using Astro APIs',
      'Designed booking schedules and real-time chat interface for consults',
      'Optimized page performance and implemented secure JWT-based security',
    ],
  },
  {
    num: '07',
    title: 'Mobile App Testing — Weather App',
    period: 'April 2026 – May 2026',
    description: 'End-to-end scripted test execution of a Weather Forecast Android app using Appium & Page Object Model.',
    stack: ['Appium', 'Java', 'TestNG', 'POM'],
    outcomes: [
      'Page Object Model for clean screen separation',
      'Tests run on Android Emulator and physical devices via ADB',
      'Gesture controls, adaptive waits, auto screenshot on failure',
    ],
  },
  {
    num: '08',
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
    num: '09',
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

const TOTAL = PROJECTS.length

// Custom SVG for TestNG
const TestNGIcon = ({ size = 10 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
  >
    <rect width="100" height="100" rx="20" fill="#dc2626" />
    <text
      x="50"
      y="65"
      fontFamily="Arial, sans-serif"
      fontWeight="bold"
      fontSize="50"
      fill="white"
      textAnchor="middle"
    >
      Tn
    </text>
    <path d="M70 20 L90 20 L90 40" stroke="white" strokeWidth="5" fill="none" />
    <path d="M30 80 L10 80 L10 60" stroke="white" strokeWidth="5" fill="none" />
  </svg>
)

// Custom SVG for REST Assured
const RestAssuredIcon = ({ size = 10 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
  >
    <defs>
      <linearGradient id="restAssuredGradProject" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#16a34a', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="45" fill="url(#restAssuredGradProject)" />
    <text
      x="50"
      y="65"
      fontFamily="Arial, sans-serif"
      fontWeight="bold"
      fontSize="40"
      fill="white"
      textAnchor="middle"
    >
      RA
    </text>
    <path d="M20 50 A 30 30 0 0 1 80 50" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
)

const renderProjectSkillIcon = (tech, size = 10) => {
  if (tech === 'TestNG') {
    return <TestNGIcon size={size} />
  }
  if (tech === 'REST Assured') {
    return <RestAssuredIcon size={size} />
  }

  const brandMapping = {
    'React': 'react/61DAFB',
    'React Native': 'react/61DAFB',
    'Redux': 'redux/764ABC',
    'MERN Stack': 'react/61DAFB',
    'Node.js': 'nodedotjs/339933',
    'Express': 'express/E8EAED',
    'MongoDB': 'mongodb/47A248',
    'Google Gemini API': 'google/4285F4',
    'Docker': 'docker/2496ED',
    'GitHub Actions CI/CD': 'githubactions/2088FF',
    'Tailwind CSS': 'tailwindcss/06B6D4',
    'Framer Motion': 'framer/0055FF',
    'Redux Toolkit': 'redux/764ABC',
    'Stripe API': 'stripe/008CDE',
    'Astro API': 'astro/FF5D01',
    'Appium': 'appium/E42D42',
    'Java': 'java/F89820',
    'Selenium WebDriver': 'selenium/43B02A',
    'Postman': 'postman/FF6C37',
  }

  if (brandMapping[tech]) {
    return (
      <img
        src={`https://cdn.simpleicons.org/${brandMapping[tech]}`}
        alt={tech}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          objectFit: 'contain',
          display: 'inline-block',
          verticalAlign: 'middle',
          flexShrink: 0,
        }}
      />
    )
  }

  if (tech === 'JWT Auth') {
    return <Lock size={size} style={{ opacity: 0.8 }} />
  }
  if (tech === 'POM') {
    return <Box size={size} style={{ opacity: 0.8 }} />
  }

  return <Cpu size={size} style={{ opacity: 0.8 }} />
}

function PipelineCard({ project, index, progress }) {
  const [phase, setPhase] = useState('idle') // 'idle' | 'running' | 'passed'

  useEffect(() => {
    if (phase === 'running') {
      const timer = setTimeout(() => setPhase('passed'), 1500)
      return () => clearTimeout(timer)
    }
  }, [phase])

  // Scale: earlier cards shrink more as scroll progresses past them
  const rangeStart = index / TOTAL
  const targetScale = 1 - ((TOTAL - index) * 0.04)
  const scale = useTransform(progress, [rangeStart, 1], [1, targetScale])

  // Top offset for sticky stacking — each card peeks 24px below the previous
  const stickyTop = 85 + index * 24

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        position: 'sticky',
        top: `${stickyTop}px`,
        zIndex: index,
      }}
    >
      <motion.div
        className="corner-bracket-card pipeline-project-card"
        style={{
          scale,
          transformOrigin: 'top center',
          borderRadius: '16px',
          padding: '1.75rem 2rem',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: '1.75rem',
          alignItems: 'start',
          width: '100%',
          maxWidth: '1000px',
          boxShadow: '0 -4px 30px rgba(0, 0, 0, 0.45)',
        }}
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        onViewportEnter={() => { if (phase === 'idle') setPhase('running') }}
      >
        <div className="corner-bracket-corners" />

        {/* Left — Number Badge & Status area (Redoyanul Style) */}
        <div
          className="project-badge-col"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '0.85rem',
            minWidth: '120px',
          }}
        >
          {/* Redoyanul Number Badge */}
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
              fontWeight: 800,
              color: 'var(--color-accent-pass)',
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            {project.num}
          </span>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: '0.4rem',
              alignItems: 'center',
            }}
          >
            {/* Featured Tag */}
            {project.featured && (
              <span className="status-badge status-badge--featured">
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
        </div>

        {/* Right — Project Details Content */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem',
              marginBottom: '0.5rem',
              flexWrap: 'wrap',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.3rem',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
              }}
            >
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
                  gap: '5px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: 'var(--color-accent-pass)',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  background: 'rgba(74, 222, 154, 0.08)',
                  border: '1px solid rgba(74, 222, 154, 0.2)',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(74, 222, 154, 0.18)'
                  e.currentTarget.style.transform = 'translateX(2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(74, 222, 154, 0.08)'
                  e.currentTarget.style.transform = 'translateX(0)'
                }}
              >
                <ExternalLink size={11} />
                {project.link.includes('github.com') ? 'REPOSITORY' : 'LIVE DEMO'}
              </a>
            )}
          </div>

          {project.period && (
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--color-text-muted)',
                marginBottom: '0.5rem',
                letterSpacing: '0.04em',
              }}
            >
              {project.period}
            </p>
          )}

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.88rem',
              lineHeight: 1.6,
              color: 'var(--color-text-muted)',
              marginBottom: '1.15rem',
            }}
          >
            {project.description}
          </p>

          {/* Stack tags */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.35rem',
              marginBottom: '1.15rem',
            }}
          >
            {project.stack.map((tech, j) => (
              <span
                key={j}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  fontWeight: 500,
                  padding: '3px 9px',
                  borderRadius: '999px',
                  background: 'rgba(35, 44, 53, 0.8)',
                  border: '1px solid var(--color-border-hairline)',
                  color: 'var(--color-text-primary)',
                  letterSpacing: '0.03em',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                {renderProjectSkillIcon(tech, 10)}
                <span>{tech}</span>
              </span>
            ))}
          </div>

          {/* Outcomes list with Redoyanul arrow markers */}
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem',
            }}
          >
            {project.outcomes.map((outcome, j) => (
              <li
                key={j}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.82rem',
                  lineHeight: 1.5,
                  color: 'var(--color-text-primary)',
                }}
              >
                <span
                  style={{
                    color: 'var(--color-accent-pass)',
                    fontSize: '0.65rem',
                    marginTop: '2px',
                    flexShrink: 0,
                  }}
                >
                  ▸
                </span>
                {outcome}
              </li>
            ))}
          </ul>
        </div>

        <style>{`
          @media (max-width: 650px) {
            .pipeline-project-card {
              grid-template-columns: 1fr !important;
              padding: 1.25rem 1rem !important;
              gap: 1rem !important;
            }
            .project-badge-col {
              flex-direction: row !important;
              align-items: center !important;
              justify-content: space-between !important;
              width: 100% !important;
            }
          }
        `}</style>
      </motion.div>
    </div>
  )
}

export default function PipelineRuns() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section id="pipeline-runs" style={{ background: 'transparent' }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-eyebrow">// FEATURED WORK</p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 5vw, 2.4rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
              marginBottom: '0.5rem',
            }}
          >
            Projects &amp; Case Studies
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: 'var(--color-text-muted)',
              marginBottom: '3rem',
              letterSpacing: '0.03em',
            }}
          >
            Scroll to explore — Redoyanul-styled numbered project cards
          </p>
        </motion.div>

        <div
          ref={containerRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            paddingBottom: '12rem',
          }}
        >
          {PROJECTS.map((project, i) => (
            <PipelineCard
              key={i}
              project={project}
              index={i}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
