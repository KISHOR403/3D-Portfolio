import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Globe,
  Grid,
  Sparkle,
  SlidersHorizontal
} from 'lucide-react'
import EarthSkillsCanvas, { SmartSkillIcon } from './EarthSkillsCanvas'

const ACCENT_COLORS = ['var(--color-accent-pass)', 'var(--color-accent-pending)', 'var(--color-accent-fail)']
const ACCENT_RGBS = ['74, 222, 154', '242, 169, 59', '232, 97, 92']

const SKILL_CATEGORIES = [
  {
    title: 'Languages & Querying',
    skills: ['Java', 'JavaScript', 'HTML', 'CSS', 'SQL'],
  },
  {
    title: 'Full Stack Development',
    skills: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Redux', 'Tailwind CSS', 'REST APIs'],
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
    title: 'Content Creation & Design',
    skills: ['Technical Writing', 'Video Editing', 'Canva', 'Figma', 'Social Media Content'],
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

function SkillCard({ category, index, activeCategory, hoveredSkillId, setHoveredSkillId }) {
  const cardRef = useRef(null)
  const highlightRef = useRef(null)
  const rAFRef = useRef(null)

  const accentColor = ACCENT_COLORS[index % ACCENT_COLORS.length]
  const accentRGB = ACCENT_RGBS[index % ACCENT_RGBS.length]

  const isCategoryMatch = !activeCategory || activeCategory === 'All' || category.title.toLowerCase().includes(activeCategory.toLowerCase()) || (activeCategory === 'Automation Tools & Frameworks' && category.title.includes('Automation')) || (activeCategory === 'Full Stack Development' && category.title.includes('Full Stack'))

  useEffect(() => {
    const card = cardRef.current
    const highlight = highlightRef.current
    if (!card) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let prefersReducedMotion = mediaQuery.matches
    const handleMediaChange = (e) => {
      prefersReducedMotion = e.matches
    }
    mediaQuery.addEventListener('change', handleMediaChange)

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (prefersReducedMotion || isTouch) {
      return () => mediaQuery.removeEventListener('change', handleMediaChange)
    }

    const handleMouseMove = (e) => {
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current)

      rAFRef.current = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const tiltX = ((centerY - y) / centerY) * 5.5
        const tiltY = ((x - centerX) / centerX) * 5.5

        card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`

        if (highlight) {
          const pctX = (x / rect.width) * 100
          const pctY = (y / rect.height) * 100
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
        opacity: isCategoryMatch ? 1 : 0.4,
        transition: 'opacity 0.3s ease',
      }}
    >
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
            const isChipHovered = hoveredSkillId && skill.toLowerCase().includes(hoveredSkillId.toLowerCase())
            return (
              <motion.span
                key={j}
                custom={j}
                variants={chipVariants}
                onMouseEnter={() => setHoveredSkillId(skill)}
                onMouseLeave={() => setHoveredSkillId(null)}
                whileHover={{
                  y: -3,
                  scale: 1.03,
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 6px 12px rgba(0, 0, 0, 0.35)',
                  borderColor: accentColor,
                  backgroundColor: `color-mix(in srgb, ${accentColor} 12%, rgba(35, 44, 53, 0.4))`,
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
                  background: isChipHovered ? `color-mix(in srgb, ${accentColor} 16%, rgba(35, 44, 53, 0.6))` : 'rgba(35, 44, 53, 0.4)',
                  border: isChipHovered ? `1px solid ${accentColor}` : '1px solid var(--color-border-hairline)',
                  color: 'var(--color-text-primary)',
                  boxShadow: isChipHovered ? `0 0 12px rgba(${accentRGB}, 0.3)` : 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 2px 4px rgba(0, 0, 0, 0.15)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <SmartSkillIcon name={skill} size={13} />
                <span>{skill}</span>
              </motion.span>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}

const CATEGORY_FILTERS = [
  'All',
  'Languages & Querying',
  'Full Stack Development',
  'Automation Tools & Frameworks',
  'Testing Skills & Methodologies',
  'Developer Tools',
  'Content Creation & Design'
]

export default function CoverageReport() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [viewMode, setViewMode] = useState('earth')
  const [hoveredSkillId, setHoveredSkillId] = useState(null)

  return (
    <section id="coverage-report" style={{ background: 'rgba(22, 29, 36, 0.75)', backdropFilter: 'blur(10px)', padding: '5rem 0' }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginBottom: '2rem',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem' }}>
            <div>
              <p className="section-eyebrow">Coverage Report</p>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.2rem',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: 'var(--color-text-primary)',
                  marginTop: '0.25rem',
                }}
              >
                Skills & Technologies
              </h2>
            </div>

            <div
              style={{
                display: 'inline-flex',
                background: 'rgba(13, 20, 30, 0.8)',
                border: '1px solid var(--color-border-hairline)',
                borderRadius: '999px',
                padding: '4px',
                gap: '4px',
              }}
            >
              <button
                onClick={() => setViewMode('earth')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  padding: '6px 14px',
                  borderRadius: '999px',
                  border: 'none',
                  background: viewMode === 'earth' ? 'var(--color-accent-pass)' : 'transparent',
                  color: viewMode === 'earth' ? 'var(--color-bg-base)' : 'var(--color-text-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
              >
                <Globe size={13} />
                3D Earth
              </button>
              <button
                onClick={() => setViewMode('both')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  padding: '6px 14px',
                  borderRadius: '999px',
                  border: 'none',
                  background: viewMode === 'both' ? 'var(--color-accent-pass)' : 'transparent',
                  color: viewMode === 'both' ? 'var(--color-bg-base)' : 'var(--color-text-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
              >
                <Sparkle size={13} />
                Interactive Both
              </button>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  padding: '6px 14px',
                  borderRadius: '999px',
                  border: 'none',
                  background: viewMode === 'grid' ? 'var(--color-accent-pass)' : 'transparent',
                  color: viewMode === 'grid' ? 'var(--color-bg-base)' : 'var(--color-text-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
              >
                <Grid size={13} />
                Grid View
              </button>
            </div>
          </div>

          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', color: 'var(--color-text-muted)', maxWidth: '650px' }}>
            3D interactive orbital view of full-stack engineering, QA automation frameworks, and developer toolchains revolving around the global ecosystem.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '2rem',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', marginRight: '0.5rem' }}>
            <SlidersHorizontal size={13} /> Filter Category:
          </div>
          {CATEGORY_FILTERS.map((cat) => {
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 500,
                  padding: '0.35rem 0.85rem',
                  borderRadius: '999px',
                  background: isActive ? 'rgba(74, 222, 154, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                  border: isActive ? '1px solid var(--color-accent-pass)' : '1px solid var(--color-border-hairline)',
                  color: isActive ? 'var(--color-accent-pass)' : 'var(--color-text-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 0 12px rgba(74, 222, 154, 0.25)' : 'none',
                }}
              >
                {cat}
              </button>
            )
          })}
        </motion.div>

        {(viewMode === 'earth' || viewMode === 'both') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: viewMode === 'both' ? '3rem' : '0' }}
          >
            <EarthSkillsCanvas
              activeCategory={activeCategory}
              hoveredSkillId={hoveredSkillId}
              setHoveredSkillId={setHoveredSkillId}
            />
          </motion.div>
        )}

        {(viewMode === 'grid' || viewMode === 'both') && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
              gap: '1.75rem',
            }}
          >
            {SKILL_CATEGORIES.map((category, i) => (
              <SkillCard
                key={i}
                category={category}
                index={i}
                activeCategory={activeCategory}
                hoveredSkillId={hoveredSkillId}
                setHoveredSkillId={setHoveredSkillId}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
