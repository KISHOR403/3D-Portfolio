import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Coffee,
  Database,
  Globe,
  Smartphone,
  Beaker,
  CheckSquare,
  Send,
  Terminal,
  Eye,
  RotateCcw,
  Workflow,
  RefreshCw,
  Cpu,
  FileText,
  Bug,
  Activity,
  History,
  GitBranch,
  ClipboardCheck,
  Server,
  Play,
  Box,
  Table,
  Infinity,
  LayoutGrid
} from 'lucide-react'

const ACCENT_COLORS = ['var(--color-accent-pass)', 'var(--color-accent-pending)', 'var(--color-accent-fail)']
const ACCENT_RGBS = ['74, 222, 154', '242, 169, 59', '232, 97, 92']

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

const SKILL_ICONS = {
  // Languages
  'Java': Coffee,
  'SQL': Database,

  // Automation Tools
  'Selenium WebDriver': Globe,
  'Appium': Smartphone,
  'TestNG': Beaker,
  'JUnit': CheckSquare,
  'REST Assured': Send,
  'Postman': Terminal,

  // Testing Skills
  'Manual Testing': Eye,
  'Agile (Scrum)': RotateCcw,
  'SDLC': Workflow,
  'STLC': RefreshCw,
  'API Testing & Automation': Cpu,
  'Mobile Testing': Smartphone,
  'Test Case Design': FileText,
  'Bug Tracking & Debugging': Bug,
  'Defect Life Cycle': Activity,
  'Regression Testing': History,

  // Developer Tools
  'Git': GitBranch,
  'GitHub': GitBranch,
  'Jira': LayoutGrid,
  'TestRail': ClipboardCheck,
  'Jenkins': Server,
  'GitHub Actions': Play,

  // Design Patterns
  'Page Object Model (POM)': Box,
  'Data-Driven Testing': Table,
  'CI/CD Integration': Infinity,
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const chipVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (j) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      delay: j * 0.04,
      ease: 'easeOut',
    },
  }),
}

function SkillCard({ category, index }) {
  const cardRef = useRef(null)
  const highlightRef = useRef(null)
  const rAFRef = useRef(null)

  const accentColor = ACCENT_COLORS[index % ACCENT_COLORS.length]
  const accentRGB = ACCENT_RGBS[index % ACCENT_RGBS.length]

  useEffect(() => {
    const card = cardRef.current
    const highlight = highlightRef.current
    if (!card) return

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let prefersReducedMotion = mediaQuery.matches
    const handleMediaChange = (e) => {
      prefersReducedMotion = e.matches
    }
    mediaQuery.addEventListener('change', handleMediaChange)

    // Check touch device
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    if (prefersReducedMotion || isTouch) {
      return () => {
        mediaQuery.removeEventListener('change', handleMediaChange)
      }
    }

    const handleMouseMove = (e) => {
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current)

      rAFRef.current = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        // Cursor-reactive tilt: clamped to max of ~5.5 degrees
        const tiltX = ((centerY - y) / centerY) * 5.5
        const tiltY = ((x - centerX) / centerX) * 5.5

        card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`

        if (highlight) {
          const pctX = (x / rect.width) * 100
          const pctY = (y / rect.height) * 100
          // Light-catch surface highlight: white at ~6% opacity, transparent past ~40% radius
          highlight.style.background = `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(255, 255, 255, 0.06) 0%, transparent 40%)`
        }
      })
    }

    const handleMouseLeave = () => {
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current)

      rAFRef.current = requestAnimationFrame(() => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg)'
        if (highlight) {
          highlight.style.background = 'transparent'
        }
      })
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current)
      mediaQuery.removeEventListener('change', handleMediaChange)
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [index])

  return (
    <div
      style={{
        position: 'relative',
        perspective: '1000px',
        paddingBottom: '12px',
        paddingRight: '12px',
      }}
    >
      {/* Ghost Layer 2 (12px offset) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: 'translate(12px, 12px)',
          background: 'var(--color-bg-base)',
          border: '1px solid var(--color-border-hairline)',
          borderRadius: '12px',
          borderTop: `2px solid color-mix(in srgb, ${accentColor} 12%, transparent)`,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Ghost Layer 1 (6px offset) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: 'translate(6px, 6px)',
          background: 'var(--color-bg-base)',
          border: '1px solid var(--color-border-hairline)',
          borderRadius: '12px',
          borderTop: `2px solid color-mix(in srgb, ${accentColor} 25%, transparent)`,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Front-facing card */}
      <motion.div
        ref={cardRef}
        variants={cardVariants}
        style={{
          background: 'var(--color-bg-base)',
          border: '1px solid var(--color-border-hairline)',
          borderRadius: '12px',
          padding: '1.5rem',
          borderTop: `2px solid ${accentColor}`,
          boxShadow: `0 -8px 24px rgba(${accentRGB}, 0.12), 0 4px 20px rgba(0, 0, 0, 0.3)`,
          position: 'relative',
          zIndex: 3,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          transition: 'transform 0.15s ease-out, border-color 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = accentColor
          e.currentTarget.style.boxShadow = `0 -8px 30px rgba(${accentRGB}, 0.25), 0 8px 32px rgba(0, 0, 0, 0.45)`
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'var(--color-border-hairline)'
          e.currentTarget.style.boxShadow = `0 -8px 24px rgba(${accentRGB}, 0.12), 0 4px 20px rgba(0, 0, 0, 0.3)`
        }}
      >
        {/* Light-catch surface highlight */}
        <div
          ref={highlightRef}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '12px',
            pointerEvents: 'none',
            zIndex: 5,
            transition: 'background 0.15s ease-out',
          }}
        />

        <h3
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: accentColor,
            marginBottom: '1rem',
          }}
        >
          {category.title}
        </h3>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          {category.skills.map((skill, j) => {
            const Icon = SKILL_ICONS[skill] || CheckSquare
            return (
              <motion.span
                key={j}
                custom={j}
                variants={chipVariants}
                whileHover={{
                  y: -3,
                  scale: 1.03,
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 6px 12px rgba(0, 0, 0, 0.35)',
                  borderColor: accentColor,
                  backgroundColor: `color-mix(in srgb, ${accentColor} 6%, rgba(35, 44, 53, 0.4))`,
                }}
                whileTap={{ scale: 0.95 }}
                className="skill-chip"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 500,
                  padding: '0.375rem 0.75rem',
                  borderRadius: '999px',
                  background: 'rgba(35, 44, 53, 0.4)',
                  border: '1px solid var(--color-border-hairline)',
                  color: 'var(--color-text-primary)',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 2px 4px rgba(0, 0, 0, 0.15)',
                  cursor: 'pointer',
                }}
              >
                <Icon size={12} style={{ opacity: 0.8 }} />
                {skill}
              </motion.span>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
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
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2rem',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
              marginBottom: '3rem',
            }}
          >
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
            gap: '1.75rem',
          }}
        >
          {SKILL_CATEGORIES.map((category, i) => (
            <SkillCard key={i} category={category} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
