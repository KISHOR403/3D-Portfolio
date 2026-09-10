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
    title: 'LogiConnect',
    featured: true,
    description: 'Enterprise communication & operations collaboration platform designed for logistics operations with ~2,000+ employees across administrative hubs, sorting centers, warehouses, and fleet operations.',
    stack: ['Spring Boot', 'Java', 'Next.js', 'PostgreSQL', 'WebSocket', 'Docker', 'GitHub Actions CI/CD'],
    link: 'https://github.com/KISHOR403/LogiConnect',
    outcomes: [
      'Architected modular monolith backend with Spring Boot 3 & Java 21 managing 12+ enterprise operational domains',
      'Engineered real-time STOMP/WebSocket messaging channels, shift logs, and operational announcement feeds',
      'Enforced strict RBAC security, audit logging for compliance, and automated GitHub Actions CI/CD pipeline',
    ],
  },
  {
    num: '04',
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
    num: '05',
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
    num: '06',
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
    num: '07',
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
    num: '08',
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
    num: '09',
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
    num: '10',
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

// Custom SVG for Java
const JavaIcon = ({ size = 10 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 128 128"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
  >
    <path fill="#0074BD" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"/>
    <path fill="#EA2D2E" d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z"/>
    <path fill="#0074BD" d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zm40.697 22.747c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z"/>
    <path fill="#EA2D2E" d="M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z"/>
    <path fill="#0074BD" d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z"/>
  </svg>
)

// Custom SVG for WebSocket
const WebSocketIcon = ({ size = 10 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#38bdf8"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
  >
    <polyline points="17 1 21 5 17 9" />
    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <polyline points="7 23 3 19 7 15" />
    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </svg>
)

const renderProjectSkillIcon = (tech, size = 10) => {
  if (tech === 'TestNG') {
    return <TestNGIcon size={size} />
  }
  if (tech === 'REST Assured') {
    return <RestAssuredIcon size={size} />
  }
  if (tech === 'Java') {
    return <JavaIcon size={size} />
  }
  if (tech === 'WebSocket') {
    return <WebSocketIcon size={size} />
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
    'Selenium WebDriver': 'selenium/43B02A',
    'Postman': 'postman/FF6C37',
    'Spring Boot': 'springboot/6DB33F',
    'Next.js': 'nextdotjs/FFFFFF',
    'PostgreSQL': 'postgresql/4169E1',
    'TypeScript': 'typescript/3178C6',
    'Spring Security': 'springsecurity/6DB33F',
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
